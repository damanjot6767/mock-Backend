const express = require('express');
const JobModel = require('../models/jobs.model');
const UserModel = require('../models/user.model');
const AdminAndUser = express.Router();


//get all jobs
AdminAndUser.get('/all',async function(req, res) {
    try{
        let users = await JobModel.find({});
        res.send(users)
        return;
    }
    catch(err){
        res.send(err.message)
    } 
});

AdminAndUser.get('/apply/:id',async function(req, res) {
    let{id}=req.params;
    try{
        let users = await UserModel.findOne({_id:id});
        res.send(users.applied)
        
        return;
    }
    catch(err){
        res.send(err.message)
    } 
});

//add jobs by admin
AdminAndUser.post("/addjob",async function(req, res) {
    const {companyName,position,contract,location} = req.body;
    try{
        let jobs = new JobModel({companyName,position,contract,location});
        await jobs.save();
        res.send({status:"job posted successfully!"})
        return;
    }
    catch(err){
        res.send(err.message)
    } 
});

//update jobs by admin
AdminAndUser.patch("/updatejob/:id",async function(req, res) {
    const{id} = req.params;
    const {position} = req.body;
    try{
        let jobs = await JobModel.findByIdAndUpdate({_id:val},{position:position});
        res.send({status:"job update successfully!"})
        return;
    }
    catch(err){
        res.send(err.message)
    } 
});

//job delete by admin
AdminAndUser.delete('/deletejob/:id',async(req,res)=>{
    let {id} = req.params;
    try{
        let users = await JobModel.findByIdAndDelete({_id:id});
        res.send({status:"job deleted successfully!"})
        return;
    }
    catch(err){
        res.send(err.message)
    } 
})

//job applied by user
AdminAndUser.post('/applyjob/:id',async(req,res)=>{
    let {id} = req.params;
    let {userid}=req.body;
    try{
        let job = await JobModel.findOne({_id:id});
        console.log(job)
        let user = await UserModel.findOne({_id:userid});
        let newData = user.applied;
        newData.push(job);
        await UserModel.findByIdAndUpdate({_id:userid},{applied:newData});
        res.send({status:"job applied successfully!"})
        return;
    }
    catch(err){
        res.send(err.message)
    } 
})

module.exports = AdminAndUser;