const express = require('express');
const router = express.Router();
const {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
} = require('../controllers/categoria.controller');

router.get('/',getAllCategoria);
router.get('/:id',getCategoriaById);
router.post('/',createCategoria);
router.put('/:id',updateCategoria);
router.delete('/:id',deleteCategoria);

module.exports = router;