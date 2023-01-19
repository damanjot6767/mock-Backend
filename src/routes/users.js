const express = require('express');
const UserModel = require('../models/user.model');
const UserTask = express.Router();


//get users task
UserTask.get('/:id',async function(req, res) {
    let {id} = req.params;
    try{
        let users = await UserModel.findOne({_id:id});
        res.send(users)
        return;
    }
    catch(err){
        res.send(err.message)
    } 
});

//add user task
UserTask.post('/:id',async function(req, res) {
    let {id} = req.params;
    const {type,task} = req.body;
    try{
        let users = await UserModel.findOne({_id:id});
        let newList;
        if(type=="critical"){
            newList=users.critical;
            newList.push(task);
            let ans = await UserModel.findByIdAndUpdate({_id:id},{critical:newList})
            res.send(ans);
            return
        }
        else if(type=="major"){
            newList=users.major;
            newList.push(task);
            let ans = await UserModel.findByIdAndUpdate({_id:id},{major:newList})
            res.send(ans);
            return
        }
        else if(type=="medium"){
            newList=users.medium;
            newList.push(task);
            let ans = await UserModel.findByIdAndUpdate({_id:id},{medium:newList})
            res.send(ans);
            return
        }
        else if(type=="low"){
            newList=users.low;
            newList.push(task);
            let ans = await UserModel.findByIdAndUpdate({_id:id},{low:newList})
            res.send(ans);
            return
        }
        return;
    }
    catch(err){
        res.send(err.message)
    } 
});

UserTask.delete('/:id',async(req,res)=>{
    let {id} = req.params;
    let {type,task} = req.body;
    task=Number(task)
    try{
        let users = await UserModel.findOne({_id:id});
        let newList;
        if(type=="critical"){
            newList=users.critical.filter((ele,ind)=>task!==ind);
            let ans = await UserModel.findByIdAndUpdate({_id:id},{critical:newList})
            res.send(ans);
            return
        }
        else if(type=="major"){
            newList=users.major.filter((ele,ind)=>task!==ind);
            let ans = await UserModel.findByIdAndUpdate({_id:id},{major:newList})
            res.send(ans);
            return
        }
        else if(type=="medium"){
            newList=users.medium.filter((ele,ind)=>task!==ind);
            let ans = await UserModel.findByIdAndUpdate({_id:id},{medium:newList})
            res.send(ans);
            return
        }
        else if(type=="low"){
            newList=users.low.filter((ele,ind)=>task!==ind);
            let ans = await UserModel.findByIdAndUpdate({_id:id},{low:newList})
            res.send(ans);
            return
        }
        return;
    }
    catch(err){
        res.send(err.message)
    } 
})
module.exports = UserTask;