const Autor=require("./autores.model")

const getAutores=async(req,res, next)=>{
try {
    const autores=await Autor.find().populate("libros")
    return res.json(autores)
} catch (error) {
    return next(error)
}
}

const postAutor =async (req,res,next)=>{

    try {
        const newAutor = await new Autor(req.body)
        await newAutor.save()
        return res.status(201).json(newAutor)
        
    } catch (error) {
        return next(error)
    }
}

module.exports={postAutor, getAutores}