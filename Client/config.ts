// Configuration file for API endpoints
export const config = {
  // Your Render backend URL (primary)
  API_URL: 'https://resolveit-online-complaint-management.onrender.com',
  
  // Fallback local server URL (for testing)
  LOCAL_API_URL: "http://192.168.56.1:5000",
  
  // Use local server for testing OTP
  USE_LOCAL_SERVER: true, // Set to true to use local test server
  
  // Get the active API URL
  getActiveAPIUrl: () => {
    return config.USE_LOCAL_SERVER ? config.LOCAL_API_URL : config.API_URL;
  }
};

export default config; 
