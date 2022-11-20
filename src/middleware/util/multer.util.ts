import Multer from 'multer'
const fileStorage_moments = Multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/static/moments')
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().getTime() + file.originalname)
    }
})
export const multer_moment = Multer({
    storage: fileStorage_moments
}).single('file');

const fileStorage_image1 = Multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/static/villa')
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().getTime() + file.originalname)
    }
})

export const multer_image1 = Multer({
    storage: fileStorage_moments
}).single('file');