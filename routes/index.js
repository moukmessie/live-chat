const express = require('express');
const router = express.Router();
const chatCtrl = require('../controllers/chatController');

/* GET home page. */
router.get('/', chatCtrl.index);

module.exports = router;
