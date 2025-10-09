const express = require('express');
const router = express.Router();
const {
    getFotos,
    getFoto,
    createFoto,
    updateFoto,
    deleteFoto
} = require('../controllers/foto.controller');

router.get('/', getFotos);
router.get('/:id',getFoto);
router.post('/',createFoto);
router.put('/:id', updateFoto);
router.delete('/:id',deleteFoto);

module.exports = router;
