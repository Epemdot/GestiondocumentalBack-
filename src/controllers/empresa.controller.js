const Empresa = require('../models/empresa.model');

//consultar todas las empresas

exports.getAll = async (req, res) => {
    try{
        const empresas = await Empresa.getAll ();
        res.status(200).json(empresas);
    } catch (error) {
        console.error('Error al obtener Empresas:', error);
        res.status(500).json({message:'error al obtener empresas'});
    }
};
//consultar empresa por id
exports.getByid = async (req, res) => {
    try {
        const empresa = await Empresa.getById(req.params.id);
        if (!empresa){
            return res.status(404).json({message:'Empresa no encontrada'});
        }
        res.status(200).json(empresa);
    } catch (error){
        console.error('Error al obtener empresa', error);
        res.status(500).json({message: 'Error al obtener empresa'});
    }
};
//Crear nueva empresa
exports.create = async (req,res) =>{
    try{
        const newEmpresa ={
            nombre: req.body.EmpNombre,
            direccion: req.body.EmpDireccion,
            telefono: req.body.EmpTelefono
        };
        const result = await Empresa.create(newEmpresa);
        res.status(201).json(result);
    } catch (error){
        console.error('Error al crear empresa:', error);
        res.status(500).json({message:'Error al crear una empresa'});
    }
};
//Editar empresa existente
exports.update = async (req,res) =>{
    try{
        const empresa = await Empresa.getById(req.params.id);
        if (!empresa){
            return res.status(404).json({message:'Empresa no encontrada'});
        }
    
    const updatedEmpresa = {
        nombre: req.body.EmpNombre ||empresa.EmpNombre,
        direccion: req.body.EmpDireccion || empresa.EmpDireccion,
        telefono: req.body.EmpTelefono || empresa.EmpTelefono
    };

    const result = await Empresa.update(req.params.id, updatedEmpresa);
    res.status(200).json({message:'Actualización Completada'});
  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    res.status(500).json({ message: 'Error al actualizar empresa' });
  }
}

//Eliminar una empresa por id
exports.delete = async (req, res) => {
    try {
      const empresa = await Empresa.getById(req.params.id);
      if (!empresa) {
        return res.status(404).json({ message: 'Empresa no encontrada' });
      }
      
      await Empresa.delete(req.params.id);
      res.status(200).json({ message: 'Empresa eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
      res.status(500).json({ message: 'Error al eliminar empresa' });
    }
  };
  