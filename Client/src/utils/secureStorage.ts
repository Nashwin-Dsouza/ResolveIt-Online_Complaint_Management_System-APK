// Simple storage utility for web/mobile
class SecureStorage {
  static async set(key: string, value: any): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  }

  static async get(key: string): Promise<any> {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  }

  static async clearAll(): Promise<void> {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }

  static async getUserData(): Promise<any> {
    return this.get('userData');
  }

  static async setUserData(data: any): Promise<void> {
    return this.set('userData', data);
  }

  static async getOfflineComplaints(): Promise<any[]> {
    return this.get('offlineComplaints') || [];
  }

  static async setOfflineComplaints(complaints: any[]): Promise<void> {
    return this.set('offlineComplaints', complaints);
  }
}

export default SecureStorage;
