const express = require("express")
const cors = require("cors")
const db = require("./db/connection")
const Usermodel = require("./db/models/user")
const api = require("./routes/api")
const bodyparser = require("body-parser")
const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use("/api",api)




app.get("/",(req,res)=>{
    res.send("Hii")
})



app.listen(3000,()=>{
    console.log("server running on port 3000");
})