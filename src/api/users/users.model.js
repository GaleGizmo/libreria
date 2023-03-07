const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema=mongoose.Schema(

    {
        email:{type:String, unique:true, trim:true, required:true},
        password:{type:String, trim:true, required:true},
        rol: {type: String, default:"user", required:true, enum:["admin","user"]},
        librosFavoritos:[{type:mongoose.Types.ObjectId,  ref:"libros"}],
        edad: {type:Number}
    }
)

userSchema.pre("save", function(next){
    this.password=bcrypt.hashSync(this.password, 3)
    next()
})
const User=mongoose.model("users", userSchema)
module.exports=User