const { registro, login, modifyUser } = require("./users.controller");

const userRoutes=require("express").Router()

userRoutes.post("/",registro)
userRoutes.post("/login", login)
userRoutes.put("/:id",modifyUser)

module.exports=userRoutes
