const {getAllPublicaciones} = require('../models/publicaciones.model');

function listarPublicaciones(){
    return new Promise((resolve,reject) => {
        getAllPublicaciones((error, rows) => {
            if(error) reject(error);
            else resolve(rows);
        });
    });
}

//Este modulo se exportara a "Controller" para ser consumiso
module.exports = {listarPublicaciones};