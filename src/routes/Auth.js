const express = require('express');
const UserModel = require('../models/user.model.js');
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
require("dotenv").config()
var Auth = express.Router();

Auth.use(cookieParser());
//user Registration for admin and user
Auth.post('/signup', async(req, res)=> {
    const{fullname,email,password}=req.body;
    let role;
    if(email.includes("@masaischool.com")){
      role="admin"
    }
    else{
      role="user"
    }
    try {
        const password_hash = await argon2.hash(password)
        let newUser= new UserModel({fullname,email,password:password_hash,role});
        await newUser.save();
        res.send({status:"signing up successfully"});
    } catch (error) {
        res.send(error.message)
    }
});

Auth.post('/login',async(req,res)=>{
   const{email,password}=req.body;
   let role;
    if(email.includes("@masaischool.com")){
      role="admin"
    }
    else{
      role="user"
    }
   try {
       let exist = await UserModel.findOne({email});
       if(exist){
          let exist1 = await argon2.verify(exist.password,password);
          if(exist1){
            const deatils = jwt.sign({_id:exist._id,name:exist.name,email:exist.email,username:exist.username},`${process.env.KEY}`,{expiresIn:"5m"});
            res.send({status:"Login Successful",token:deatils,user:exist._id,role:role})
          }
          else{
            res.send({status:"Invalid Credentials",token:null})
          }
       }
       else{
        res.send({status:"user not found",token:null})
       }
   } catch (error) {
      res.send(error.message)
   }
})

module.exports = Auth;
