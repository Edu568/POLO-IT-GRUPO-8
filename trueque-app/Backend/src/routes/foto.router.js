const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {
    getFotos,
    getFoto,
    createFoto,
    updateFoto,
    deleteFoto,
    uploadFoto
    } = require('../controllers/foto.controller');

router.get('/', getFotos);
router.get('/:id',getFoto);
router.post('/',createFoto);
router.put('/:id', updateFoto);
router.delete('/:id',deleteFoto);
router.post('/upload',upload.array('archivos',4),uploadFoto);


module.exports = router;
