require("dotenv").config();
const express = require("express");
const autoresRoutes = require("./src/api/autores/autores.routes");

const cloudinary=require("cloudinary").v2
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET

})
const server = express();
const PORT = process.env.PORT;

// server.use(cors())

server.use(express.json())
server.use(express.urlencoded({extended:true}))

const librosRoutes=require("./src/api/libros/libros.routes");
const userRoutes = require("./src/api/users/users.routes");
server.use("/libros", librosRoutes)
server.use("/autores", autoresRoutes)
server.use("/users",userRoutes)
const db=require("./src/utils/db.js")
db.connectDB()
server.use("/", (req, res) => {
  res.send("its alive!");
});
server.use((err,req,res,next)=>{
  return res.status(err.status || 500 ).json(err.message || "Error sorpresa")
})

server.use("*", (req,res,next)=>{
  const error =new Error("Route not found")
  error.status = 404
  next(error)
})


server.listen(PORT, () => {
  console.log("El server pita en http://localhost:" + PORT);
});

