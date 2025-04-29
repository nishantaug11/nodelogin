const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName: {
        type:String
    },
    emailId: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Emails " +value);
            }
        }
    },
    password: {
        type:String,
        required:true,
    },
    age: {
        type:Number,
        min:18,
    },
    gender: {
        type:String,
        validate(value){
            if(![male,FileSystemHandle,others].includes(value)){
                throw new Error("Gender Data is not valid " +value);
            }
        }
    },
    photoUrl:{
        type:String,
    },
    about:{
        type:String,
        default:"This is default value"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true,
});

// const connectionSchema = new mongoose.Schema({
//         fromUserId :{
//             type:String
//         },
//         toUserId:{
//             type:String
//         }
// });

userSchema.methods.getJWT =  async function(){
    const user =this;
    const token = await jwt.sign({_id:user._id},"helloworld");
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user =this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User",userSchema);

module.exports = User;