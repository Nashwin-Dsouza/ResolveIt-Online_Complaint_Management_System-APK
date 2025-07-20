"use client";

import React, { useEffect, useState } from 'react';
import NetworkUtils, { Toast } from '../utils/networkUtils';

interface NetworkDiagnostics {
  navigatorOnline: boolean;
  networkTest: boolean;
  permissionStatus: boolean;
  latency: number | null;
  errorMessage: string | null;
}

const EnhancedInternetTest: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<NetworkDiagnostics>({
    navigatorOnline: false,
    networkTest: false,
    permissionStatus: false,
    latency: null,
    errorMessage: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setIsLoading(true);
    setDiagnostics({
      navigatorOnline: false,
      networkTest: false,
      permissionStatus: false,
      latency: null,
      errorMessage: null
    });

    try {
      // Check navigator online status
      const navigatorOnline = navigator.onLine;
      
      // Check network permission and connectivity
      const permissionStatus = await NetworkUtils.requestInternetPermission();
      
      // Perform network test with latency measurement
      const startTime = Date.now();
      const networkTest = await NetworkUtils.performNetworkTest();
      const latency = networkTest ? Date.now() - startTime : null;

      setDiagnostics({
        navigatorOnline,
        networkTest,
        permissionStatus,
        latency,
        errorMessage: null
      });

      // Show appropriate toast message
      if (networkTest && permissionStatus) {
        Toast.show({
          text: `Internet connection working! Latency: ${latency}ms`,
          type: 'success',
          duration: 4000
        });
      } else {
        Toast.show({
          text: 'Internet connection issues detected',
          type: 'error',
          duration: 4000
        });
      }
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      }));
      
      Toast.show({
        text: 'Network diagnostics failed',
        type: 'error',
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: boolean) => status ? '#34C759' : '#FF3B30';
  const getStatusText = (status: boolean) => status ? '✓ Working' : '✗ Failed';

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#333',
        marginBottom: '30px'
      }}>
        Enhanced Internet Connection Test
      </h1>

      {isLoading && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          color: '#666'
        }}>
          Running network diagnostics...
        </div>
      )}

      {!isLoading && (
        <>
          {/* Summary Status */}
          <div style={{
            background: diagnostics.networkTest && diagnostics.permissionStatus ? '#d4edda' : '#f8d7da',
            border: `1px solid ${diagnostics.networkTest && diagnostics.permissionStatus ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <h2 style={{
              color: diagnostics.networkTest && diagnostics.permissionStatus ? '#155724' : '#721c24',
              margin: '0 0 10px 0'
            }}>
              {diagnostics.networkTest && diagnostics.permissionStatus 
                ? 'Internet Connection Working' 
                : 'Internet Connection Issues Detected'
              }
            </h2>
            {diagnostics.latency && (
              <p style={{ margin: '0', color: '#666' }}>
                Latency: {diagnostics.latency}ms
              </p>
            )}
          </div>

          {/* Detailed Diagnostics */}
          <div style={{
            background: '#f8f9fa',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
              Network Diagnostics
            </h3>
            
            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
                Navigator Online:
              </span>
              <span style={{ color: getStatusColor(diagnostics.navigatorOnline) }}>
                {getStatusText(diagnostics.navigatorOnline)}
              </span>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
                Network Test:
              </span>
              <span style={{ color: getStatusColor(diagnostics.networkTest) }}>
                {getStatusText(diagnostics.networkTest)}
              </span>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
                Permission Status:
              </span>
              <span style={{ color: getStatusColor(diagnostics.permissionStatus) }}>
                {getStatusText(diagnostics.permissionStatus)}
              </span>
            </div>

            {diagnostics.errorMessage && (
              <div style={{
                background: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '4px',
                padding: '10px',
                marginTop: '10px',
                color: '#721c24'
              }}>
                <strong>Error:</strong> {diagnostics.errorMessage}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={runDiagnostics}
              style={{
                background: '#007AFF',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Run Diagnostics Again
            </button>

            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {/* Detailed Information */}
          {showDetails && (
            <div style={{
              background: '#f8f9fa',
              borderRadius: '8px',
              padding: '20px',
              marginTop: '20px'
            }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
                Technical Details
              </h3>
              
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p><strong>User Agent:</strong> {navigator.userAgent}</p>
                <p><strong>Platform:</strong> {navigator.platform}</p>
                <p><strong>Language:</strong> {navigator.language}</p>
                <p><strong>Connection Type:</strong> {
                  (navigator as any).connection 
                    ? (navigator as any).connection.effectiveType || 'Unknown'
                    : 'Not available'
                }</p>
                <p><strong>Online Status:</strong> {navigator.onLine ? 'Online' : 'Offline'}</p>
                <p><strong>Cookie Enabled:</strong> {navigator.cookieEnabled ? 'Yes' : 'No'}</p>
                <p><strong>Do Not Track:</strong> {navigator.doNotTrack || 'Not set'}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnhancedInternetTest; 