const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleado.controller');

// Rutas para empleados
router.get('/', empleadoController.getAll);
router.get('/:id', empleadoController.getByid);
router.post('/', empleadoController.create);
router.put('/:id', empleadoController.update);
router.delete('/:id', empleadoController.delete);

module.exports = router;