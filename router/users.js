const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, userValidate} = require('../model/user');
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post('/', async (req, res)=>{
   const  {error} = userValidate(req.body);
   if(error) {
       return res.status(404).send(error.details[0].message);
   }
   //check if email exist in db
    let user = await User.findOne({email: req.body.email});
   if(user) {
       return res.status(404).send('user Found In DB');
   }
    user = new User(_.pick(req.body, ['fullName', 'email', 'password']));
   // const user = new User({
   //    fullName: req.body.fullName,
   //    email: req.body.email,
   //    password: req.body.password
   // });
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['_id','fullName', 'email']));

});



module.exports = router;