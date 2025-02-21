const { default: mongoose } = require('mongoose');
const Message = require('../models/MessageModel.js');

// Send Message
exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    // Check if sender and receiver are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(receiver)) {
      return res.status(400).json({ error: 'Invalid sender or receiver ID' });
    }

    const senderId = new mongoose.Types.ObjectId(sender);
    const receiverId = new mongoose.Types.ObjectId(receiver);

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content
    });

    await message.save();
    res.status(200).json(message);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Message validation failed" });
  }
};

// Get Messages
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch messages for a user
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
    .populate('sender', 'firstName lastName email')
    .populate('receiver', 'firstName lastName email');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error });
  }
};
