const mongoose  = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
)
userSchema.pre("save" , async function(){
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash


})
userSchema.methods.comparePassword = async function(newPassword){
    const result = await bcrypt.compare(newPassword,this.password)
    return result;

}
userSchema.methods.genrateToken = async function(){
    const token = await jwt.sign({id:this._id},process.env.SCREAT_KEY)
    return token;
}

const User = mongoose.model("userCollection",userSchema)
module.exports = User;