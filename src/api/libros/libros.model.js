const mongoose = require("mongoose");
// const Schema=mongoose.Schema es un paso optativo
const libroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover: { type: String },
  prize: { type: Number },
  ISBN: { type: String },
  length: { type: Number },
  category: {
    type: String,
    required: true,
    enum: ["aventura", "thriller", "comedia", "ensayo", "terror"],
  },
},
{
    timestamps: true
});

const Libro=mongoose.model("libros", libroSchema)
module.exports=Libro