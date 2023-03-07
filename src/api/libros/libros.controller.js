const Libro=require("./libros.model")

const getAllLibros=async (req,res, next)=>{
try {
    const libros= await Libro.find()

    return res.json(libros)
    
} catch (error) {
    return next(error)
}
}


const getLibroById = async (req,res,next)=>{
    try {
        const {id}=req.params
        const libro=await Libro.findById(id)
        return res.json(libro)
        
    } catch (error) {
        return next(error)
    }
}

const crearLibro=async (req, res,next)=>{

    try {

        const newLibro= new Libro(req.body)
        if (req.file){
            newLibro.caratula=req.file.path
        }
        await newLibro.save()

        return res.json(newLibro)
        
    } catch (error) {
        return next(error)
    }
}

const eliminarLibro=async (req,res,next)=>{

    try {

        const {idLibro}=req.params

        const libroEliminado = await Libro.findByIdAndDelete(idLibro)

        return res.status(200).json(libroEliminado)
        
    } catch (error) {
        return next(error)
        
    }
}

const actualizarLibro=async(req,res,next)=>{
try {
    const {idLibro}=req.params

    const libroAActualizar= new Libro(req.body)
    if (req.file){
        libroAActualizar.body.caratula=req.file.path
    }
    libroAActualizar._id=idLibro

    const libroActualizado= await Libro.findByIdAndUpdate(idLibro,libroAActualizar, {new:true})

    return res.status(200).json(libroActualizado)

    
} catch (error) {
    return next(error)
}
}
module.exports={getAllLibros, getLibroById, crearLibro, eliminarLibro, actualizarLibro}
