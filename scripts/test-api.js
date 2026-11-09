/**
 * FolioVerse Automated Integration & End-to-End Verification Test Suite
 */

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🧪 Starting FolioVerse Automated Verification Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.status === 'healthy', 'Health check endpoint returns healthy status');

    // 2. User Registration
    const testEmail = `test_dev_${Date.now()}@example.com`;
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'password123',
        name: 'Aarav Sharma'
      })
    });
    const regData = await regRes.json();
    assert(regRes.status === 201 && regData.token && regData.user.name === 'Aarav Sharma', 'User registration generates valid JWT token and account');
    const token = regData.token;

    // 3. User Login
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200 && loginData.token, 'User login succeeds and returns authentication token');

    // 4. Auth Verification (/auth/me)
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200 && meData.user.email === testEmail && meData.user.isPremium === false, 'Current session returns correct profile and initial free status');

    // 5. Create Portfolio
    const createRes = await fetch(`${BASE_URL}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Aarav Sharma - 3D Systems Book',
        templateId: 'open-book',
        profile: {
          fullName: 'Aarav Sharma',
          headline: 'Full Stack & Systems Architect',
          bio: 'Building next-generation web applications with 3D interactions.'
        }
      })
    });
    const createData = await createRes.json();
    assert(createRes.status === 201 && createData.portfolio.id && createData.portfolio.slug, 'Portfolio creation generates unique ID and slug');
    const portfolioId = createData.portfolio.id;
    const portfolioSlug = createData.portfolio.slug;

    // 6. Update Portfolio Draft
    const updateRes = await fetch(`${BASE_URL}/portfolios/${portfolioId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Aarav Sharma - Master Book Portfolio',
        skills: [
          { name: 'React', category: 'Frontend', level: 'Expert' },
          { name: 'Node.js', category: 'Backend', level: 'Expert' }
        ]
      })
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200 && updateData.portfolio.title === 'Aarav Sharma - Master Book Portfolio', 'Portfolio draft updates title and nested skills array');

    // 7. Verify Draft is Protected from Public Access
    const draftPublicRes = await fetch(`${BASE_URL}/public/portfolios/${portfolioSlug}`);
    assert(draftPublicRes.status === 403, 'Draft portfolio is strictly forbidden from unauthenticated public access (Privacy enforced)');

    // 8. Publish Portfolio
    const pubRes = await fetch(`${BASE_URL}/portfolios/${portfolioId}/publish`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const pubData = await pubRes.json();
    assert(pubRes.status === 200 && pubData.portfolio.status === 'published', 'Publish action sets status to published with publishedAt timestamp');

    // 9. Public Lookup (No Auth Required)
    const publicLookupRes = await fetch(`${BASE_URL}/public/portfolios/${portfolioSlug}`);
    const publicData = await publicLookupRes.json();
    assert(publicLookupRes.status === 200 && publicData.portfolio.slug === portfolioSlug, 'Public visitor can access published portfolio by slug without logging in');
    assert(publicData.portfolio.views >= 1, 'Public view counter atomically increments on visitor access');

    // 10. Portfolio Duplication
    const dupRes = await fetch(`${BASE_URL}/portfolios/${portfolioId}/duplicate`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const dupData = await dupRes.json();
    assert(dupRes.status === 201 && dupData.portfolio.id !== portfolioId && dupData.portfolio.status === 'draft', 'Portfolio duplication creates an independent copy in draft status');

    // 11. Premium Payment Order Creation (₹200 Pack)
    const orderRes = await fetch(`${BASE_URL}/premium/create-order`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const orderData = await orderRes.json();
    assert(orderRes.status === 200 && orderData.orderId && orderData.amount === 20000, 'Premium order creation generates ₹200.00 (20000 paise) order for 10-template pack');

    // 12. Premium Payment Verification & Entitlement Granting
    const verifyRes = await fetch(`${BASE_URL}/premium/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        orderId: orderData.orderId,
        paymentId: `pay_test_${Date.now()}`,
        sandboxConfirmation: true
      })
    });
    const verifyData = await verifyRes.json();
    assert(verifyRes.status === 200 && verifyData.isPremium === true, 'Payment verification succeeds and grants permanent premium entitlement');

    // 13. Re-verify User Profile Reflects Premium Status
    const meRes2 = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const meData2 = await meRes2.json();
    assert(meData2.user.isPremium === true, 'User profile persistently reflects isPremium=true across requests');

    // 14. Data Export
    const exportRes = await fetch(`${BASE_URL}/auth/export-data`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const exportData = await exportRes.json();
    assert(exportRes.status === 200 && Array.isArray(exportData.portfolios) && exportData.portfolios.length >= 2, 'Data portability export returns all user portfolios in clean JSON format');

    console.log(`\n========================================`);
    console.log(`🏁 Test Summary: ${passed} Passed, ${failed} Failed`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  }
}

runTests();
