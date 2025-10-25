const {
    getAllBarrio,
    getBarrioById,
    createBarrio,
    updateBarrio,
    deleteBarrio
} = require('../models/barrio.model');

const {listarCiudadById} = require('./ciudad.service');

function listarBarrio(){
    return new Promise((resolve, reject) =>{
        getAllBarrio((error,rows) =>{
            if(error) reject(error);
            else resolve(rows);
        })
    });
}

function listarBarrioById(id){
    return new Promise((resolve, reject) =>{
        getBarrioById(id,(error, rows) =>{
            if(error) reject (error);
            else resolve(rows);
        });
    });
}

async function crearBarrio(data){
    const {nombre,id_ciudad} = data;
    //valido que los campos esten completos
    if(!nombre || !id_ciudad) return Promise.reject(new Error('id_ciudad y nombre requerido'));

    //valido que ciudad existe
    const ciudad = await listarCiudadById(id_ciudad);
    if(!ciudad) return Promise.reject(new Error('Ciudad no existe'));
    
    //valido que el dato ingresado sea una cadena string no vacia con maximo 50 caracteres
    if((typeof nombre !== 'string') || (nombre.trim().length === 0) || (nombre.length > 50)){
        return Promise.reject(new Error('El nombre del barrio debe ser una cadena string no vacia maximo 50 caracteres'));
    }
    return new Promise((resolve, reject) =>{
        createBarrio(data,(error,result) =>{
            if(error) reject (error);
            else resolve(result);
        });
    });
}

function actualizarBarrio(id,data){
    return new Promise((resolve,reject) =>{
        const {nombre, id_ciudad} = data;
        if(!nombre || !id_ciudad) return reject(new Error('id_ciudad y nombre requerido'));
        updateBarrio(id,data,(error,result) =>{
            if(error) reject(error);
            else resolve(result);
        });
    });
}

function eliminarBarrio(id){
    return new Promise((resolve,reject) =>{
        deleteBarrio(id, (error, result) =>{
            if(error) reject(error);
            else resolve (result);
        });
    });
}


module.exports = {
    listarBarrio,
    listarBarrioById,
    crearBarrio,
    actualizarBarrio,
    eliminarBarrio
}