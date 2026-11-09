import crypto from 'crypto';
import { User } from '../models/User.js';
import { Transaction } from '../models/Transaction.js';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const IS_RAZORPAY_CONFIGURED = Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);

const PREMIUM_PACK_AMOUNT = 20000; // ₹200.00
const CURRENCY = 'INR';

export const getStatus = (req, res) => {
  const user = User.findById(req.user.id);
  const transactions = Transaction.findByUserId(req.user.id);

  res.json({
    isPremium: Boolean(user?.isPremium),
    premiumPurchasedAt: user?.premiumPurchasedAt || null,
    providerConfigured: IS_RAZORPAY_CONFIGURED,
    sandboxMode: !IS_RAZORPAY_CONFIGURED,
    keyId: IS_RAZORPAY_CONFIGURED ? RAZORPAY_KEY_ID : 'rzp_test_sandbox_dev_mode',
    packPriceInINR: 200,
    packTemplateCount: 10,
    transactions: transactions.map(t => ({
      orderId: t.orderId,
      amount: t.amount / 100,
      currency: t.currency,
      status: t.status,
      createdAt: t.createdAt,
      verifiedAt: t.verifiedAt
    }))
  });
};

export const createOrder = async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);

    if (user.isPremium) {
      return res.status(400).json({
        error: 'Already Purchased',
        message: 'You already own the Complete 10 Premium Templates Pack!'
      });
    }

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    if (IS_RAZORPAY_CONFIGURED) {
      try {
        const authHeader = 'Basic ' + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
        const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
          },
          body: JSON.stringify({
            amount: PREMIUM_PACK_AMOUNT,
            currency: CURRENCY,
            receipt: `rcpt_${user.id.substring(0, 8)}`,
            notes: {
              userId: user.id,
              pack: '10_premium_templates_pack'
            }
          })
        });

        if (!rzpResponse.ok) {
          const errData = await rzpResponse.json();
          throw new Error(errData.error?.description || 'Failed to create Razorpay order');
        }

        const rzpOrder = await rzpResponse.json();

        Transaction.create({
          userId: user.id,
          orderId: rzpOrder.id,
          amount: PREMIUM_PACK_AMOUNT,
          currency: CURRENCY,
          status: 'pending',
          provider: 'razorpay'
        });

        return res.json({
          orderId: rzpOrder.id,
          amount: rzpOrder.amount,
          currency: rzpOrder.currency,
          keyId: RAZORPAY_KEY_ID,
          sandboxMode: false
        });
      } catch (err) {
        console.error('Razorpay API error, falling back to Sandbox order:', err.message);
      }
    }

    // Sandbox Test Mode
    const tx = Transaction.create({
      userId: user.id,
      orderId,
      amount: PREMIUM_PACK_AMOUNT,
      currency: CURRENCY,
      status: 'pending',
      provider: 'test_sandbox'
    });

    res.json({
      orderId: tx.orderId,
      amount: tx.amount,
      currency: tx.currency,
      keyId: 'rzp_test_sandbox_dev_mode',
      sandboxMode: true,
      notice: 'Running in Developer Sandbox Mode.'
    });
  } catch (err) {
    next(err);
  }
};

export const verifyPayment = (req, res, next) => {
  try {
    const { orderId, paymentId, signature, sandboxConfirmation } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required for verification.' });
    }

    const tx = Transaction.findByOrderId(orderId);
    if (!tx) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    if (tx.status === 'success') {
      return res.json({
        message: 'Payment was already verified. Your premium pack is active!',
        isPremium: true
      });
    }

    if (tx.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized order ownership.' });
    }

    if (IS_RAZORPAY_CONFIGURED) {
      if (!paymentId || !signature) {
        return res.status(400).json({ error: 'Payment ID and signature are required for Razorpay verification.' });
      }

      const generatedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      if (generatedSignature !== signature) {
        Transaction.update(orderId, { status: 'failed', paymentId });
        return res.status(400).json({ error: 'Invalid payment signature. Verification failed.' });
      }
    } else {
      if (!sandboxConfirmation) {
        return res.status(400).json({ error: 'Sandbox verification requires explicit confirmation.' });
      }
    }

    Transaction.update(orderId, {
      status: 'success',
      paymentId: paymentId || `pay_test_${Date.now()}`
    });

    User.update(req.user.id, {
      isPremium: true,
      premiumPurchasedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Congratulations! Payment verified successfully. All 10 Premium Templates unlocked forever!',
      isPremium: true
    });
  } catch (err) {
    next(err);
  }
};
