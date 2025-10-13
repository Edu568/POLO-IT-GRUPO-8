const {
    listarCategoriaById,
    listarCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../service/categoria.service');

async function getAllCategoria(req,res){
    try {
        const categorias = await listarCategorias();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function getCategoriaById(req,res){
    try {
        const {id} = req.params;
        const categoria = await listarCategoriaById(id);
        if(!categoria)return res.status(404).json({error: 'Categoria no encontrada'});
        res.json(categoria);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function createCategoria(req,res){
    try {
        const categoria = await crearCategoria(req.body);
        res.status(201).json({message: 'Categoria creada'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function updateCategoria(req,res){
    try {
        const {id} = req.params;
        const categoria = await actualizarCategoria(id,req.body);
        if(categoria.changes === 0) return res.status(404).json({error:'Categoria no encontrada'});
        res.status(201).json({message:'Categoria actualizada'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function deleteCategoria(req,res){
    try {
        const {id} = req.params;
        const resultado = await eliminarCategoria(id);
        if(resultado.changes === 0) return res.status(404).json({error:'Categoria no encontrada'});
        res.status(201).json({message:'Categoria actualizada'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
};