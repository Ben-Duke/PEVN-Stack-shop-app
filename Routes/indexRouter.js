const express = require('express');
const router = express.Router();


router.get("/", (req, res, next) => {
    res.json(["Ben, Duke"]);
})

router.post("/", (req, res,next) =>{
    console.log(req.body)
    res.json("Got it")
})

module.exports = router;