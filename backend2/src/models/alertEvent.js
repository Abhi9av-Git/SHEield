const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlertEventSchema = new Schema(
    {
        // Link to the user who triggered the alert
        userId: {
          type: Schema.Types.Mixed, // Allow both ObjectId and String for flexibility
          required: true,
          index: true,
      },
        // All the data received from the Gemini analysis
        geminiAnalysis: {
            threatDetected: { type: Boolean, required: true },
            confidence: { type: Number, required: true },
            detectedSounds: [String],
            detectedKeywords: [String],
            analysis: { type: String, required: true }, // This is the 'description'
            recommendedAction: String,
            severity: { type: String, required: true, trim: true },
            analyzedFile: { type: String, required: true }, // This is the 'audio file'
        },
        audioUrl: { // Add a dedicated field for the audio URL
            type: String,
            required: true,
        },
        // User's location at the time of the alert
        location: {
            type: {
                type: String,
                enum: ['Point'], // GeoJSON type
                required: true,
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
        // The status of the alert (e.g., has it been handled?)
        status: {
            type: String,
            enum: ['new', 'acknowledged', 'resolved', 'false_alarm'],
            default: 'new',
        },
        // To keep track of which contacts were notified for this alert
        notifiedContacts: [{
            type: Schema.Types.ObjectId,
            ref: 'Contact'
        }]
    },
    {
        timestamps: true, // Adds 'createdAt' and 'updatedAt' fields
        versionKey: false,
    }
);

// Create a 2dsphere index for efficient geospatial queries (e.g., "find alerts within 5km")
AlertEventSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('AlertEvent', AlertEventSchema);