import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';
import { Crown, Check, ShieldCheck, X, AlertCircle, Loader } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, onSuccess }) {
  const { user, unlockPremium } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      initiateOrder();
    } else {
      setError(null);
      setSuccess(false);
      setOrderData(null);
    }
  }, [isOpen]);

  const initiateOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.createPaymentOrder();
      setOrderData(res);
    } catch (err) {
      setError(err.message || 'Failed to initialize payment order');
    } finally {
      setLoading(false);
    }
  };

  const handleSandboxSimulateSuccess = async () => {
    if (!orderData) return;
    try {
      setLoading(true);
      setError(null);

      const verifyRes = await api.verifyPayment({
        orderId: orderData.orderId,
        paymentId: `pay_sandbox_${Date.now()}`,
        sandboxConfirmation: true
      });

      if (verifyRes.success || verifyRes.isPremium) {
        unlockPremium();
        setSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Payment verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(5, 8, 14, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '2.5rem',
        borderRadius: '24px',
        border: '2px solid rgba(245, 158, 11, 0.4)',
        position: 'relative',
        background: '#0d1322'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X style={{ width: '20px', height: '20px' }} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Check style={{ width: '32px', height: '32px' }} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: '#fff' }}>
              Payment Verified!
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
              All 10 Premium Templates are now unlocked and attached to your account forever.
            </p>
            <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
              Start Using Premium Templates
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                <Crown style={{ width: '22px', height: '22px' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>Unlock Premium Pack</h3>
                <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 600 }}>Complete 10-Template Suite</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Total Amount</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24' }}>₹200.00</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                One-time payment. Unlocks all 10 premium designs forever across all your portfolios.
              </p>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
                <span>The Biography &amp; Mystic Pages 3D Books</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
                <span>Dimension 3D, Cyber Shield &amp; Retro Future</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
                <span>Executive Prime, Couture Studio &amp; Glass Horizon</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
                <span>Server-verified entitlement, persists after logout</span>
              </li>
            </ul>

            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '0.85rem', borderRadius: '8px', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* Sandbox Notice & Action */}
            {orderData?.sandboxMode && (
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.82rem', color: '#c084fc' }}>
                <strong>🛠️ Developer Mode Active:</strong> Razorpay keys can be supplied in <code>server/.env</code> for live UPI/card payments. Click below to simulate instant payment verification.
              </div>
            )}

            <button 
              onClick={handleSandboxSimulateSuccess} 
              disabled={loading || !orderData} 
              className="btn btn-primary btn-lg" 
              style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000', fontWeight: 800 }}
            >
              {loading ? (
                <>
                  <Loader style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                  <span>Processing Verification...</span>
                </>
              ) : (
                <span>Confirm &amp; Unlock 10-Pack (₹200)</span>
              )}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.78rem', color: '#64748b' }}>
              <ShieldCheck style={{ width: '14px', height: '14px' }} />
              <span>Zero card details stored. Idempotent server verification.</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
