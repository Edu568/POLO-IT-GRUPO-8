const db = require('./db.model');

function getAllCiudad(callback){
    const sql = `
        SELECT * FROM Ciudad ORDER BY nombre
    `;
    db.all(sql,[],callback);
}

function getCiudadById(id,callback){
    const sql = `
        SELECT * FROM Ciudad WHERE id = ?
    `;
    db.get(sql, [id], callback);
}

function createCiudad(data, callback){
    const {nombre}  = data;
    const sql = `
        INSERT INTO Ciudad(nombre) VALUES (?)
    `;
    db.run(sql,[nombre],function(error){
        if(error) return callback(error);
        callback(null, {id: this.lastID, ...data});
    })
}

function updateCiudad(id,data, callback){
    const {nombre} = data;
    const sql = `
        UPDATE Ciudad SET(nombre = ?) WHERE id = ?
    `;
    db.run(sql,[nombre,id],function(error){
        if(error) return callback(error);
        callback(null, {changes: this.changes});
    });
}

function deleteCiudad(id,callback){
    const sql = `
        DELETE FROM Ciudad WHERE id = ?
    `;
    db.run(sql,[id],function(error){
        if(error) return callback(error);
        callback(null,{changes:this.changes});
    });
}

module.exports = {
    getAllCiudad,
    getCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad
}