const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller');

// Rutas para empresas
router.get('/', empresaController.getAll);
router.get('/:id', empresaController.getByid);
router.post('/', empresaController.create);
router.put('/:id', empresaController.update);
router.delete('/:id', empresaController.delete);

module.exports = router;