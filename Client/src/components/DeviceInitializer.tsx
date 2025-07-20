import React, { useEffect, useState } from 'react';
import DeviceUtils from '../utils/deviceUtils';
import { Toast } from '../utils/networkUtils';

const DeviceInitializer: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    initializeDevice();
  }, []);

  const initializeDevice = async () => {
    try {
      console.log('🔄 Initializing device tracking...');
      
      // Initialize device tracking
      await DeviceUtils.initialize();
      
      // Get device info for display
      const info = await DeviceUtils.getDeviceInfo();
      setDeviceInfo(info);
      
      setIsInitialized(true);
      
      // Show success message
      Toast.show({
        text: `Device registered: ${info.model}`,
        type: 'success',
        duration: 3000
      });
      
      console.log('✅ Device tracking initialized successfully');
      
    } catch (error) {
      console.error('❌ Device initialization failed:', error);
      
      Toast.show({
        text: 'Failed to initialize device tracking',
        type: 'error',
        duration: 4000
      });
    }
  };

  // This component doesn't render anything visible
  return null;
};

export default DeviceInitializer; 