import React, { useEffect, useState } from 'react';
import NetworkUtils, { Toast } from '../utils/networkUtils';

interface NetworkPermissionHandlerProps {
  children: React.ReactNode;
  showPermissionDialog?: boolean;
  onNetworkStatusChange?: (isOnline: boolean) => void;
}

const NetworkPermissionHandler: React.FC<NetworkPermissionHandlerProps> = ({
  children,
  showPermissionDialog = true,
  onNetworkStatusChange
}) => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    initializeNetwork();
  }, []);

  const initializeNetwork = async () => {
    try {
      await NetworkUtils.initialize();
      
      // Add network listener
      NetworkUtils.addNetworkListener((online) => {
        setIsOnline(online);
        onNetworkStatusChange?.(online);
        
        if (!online) {
          Toast.show({
            text: 'No internet connection detected',
            type: 'error',
            duration: 4000
          });
        } else if (isOnline === false) {
          Toast.show({
            text: 'Internet connection restored',
            type: 'success',
            duration: 3000
          });
        }
      });

      // Check initial network status
      const networkStatus = await NetworkUtils.checkNetworkStatus();
      setIsOnline(networkStatus);

      // Request permission if needed and dialog is enabled
      if (showPermissionDialog && !networkStatus && !permissionRequested) {
        setShowDialog(true);
      }
    } catch (error) {
      console.error('Failed to initialize network:', error);
      setIsOnline(false);
    }
  };

  const handlePermissionRequest = async () => {
    try {
      setPermissionRequested(true);
      setShowDialog(false);
      
      const hasPermission = await NetworkUtils.requestInternetPermission();
      setIsOnline(hasPermission);
      
      if (hasPermission) {
        Toast.show({
          text: 'Internet permission granted',
          type: 'success',
          duration: 3000
        });
      } else {
        Toast.show({
          text: 'Internet permission denied',
          type: 'error',
          duration: 4000
        });
      }
    } catch (error) {
      console.error('Permission request failed:', error);
      Toast.show({
        text: 'Failed to request internet permission',
        type: 'error',
        duration: 4000
      });
    }
  };

  const handleManualPermissionCheck = async () => {
    try {
      const networkStatus = await NetworkUtils.checkNetworkStatus();
      setIsOnline(networkStatus);
      
      if (networkStatus) {
        Toast.show({
          text: 'Internet connection is working',
          type: 'success',
          duration: 3000
        });
        setShowDialog(false);
      } else {
        Toast.show({
          text: 'Still no internet connection. Please check your settings.',
          type: 'error',
          duration: 4000
        });
      }
    } catch (error) {
      console.error('Manual check failed:', error);
    }
  };

  const handleDismiss = () => {
    setShowDialog(false);
    setPermissionRequested(true);
  };

  return (
    <>
      {children}
      
      {/* Network Permission Dialog */}
      {showDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            margin: '20px'
          }}>
            <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>
              Internet Permission Required
            </h2>
            
            <p style={{ margin: '0 0 20px 0', color: '#666', lineHeight: '1.5' }}>
              This app needs internet access to function properly. Please ensure you have granted internet permission.
            </p>
            
            <div style={{ margin: '20px 0' }}>
              <button
                onClick={handlePermissionRequest}
                style={{
                  background: '#007AFF',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginRight: '10px',
                  marginBottom: '10px'
                }}
              >
                Grant Permission
              </button>
              
              <button
                onClick={handleManualPermissionCheck}
                style={{
                  background: '#34C759',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginRight: '10px',
                  marginBottom: '10px'
                }}
              >
                Check Connection
              </button>
              
              <button
                onClick={handleDismiss}
                style={{
                  background: '#FF3B30',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Dismiss
              </button>
            </div>
            
            <p style={{ margin: '20px 0 0 0', fontSize: '14px', color: '#999' }}>
              You can also enable this in your device settings under Apps > ResolveIt > Permissions
            </p>
            
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              fontSize: '14px',
              color: '#666'
            }}>
              <strong>Current Status:</strong> {isOnline === null ? 'Checking...' : isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>
      )}
      
      {/* Network Status Indicator */}
      {isOnline === false && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#FF3B30',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}>
          No Internet Connection
        </div>
      )}
    </>
  );
};

export default NetworkPermissionHandler; 