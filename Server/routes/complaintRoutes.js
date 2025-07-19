const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import complaint controller (we'll need to convert to CommonJS)
// For now, let's include the controller logic directly

const Complaint = require('../models/Complaint');
const { authenticateUser } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 3 // Maximum 3 files
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and PDF files are allowed.'));
    }
  }
});

// Create a new complaint
router.post('/', authenticateUser, upload.array('attachments', 3), async (req, res) => {
  try {
    const { title, description, category, priority = 'medium' } = req.body;
    const userEmail = req.user?.email;

    // Validate required fields
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Title, description, and category are required' });
    }

    // Create complaint
    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      userEmail
    });

    // Handle file attachments if any
    if (req.files && req.files.length > 0) {
      complaint.attachments = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path
      }));
    }

    await complaint.save();

    res.status(201).json({
      message: 'Complaint created successfully',
      complaint: {
        id: complaint._id,
        title: complaint.title,
        description: complaint.description,
        category: complaint.category,
        priority: complaint.priority,
        status: complaint.status,
        createdAt: complaint.createdAt,
        attachments: complaint.attachments
      }
    });

  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({ error: 'Failed to create complaint' });
  }
});

// Get all complaints for a user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const userEmail = req.user?.email;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count
    const totalComplaints = await Complaint.countDocuments({ userEmail });

    // Get complaints with pagination
    const complaints = await Complaint.find({ userEmail })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const totalPages = Math.ceil(totalComplaints / limit);

    res.status(200).json({
      complaints,
      total: totalComplaints,
      page,
      totalPages
    });

  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// Get a specific complaint by ID
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user?.email;

    const complaint = await Complaint.findOne({ 
      _id: id, 
      userEmail 
    }).select('-__v');

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.status(200).json({ complaint });

  } catch (error) {
    console.error('Get complaint by ID error:', error);
    res.status(500).json({ error: 'Failed to fetch complaint' });
  }
});

// Update a complaint
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user?.email;
    const { title, description, category, priority } = req.body;

    // Find complaint
    const complaint = await Complaint.findOne({ 
      _id: id, 
      userEmail 
    });

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    // Check if complaint can be updated (only pending complaints)
    if (complaint.status !== 'pending') {
      return res.status(400).json({ 
        error: 'Only pending complaints can be updated' 
      });
    }

    // Update fields
    if (title) complaint.title = title;
    if (description) complaint.description = description;
    if (category) complaint.category = category;
    if (priority) complaint.priority = priority;

    await complaint.save();

    res.status(200).json({
      message: 'Complaint updated successfully',
      complaint: {
        id: complaint._id,
        title: complaint.title,
        description: complaint.description,
        category: complaint.category,
        priority: complaint.priority,
        status: complaint.status,
        updatedAt: complaint.updatedAt
      }
    });

  } catch (error) {
    console.error('Update complaint error:', error);
    res.status(500).json({ error: 'Failed to update complaint' });
  }
});

// Delete a complaint
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user?.email;

    const complaint = await Complaint.findOne({ 
      _id: id, 
      userEmail 
    });

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    // Check if complaint can be deleted (only pending complaints)
    if (complaint.status !== 'pending') {
      return res.status(400).json({ 
        error: 'Only pending complaints can be deleted' 
      });
    }

    await Complaint.deleteOne({ _id: id });

    res.status(200).json({ message: 'Complaint deleted successfully' });

  } catch (error) {
    console.error('Delete complaint error:', error);
    res.status(500).json({ error: 'Failed to delete complaint' });
  }
});

module.exports = router;
