const { createTransaccion, getTransaccion, setEstadoTransaccion } = require('../models/transaccion.model');
const {getPublicacionById} = require('../models/publicaciones.model.js');
const estadosValidos = ['Pendiente', 'Aceptado', 'Rechazado', 'Cancelado'];


function proponerTransaccion(data){
    return new Promise((resolve, reject) =>{
        const {id_publicacion_ofrecida, id_publicacion_deseada,id_usuario_ofertante} = data;

        //Validacion de campos vacios
        if(!id_publicacion_deseada || !id_publicacion_ofrecida || !id_usuario_ofertante){
            return reject(new Error('Faltan campos obligatorios'));
        }

        //Validar publicaciones y dueño
        getPublicacionById(id_publicacion_ofrecida,(error, pub_ofrecida) =>{
            if(error)return reject(error);
            if(!pub_ofrecida) return reject(new Error('Publicacion ofrecida no existe'));
            if(!pub_ofrecida.disponible) return reject(new Error('Publicacion ofrecida no disponible'));
            if(pub_ofrecida.id_dueno !== id_usuario_ofertante) return reject(new Error('Usuario ofertante no es duenio de la publicacion ofrecida'));

            getPublicacionById(id_publicacion_deseada, (error2,pub_deseada) =>{
                if(error2) return reject(error2);
                if(!pub_deseada) return reject(new Error('Publicacion desea no existe'));
                if(!pub_deseada.disponible) return reject(new Error('Publicacion deseada no esta disponible'));

                createTransaccion(data, (error3, result) => {
                    if(error3) return reject(error3);
                    resolve({id:result.id,...data, estado: 'Pendiente'});
                });
            });
        });
    });
}

function listarTransacciones(){
    return new Promise((resolve, reject) =>{
        getTransaccion((error,rows) =>{
            if(error) return reject(error);
            resolve(rows);
        });
    });
}

function cambiarEstado(id,estado){
    return new Promise((resolve, reject) =>{
        if(!estadosValidos.includes(estado)){
            return reject(new Error('Estado invalido'));
        }

        setEstadoTransaccion(id,estado,(error, result)=>{
            if(error) return reject(error);
            resolve(result);
        });
    });
}

module.exports = {proponerTransaccion, listarTransacciones, cambiarEstado};