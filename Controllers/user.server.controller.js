const express = require('express');
const router = express.Router();
const userModel = require('../Models/user.server.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.register = function async (req, res) {

    //Check details first
    user_details = req.body
    console.log(user_details)
    user_values = []
    user_values.push(user_details['fname'])
    user_values.push(user_details['lname'])
    user_values.push(user_details['phone'])
    user_values.push(user_details['email'])

    
    //After checking details hash password then attempt to insert user
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user_details['password'], salt, function(err, hash) {
            // Store hash in your password DB.
            user_values.push(hash)
            console.log(user_values)
            userModel.insertUser(user_values,req,res, (results)=>{
                res.send(results);
            });
        });
    });
    
    
    //after checking insert into the database
   
}

exports.authUser =  async function  (req, res){
    userModel.authUser(req.body['email'],req,res, async (result)=>{
        bcrypt.compare(req.body['password'], result[0]['user_password'], function(err, hashcheck) {  
            res.send(hashcheck)
        });
       
    });
    
}