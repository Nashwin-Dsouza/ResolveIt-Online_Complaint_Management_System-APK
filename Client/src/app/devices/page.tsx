import React, { useEffect, useState } from 'react';
import DeviceUtils from '../../utils/deviceUtils';
import { Toast } from '../../utils/networkUtils';

interface DeviceStats {
  total: number;
  active: number;
  recent: number;
  byPlatform: {
    android: number;
    ios: number;
    web: number;
  };
}

const DevicesPage: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [deviceStats, setDeviceStats] = useState<DeviceStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);

  useEffect(() => {
    loadDeviceData();
  }, []);

  const loadDeviceData = async () => {
    try {
      setIsLoading(true);

      // Get current device info
      const info = await DeviceUtils.getDeviceInfo();
      setDeviceInfo(info);

      // Get current device ID
      const deviceId = DeviceUtils.getDeviceId();
      setCurrentDeviceId(deviceId);

      // Get device statistics
      const statsResult = await DeviceUtils.getDeviceStats();
      if (statsResult.success) {
        setDeviceStats(statsResult.data);
      }

    } catch (error) {
      console.error('Failed to load device data:', error);
      Toast.show({
        text: 'Failed to load device information',
        type: 'error',
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshDeviceData = () => {
    loadDeviceData();
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007AFF',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666', margin: 0 }}>Loading device information...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h1 style={{
            margin: '0 0 10px 0',
            color: '#333',
            fontSize: '2.5rem'
          }}>
            Device Management
          </h1>
          <p style={{
            margin: '0',
            color: '#666',
            fontSize: '1.1rem'
          }}>
            Monitor and manage device information
          </p>
        </div>

        {/* Current Device Info */}
        {deviceInfo && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              margin: '0 0 20px 0',
              color: '#333',
              borderBottom: '2px solid #007AFF',
              paddingBottom: '10px'
            }}>
              Current Device
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>Device Information</h3>
                <p><strong>Model:</strong> {deviceInfo.model}</p>
                <p><strong>Manufacturer:</strong> {deviceInfo.manufacturer}</p>
                <p><strong>Platform:</strong> {deviceInfo.platform}</p>
                <p><strong>OS Version:</strong> {deviceInfo.osVersion}</p>
                <p><strong>App Version:</strong> {deviceInfo.appVersion}</p>
              </div>
              
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>Display Information</h3>
                <p><strong>Screen:</strong> {deviceInfo.screenWidth} × {deviceInfo.screenHeight}</p>
                <p><strong>Pixel Ratio:</strong> {deviceInfo.pixelRatio}</p>
                <p><strong>Connection:</strong> {deviceInfo.connectionType}</p>
                <p><strong>Device ID:</strong> {currentDeviceId || 'Not registered'}</p>
              </div>
              
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>Browser Information</h3>
                <p><strong>Browser:</strong> {deviceInfo.browser}</p>
                <p><strong>Version:</strong> {deviceInfo.browserVersion}</p>
                <p><strong>User Agent:</strong> <span style={{ fontSize: '12px', wordBreak: 'break-all' }}>{deviceInfo.userAgent}</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Device Statistics */}
        {deviceStats && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              margin: '0 0 20px 0',
              color: '#333',
              borderBottom: '2px solid #007AFF',
              paddingBottom: '10px'
            }}>
              Device Statistics
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>Total Devices</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#333' }}>
                  {deviceStats.total}
                </p>
              </div>
              
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>Active Devices</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#28a745' }}>
                  {deviceStats.active}
                </p>
              </div>
              
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>Recent (24h)</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#ffc107' }}>
                  {deviceStats.recent}
                </p>
              </div>
            </div>
            
            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Platform Distribution</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Android</p>
                  <p style={{ margin: 0, fontSize: '1.5rem', color: '#28a745' }}>{deviceStats.byPlatform.android}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>iOS</p>
                  <p style={{ margin: 0, fontSize: '1.5rem', color: '#007AFF' }}>{deviceStats.byPlatform.ios}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Web</p>
                  <p style={{ margin: 0, fontSize: '1.5rem', color: '#6c757d' }}>{deviceStats.byPlatform.web}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{
            margin: '0 0 20px 0',
            color: '#333'
          }}>
            Actions
          </h2>
          
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={refreshDeviceData}
              style={{
                background: '#007AFF',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.background = '#007AFF'}
            >
              🔄 Refresh Data
            </button>
            
            <button
              onClick={() => {
                const deviceId = DeviceUtils.getDeviceId();
                if (deviceId) {
                  navigator.clipboard.writeText(deviceId);
                  Toast.show({
                    text: 'Device ID copied to clipboard',
                    type: 'success',
                    duration: 3000
                  });
                }
              }}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#1e7e34'}
              onMouseOut={(e) => e.currentTarget.style.background = '#28a745'}
            >
              📋 Copy Device ID
            </button>
            
            <button
              onClick={() => {
                console.log('Device Info:', deviceInfo);
                console.log('Device Stats:', deviceStats);
                Toast.show({
                  text: 'Device info logged to console',
                  type: 'info',
                  duration: 3000
                });
              }}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#545b62'}
              onMouseOut={(e) => e.currentTarget.style.background = '#6c757d'}
            >
              📊 Log to Console
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DevicesPage; 