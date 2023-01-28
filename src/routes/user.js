const express = require('express');
const QuestionModel = require('../models/question.model');
const UserModel = require('../models/user.model');
const QuizwGame = express.Router();


//create user
QuizwGame.post('/level',async function(req, res) {
    const{name}=req.body;
    try{
        let user= new UserModel({name:name})
        let users = await user.save();
        res.send(users)
        return;
    }
    catch(err){
        res.send(err.message)
    } 
});

QuizwGame.post('/questions',async function(req, res) {
    let{category,Question,level,page}=req.body;
    Question = Number(Question);
    page = Number(page)
    try{
        if(page>Question){
            return res.send("Contest Over")
        }
       let response;
       if(category && level && Question && page<=Question){
        response = await QuestionModel.find({category:category,difficulty:level}).limit(1).skip(page-1)
       }
       else if(category && page<=Question){
        response = await QuestionModel.find({category:category}).limit(1).skip(page-1)
       }
       else if(level && page<=Question){
        response = await QuestionModel.find({difficulty:level}).limit(1).skip(page-1)
       }
        return res.send(response);
    }
    catch(err){
        res.send(err.message)
    } 
});

QuizwGame.post('/score/:id',async(req,res)=>{
    const{id}=req.params;
    const{correct,wrong}=req.body;
    try {
        let user = await UserModel.findOne({_id:id});
         let score = user.score+1;
         let u_correct = user.correct;
         u_correct.push(correct);
         let u_wrong = user.incorrect;
         u_wrong.push(wrong);
         await UserModel.findByIdAndUpdate({_id:id},{score:score,correct:u_correct,incorrect:u_wrong});
         let newUser = await UserModel.findOne({_id:id});
        return res.send(newUser)
    } catch (error) {
        
    }
})
 


module.exports = QuizwGame;