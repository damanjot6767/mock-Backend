const mongoose = require("mongoose");
require("dotenv").config()

const connect = async()=>{
   return new mongoose.connect(`${process.env.MONGOURL}`)
}
module.exports=connect;
