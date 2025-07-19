// Simple network utility for web/mobile
class NetworkUtils {
  private static isOnline = navigator.onLine;
  private static listeners: ((online: boolean) => void)[] = [];

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
}

// Simple toast utility
class Toast {
  static show(options: { text: string; duration?: string }): void {
    // Simple alert for now - can be enhanced with a proper toast library
    alert(options.text);
  }
}

export { NetworkUtils, Toast };
export default NetworkUtils;
