// const Joi = require("joi");
const express = require('express');

const app = express();
const Joi = require("joi");
const employees = require('./employees/employees');
const logging = require('./logger/logging');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Connect To DB
mongoose.connect('mongodb://localhost/mycompany',{
    useNewurlParser: true
}).
then(()=> console.log('Connect To DB Successfully...'))
    .catch((error)=> console.error('Connection Failed!!'+ error));


app.use(express.json());
if(app.get('env') === 'development'){
    app.use(logging);
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use('/api/employees', employees);
}






const port = process.env.port || 3000;
app.listen(port, ()=>{
    console.log('App Working On Port '+port+'...');
});