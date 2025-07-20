import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  // Device identification
  deviceId: {
    type: String,
    required: true,
    unique: true
  },
  
  // Device information
  model: {
    type: String,
    required: true
  },
  
  manufacturer: {
    type: String,
    default: 'Unknown'
  },
  
  platform: {
    type: String,
    required: true,
    enum: ['android', 'ios', 'web', 'unknown']
  },
  
  // System information
  osVersion: {
    type: String,
    default: 'Unknown'
  },
  
  appVersion: {
    type: String,
    default: '1.0.0'
  },
  
  // User agent and browser info (for web)
  userAgent: {
    type: String,
    default: ''
  },
  
  browser: {
    type: String,
    default: ''
  },
  
  browserVersion: {
    type: String,
    default: ''
  },
  
  // Screen information
  screenWidth: {
    type: Number,
    default: 0
  },
  
  screenHeight: {
    type: Number,
    default: 0
  },
  
  pixelRatio: {
    type: Number,
    default: 1
  },
  
  // Network information
  connectionType: {
    type: String,
    default: 'unknown'
  },
  
  // User association (optional)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Device status
  isActive: {
    type: Boolean,
    default: true
  },
  
  lastSeen: {
    type: Date,
    default: Date.now
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
deviceSchema.index({ deviceId: 1 });
deviceSchema.index({ userId: 1 });
deviceSchema.index({ platform: 1 });
deviceSchema.index({ lastSeen: -1 });

// Pre-save middleware to update lastSeen
deviceSchema.pre('save', function(next) {
  this.lastSeen = new Date();
  this.updatedAt = new Date();
  next();
});

// Static method to find or create device
deviceSchema.statics.findOrCreate = async function(deviceData) {
  try {
    let device = await this.findOne({ deviceId: deviceData.deviceId });
    
    if (!device) {
      device = new this(deviceData);
      await device.save();
    } else {
      // Update existing device with new information
      Object.assign(device, deviceData);
      device.lastSeen = new Date();
      await device.save();
    }
    
    return device;
  } catch (error) {
    throw error;
  }
};

// Instance method to update last seen
deviceSchema.methods.updateLastSeen = async function() {
  this.lastSeen = new Date();
  return await this.save();
};

const Device = mongoose.model('Device', deviceSchema);

export default Device; 