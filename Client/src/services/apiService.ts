import NetworkUtils from '../utils/networkUtils';
import SecureStorage from '../utils/secureStorage';
import config from '../../config';

/**
 * API Service for backend integration
 */
class ApiService {
  private baseURL: string;

  constructor() {
    // Use Render backend URL from config
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || config.API_URL;
  }

  /**
   * Get headers with authentication if available
   */
  private async getHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = await SecureStorage.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API responses and errors
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }

    return await response.json();
  }

  // Authentication APIs
  /**
   * Send OTP for login/signup
   */
  async sendOTP(email: string, type: 'login' | 'signup', additionalData?: any): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/otp/send`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify({ email, type, ...additionalData })
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  }

  /**
   * Verify OTP
   */
  async verifyOTP(email: string, otp: string, type: 'login' | 'signup'): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/otp/verify`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify({ email, otp, type })
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  }

  /**
   * Resend OTP
   */
  async resendOTP(email: string, type: 'login' | 'signup'): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/otp/resend`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify({ email, type })
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Resend OTP error:', error);
      throw error;
    }
  }

  /**
   * Complete user login
   */
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/auth/login`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify({ email, password })
      });

      const data = await this.handleResponse(response);
      
      // Store auth token if provided
      if (data.token) {
        await SecureStorage.setAuthToken(data.token);
      }

      // Store user data
      if (data.user) {
        await SecureStorage.setUserData(data.user);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Complete user signup
   */
  async signup(userData: {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    password: string;
  }): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/auth/signup`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify(userData)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Clear all stored data
      await SecureStorage.clearAll();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Complaint APIs
  /**
   * Create a new complaint
   */
  async createComplaint(complaintData: {
    title: string;
    description: string;
    category: string;
    priority?: 'low' | 'medium' | 'high';
    attachments?: File[];
  }): Promise<any> {
    try {
      // Check if online
      if (!NetworkUtils.getNetworkStatus()) {
        // Save offline and return mock response
        await NetworkUtils.saveOfflineComplaint(complaintData);
        return {
          id: `offline_${Date.now()}`,
          ...complaintData,
          status: 'pending',
          createdAt: new Date().toISOString(),
          isOffline: true
        };
      }

      // Create FormData for file uploads
      const formData = new FormData();
      formData.append('title', complaintData.title);
      formData.append('description', complaintData.description);
      formData.append('category', complaintData.category);
      if (complaintData.priority) {
        formData.append('priority', complaintData.priority);
      }

      // Add attachments
      if (complaintData.attachments) {
        complaintData.attachments.forEach((file, index) => {
          formData.append(`attachments`, file);
        });
      }

      const token = await SecureStorage.getAuthToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/complaints`, {
        method: 'POST',
        headers,
        body: formData
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Create complaint error:', error);
      
      // If online but request failed, try to save offline
      if (NetworkUtils.getNetworkStatus()) {
        await NetworkUtils.saveOfflineComplaint(complaintData);
      }
      
      throw error;
    }
  }

  /**
   * Get user's complaints
   */
  async getComplaints(page: number = 1, limit: number = 10): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(
        `${this.baseURL}/api/complaints?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: await this.getHeaders()
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Get complaints error:', error);
      
      if (!NetworkUtils.getNetworkStatus()) {
        // Return offline complaints if available
        const offlineComplaints = await SecureStorage.getOfflineComplaints();
        return {
          complaints: offlineComplaints,
          total: offlineComplaints.length,
          page: 1,
          totalPages: 1,
          isOffline: true
        };
      }
      
      throw error;
    }
  }

  /**
   * Get complaint by ID
   */
  async getComplaintById(id: string): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/complaints/${id}`, {
        method: 'GET',
        headers: await this.getHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Get complaint by ID error:', error);
      throw error;
    }
  }

  /**
   * Update complaint
   */
  async updateComplaint(id: string, updateData: any): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/complaints/${id}`, {
        method: 'PUT',
        headers: await this.getHeaders(),
        body: JSON.stringify(updateData)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Update complaint error:', error);
      throw error;
    }
  }

  /**
   * Delete complaint
   */
  async deleteComplaint(id: string): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/complaints/${id}`, {
        method: 'DELETE',
        headers: await this.getHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Delete complaint error:', error);
      throw error;
    }
  }

  // File Upload APIs
  /**
   * Upload file
   */
  async uploadFile(file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = await SecureStorage.getAuthToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/upload`, {
        method: 'POST',
        headers,
        body: formData
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Upload file error:', error);
      throw error;
    }
  }

  /**
   * Get user profile
   */
  async getUserProfile(): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/auth/profile`, {
        method: 'GET',
        headers: await this.getHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(profileData: any): Promise<any> {
    try {
      const response = await NetworkUtils.fetchWithRetry(`${this.baseURL}/api/auth/profile`, {
        method: 'PUT',
        headers: await this.getHeaders(),
        body: JSON.stringify(profileData)
      });

      const data = await this.handleResponse(response);
      
      // Update stored user data
      await SecureStorage.setUserData(data.user);

      return data;
    } catch (error) {
      console.error('Update user profile error:', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await SecureStorage.getAuthToken();
    return !!token;
  }

  /**
   * Get stored user data
   */
  async getStoredUserData(): Promise<any> {
    return await SecureStorage.getUserData();
  }
}

// Create singleton instance
const apiService = new ApiService();
export default apiService;
