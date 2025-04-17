const Asistente = require('../models/asistente.model');

//consultar todos los Asistentes
exports.getAll = async (req, res) => {
    try{
        const asistente = await Asistente.getAll ();
        res.status(200).json(asistente);
    } catch (error) {
        console.error('Error al obtener Asistentes:', error);
        res.status(500).json({message:'error al obtener Asistentes'});
    }
};

//consultar asistentes por id
exports.getByid = async (req, res) => {
    try {
        const asistente = await Asistente.getById(req.params.id);
        if (!asistente){
            return res.status(404).json({message:'ASistente no encontrado'});
        }
        res.status(200).json(asistente);
    } catch (error){
        console.error('Error al obtener Asistente', error);
        res.status(500).json({message: 'Error al obtener Asistente'});
    }
};

//Crear nuevo ASistente
exports.create = async (req, res) => {
    try {
        const newAsistente = {
            Nombre: req.body.AsiNombre,
            Email: req.body.AsiEmail,
            Telefono: req.body.AsiTelefono,
            IdAbogado: req.body.IdAbogado
        };

        const result = await Asistente.create(newAsistente); // Verifica esta línea
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al crear nuevo Asistente:', error);
        res.status(500).json({ message: 'Error al crear un nuevo Asistente' });
    }
};

//Editar Asistente existente
exports.update = async (req,res) =>{
    try{
        const asistente = await Asistente.getById(req.params.id);
        if (!asistente){
            return res.status(404).json({message:'Asistente no encontrado'});
        }
    
    const updateAsistente = {

        nombre: req.body.AsiNombre || asistente.AsiNombre,
        Email: req.body.AsiEmail || asistente.AsiEmail,
        telefono: req.body.AsiTelefono || asistente.AsiTelefono,
        IdAbogado: req.body.IdAbogado || asistente.IdAbogado
    };

    const result = await Asistente.update(req.params.id, updateAsistente);
    res.status(200).json({message:'Actualización Completada'});
  } catch (error) {
    console.error('Error al actualizar informacion del Asistente:', error);
    res.status(500).json({ message: 'Error al actualizar informacion del Asistente' });
  }
}

//Eliminar un Asistente por id
exports.delete = async (req, res) => {
    try {
      const asistente = await Asistente.getById(req.params.id);
      if (!asistente) {
        return res.status(404).json({ message: 'Asistente no encontrado' });
      }
      
      await Asistente.delete(req.params.id);
      res.status(200).json({ message: 'Asistente eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar Asistente:', error);
      res.status(500).json({ message: 'Error al eliminar Asistente' });
    }
  };
  