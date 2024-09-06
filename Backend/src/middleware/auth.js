const User = require("../model/userModal")
// const errorHandlerClass = require("../utility/errorHandler")
const jwt = require("jsonwebtoken")

const verifyAuth =async(req,res,next)=>{
    try {
       // console.log(req)
        const token = req.cookies.jwtToken
        console.log("token")
         console.log(token)
        if(!token){
            return next(new Error("please login first bhaiya"))
        }
        const decode = jwt.verify(token,process.env.SCREAT_KEY)
        // console.log(decode)
        //  console.log(token.id)
        const user= await User.findById({_id:decode.id})
        req.user = user
        next()
        
    } catch (error) {
       return next(error)
    }

}
module.exports = verifyAuth;