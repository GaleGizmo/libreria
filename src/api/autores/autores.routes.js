const autoresRoutes = require("express").Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");
const { postAutor, getAutores } = require("./autores.controller");

autoresRoutes.post("/",[isAdmin], postAutor);

autoresRoutes.get("/", getAutores);

module.exports = autoresRoutes;
