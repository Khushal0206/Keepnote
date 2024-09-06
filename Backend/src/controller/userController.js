const User = require("../model/userModal")

const userCtrl ={
    resisterUser:async(req,res,next)=>{
        try {
            const {username,email,password} = req.body 
            const user= await User.findOne({email})
            // console.log(user)
            if(user){
                return next(new Error("email is already exist"))
            }
           const newUser = await User.create({
            username:username,
            email:email,
            password:password
           })
            
           res.status(200).json({
            message:"signup sucessfully"
           })
        } catch (error) {
            next(error)
            
        }


    },
    loginUser:async(req,res,next)=>{
       try {
         const {email,password} = req.body
         if(!email || !password){
             return next(new Error("email and password require"))
         }
         const user = await User.findOne({email:email})
         if(!user){
             return next(new Error("you have invalid credential"))
         }
         const isMatch = await user.comparePassword(password)
         if (!isMatch){
             return next(new Error("you have invalid credential"))
          }
          const token = await user.genrateToken()
          if (!token) {
             return next(new Error("please login first"));
           }
           res.cookie("jwtToken",token,{
             httpOnly: true,
             maxAge: 24 * 60 * 60 * 1000,
             sameSite: 'Lax',
              secure: false,
           })
           res.status(200).json({
            message:"Login sucessfull",
            Token:token
           })
           
 
       } catch (error) {
        return   next(error)
        
       }
    }

}
module.exports = userCtrl