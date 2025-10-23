const {
    listarBarrio,
    listarBarrioById,
    crearBarrio,
    actualizarBarrio,
    eliminarBarrio
} = require('../service/barrio.service');

async function getBarrios(req, res){
    try {
        const barrios = await listarBarrio();
        res.json(barrios);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function getBarrioById(req, res){
    try {
        const {id} = req.params;
        const barrio = await listarBarrioById(id);
        if(!barrio) return res.status(404).json({error: 'Barrio no encontrado'});
        res.json(barrio);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function createBarrio(req, res){
    try {
        const result = await crearBarrio(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function updateBarrio(req, res){
    try {
        const {id} = req.params;
        const result = await actualizarBarrio(id,req.body);
        if(result.changes === 0) return res.status(404).json({error: 'Barrio no encontrado'});
        res.json({message: 'Barrio actualizado'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function deleteBarrio(req, res){
    try {
        const {id} = req.params;
        const result = await eliminarBarrio(id);
        if(result.changes === 0) return res.status(404).json({error: 'Barrio no encontrado'});
        res.json({message: 'Barrio eliminado'});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = {
    getBarrios,
    getBarrioById,
    createBarrio,
    updateBarrio,
    deleteBarrio
}