// const Joi = require("joi");
const express = require('express');
require('express-async-errors');
const app = express();
const Joi = require("joi");
const employees = require('./router/employees');
const users = require('./router/users');
const auth = require('./router/auth');
// const logging = require('./logger/logging');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const logger = require('./config/logger');

//Connect To DB
mongoose.connect('mongodb://localhost/mycompany',{
    useNewurlParser: true
}).
then(()=> console.log('Connect To DB Successfully...'))
    .catch((error)=> logger.error('Check your Database Server!!'+ error));


app.use(express.json());



if(app.get('env') === 'development'){
    // app.use(logging);
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use('/api/employees', employees);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.all('*', (req, res, next)=>{
        res.status(404).json({
            status: 'false',
            message: 'Page Not Found'
        })
    });
}






const port = process.env.port || 3000;
app.listen(port, ()=>{
    logger.info('App Working On Port '+port+'...');
});