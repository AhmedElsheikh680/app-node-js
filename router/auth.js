//Loginin
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const {User} = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//login
router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) {
        return res.status(404).send(error.details[0].message);
    }
    //check if user exist in db
    let user = await  User.findOne({email: req.body.email});
    if(!user){
        return res.status(404).send('Invalid Email OR Password!!');
    }
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if(!checkPassword) {
        return res.status(404).send('Invalid Email OR Password!!');
    }
    const token = user.generateTokens();
    res.send(token);

});


function validate(req){
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(req, schema);
}

module.exports = router;