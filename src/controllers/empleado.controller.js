const Empleado = require('../models/empleado.model');

//consultar todas los empleados

exports.getAll = async (req, res) => {
    try{
        const empleado = await Empleado.getAll ();
        res.status(200).json(empleado);
    } catch (error) {
        console.error('Error al obtener Empleados:', error);
        res.status(500).json({message:'error al obtener Empleados'});
    }
};

//consultar Empleados por id
exports.getByid = async (req, res) => {
    try {
        const empleado = await Empleado.getById(req.params.id);
        if (!empleado){
            return res.status(404).json({message:'Empleado no encontrado'});
        }
        res.status(200).json(empleado);
    } catch (error){
        console.error('Error al obtener empleado', error);
        res.status(500).json({message: 'Error al obtener empleado'});
    }
};

//Crear nuevo empleado
exports.create = async (req, res) => {
    try {
        const newEmpleado = {
            Nombre: req.body.EmpNombre,
            Email: req.body.EmpEmail,
            Telefono: req.body.EmpTelefono,
            IdEmpresa : req.body.IdEmpresa
        };

        const result = await Empleado.create(newEmpleado); // Verifica esta línea
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al crear nuevo Empleado:', error);
        res.status(500).json({ message: 'Error al crear un nuevo Empleado' });
    }
};
//Editar empleado existente
exports.update = async (req,res) =>{
    try{
        const empleado = await Empleado.getById(req.params.id);
        if (!empleado){
            return res.status(404).json({message:'Empleado no encontrado'});
        }
    
    const updatedEmpleado = {
        nombre: req.body.EmpNombre || empleado.EmpNombre,
        Email: req.body.EmpEmail || empleado.EmpEmail,
        telefono: req.body.EmpTelefono || empleado.EmpTelefono,
        IdEmpleado: req.body.IdEmpleado || empleado.IdEmpleado,
    };

    const result = await Empleado.update(req.params.id, updatedEmpleado);
    res.status(200).json({message:'Actualización Completada'});
  } catch (error) {
    console.error('Error al actualizar informacion del empleado:', error);
    res.status(500).json({ message: 'Error al actualizar informacion del empleado' });
  }
}

//Eliminar un empleado por id
exports.delete = async (req, res) => {
    try {
      const empleado = await Empleado.getById(req.params.id);
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      
      await Empleado.delete(req.params.id);
      res.status(200).json({ message: 'Empleado eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      res.status(500).json({ message: 'Error al eliminar empleado' });
    }
  };
  