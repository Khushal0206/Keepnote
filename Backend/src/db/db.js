const mongoose = require("mongoose")
const mongoDB = async()=>{

    try {
        const mongoo = await mongoose.connect
        (process.env.MONGO_URL)
        console.log("mongoose connection sucessfull")
        
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = mongoDB;