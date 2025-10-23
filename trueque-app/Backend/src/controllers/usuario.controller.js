const {
    listarUsuario,
    listarUsuarioById,
    crearUsuario,
    actualizarUsuario,
    iniciarSesion
} = require('../service/usuario.service');

async function getUsuario(req,res){
    try {
        const usuarios = await listarUsuario();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function getUsuarioById(req, res){
    try {
        const {id} = req.params;
        const usuario = await listarUsuarioById(id);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function createUsuario(req,res){
    try {
        const usuario = await crearUsuario(req.body);
        const {password, ...safeUser} = usuario;
        res.status(201).json(safeUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function updateUsuario(req,res){
    try {
        const {id} = req.params;
        const result = await actualizarUsuario(id,req.body);
        if(result.changes === 0) return res.status(400).json({error: 'Usuario no encontrado'});
        res.json({message: 'Usuario actualizado'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
// Todavia no lo voy a implementear
// async function deleteUsuario

async function loginUsuario(req,res){
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({error:'Email y password requerido'});
        const usuario = await iniciarSesion(email,password);
        if(!usuario) return res.status(401).json({error: 'Credenciales invalidas'});
        res.json({message:'Login exitoso'},usuario);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    loginUsuario
}