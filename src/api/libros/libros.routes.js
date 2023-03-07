const { isAdmin } = require("../../middlewares/auth")
const upload = require("../../middlewares/file")
const { getAllLibros, getLibroById, crearLibro, eliminarLibro, actualizarLibro } = require("./libros.controller")

const librosRoutes=require("express").Router()

librosRoutes.get("/", getAllLibros)
librosRoutes.get("/:id", getLibroById)
librosRoutes.post("/",[isAdmin], upload.single("caratula"),crearLibro)
librosRoutes.delete("/:idLibro", [isAdmin],eliminarLibro)
librosRoutes.put("/:idLibro", [isAdmin], actualizarLibro)
module.exports=librosRoutes