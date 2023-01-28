const {Schema,model} = require("mongoose");

const QuestionSchema = new Schema({
   category:{type:String,required:true},
   type:{type:String},
   difficulty:{type:String},
   question:{type:String,required:true},
   correct_answer:{type:String},
   incorrect_answers:[]
})

const QuestionModel = new model("quize",QuestionSchema);
module.exports = QuestionModel;