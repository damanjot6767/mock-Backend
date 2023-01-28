const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
   name:{type:String,required:true},
   score:{type:Number,default:0},
   correct:[],
   incorrect:[]
})

const UserModel = new model("user",UserSchema);
module.exports = UserModel;
