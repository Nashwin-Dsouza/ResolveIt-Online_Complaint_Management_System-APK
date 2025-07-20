import Device from '../models/Device.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Register or update device information
 * POST /api/devices/register
 */
export const registerDevice = async (req, res) => {
  try {
    const {
      model,
      manufacturer,
      platform,
      osVersion,
      appVersion,
      userAgent,
      browser,
      browserVersion,
      screenWidth,
      screenHeight,
      pixelRatio,
      connectionType,
      userId
    } = req.body;

    // Generate a unique device ID if not provided
    let deviceId = req.body.deviceId;
    if (!deviceId) {
      deviceId = uuidv4();
    }

    // Validate required fields
    if (!model || !platform) {
      return res.status(400).json({
        success: false,
        error: 'Model and platform are required'
      });
    }

    // Prepare device data
    const deviceData = {
      deviceId,
      model,
      manufacturer: manufacturer || 'Unknown',
      platform: platform.toLowerCase(),
      osVersion: osVersion || 'Unknown',
      appVersion: appVersion || '1.0.0',
      userAgent: userAgent || '',
      browser: browser || '',
      browserVersion: browserVersion || '',
      screenWidth: screenWidth || 0,
      screenHeight: screenHeight || 0,
      pixelRatio: pixelRatio || 1,
      connectionType: connectionType || 'unknown',
      userId: userId || null
    };

    // Find or create device
    const device = await Device.findOrCreate(deviceData);

    res.status(200).json({
      success: true,
      message: 'Device registered successfully',
      data: {
        deviceId: device.deviceId,
        model: device.model,
        platform: device.platform,
        lastSeen: device.lastSeen
      }
    });

  } catch (error) {
    console.error('Device registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to register device'
    });
  }
};

/**
 * Update device last seen timestamp
 * PUT /api/devices/heartbeat
 */
export const updateDeviceHeartbeat = async (req, res) => {
  try {
    const { deviceId } = req.params;

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        error: 'Device ID is required'
      });
    }

    const device = await Device.findOne({ deviceId });
    
    if (!device) {
      return res.status(404).json({
        success: false,
        error: 'Device not found'
      });
    }

    await device.updateLastSeen();

    res.status(200).json({
      success: true,
      message: 'Device heartbeat updated',
      data: {
        deviceId: device.deviceId,
        lastSeen: device.lastSeen
      }
    });

  } catch (error) {
    console.error('Device heartbeat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update device heartbeat'
    });
  }
};

/**
 * Get device information
 * GET /api/devices/:deviceId
 */
export const getDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const device = await Device.findOne({ deviceId });
    
    if (!device) {
      return res.status(404).json({
        success: false,
        error: 'Device not found'
      });
    }

    res.status(200).json({
      success: true,
      data: device
    });

  } catch (error) {
    console.error('Get device error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get device information'
    });
  }
};

/**
 * Get all devices (with pagination)
 * GET /api/devices
 */
export const getAllDevices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const platform = req.query.platform;
    const isActive = req.query.isActive;

    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (platform) query.platform = platform;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const devices = await Device.find(query)
      .sort({ lastSeen: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'firstName lastName email');

    const total = await Device.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        devices,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get all devices error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get devices'
    });
  }
};

/**
 * Get devices by user
 * GET /api/devices/user/:userId
 */
export const getDevicesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const devices = await Device.find({ userId })
      .sort({ lastSeen: -1 });

    res.status(200).json({
      success: true,
      data: devices
    });

  } catch (error) {
    console.error('Get devices by user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user devices'
    });
  }
};

/**
 * Update device information
 * PUT /api/devices/:deviceId
 */
export const updateDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated
    delete updateData.deviceId;
    delete updateData.createdAt;

    const device = await Device.findOneAndUpdate(
      { deviceId },
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!device) {
      return res.status(404).json({
        success: false,
        error: 'Device not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Device updated successfully',
      data: device
    });

  } catch (error) {
    console.error('Update device error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update device'
    });
  }
};

/**
 * Deactivate device
 * DELETE /api/devices/:deviceId
 */
export const deactivateDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const device = await Device.findOneAndUpdate(
      { deviceId },
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!device) {
      return res.status(404).json({
        success: false,
        error: 'Device not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Device deactivated successfully',
      data: device
    });

  } catch (error) {
    console.error('Deactivate device error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to deactivate device'
    });
  }
};

/**
 * Get device statistics
 * GET /api/devices/stats/overview
 */
export const getDeviceStats = async (req, res) => {
  try {
    const totalDevices = await Device.countDocuments();
    const activeDevices = await Device.countDocuments({ isActive: true });
    const androidDevices = await Device.countDocuments({ platform: 'android' });
    const iosDevices = await Device.countDocuments({ platform: 'ios' });
    const webDevices = await Device.countDocuments({ platform: 'web' });

    // Get devices active in last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentDevices = await Device.countDocuments({
      lastSeen: { $gte: last24Hours }
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalDevices,
        active: activeDevices,
        recent: recentDevices,
        byPlatform: {
          android: androidDevices,
          ios: iosDevices,
          web: webDevices
        }
      }
    });

  } catch (error) {
    console.error('Get device stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get device statistics'
    });
  }
}; 