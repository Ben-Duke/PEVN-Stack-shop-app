const { Pool } = require('pg');

let pool = null

exports.createPool = async function(){
    pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    }) 
}    

exports.getPool = function(){
    return pool;
}