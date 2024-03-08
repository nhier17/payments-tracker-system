const express = require('express');
const router = express.Router();
//controllers
const {
    registerUser,
    login,
    logout
} = require('../controllers/UserControllers');

router.post('/register', registerUser);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;

