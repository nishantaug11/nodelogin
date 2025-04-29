const express = require("express");
const {validateSignUpData} = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
   
    // Createing a new instance of new User Model
    // const user = new User(userObj);

    try{
        // validate data
        validateSignUpData(req);
        const {firstName,lastName,emailId,password} = req.body
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password,10);
        const userObj = req.body;
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash
        });  
        await user.save();
        res.send("User added Successfully");
    }catch(err){
        res.status(400).send("ERROR: " +err.message);
    }
});

authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        // 12Dsdsdsd@3456
        console.log(password);
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        console.log(user.password);
        // const isPasswordValid = await bcrypt.compare(password,user.password);
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            // Create a JWT Token
            // const token = await jwt.sign({_id:user._id},"helloworld");
            const token = await user.getJWT();
            console.log(token);
            // Add the token to cookies and send the responce back to the user
            res.cookie("token",token);
            res.send("Login Successfully");
        }
        else{
            throw new Error("Invalid Credentials");
        }

    }catch(err){
        res.status(400).send("ERROR: " +err.message);
    }
});

authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null,{
        expires : new Date(Date.now()),
    });
    res.send("User has been logout!!!");
});




module.exports = authRouter;