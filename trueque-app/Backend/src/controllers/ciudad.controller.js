const {
    listarCiudades,
    listarCiudadById,
    crearCiudad,
    actualizarCiudad,
    eliminarCiudad
} = require('../service/ciudad.service');

async function getCiudades(req,res){
    try {
        const ciudades = await listarCiudades();
        res.json(ciudades);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function getCiudadById(req, res){
    try {
        const {id} = req.params;
        const ciudad = await listarCiudadById(id);
        if(!ciudad) return res.status(404).json({error: 'Ciudad no encontrada'});
        res.json(ciudad);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function createCiudad(req,res){
    try {
        const ciudad = await crearCiudad(req.body);
        res.status(201).json(ciudad);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function updateCiudad(req, res){
    try {
        const {id} = req.params;
        const result = await actualizarCiudad(id,req.body);
        if(result.changes === 0)return res.status(404).json({error: 'Ciudad no encontrada'});
        res.json({message: 'Ciudad actualizada'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function deleteCiudad(req, res){
    try {
        const {id} = req.params;
        const result = await eliminarCiudad(id);
        if(result.changes === 0)return res.status(404).json({error:'Ciudad no encontrada'});
        res.json({messahe:'Ciudad eliminada'});
    } catch (error) {
        
    }
}

module.exports ={
    getCiudades,
    getCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad
}