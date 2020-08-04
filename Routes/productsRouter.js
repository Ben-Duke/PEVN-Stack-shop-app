const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) =>{
    products = {
        "items": []
    }
    products.items.push({"name": "Nerf Gun", "price": 19.99});
    products.items.push({"name": "Nerf Bullets", "price": 5.99});
    res.json(products)
})

router.post("/", (req, res, next) => {
    console.log(req.body.Item);
    res.send("Item received");
})

module.exports = router;