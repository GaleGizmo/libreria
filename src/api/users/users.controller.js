const { generateSign } = require("../../utils/jwt");

const bcrypt = require("bcrypt");
const User = require("./users.model");

const registro = async (req, res, next) => {
  try {
    if (req.body.rol === "admin") {
      req.body.rol = "user";
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const userToLog = await User.findOne({ email: req.body.email });

    if (!userToLog) {
      return res.status(500).json("NO se encuentra el usuario");
    }
    if (bcrypt.compareSync(req.body.password, userToLog.password)) {
      const token = generateSign(userToLog._id, userToLog.email);
      return res.status(200).json({ token, userToLog });
    } else return res.status(500).json("Error en la contraseña");
  } catch (error) {
    next(error);
  }
};

const modifyUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // const userToUpdate = new User(req.body);
   
    if (req.user.rol !== "admin") {
      req.body.rol = "user";
    }
const idUser=JSON.stringify(req.user._id)
const idUserParsed=idUser.slice(1,idUser.length-1)
    if (idUserParsed===id || req.user.rol==="admin"){
        // userToUpdate._id = id;
        const userUpdated = User.findByIdAndUpdate(id, req.body, { new: true });
        return res.json(userUpdated);
    } else {return res.json("No puedes cambiar a otro user si no eres admin")}

    
    
  } catch (error) {
    next(error);
  }
};

module.exports = { registro, login, modifyUser };
