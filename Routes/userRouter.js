const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.server.controller');

router.post('/register', (req, res) => {
    userController.register(req, res);
})

router.post('/login', (req, res) => {
    userController.login(req, res);
})

router.put('/updateuser', (req, res)=> {
    userController.updateUser(req, res);
})

router.post('/logout', (req, res) => {
    userController.logout(req, res);
})
router.post('/newaddress', (req, res) => {
    userController.insertAddress(req,res);
})

router.post('/order', (req, res) => {
    userController.createOrder(req,res);
})

router.post('/orderbyid', (req, res) => {
    userController.getOrder(req,res);
})

router.post('/myorders', (req, res) => {
    userController.getOrders(req, res);
})

module.exports = router;