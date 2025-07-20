import { Capacitor } from '@capacitor/core';
import config from '../../config';

interface DeviceInfo {
  deviceId?: string;
  model: string;
  manufacturer: string;
  platform: string;
  osVersion: string;
  appVersion: string;
  userAgent: string;
  browser: string;
  browserVersion: string;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  connectionType: string;
  userId?: string;
}

class DeviceUtils {
  private static deviceId: string | null = null;
  private static isRegistered = false;

  /**
   * Get device information from the browser/device
   */
  static async getDeviceInfo(): Promise<DeviceInfo> {
    const userAgent = navigator.userAgent;
    const platform = Capacitor.isNativePlatform() ? Capacitor.getPlatform() : 'web';
    
    // Get screen information
    const screenWidth = window.screen.width || window.innerWidth;
    const screenHeight = window.screen.height || window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;

    // Get connection type
    const connection = (navigator as any).connection;
    const connectionType = connection ? connection.effectiveType || connection.type || 'unknown' : 'unknown';

    // Parse user agent for device info
    const deviceInfo = this.parseUserAgent(userAgent);

    // Get stored device ID
    const storedDeviceId = localStorage.getItem('deviceId');

    return {
      deviceId: storedDeviceId || undefined,
      model: deviceInfo.model,
      manufacturer: deviceInfo.manufacturer,
      platform: platform,
      osVersion: deviceInfo.osVersion,
      appVersion: '1.0.0', // You can update this from your app config
      userAgent: userAgent,
      browser: deviceInfo.browser,
      browserVersion: deviceInfo.browserVersion,
      screenWidth,
      screenHeight,
      pixelRatio,
      connectionType,
      userId: localStorage.getItem('userId') || undefined
    };
  }

  /**
   * Parse user agent string to extract device information
   */
  private static parseUserAgent(userAgent: string): {
    model: string;
    manufacturer: string;
    osVersion: string;
    browser: string;
    browserVersion: string;
  } {
    let model = 'Unknown Device';
    let manufacturer = 'Unknown';
    let osVersion = 'Unknown';
    let browser = 'Unknown';
    let browserVersion = 'Unknown';

    // Detect Android devices
    if (userAgent.includes('Android')) {
      const androidMatch = userAgent.match(/Android\s+([^;)]+)/);
      if (androidMatch) {
        osVersion = androidMatch[1];
      }

      // Try to extract device model
      const deviceMatch = userAgent.match(/\(Linux.*?;\s*([^;)]+)\s*Build/);
      if (deviceMatch) {
        model = deviceMatch[1].trim();
        
        // Extract manufacturer from model
        const parts = model.split(/\s+/);
        if (parts.length > 0) {
          manufacturer = parts[0];
        }
      }
    }

    // Detect iOS devices
    if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) {
      manufacturer = 'Apple';
      
      if (userAgent.includes('iPhone')) {
        model = 'iPhone';
      } else if (userAgent.includes('iPad')) {
        model = 'iPad';
      } else if (userAgent.includes('iPod')) {
        model = 'iPod';
      }

      const iosMatch = userAgent.match(/OS\s+([_\d]+)\s+like/);
      if (iosMatch) {
        osVersion = iosMatch[1].replace(/_/g, '.');
      }
    }

    // Detect browser
    if (userAgent.includes('Chrome')) {
      browser = 'Chrome';
      const chromeMatch = userAgent.match(/Chrome\/([^\s]+)/);
      if (chromeMatch) {
        browserVersion = chromeMatch[1];
      }
    } else if (userAgent.includes('Firefox')) {
      browser = 'Firefox';
      const firefoxMatch = userAgent.match(/Firefox\/([^\s]+)/);
      if (firefoxMatch) {
        browserVersion = firefoxMatch[1];
      }
    } else if (userAgent.includes('Safari')) {
      browser = 'Safari';
      const safariMatch = userAgent.match(/Version\/([^\s]+)/);
      if (safariMatch) {
        browserVersion = safariMatch[1];
      }
    } else if (userAgent.includes('Edge')) {
      browser = 'Edge';
      const edgeMatch = userAgent.match(/Edge\/([^\s]+)/);
      if (edgeMatch) {
        browserVersion = edgeMatch[1];
      }
    }

    return {
      model,
      manufacturer,
      osVersion,
      browser,
      browserVersion
    };
  }

  /**
   * Register device with the server
   */
  static async registerDevice(): Promise<{ success: boolean; deviceId?: string; error?: string }> {
    try {
      const deviceInfo = await this.getDeviceInfo();
      const baseURL = process.env.NEXT_PUBLIC_API_URL || config.API_URL;

      const response = await fetch(`${baseURL}/api/devices/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deviceInfo)
      });

      const data = await response.json();

      if (data.success) {
        // Store device ID locally
        this.deviceId = data.data.deviceId;
        localStorage.setItem('deviceId', data.data.deviceId);
        this.isRegistered = true;
        
        console.log('Device registered successfully:', data.data);
        return { success: true, deviceId: data.data.deviceId };
      } else {
        console.error('Device registration failed:', data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Device registration error:', error);
      return { success: false, error: 'Failed to register device' };
    }
  }

  /**
   * Update device heartbeat (last seen)
   */
  static async updateHeartbeat(): Promise<{ success: boolean; error?: string }> {
    try {
      const deviceId = this.deviceId || localStorage.getItem('deviceId');
      
      if (!deviceId) {
        console.warn('No device ID found for heartbeat update');
        return { success: false, error: 'No device ID found' };
      }

      const baseURL = process.env.NEXT_PUBLIC_API_URL || config.API_URL;

      const response = await fetch(`${baseURL}/api/devices/heartbeat/${deviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data.success) {
        console.log('Device heartbeat updated');
        return { success: true };
      } else {
        console.error('Heartbeat update failed:', data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Heartbeat update error:', error);
      return { success: false, error: 'Failed to update heartbeat' };
    }
  }

  /**
   * Initialize device tracking
   */
  static async initialize(): Promise<void> {
    try {
      // Check if device is already registered
      const storedDeviceId = localStorage.getItem('deviceId');
      
      if (storedDeviceId) {
        this.deviceId = storedDeviceId;
        this.isRegistered = true;
        console.log('Device already registered:', storedDeviceId);
        
        // Update heartbeat
        await this.updateHeartbeat();
      } else {
        // Register new device
        const result = await this.registerDevice();
        if (!result.success) {
          console.error('Failed to register device:', result.error);
        }
      }

      // Set up periodic heartbeat updates (every 5 minutes)
      setInterval(() => {
        this.updateHeartbeat();
      }, 5 * 60 * 1000);

    } catch (error) {
      console.error('Device initialization error:', error);
    }
  }

  /**
   * Get current device ID
   */
  static getDeviceId(): string | null {
    return this.deviceId || localStorage.getItem('deviceId');
  }

  /**
   * Check if device is registered
   */
  static isDeviceRegistered(): boolean {
    return this.isRegistered || !!localStorage.getItem('deviceId');
  }

  /**
   * Associate device with user
   */
  static async associateWithUser(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const deviceId = this.getDeviceId();
      
      if (!deviceId) {
        return { success: false, error: 'No device ID found' };
      }

      const baseURL = process.env.NEXT_PUBLIC_API_URL || config.API_URL;

      const response = await fetch(`${baseURL}/api/devices/${deviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('userId', userId);
        console.log('Device associated with user:', userId);
        return { success: true };
      } else {
        console.error('Device association failed:', data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Device association error:', error);
      return { success: false, error: 'Failed to associate device with user' };
    }
  }

  /**
   * Get device statistics
   */
  static async getDeviceStats(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL || config.API_URL;

      const response = await fetch(`${baseURL}/api/devices/stats/overview`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, data: data.data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Get device stats error:', error);
      return { success: false, error: 'Failed to get device statistics' };
    }
  }
}

export default DeviceUtils; 