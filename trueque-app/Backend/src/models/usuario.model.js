const db = require('./db.model');
const bcrypt = require('bcrypt');

function getAllUsuario(callback){
    const sql = `
        SELECT u.id, u.nombre, u.email, u.fecha_creacion, b.nombre AS barrio
        FROM Usuario u
        JOIN Barrio b ON (u.id_barrio = b.id)
        ORDER BY u.nombre
    `;
    db.all(sql,[],callback);
}

function getUsuarioById(id, callback){
    const sql = `
        SELECT u.id, u.nombre, u.email, u.fecha_creacion, b.nombre AS barrio
        FROM Usuario u
        JOIN Barrio b ON (u.id_barrio = b.id)
        WHERE (u.id = ?)
    `;
    db.get(sql, [id], callback);
}

function createUsuario(data, callback){
    const {nombre,apellido,email,password,id_barrio} = data;
    
    bcrypt.hash(password,10,(err,hash) =>{
        if(err) return callback(err);
        const sql = `INSERT INTO Usuario(nombre, apellido,email,password, id_barrio) VALUES (?,?,?,?,?)`;
        db.run(sql,[nombre,apellido,email,hash  ,id_barrio], function(error){
            if(error) return callback(error);
            callback(null, {id: this.lastID,nombre, apellido, email, id_barrio});
        });
    });
}

function updateUsuario(id, data, callback){
    const {nombre,apellido,email, id_barrio} = data;
    const sql = `
        UPDATE Usuario SET nombre = ?, apelldio = ?,email = ?, id_barrio = ?
        WHERE (id = ?)
    `;
    db.run(sql,[nombre,apellido,email,id_barrio,id],function(error){
        if(error)return callback(error);
        callback(null,{changes:this.changes});
    });
}

function deleteUsuario(id, callback){
    const sql = `DELETE FROM Usuario WHERE (id = ?)`;
    db.run(sql,[id],function(error){
        if(error) return callback(error);
        callback(null,{changes:this.changes});
    });
}

function loginUsuario(email,password,callback){
    const sql = `SELECT * FROM Usuario WHERE (email = ?)`;
    db.get(sql,[email],(error, user) =>{
        if(error) return callback(error);
        if(!user) return callback(null, null); //el email no esta registrado

        bcrypt.compare(password, user.password, (err, match) =>{
            if(err) return callback (err);
            if(!match) return callback(null,null) //contraseña incorrecta
            callback(null,{id: user.id, nombre: user.nombre, email: user.email});
        });
    });
}

//funcion para chequear si el email existe (si esta registrado)
function checkEmailExiste(email,callback){
    const sql = `SELECT id FROM Usuario WHERE (email = ?)`;
    db.get(sql,[email], (error,rows) =>{
        if(error) return callback(error);
        callback(null, !!rows);
    });
}
//esta funcion verifica si el email existe, excluyendo el ID para Update
function checkEmailExisteExcluyendoId(email,id,callback){
    const sql = `SELECT id FROM Usuario WHERE (email = ? AND id != ?)`
    db.get(sql,[email,id],(error,rows) =>{
        if(error) return callback(error);
        callback(null,!!rows);
    });
}

module.exports = {
    getAllUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    checkEmailExiste,
    checkEmailExisteExcluyendoId
}