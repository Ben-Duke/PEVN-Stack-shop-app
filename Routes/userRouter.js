const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.server.controller');

router.post('/register', (req, res) => {
    userController.register(req, res);
})

router.post('/login', (req, res) => {
    userController.authUser(req, res);
})
module.exports = router;