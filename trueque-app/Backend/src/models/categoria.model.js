const db = require('./db.model');

function getAllCategoria(callback){
    const sql = `
        SELECT * FROM Categoria ORDER BY nombre
    `;
    db.all(sql,[],callback);
}

function getCategoriaById(id,callback){
    const sql = `
        SELECT * FROM Categoria WHERE (id = ?)
    `;
    db.get(sql,[id],callback);
}

function createCategoria(data, callback){
    const {nombre} = data;
    const sql = `
        INSERT INTO Categoria (nombre) VALUES (?)
    `;
    db.run(sql,[nombre],function(error){
        if(error) return callback(error);
        callback(null,{id:this.lastID, nombre});
    });
}

function updateCategoria(id,data,callback){
    const {nombre} = data;
    const sql = `
        UPDATE Categoria SET(nombre = ?) WHERE (id = ?)
    `;
    db.run(sql,[nombre,id],function(error){
        if(error) return callback(error);
        callback(null,{changes: this.changes});
    });
}

function deleteCategoria(id, callback){
    const sql = `
        DELETE FROM Categoria WHERE (id = ?)
    `;
    db.run(sql,[id],function(error){
        if(error) return callback(error);
        callback(null,{changes: this.changes});
    });
}

function checkCategoriaExiste(nombre, callback){
    const sql = `
        SELECT id FROM Categoria WHERE (nombre = ?)
    `;
    db.get(sql,[nombre],(error,rows) => {
        if(error) return callback(error);
        callback(null,!!rows);
    });
}

module.exports = {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    checkCategoriaExiste
};