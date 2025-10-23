const express = require('express');
const router = express.Router();

const {
  getPublicaciones,
  getPublicacion,
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
  getPublicacionByUsuario
} = require('../controllers/publicacionesController');

router.get('/', getPublicaciones);
// router.get('/:id', getPublicacion);
router.post('/', createPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);
router.get('/:id',getPublicacionByUsuario);

module.exports = router;