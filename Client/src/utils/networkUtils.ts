// Enhanced network utility for web/mobile with manual permission handling
class NetworkUtils {
  private static isOnline = navigator.onLine;
  private static listeners: ((online: boolean) => void)[] = [];
  private static permissionRequested = false;

  static async initialize(): Promise<void> {
    // Set up network listeners
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.notifyListeners(true);
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.notifyListeners(false);
    });

    // Initialize network status
    await this.checkNetworkStatus();
  }

  /**
   * Check if we have internet permission and connectivity
   */
  static async checkNetworkStatus(): Promise<boolean> {
    try {
      // First check if we're online according to navigator
      const navigatorOnline = navigator.onLine;
      
      // Then do a real network test
      const networkTest = await this.performNetworkTest();
      
      this.isOnline = navigatorOnline && networkTest;
      this.notifyListeners(this.isOnline);
      
      return this.isOnline;
    } catch (error) {
      console.error('Network status check failed:', error);
      this.isOnline = false;
      this.notifyListeners(false);
      return false;
    }
  }

  /**
   * Perform actual network connectivity test
   */
  static async performNetworkTest(): Promise<boolean> {
    try {
      // Test with a reliable endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-cache'
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.error('Network test failed:', error);
      return false;
    }
  }

  /**
   * Request internet permission manually (for Android)
   */
  static async requestInternetPermission(): Promise<boolean> {
    if (this.permissionRequested) {
      return this.isOnline;
    }

    try {
      // Check if we're in a Capacitor environment
      if (typeof window !== 'undefined' && (window as any).Capacitor) {
        const { Capacitor } = await import('@capacitor/core');
        
        if (Capacitor.isNativePlatform()) {
          // For Android, we need to check network state permission
          const { Permissions } = await import('@capacitor/core');
          
          // Request network state permission if needed
          const permissionStatus = await Permissions.query({ name: 'network-state' as any });
          
          if (permissionStatus.state === 'granted') {
            this.permissionRequested = true;
            return await this.checkNetworkStatus();
          } else {
            // Show manual permission request dialog
            const granted = await this.showPermissionDialog();
            if (granted) {
              this.permissionRequested = true;
              return await this.checkNetworkStatus();
            }
          }
        }
      }
      
      // For web or if permission already granted
      this.permissionRequested = true;
      return await this.checkNetworkStatus();
    } catch (error) {
      console.error('Permission request failed:', error);
      // Fallback to manual dialog
      const granted = await this.showPermissionDialog();
      if (granted) {
        this.permissionRequested = true;
        return await this.checkNetworkStatus();
      }
      return false;
    }
  }

  /**
   * Show manual permission request dialog
   */
  private static async showPermissionDialog(): Promise<boolean> {
    return new Promise((resolve) => {
      const dialog = document.createElement('div');
      dialog.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: Arial, sans-serif;
      `;

      const content = document.createElement('div');
      content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 12px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      `;

      content.innerHTML = `
        <h2 style="margin: 0 0 20px 0; color: #333;">Internet Permission Required</h2>
        <p style="margin: 0 0 20px 0; color: #666; line-height: 1.5;">
          This app needs internet access to function properly. Please ensure you have granted internet permission.
        </p>
        <div style="margin: 20px 0;">
          <button id="grant-permission" style="
            background: #007AFF;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            margin-right: 10px;
          ">Grant Permission</button>
          <button id="deny-permission" style="
            background: #FF3B30;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
          ">Deny</button>
        </div>
        <p style="margin: 20px 0 0 0; font-size: 14px; color: #999;">
          You can also enable this in your device settings under Apps > ResolveIt > Permissions
        </p>
      `;

      dialog.appendChild(content);
      document.body.appendChild(dialog);

      const grantBtn = content.querySelector('#grant-permission') as HTMLButtonElement;
      const denyBtn = content.querySelector('#deny-permission') as HTMLButtonElement;

      grantBtn.onclick = () => {
        document.body.removeChild(dialog);
        resolve(true);
      };

      denyBtn.onclick = () => {
        document.body.removeChild(dialog);
        resolve(false);
      };
    });
  }

  /**
   * Enhanced fetch with retry and permission handling
   */
  static async fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
    // Check permission first
    const hasPermission = await this.requestInternetPermission();
    if (!hasPermission) {
      throw new Error('No internet permission or connectivity');
    }

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          cache: 'no-cache' // Prevent caching issues
        });
        
        if (response.ok) {
          return response;
        }
        
        // If it's the last retry, throw the error
        if (i === retries - 1) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Fetch attempt ${i + 1} failed:`, error);
        
        // If it's the last retry, throw the error
        if (i === retries - 1) {
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
    
    throw new Error('All fetch attempts failed');
  }

  static getNetworkStatus(): boolean {
    return this.isOnline;
  }

  static addNetworkListener(callback: (online: boolean) => void): void {
    this.listeners.push(callback);
  }

  static removeNetworkListener(callback: (online: boolean) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private static notifyListeners(online: boolean): void {
    this.listeners.forEach(listener => {
      try {
        listener(online);
      } catch (error) {
        console.error('Network listener error:', error);
      }
    });
  }

  // Offline complaint storage
  static async saveOfflineComplaint(complaintData: any): Promise<void> {
    try {
      const offlineComplaints = JSON.parse(localStorage.getItem('offlineComplaints') || '[]');
      offlineComplaints.push({
        ...complaintData,
        id: `offline_${Date.now()}`,
        createdAt: new Date().toISOString(),
        isOffline: true
      });
      localStorage.setItem('offlineComplaints', JSON.stringify(offlineComplaints));
    } catch (error) {
      console.error('Failed to save offline complaint:', error);
    }
  }

  static getOfflineComplaints(): any[] {
    try {
      return JSON.parse(localStorage.getItem('offlineComplaints') || '[]');
    } catch (error) {
      console.error('Failed to get offline complaints:', error);
      return [];
    }
  }

  static clearOfflineComplaints(): void {
    localStorage.removeItem('offlineComplaints');
  }
}

// Enhanced toast utility
class Toast {
  static show(options: { text: string; duration?: number; type?: 'success' | 'error' | 'info' }): void {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${options.type === 'error' ? '#FF3B30' : options.type === 'success' ? '#34C759' : '#007AFF'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    toast.textContent = options.text;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, options.duration || 3000);
  }
}

export { NetworkUtils, Toast };
export default NetworkUtils;
