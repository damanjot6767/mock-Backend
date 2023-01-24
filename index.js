
const express = require('express');
const logger = require('morgan');
require("dotenv").config()
const connect = require('./src/connect/connect.js');
const Auth = require("./src/routes/Auth.js");
const cors = require("cors");
const AdminAndUser = require('./src/routes/admin.js');
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/",Auth);
app.use("/",AdminAndUser)

app.listen(process.env.PORT,async()=>{
  await connect().then((res)=>console.log("database connected")).catch((res)=>console.log("not connected"))
  console.log("working")
})