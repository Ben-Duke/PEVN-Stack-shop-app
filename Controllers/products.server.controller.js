const productModel = require('../Models/product.server.model');

exports.getProduct = async function(id, req ,res){
    productModel.getProduct(id,function(result){
        
        if(result['error'] != undefined){
            res.statusCode = 500;
            res.send(result['error'])
        
        }
        else if(result.length == 0){
            res.statusCode = 200;
            res.send("Nothing matching that id was found.");
        }
        else{
            
            res.json(result)
        }
    })
}

exports.getProducts = async function(req, res){
    productModel.getProducts(function(result){
        products = {
            "products": []
        }
        if(result['error'] != undefined){
            res.statusCode = 500;
            res.send(result['error'])
        }else{
            for (i = 0; i < Object.values(result).length; i++){
                products.products.push(result[i]);
            }
            res.json(products)
        }
    })
}

exports.insert = async function (req, res){
    
    item = req.body.Item
    values = []
    values.push(item.name)
    values.push(item.price)
    values.push(item.type)
    values.push(item.stock)
    productModel.insertProduct(values, function(result){
        if(result['error'] != undefined){
            res.statusCode = 500;
            res.json({"error":result['error']})
        }else{
            res.send(result);
        }
    })
    
}