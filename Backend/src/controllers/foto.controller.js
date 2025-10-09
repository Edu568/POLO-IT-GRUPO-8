const {
    listarFotos,
    obtenerFotoById,
    crearFoto,
    actualizarFoto,
    eliminarFoto} = require('../service/foto.service');

async function getFotos(req,res){
    try {
        const fotos = await listarFotos();
        res.json(fotos);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function getFoto(req, res){
    try {
        const {id} = req.params;
        const foto = await obtenerFotoById(id);
        if(!foto) return res.status(404).json({error: 'Foto no encontrada'});
        res.json(foto);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function createFoto(req, res){
    try {
        const foto = await crearFoto(req.body);
        res.status(201).json(foto);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function updateFoto(req, res){
    try {
        const {id} = req.params;
        const resultado = await actualizarFoto(id, req.body);
        if(resultado.changes === 0) return res.status(404).json({error: 'Foto no encontrada'});
        res.json({message: 'Foto actualizada'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function deleteFoto(req, res){
    try {
        const {id} = req.params;
        const resultado = await eliminarFoto(id);
        if(resultado.chages === 0) return res.status(404).json({error: 'Foto no encontrada'});
        res.json({message: 'Foto eliminada'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//controller --> router
module.exports = {
    getFotos,
    getFoto,
    createFoto,
    updateFoto,
    deleteFoto
};
