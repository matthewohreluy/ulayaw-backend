import Multer from 'multer'
const fileStorage = Multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/static/moments')
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().getTime() + file.originalname)
    }
})
export const multer = Multer({
    storage: fileStorage
}).single('file');