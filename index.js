
const express = require('express');
const logger = require('morgan');
require("dotenv").config()
const connect = require('./src/connect/connect.js');
const cors = require("cors");
const QuizwGame = require('./src/routes/user.js');
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/",QuizwGame);

app.listen(process.env.PORT,async()=>{
  await connect().then((res)=>console.log("database connected")).catch((res)=>console.log("not connected"))
  console.log("working")
})