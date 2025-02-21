const express = require('express');
const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
const messageController = require('../controllers/messageController');

// Send message
router.post('/send', messageController.sendMessage);

// Get messages for a user
router.get('/:userId', messageController.getMessages);

module.exports = router;
