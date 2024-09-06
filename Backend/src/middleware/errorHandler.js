const errorHandle = (err,req,res,next)=>{
    console.log("err")
    // console.log(err)
    message = err.message || "something went wronge"
    res.json({
        message:message
    })

}
module.exports = errorHandle;