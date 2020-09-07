const express = require('express');
const router = express.Router();
const userModel = require('../Models/user.server.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(512);
const helper = require('../Config/helpers');

function validateUserDetails(user_details){
    error_object = []

    if (!helper.validateString(user_details[0])){
        error_flag = true
        error_object.push({"FirstNameError":"First name "
        +"contains non alpha characters"})
    }
    if (!helper.validateString(user_details[1])){
        error_flag = true
        error_object.push({"LastNameError":"Last name "
        +"contains non alpha characters"})
    }
    
    if (!helper.validatePhone(user_details[2])){
        error_flag = true
        error_object.push({"PhoneError":"Phone "
        +"format not correct please check and try again"})
    }
    if (!helper.vaildateEmail(user_details[3])){
        error_flag = true
        error_object.push({"EmailError":"Email "
        +"format not correct please check and try again"})
    }
    if(user_details.legnth > 4){
        if(!helper.validateToken(user_details[4])){
            error_flag = true
            error_object.push({"TokenError":"Token "
        +"is not correct please check and try again"})
        }
    }
    
    return error_object
}
function validateUpdateUserDetails(user_details){
    error_object = []
    if (!helper.validateUserId(user_details["user_id"])){
        error_flag = true
        error_object.push({"UserIdError":"UserId "
        +"contains non numeric characters"})
    }
    if (!helper.validateString(user_details['fname'])){
        error_flag = true
        error_object.push({"FirstNameError":"First name "
        +"contains non alpha characters"})
    }
    if (!helper.validateString(user_details['lname'])){
        error_flag = true
        error_object.push({"LastNameError":"Last name "
        +"contains non alpha characters"})
    }
    
    if (!helper.validatePhone(user_details['phone'])){
        error_flag = true
        error_object.push({"PhoneError":"Phone "
        +"format not correct please check and try again"})
    }
    if (!helper.vaildateEmail(user_details['email'])){
        error_flag = true
        error_object.push({"EmailError":"Email "
        +"format not correct please check and try again"})
    }
    
    if(!helper.validateToken(user_details['token'])){
            error_flag = true
            error_object.push({"TokenError":"Token "
        +"is not correct please check and try again"})
    }

    if (!helper.validateUserId(user_details["address_id"])){
        error_flag = true
        error_object.push({"AddressIdError":"Address_id "
        +"contains non numeric characters"})
    }
    return error_object
}

exports.register = function async (req, res) {
    error_flag = false;
    error_object = []
    user_details = req.body;
    user_values = [];
    user_values.push(user_details['fname']);
    user_values.push(user_details['lname']);
    user_values.push(Number(user_details['phone']));
    user_values.push(user_details['email']);
    user_values.push(Number(user_details['address_id']));

    //Check details first
    error_object = validateUserDetails(user_values)
    if(error_object.length > 0){
        error_flag = true
    }
    if (error_flag){
        res.status(401);
        res.json(error_object);
    }
    else{
    //After checking details hash password then attempt to insert user
    try {
        bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user_details['password'], salt, function(err, hash) {
            // Store hash in your password DB.
            user_values.push(hash)
            userModel.insertUser(user_values,req,res, (results)=>{
                console.log(user_values)
                try {
                    console.log(results)
                    if(results.rows['error']== "_bt_check_unique"){
                        res.json({"error":"Email already exists"}).status(401)
                    }else{
                        res.status(201)
                        res.json({"Success":"Account created"});
                    }
                    
                } catch (error) {
                    console.log(error)
                    res.json({"error":"User already registered with that email"}).status(400)
                }
                
            });
        });
    });
    } catch (error) {
        res.sendStatus(500)
        res.send(error)
    }
    }
}

exports.login =  async function (req, res){
    // console.log("Body is ")
    // console.log(req.body)
    // console.log("----")
    if(req.body == {}){
        res.send("Bad formed request").status(400);
    }
    else{
        userModel.login(req.body['email'],req,res, async (result)=>{
        
            try {
                user_id=result.rows[0]['user_id'];
                bcrypt.compare(req.body['password'], result.rows[0]['user_password'], function(err, hashcheck) {  
                    if(hashcheck){
                        uidgen.generate((err, token) => {
                        if (err) throw err;
                        userModel.saveToken(token, req.body['email'], (dbres)=>{
                            if(dbres!=[]){
                                console.log(dbres)
                                res.json({"id":user_id, "token":token});
                            }else{
                                res.send("Issue in saveToken")
                            }     
                        })
                      });
                    }
                    else{
                        res.status(401)
                        res.json({"error":"Credintails incorrect"})
                    }
                });
            } catch (error) {
                res.sendStatus(500)
                res.send(error)
            }
        });
    }

    
    
}

exports.logout =  async function (req, res){
    try {
        if(helper.validateToken(req.body['token'])){
            if(helper.validateUserId(req.body['user_id'])){
                userModel.clearToken(req.body['user_id'], req.body['token'], async function(result){
                    res.json({"logout":"Successful"})
                });
            }else{
                res.json({"Error":"Id format is wrong"})
            }   
    }
    else{
        res.json({"Error":"Token format is wrong"})
    }
    } catch (error) {
        res.sendStatus(500)
        res.send(error)
    }
   
    
}

exports.checkUser =  async function (req, res){
    //Check email exists
    userModel.authUser(req.body['email'],req,res, async (result)=>{
        try {
           pass 
        } catch (error) {
            res.sendStatus(500)
            res.send(error)
        }
    });
    
}
exports.updateUser = async function (req, res){
    error_flag = false;
    error_object = []
    user_details = req.body;
    user_values = {};
    user_values["user_id"] = Number(user_details['user_id']);
    user_values["fname"] = user_details['fname'];
    user_values["name"] = user_details['lname'];
    user_values["phone"] = Number(user_details['phone']);
    user_values["email"] = user_details['email'];
    user_values["token"] = user_details['token'];
    user_values["address_id"] = Number(user_details['address_id']);
    error_object = validateUpdateUserDetails(user_values)
    if(error_object.length > 0){
        error_flag = true
    }
    if (error_flag) {
        res.status(401);
        res.json(error_object);
    }
    else {
        userModel.updateUser(Object.values(user_details), async function(result){
            console.log(result)
            if(result['rowCount']==0){
                res.send("Nothing changed")
            }
            else{
                res.send("Updated user");
            }
            
        });
        
        
    }
}

exports.insertAddress = async function (req, res){
    /*calls a select statement first to check if it exists
    if it does returns the address id if not inserts it then
    returns the address id of the new address.
    */
   try {
    street = req.body['street'].toUpperCase();
    town = req.body['town'].toUpperCase();
  
    postcode = req.body['postcode'].toUpperCase();
    
   } catch (error) {
       console.log(error)
   }
    
    error_flag = false;
    errorObject = {}
    if(!helper.validateStringWithNumbers(street)){
        error = true;
        errorObject["StreetError"] ="Street can only contain numbers and letters";
    }
    if(!helper.validateString(town)){
        error = true;
        errorObject["TownError"]="Town can only contain letters";
    }
    if(!helper.validateStringWithNumbers(postcode)){
        error = true;
        errorObject["PostcodeError"]="Postcode can only contain numbers and letters";
    }
    if(error_flag){
        res.status(400)
        res.json(error_object);
    }
    else{
        //Select check first
        userModel.checkAddress(street, town, postcode, async function(callbackres){
            if(callbackres.rows[0] != undefined){
                res.json({"address_id": callbackres.rows[0]['address_id']})
            }
            else{
                //insert as the address does not exist
                userModel.insertAddress(street, town, postcode, async function(result){
                    console.log(result)
                    res.json({"address_id": result.rows[0]['address_id']})
                    })
            }
        })
        
    }
}

exports.createOrder = async function (req, res){
    error_flag = false;
    user_id = req.body.user_id;
    if(!helper.validateUserId(user_id)){error_flag=true}
    token = req.body.token;
    if(!helper.validateToken(token)){error_flag=true}
    user_basket = req.body.basket;
    message = '';
    if(error_flag){
        res.send("user_id or token is invalid").status(400)
    }
    else{
        userModel.checkUserLoggedIn([user_id,token],async function(checkRes){
        console.log(checkRes)
            if (checkRes.rows.length > 0){
            userModel.createOrder([user_id], async function(result){
            
            order_id = result.rows[0].order_id;
            for(i = 0; i < user_basket.length; i++ ){
                values = Object.values(user_basket[i])
                values.push(order_id)
                try {
                    userModel.addToOrder(values, function(done){
                        if(done.error){
                            console.log("errored")
                            error_flag = true
                            message = done.error
                        }
                    });
                } catch (error) {
                    error_flag = true
                    message = error
                }
                  
            }  
            if(error_flag){
                console.log("Error")
                res.status(400)
                res.send(message)
            }else{
                res.status(201)
                res.json({"order_id":order_id})
            }
        })     
        }
        else{
            res.send("User is not signed in or has wrong credentials").status(401)
        }
        
        })
    }
    

    
}

exports.getOrders = async function (req, res){
    error_flag = false;
    user_id = req.body.user_id;
    if(!helper.validateUserId(user_id)){error_flag=true}
    token = req.body.token;
    if(!helper.validateToken(token)){error_flag=true}
    message = '';
    if(error_flag){
        res.send("user_id or token is invalid").status(400)
    }
    else{
        userModel.myorders([user_id,token],async function(result){
            console.log(result.rows)
            res.json(result.rows)
        })
    }   
}