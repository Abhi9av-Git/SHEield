// Configuration settings for the SHIeld application
// This file centralizes all configuration variables
require('dotenv').config();

module.exports = {
  // Server configuration
  server: {
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV || 'development',
  },

  // Database configuration
  mongodb: {
    uri: process.env.MONGODB_URI, // 👈 CORRECTED LINE
  },

  // API Keys
  apiKeys: {
    gemini: process.env.GEMINI_API_KEY, // 👈 CORRECTED LINE
  },

  // Twilio Configuration
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },

  // Cloudinary Configuration
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // Emergency settings
  emergency: {
    responseTimeout: 30000,
    maxNotificationRetries: 3,
  },
};