const express =  require("express")
const userCtrl = require("../controller/userController")
const Router = express.Router()
Router.route("/resister").post(userCtrl.resisterUser)
Router.route("/login").post(userCtrl.loginUser)

module.exports = Router;