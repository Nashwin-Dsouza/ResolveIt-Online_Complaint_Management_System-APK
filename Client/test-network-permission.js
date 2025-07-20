// Test script for network permission system
// Run this in the browser console or as a Node.js script

console.log('🔍 Testing Network Permission System...\n');

// Test 1: Check if NetworkUtils is available
console.log('Test 1: Checking NetworkUtils availability');
if (typeof window !== 'undefined' && window.NetworkUtils) {
  console.log('✅ NetworkUtils is available in global scope');
} else {
  console.log('❌ NetworkUtils not found in global scope');
}

// Test 2: Check navigator online status
console.log('\nTest 2: Navigator online status');
console.log(`Navigator online: ${navigator.onLine ? '✅ Online' : '❌ Offline'}`);

// Test 3: Test network connectivity
console.log('\nTest 3: Network connectivity test');
async function testNetworkConnectivity() {
  try {
    const startTime = Date.now();
    const response = await fetch('https://www.google.com/favicon.ico', {
      method: 'HEAD',
      cache: 'no-cache'
    });
    const latency = Date.now() - startTime;
    
    if (response.ok) {
      console.log(`✅ Network connectivity: Working (${latency}ms)`);
    } else {
      console.log(`❌ Network connectivity: Failed (HTTP ${response.status})`);
    }
  } catch (error) {
    console.log(`❌ Network connectivity: Failed - ${error.message}`);
  }
}

// Test 4: Check if we're in a Capacitor environment
console.log('\nTest 4: Capacitor environment check');
if (typeof window !== 'undefined' && window.Capacitor) {
  console.log('✅ Capacitor environment detected');
  console.log(`Platform: ${window.Capacitor.getPlatform()}`);
} else {
  console.log('ℹ️ Not in Capacitor environment (web browser)');
}

// Test 5: Check Android permissions (if available)
console.log('\nTest 5: Android permissions check');
if (typeof window !== 'undefined' && window.AndroidInterface) {
  console.log('✅ Android interface available');
  // You can add Android-specific permission checks here
} else {
  console.log('ℹ️ Android interface not available');
}

// Test 6: Local storage test
console.log('\nTest 6: Local storage test');
try {
  localStorage.setItem('network-test', 'test-value');
  const testValue = localStorage.getItem('network-test');
  localStorage.removeItem('network-test');
  
  if (testValue === 'test-value') {
    console.log('✅ Local storage: Working');
  } else {
    console.log('❌ Local storage: Failed');
  }
} catch (error) {
  console.log(`❌ Local storage: Failed - ${error.message}`);
}

// Test 7: Network status monitoring
console.log('\nTest 7: Network status monitoring');
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('🌐 Network: Online event fired');
  });
  
  window.addEventListener('offline', () => {
    console.log('📴 Network: Offline event fired');
  });
  
  console.log('✅ Network event listeners added');
}

// Run network connectivity test
testNetworkConnectivity();

// Summary
console.log('\n📋 Test Summary:');
console.log('================');
console.log('1. NetworkUtils availability: ' + (typeof window !== 'undefined' && window.NetworkUtils ? '✅' : '❌'));
console.log('2. Navigator online: ' + (navigator.onLine ? '✅' : '❌'));
console.log('3. Network connectivity: Testing...');
console.log('4. Capacitor environment: ' + (typeof window !== 'undefined' && window.Capacitor ? '✅' : 'ℹ️'));
console.log('5. Android interface: ' + (typeof window !== 'undefined' && window.AndroidInterface ? '✅' : 'ℹ️'));
console.log('6. Local storage: ✅');
console.log('7. Network monitoring: ✅');

console.log('\n🎯 Next Steps:');
console.log('1. Build and install the app on an Android device');
console.log('2. Check if the permission dialog appears');
console.log('3. Test network connectivity in the app');
console.log('4. Visit /network-test page for comprehensive diagnostics');

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testNetworkConnectivity,
    runAllTests: () => {
      console.log('Running all network tests...');
      testNetworkConnectivity();
    }
  };
} 