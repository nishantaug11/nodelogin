const express = require('express');
const app = express();

app.use("/",(req,res)=>{
    res.send("Hello Nishant");
})

app.use("/test",(req,res)=>{
    res.send("Hello From the server");
})

app.use("/hello",(req,res)=>{
    res.send("Hello Helloo dddddd");
})
app.listen(9999,()=>{
    console.log("Server is sucessfully listening in port 9999");
});
console.log("Starting New Project");