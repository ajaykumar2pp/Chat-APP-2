const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middlewares/auth.middleware')


// Chat GET Route
router.get('/', auth, chatController.chatPage);





module.exports = router;