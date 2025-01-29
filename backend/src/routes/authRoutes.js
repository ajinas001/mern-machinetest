const express = require('express');
const { loginUser } = require('../controller/authController');


const router = express.Router();

// Route: POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;
