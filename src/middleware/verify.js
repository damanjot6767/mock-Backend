const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = async(req,res,next)=>{
    let token = req.header("Authorization");
    if(!token){
      return res.send("unathorized")
    }
    try{
      let auth = jwt.verify(token,`${process.env.KEY}`);
      if(auth){
        next()
      }
    }
    catch(err){
        res.send(err.message)
    } 
}
module.exports=verify;