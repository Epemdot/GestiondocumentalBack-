const Abogado = require('../models/abogado.model');

//consultar todos los abogados
exports.getAll = async (req, res) => {
    try{
        const abogado = await Abogado.getAll ();
        res.status(200).json(abogado);
    } catch (error) {
        console.error('Error al obtener Abogados:', error);
        res.status(500).json({message:'error al obtener Abogados'});
    }
};

exports.getAll = async (req, res) => {
    try{
        const abogado = await Abogado.getAll ();
        res.status(200).json(abogado);
    } catch (error) {
        console.error('Error al obtener Abogados:', error);
        res.status(500).json({message:'error al obtener Abogados'});
    }
};

//consultar abogados por id
exports.getByid = async (req, res) => {
    try {
        const abogado = await Abogado.getById(req.params.id);
        if (!abogado){
            return res.status(404).json({message:'Abogado no encontrado'});
        }
        res.status(200).json(abogado);
    } catch (error){
        console.error('Error al obtener Abogado', error);
        res.status(500).json({message: 'Error al obtener Abogado'});
    }
};

//Crear nuevo Abogado
exports.create = async (req, res) => {
    try {
        const newAbogado = {
            Nombre: req.body.AboNombre,
            Email: req.body.AboEmail,
            Telefono: req.body.AboTelefono,
            IdEmpleado : req.body.IdEmpleado
        };

        const result = await Abogado.create(newAbogado); // Verifica esta línea
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al crear nuevo Abogado:', error);
        res.status(500).json({ message: 'Error al crear un nuevo Abogado' });
    }
};

//Editar Abogado existente
exports.update = async (req,res) =>{
    try{
        const abogado = await Abogado.getById(req.params.id);
        if (!abogado){
            return res.status(404).json({message:'Abogado no encontrado'});
        }
    
    const updateAbogado = {

        nombre: req.body.AboNombre || abogado.AboNombre,
        Email: req.body.AboEmail || abogado.AboEmail,
        telefono: req.body.AboTelefono || abogado.AboTelefono,
        idEmpleado: req.body.IdEmpleado || abogado.IdEmpleado
    };

    const result = await Abogado.update(req.params.id, updateAbogado);
    res.status(200).json({message:'Actualización Completada'});
  } catch (error) {
    console.error('Error al actualizar informacion del Abogado:', error);
    res.status(500).json({ message: 'Error al actualizar informacion del Abogado' });
  }
}

//Eliminar un Abogado por id
exports.delete = async (req, res) => {
    try {
      const abogado = await Abogado.getById(req.params.id);
      if (!abogado) {
        return res.status(404).json({ message: 'Abogado no encontrado' });
      }
      
      await Abogado.delete(req.params.id);
      res.status(200).json({ message: 'Abogado eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar Abogado:', error);
      res.status(500).json({ message: 'Error al eliminar Abogado' });
    }
  };
  