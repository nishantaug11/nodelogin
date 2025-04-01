const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.post("/signup",async (req,res)=>{
    const userObj = {
        firstName:"Yash",
        lastName:"Singh",
        emailId:"virat@gmail.com",
        password:"123456"
    }
    // Createing a new instance of new User Model
    const user = new User(userObj);

    try{
        await user.save();
        res.send("User added Successfully");
    }catch(err){
        res.status(400).send("User Not Added", +err.message);
    }

   
})


connectDB()
    .then(()=>{
        console.log("Data base connected");
        app.listen(1234,()=>{
            console.log("Server is sucessfully listening in port 1234");
        });
    }).catch(err=>{
        console.error("Data base not connected");
})



// app.get("/user",(req,res,next) =>{
//     console.log(req.params);
//     // res.send("Get Api call for User");
//     next();
// },(req,res)=>{
//     res.send("Get Api call for User 2");
// })

// app.post("/user",(req,res) =>{
//     res.send({"name":"nishant",age:18});
// })

// app.delete("/user",(req,res) =>{
//     res.send("Deleted Dataa");
// })

// app.use("/",(req,res)=>{
//     res.send("Hello Nishant");
// })
// app.use("/test",(req,res)=>{
//     res.send("Hello From the serddver");
// })

// app.use("/hello",(req,res)=>{
//     res.send("Hello Helloo dddsssdsssssddd");
// })

