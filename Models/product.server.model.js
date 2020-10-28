const database = require('../Config/database.js');

exports.getProducts= async function (callback){
    pool = database.getPool();
    pool.query('SELECT * From product', (err, res) => {
        if(err != undefined){
            error = {'error':err.routine}
            callback(error);
        }
        else{
            callback(res.rows);
        }
        
    })
}

exports.getProductsPaged= async function (offset, callback){
    pool = database.getPool();
    pool.query('SELECT * From product OFFSET ' + offset + 'LIMIT 9;', (err, res) => {
        if(err != undefined){
            error = {'error':err.routine}
            callback(error);
        }
        else{
            callback(res.rows);
        }
        
    })
}
exports.getProduct = async function (productId,callback){
    pool = database.getPool();
    pool.query('SELECT * From product where product_id = ' + productId, (err, res) => {
        if(err != undefined){
            error = {'error':err.routine}
            callback(error);
        }
        else{
            callback(res.rows);
        }
        
    })
}

exports.insertProduct = async function (values, callback){
    qs = "INSERT INTO product(product_name, product_price, product_type)"
    qs += "VALUES ('" + values[0] + "'," + values [1] +",'"+values[2]+"');"
    
    pool = database.getPool();
    pool.query(qs, (err, res) => {
        if(err != undefined){
            error = {'error':err.routine}
            callback(error);
        }
        else{
            callback(res.rows);
        }
        
    })
}