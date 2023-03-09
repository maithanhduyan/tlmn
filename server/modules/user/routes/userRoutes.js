const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');

const router = express.Router();

// Định nghĩa router cho trang chủ
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/register.html'));
  });

router.post('/register', userController.register);

module.exports = router;
