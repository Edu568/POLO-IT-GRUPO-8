const express = require('express');
const router = express.Router();
const {
    getCiudades,
    getCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad
} = require('../controllers/ciudad.controller');

router.get('/',getCiudades);
router.get('/:id',getCiudadById);
router.post('/',createCiudad);
router.put('/:id',updateCiudad);
router.delete('/:id',deleteCiudad);

module.exports = router;