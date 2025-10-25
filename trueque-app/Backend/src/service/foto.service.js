const {getAllFotos,getFotoById, createFoto, updateFoto, deleteFoto} = require('../models/foto.model');
const {obtenerPublicacionById} = require('./publicaciones.service');


//Listar Fotos
function listarFotos(){
    return new Promise((resolve,reject) =>{
        getAllFotos((error, rows) =>{
            if(error) reject(error);
            else resolve(rows);
        });
    });
}

//funcion para para obtener una foto por id
function obtenerFotoById(id){
    return new Promise((resolve,reject) =>{
        getFotoById(id,(error,rows) =>{
            if(error) reject(error);
            else resolve(rows);
        });
    });
}

//funcion asincronica para crear una foto
async function crearFoto(data){
    const {id_publicacion, url} = data;

    //Verificacion de id_publicacion y url
    if(!id_publicacion || !url){
        return Promise.reject(new Error('id_publicacion y url requeridos'));
    }

    //Validacion de que la publicacion existe
    const publicacion = await obtenerPublicacionById(id_publicacion);
    if(!publicacion) return Promise.reject(new Error('La publicacion no existe'));

    return new Promise((resolve,reject) =>{
        createFoto(data,(error,result) =>{
            if(error) reject(error);
            else resolve(result);
        });
    });
}

//funcion para actualizar una foto
function actualizarFoto(id,data){
    return new Promise((resolve, reject) =>{
        const {id_publicacion, url} = data;
        if(!id_publicacion || !url) return reject(new Error('id_publicacion y url requeridos'));
        updateFoto(id,data,(error, result) =>{
            if(error) reject(error);
            else resolve(result);
        });
    });
}

//funcion para eliminar una foto
function eliminarFoto(id){
    return new Promise((resolve,reject) =>{
        deleteFoto(id,(error, result) =>{
            if(error) reject(error);
            else resolve(result);
        });
    });
}

//module sera exportado a controller
// Service --> controller
module.exports = {
    listarFotos,
    obtenerFotoById,
    crearFoto,
    actualizarFoto,
    eliminarFoto
};