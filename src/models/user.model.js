const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
   name:{type:String,required:true},
   username:{type:String,required:true,unique:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true,unique:true}
})

const UserModel = new model("auth",UserSchema);
module.exports = UserModel;
