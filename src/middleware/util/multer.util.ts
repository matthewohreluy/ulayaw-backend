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

const fileStorage_image = Multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/static/villa')
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().getTime() + file.originalname)
    }
})

export const multer_villa = Multer({
    storage: fileStorage_image
}).single('file');


const fileStorage_logo = Multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/static/logo')
    },
    filename: (req,file,cb)=>{
        console.log(file.originalname);
        console.log('file');
        cb(null, new Date().getTime() + file.originalname)
    }
})

export const multer_logo = Multer({
    storage: fileStorage_logo
}).single('file');