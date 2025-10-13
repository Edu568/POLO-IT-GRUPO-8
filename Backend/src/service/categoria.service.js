const {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
} = require('../models/categoria.model');

function listarCategorias(){
    return new Promise((resolve,reject) =>{
        getAllCategoria((error,rows) =>{
            if(error) reject(error);
            else resolve(rows);
        });
    });
}

function listarCategoriaById(id){
    return new Promise((resolve, reject) =>{
        getCategoriaById(id,(error,rows) =>{
            if(error) reject(error);
            else resolve(rows);
        });
    });
}


//no estoy verificando al momento de crear, si la categoria es unica
//podria llegar el caso que tenga dos categorias con el mismo nombre. Redundancia
//CHEQUEAR
function crearCategoria(data){
    return new Promise((resolve,reject) =>{
        const {nombre} = data;
        //valido los campos
        if(!nombre) return reject(new Error('Campos requeridos'));
    
        //Valido que el dato ingresado sea string, que no este vacio y que no sea mayor de 50
        if(typeof nombre !== 'string' || nombre.trim().length === 0 || nombre.length > 50){
            return reject(new Error('El nombre debe ser una cadena no vacia de maximo 50 caracteres'))
        }
    
        createCategoria(data,(error,result) =>{
            if(error) reject(error);
            else resolve(result);
        });
    });
}

function actualizarCategoria(id, data){
    return new Promise((resolve,reject) =>{
        const {nombre} = data;

        //valido los campos
        if(!nombre) return reject(new Error('Campos requeridos'));

        //Valido que el dato ingresado sea una cadena string no vacio y que no tenga mas de 50 caracteres
        if(typeof nombre !== 'string' || nombre.trim().length === 0 || nombre.length >50){
            return reject(new Error('el nombre debe ser una cadena no vacia de maximo 50 caracteres'));
        }

        updateCategoria(id,data,(error,result) =>{
            if(error) reject(error);
            else resolve(result);
        });
    });
}
function eliminarCategoria(id){
    return new Promise((resolve, reject) =>{
        deleteCategoria(id,(error,result) =>{
            if(error) reject(error);
            else resolve(result);
        });
    });
}

module.exports = {
    listarCategorias,
    listarCategoriaById,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}
