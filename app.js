const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express();


const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
 
const employeeRouter = require('./routes/employee');


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server up and running");
})
app.use('/employee',employeeRouter);

module.exports = app;
