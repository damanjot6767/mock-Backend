var express = require('express');
const jwt = require("jsonwebtoken");
const verify = require('../middleware/verify');
const UserModel = require('../models/user.model');
var router = express.Router();


/* GET users listing. */
router.get('/get',verify,async function(req, res) {
    try{
        let users = await UserModel.find();
        res.send(users);
        return;
    }
    catch(err){
        res.send(err.message)
    } 
});

//update user
router.patch('/update/:id',verify,async(req,res)=>{
  let {id}=req.params;
  let {name}=req.body;
  try {
    let user = await UserModel.findByIdAndUpdate({_id:id},{name:name});
    console.log(user);
    res.send("name update successfully!")
  } catch (error) {
    res.send(err.message);
  }
})
router.delete('/delete/:id',verify,async(req,res)=>{
  let {id}=req.params;
  try {
    let user = await UserModel.findByIdAndDelete({_id:id});
    if(!user){
      res.send("user not found");
      return
    }
    res.send("name deleted successfully!")
  } catch (error) {
    res.send(err.message);
  }
})
module.exports = router;
