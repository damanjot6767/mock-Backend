const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
   fullname:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true,unique:true},
   role:{type:String,enum:["admin","user"]},
   applied:[]
})

const UserModel = new model("auth",UserSchema);
module.exports = UserModel;
