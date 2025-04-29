const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB()
    .then(()=>{
        console.log("Data base connected");
        const port = 1236;
        app.listen(port, (err) => {
            if (err) {
                console.error(`Error: Port ${port} is already in use.`);
                process.exit(1); // Exit the process with error code 
            }
            console.log(`Server running on port ${port}`);
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

