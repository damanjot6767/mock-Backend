var express = require('express');
const UserModel = require('../models/user.model.js');
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
require("dotenv").config()
var Auth = express.Router();

Auth.use(cookieParser());
//user Registration
Auth.post('/register', async(req, res)=> {
    const{name,email,username,password}=req.body;
    try {
        const password_hash = await argon2.hash(password)
        let newUser= new UserModel({name,email,username,password:password_hash});
        await newUser.save();
        res.send("registration complete");
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
            res.cookie(deatils);
            res.send({status:true,details:deatils})
          }
          else{
            res.send("your details are incorrect")
          }
       }
       else{
        res.send("user not found")
       }
   } catch (error) {
      res.send(error.message)
   }
})

module.exports = Auth;
