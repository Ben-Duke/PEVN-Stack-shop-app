require('dotenv').config()
const express = require('express');
const database = require('./Config/database');
const app = express();
const bodyParser = require('body-parser');
const index = require('./Routes/indexRouter');
const products = require('./Routes/productsRouter');
const user = require('./Routes/userRouter');

app.use(bodyParser.json());
app.use('/', index);
app.use('/products', products);
app.use('/user', user);

//Handles pages that the server doesnt have and responds with a 404 code
app.get('*', function(req, res){
    res.statusCode = 404;
    res.send("Not found");
})


//Database set up
async function testDataBaseConnection(){
    try {
        console.log("checking database connection")
        await database.createPool();
        await database.getPool().connect();
        console.log("************************")
    } catch (error) {
        console.error("Database is offline");
        process.exit(1)
    }
}

testDataBaseConnection().then(function(){
    console.log("Database works")
    app.listen(process.env.NODE_PORT, () => {
    console.log("Server running on port " + process.env.NODE_PORT)
    })
});