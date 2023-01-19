const express = require('express');
const UserModel = require('../models/user.model.js');
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
require("dotenv").config()
var Auth = express.Router();

Auth.use(cookieParser());
//user Registration
Auth.post('/signup', async(req, res)=> {
    const{name,email,username,password}=req.body;
    try {
        const password_hash = await argon2.hash(password)
        let newUser= new UserModel({name,email,username,password:password_hash});
        await newUser.save();
        res.send("signing up successfully");
    } catch (error) {
        res.send(error.message)
    }
});

Auth.post('/login',async(req,res)=>{
   const{email,password}=req.body;
   try {
       let exist = await UserModel.findOne({email});
       if(exist){
          let exist1 = await argon2.verify(exist.password,password);
          if(exist1){
            const deatils = jwt.sign({_id:exist._id,name:exist.name,email:exist.email,username:exist.username},`${process.env.KEY}`,{expiresIn:"5m"});
            res.send({status:"Login Successful",token:deatils,user:exist._id})
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
