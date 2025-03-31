const express = require('express');
const app = express();

app.get("/user/:userId/",(req,res) =>{
    console.log(req.params);
    res.send("Get Api call for User");
    
})

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
app.listen(1234,()=>{
    console.log("Server is sucessfully listening in port 1234");
});

console.log("Starting New Project");