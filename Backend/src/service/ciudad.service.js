const {
    getAllCiudad,
    getCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad
} = require('../models/ciudad.model');


function listarCiudades(){
    return new Promise((resolve,reject) =>{
        getAllCiudad((error,rows) =>{
            if(error) reject(error);
            else resolve(rows);
        });
    });
}

function listarCiudadById(id){
    return new Promise((resolve,reject) =>{
        getCiudadById(id,(error,rows) =>{
            if(error) reject(error);
            else resolve(rows);
        })
    });
}

function crearCiudad(data){
    return new Promise((resolve,reject) =>{
        const {nombre} = data;
        if(!nombre)return reject(new Error('Nombre de ciudad requerido'));
        createCiudad(data,(error, resultado) =>{
            if(error)reject(error);
            else resolve(resultado);
        });
    });
}

function actualizarCiudad(id,data){
    return new Promise((resolve, reject) =>{
        const {nombre} = data;
        if(!nombre) return reject(new Error('nombre de ciudad requerido'));
        updateCiudad(id,data,(error,result) =>{
            if(error) reject(error);
            resolve(result);
        });
    });
}

function eliminarCiudad(id){
    return new Promise((resolve,reject) =>{
        deleteCiudad(id,(error,result) =>{
            if(error) reject(error);
            resolve(result);
        });
    });
}

module.exports = {
    listarCiudades,
    listarCiudadById,
    crearCiudad,
    actualizarCiudad,
    eliminarCiudad
}
