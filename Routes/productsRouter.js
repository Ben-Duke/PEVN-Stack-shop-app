const express = require('express')
const router = express.Router();
const productController = require('../Controllers/products.server.controller') 

router.get('/:id', (req, res,) =>{
    productController.getProduct(req.params.id, req, res);
})

router.get('/', (req, res) =>{
    productController.getProducts(req, res);
    
})

router.post("/", (req, res) => {
    productController.insert(req, res);
})

module.exports = router;