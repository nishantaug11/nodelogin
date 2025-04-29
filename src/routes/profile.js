const express = require("express");
const validator = require("validator");
const bcrypt = require('bcrypt');
const {validateEditProfile} = require("../utils/validation");
const {userAuth} = require('../middlewares/auth')
const User = require('../models/user');

const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth, async (req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR: " +err.message);
    }
});

profileRouter.patch("/profile/edit",userAuth, async (req,res) => {
    try{
       if(validateEditProfile(req)){
            throw new Error("Invalid Edit Request...!!!");
       }
       const loggedInUser = req.user;
       Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
       await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: loggedInUser,
        });
    }catch(err){
        res.status(400).send("ERROR: " +err.message);
    }
});
 

profileRouter.patch("/profile/password",userAuth, async (req,res) => {
    try{
        const {old_pass, new_password,confirm_password} = req.body;
        const user = req.user;
        if(new_password===confirm_password){
            if (!validator.isStrongPassword(new_password)) {
                throw new Error("Please enter a strong Password!");
            }else {
                const passwordHash = await bcrypt.hash(new_password,10);
                user.password = passwordHash;
                await user.save();
                res.status(200).send("Password updated successfully.");
            }
        }else{
            throw new Error("New Password and confirm password not match...!!!");
        }
    }catch(err){
        res.status(400).send("ERROR: " +err.message);
    }
});


module.exports = profileRouter;