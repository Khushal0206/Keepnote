const express = require("express")
const app = express()
const mongoDb = require("./src/db/db")
const errorHandle = require("./src/middleware/errorHandler")

const dotenv= require("dotenv")
dotenv.config()

const cors = require("cors")
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies)
  };
  
app.use(cors(corsOptions))

console.log()

const cookie_parser = require("cookie-parser")
app.use(cookie_parser())

app.use(express.json())


//router
const userRoute = require("./src/router/userRoute")
app.use("/api/v1",userRoute)
const noteRoute = require("./src/router/noteRoute")
app.use("/api/v1",noteRoute)

// cheack route
app.get("/",(req,res,next)=>{
    // const error = new Error("something wrong please check again")
    // next(error)

    res.json(
        "welcome to keepnote app"
    )
})
// error handler
app.use(errorHandle)

mongoDb().then(()=>{
    app.listen(8000,()=>{
        console.log("server is running sucessfully")
    })
    
}).catch((error)=>{
    console.log(error)

})
