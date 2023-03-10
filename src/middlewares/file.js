const multer=require("multer")
const cloudinary=require("cloudinary")
const { CloudinaryStorage}=require("multer-storage-cloudinary")

const storage= new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "libreria",
        allowedFormats: ["jpg","png","jpeg","gif"]
    }
})

const upload=multer({storage})

module.exports=upload
