const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.server.controller');

router.post('/register', (req, res) => {
    userController.register(req, res);
})

router.post('/login', (req, res) => {
    userController.login(req, res);
})

router.post('/logout', (req, res) => {
    userController.logout(req, res);
})
router.post('/newaddress', (req, res) => {
    userController.insertAddress(req,res);
})
module.exports = router;