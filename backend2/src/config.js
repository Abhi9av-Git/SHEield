// Configuration settings for the SHIeld application
// This file centralizes all configuration variables

module.exports = {
  // Server configuration
  server: {
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV || 'development',
  },

  // Database configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://abhinav31102004_db_user:abh_abh_4545@cluster45.zhfibye.mongodb.net/SHEield',
  },

  // API Keys
  apiKeys: {
    gemini: 'AIzaSyDbMEUepZC7Ng7c2xsHnRaMV3cUlS2MY-0', // Replace with your actual key when deploying
  },

  // Emergency settings
  emergency: {
    // Time (in milliseconds) to wait before considering lack of response a potential emergency
    responseTimeout: 30000,
    // Maximum number of retries for emergency notifications
    maxNotificationRetries: 3,
  },
};
