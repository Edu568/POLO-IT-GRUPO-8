const multer = require('multer');
const path = require('path');
const fs = require('fs');

//crear la carpera uploads si no existe
const uploadDir = './uploads';
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive: true});
}

//Configuro el storage: el disco
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,uploadDir) //es la carpeta destino
    },
    filename: (req,file,cb) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,uniqueSuffix+path.extname(file.originalname));
    }
});

//Filtro solo imagenes
const fileFilter = (req,file,cb) =>{
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, gif)'));
    }
};

//Limite: 5MB max, 1 archivo
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5* 1024 * 1024,// maximo 5MB por archivo
        files: 4},//maximo 4 archivos
    fileFilter: fileFilter
});

module.exports = upload;

