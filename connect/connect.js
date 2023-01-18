const mongoose = require("mongoose");

const connect = async()=>{
   return new mongoose.connect(`mongodb+srv://damanjot6767:damanjot6767@cluster0.5qggddx.mongodb.net/mock?retryWrites=true&w=majority`)
}

module.exports=connect;
