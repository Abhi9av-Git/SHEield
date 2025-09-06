# SHIeld Audio Analysis Module

This module integrates the Google Gemini AI API to analyze audio recordings for potential threats, emergency situations, and keywords.

## Setup Instructions

### 1. Get a Gemini API Key

1. Go to the Google AI Studio: https://makersuite.google.com/app/apikey
2. Create a new API key or use an existing one
3. Copy the API key

### 2. Configure the API Key

**Option 1: Environment Variable (Recommended)**

Set the environment variable in your command prompt/terminal before starting the server:

```bash
# Windows
set GEMINI_API_KEY=your-api-key-here

# Linux/Mac
export GEMINI_API_KEY=your-api-key-here
```

**Option 2: Update the Config File (For Development Only)**

1. Open `src/config.js`
2. Replace `'YOUR_GEMINI_API_KEY'` with your actual API key in the `apiKeys.gemini` property
3. **IMPORTANT**: Never commit this file with the actual API key to version control

### 3. Start the Server

```bash
node src/index.js
```

## Features

- **Real-time Audio Analysis**: Audio is analyzed in real-time as it's received through WebSockets
- **Threat Detection**: Identifies potential emergency situations based on audio content
- **Keyword Recognition**: Detects keywords like "help", "emergency", etc.
- **Sound Analysis**: Recognizes concerning sounds like crashes, physical altercations
- **Automatic Response**: Can trigger emergency contacts based on threat severity

## How It Works

1. Audio chunks are received via WebSocket
2. Each chunk is saved to disk
3. The audio is sent to Google Gemini API for analysis
4. Analysis results are processed and sent back to the client
5. High-severity threats can trigger emergency protocols

## API Response Format

The WebSocket response includes:

```json
{
  "status": "success",
  "filename": "audio_chunk_1234567890_0.webm",
  "analysis": {
    "threatDetected": true|false,
    "confidence": 0.85,
    "detectedKeywords": ["help", "emergency"],
    "detectedSounds": ["crashing", "screaming"],
    "analysis": "Detected potential emergency situation",
    "recommendedAction": "alert emergency contact",
    "severity": "high"
  },
  "dangerMode": true|false
}
```
