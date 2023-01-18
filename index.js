
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connect = require('./connect/connect');
const Auth = require('./routes/Auth');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth",Auth)

app.listen(8080,async()=>{
  await connect().then((res)=>console.log("database connected")).catch((res)=>console.log("not connected"))
  console.log("working")
})