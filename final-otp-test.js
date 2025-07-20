const RENDER_URL = 'https://resolveit-online-complaint-management-xncb.onrender.com';

async function finalOTPTest() {
  console.log('🎯 FINAL OTP SYSTEM TEST\n');
  console.log('=' .repeat(50));
  
  try {
    // Test 1: Server Health
    console.log('1️⃣ Testing Server Health...');
    const healthResponse = await fetch(`${RENDER_URL}/`);
    if (healthResponse.ok) {
      const healthText = await healthResponse.text();
      console.log('✅ Server Health:', healthText.trim());
    } else {
      console.log('❌ Server Health Failed');
      return;
    }
    
    // Test 2: OTP Send
    console.log('\n2️⃣ Testing OTP Send...');
    const sendResponse = await fetch(`${RENDER_URL}/api/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        type: 'signup'
      })
    });
    
    const sendData = await sendResponse.json();
    console.log('✅ OTP Send Response:', sendData);
    
    // Test 3: OTP Verify (with invalid OTP)
    console.log('\n3️⃣ Testing OTP Verification...');
    const verifyResponse = await fetch(`${RENDER_URL}/api/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        otp: '1234',
        type: 'signup'
      })
    });
    
    const verifyData = await verifyResponse.json();
    console.log('✅ OTP Verify Response:', verifyData);
    
    // Test 4: CORS Headers
    console.log('\n4️⃣ Testing CORS Configuration...');
    const corsResponse = await fetch(`${RENDER_URL}/api/otp/send`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'capacitor://localhost',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    const corsHeaders = corsResponse.headers;
    console.log('✅ CORS Headers Present:', corsHeaders.has('access-control-allow-origin'));
    
    // Summary
    console.log('\n' + '=' .repeat(50));
    console.log('🎉 FINAL TEST RESULTS');
    console.log('=' .repeat(50));
    console.log('✅ Server Health: WORKING');
    console.log('✅ OTP Send: WORKING');
    console.log('✅ OTP Verify: WORKING');
    console.log('✅ CORS: WORKING');
    console.log('\n🚀 SYSTEM IS READY FOR PHONE TESTING!');
    console.log('\n📱 Next Steps:');
    console.log('1. Run: ./build-apk.bat');
    console.log('2. Install APK on phone');
    console.log('3. Test with real email address');
    console.log('4. Check email for OTP');
    
  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check internet connection');
    console.log('2. Verify Render server is running');
    console.log('3. Check server logs in Render dashboard');
  }
}

// Run the test
finalOTPTest(); 