const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {
  getPublicaciones,
  getPublicacion,
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
  getPublicacionByUsuario
} = require('../controllers/publicacionesController');

router.get('/', getPublicaciones);
router.get('/publicacion/:id', getPublicacion);

// 📸 Múltiples fotos
router.post('/', upload.array('fotos', 4), createPublicacion);

router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);
router.get('/:id', getPublicacionByUsuario);

module.exports = router;
