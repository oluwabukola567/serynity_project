const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user");




router.get('/', async(req, res)=> {
    const users = await User.find()
    .sort("name");
    res.send(users)
});


router.post('/', async(req, res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send("Incorrect Data");
    
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("Email already exist");

     user = new User ({
        fname: req.body.fname,
        sname: req.body.sname,
        age: req.body.age,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

       user = await user.save();
        res.send(user);

});

module.exports = router;