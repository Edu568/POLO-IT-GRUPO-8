const {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    checkCategoriaExiste
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

async function crearCategoria(data){
    const {nombre} = data;
    //valido los campos
    if(!nombre) return reject(new Error('Campos requeridos'));

    //Valido que el dato ingresado sea string, que no este vacio y que no sea mayor de 50
    if(typeof nombre !== 'string' || nombre.trim().length === 0 || nombre.length > 50){
        return reject(new Error('El nombre debe ser una cadena no vacia de maximo 50 caracteres'))
    }
    //valido que la categoria ingresada no este registrada en el sistema
    const categoria = await categoriaUnico(nombre);

    return new Promise((resolve,reject) =>{
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

function categoriaUnico(nombre){
    return new Promise((resolve,reject) => {
        checkCategoriaExiste(nombre,(error,rows) =>{
            if(error) reject(new Error('Categoria ya registrada'));
            else resolve(rows);
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
