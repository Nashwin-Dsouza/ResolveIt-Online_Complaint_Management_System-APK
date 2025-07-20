import React from 'react';
import EnhancedInternetTest from '../../components/EnhancedInternetTest';
import NetworkPermissionHandler from '../../components/NetworkPermissionHandler';

export default function NetworkTestPage() {
  return (
    <NetworkPermissionHandler showPermissionDialog={false}>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
            color: 'white',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>
              Network Diagnostics Center
            </h1>
            <p style={{ margin: '0', opacity: 0.9, fontSize: '1.1rem' }}>
              Comprehensive internet connectivity and permission testing
            </p>
          </div>
          
          <EnhancedInternetTest />
          
          <div style={{
            padding: '30px',
            background: '#f8f9fa',
            borderTop: '1px solid #e9ecef'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
              What This Test Does
            </h3>
            
            <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>🔍 Navigator Status</h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  Checks if the browser reports being online using navigator.onLine
                </p>
              </div>
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>🌐 Network Test</h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  Performs actual HTTP requests to test real network connectivity
                </p>
              </div>
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>🔐 Permission Check</h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  Verifies if the app has proper internet permissions granted
                </p>
              </div>
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>⚡ Latency Test</h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  Measures network response time to assess connection quality
                </p>
              </div>
            </div>
            
            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Troubleshooting Tips</h4>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#666', lineHeight: '1.6' }}>
                <li>If Navigator shows offline but you have internet, try refreshing the page</li>
                <li>If Network Test fails, check your firewall or proxy settings</li>
                <li>If Permission Check fails, go to device settings and grant internet permission</li>
                <li>High latency (>1000ms) may indicate a slow or congested connection</li>
                <li>For Android apps, ensure the app has proper permissions in Settings > Apps</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </NetworkPermissionHandler>
  );
} 