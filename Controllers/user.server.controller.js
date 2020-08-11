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
    console.log(user_details)
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
    //Phone check
    if (!helper.vaildateEmail(user_details[3])){
        error_flag = true
        error_object.push({"EmailError":"Email "
        +"format not correct please check and try again"})
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
    user_values.push(user_details['phone']);
    user_values.push(user_details['email']);

    //Check details first
    console.log("values " + validateUserDetails(user_values))
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
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user_details['password'], salt, function(err, hash) {
            // Store hash in your password DB.
            user_values.push(hash)
            userModel.insertUser(user_values,req,res, (results)=>{
                if(results['error']== "_bt_check_unique"){
                    res.status(401).json({"error":"Email already exists"})
                }else{
                    res.status(201)
                    res.json({"Success":"Account created"});
                }
                
            });
        });
    });
    }
}

exports.login =  async function  (req, res){
    userModel.login(req.body['email'],req,res, async (result)=>{
        try {
            bcrypt.compare(req.body['password'], result[0]['user_password'], function(err, hashcheck) {  
                if(hashcheck){
                    uidgen.generate((err, token) => {
                    if (err) throw err;
                    userModel.saveToken(token, req.body['email'], (dbres)=>{
                        if(dbres!=[]){
                            res.json({"token":token});
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

exports.logout =  async function  (req, res){
    userModel.authUser(req.body['email'],req,res, async (result)=>{
        try {
            bcrypt.compare(req.body['password'], result[0]['user_password'], function(err, hashcheck) {  
                if(hashcheck){
                    uidgen.generate((err, token) => {
                    if (err) throw err;
                    userModel.saveToken('', req.body['email'], (dbres)=>{
                        if(dbres!=[]){
                            res.json({'message':"Logged out"});
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
exports.checkUser =  async function  (req, res){
    //Check email exists
    userModel.authUser(req.body['email'],req,res, async (result)=>{
        try {
            
            
        } catch (error) {
            res.sendStatus(500)
            res.send(error)
        }
    });
    
}