import express from 'express';
import {
  registerDevice,
  updateDeviceHeartbeat,
  getDevice,
  getAllDevices,
  getDevicesByUser,
  updateDevice,
  deactivateDevice,
  getDeviceStats
} from '../controllers/deviceController.js';

const router = express.Router();

// Device registration and management
router.post('/register', registerDevice);
router.put('/heartbeat/:deviceId', updateDeviceHeartbeat);

// Device retrieval
router.get('/:deviceId', getDevice);
router.get('/', getAllDevices);
router.get('/user/:userId', getDevicesByUser);

// Device statistics
router.get('/stats/overview', getDeviceStats);

// Device updates and management
router.put('/:deviceId', updateDevice);
router.delete('/:deviceId', deactivateDevice);

export default router; 