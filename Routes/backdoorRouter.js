const express = require('express');
const router = express.Router();

router.get("/", async (req, res, next) => {
    console.log("/backdoor, endpoint hit")
    const { Pool } = require('pg');
    dbres = ''
    const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    })    
        pool.query('SELECT * From product', (err, dbres) => {
            
            res.send(dbres.rows)
        }) 
        
        

})

module.exports = router;