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
//me faltaria chequear que al momento de crear una ciudad, no se ingrese una ciudad ya registrada
function crearCiudad(data){
    return new Promise((resolve,reject) =>{
        const {nombre} = data;
        //valido los campos
        if(!nombre)return reject(new Error('Nombre de ciudad requerido'));

        //valido que el dato sea una cadena string no vacio con mas de 50 caracteres
        if((typeof nombre !== 'string') || (nombre.trim().length === 0) || (nombre.length > 50)){
            return reject(new Error('El nombre de la ciudad debe ser una cadena string no vacia de mas de 50 caracteres'));
        }

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
