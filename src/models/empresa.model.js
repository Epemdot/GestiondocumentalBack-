const {pool} = require('../config/database');

class Empresa{

    //Mostrar todas las empresas
    static async getAll(){
        try{
            const[rows] = await pool.query('SELECT * FROM Empresas');
            return rows;
        }
        catch (error){
            throw error;
        }
    }

    //Mostrar Empresa por ID
    static async getById(IdEmpresa){
        try {
            const [rows] = await pool.query('SELECT * FROM Empresas WHERE IdEmpresa  =?',[IdEmpresa]);
            return rows[0];
        }
        catch (error)
        {
            throw error;
        }
    }

    // Actualizar una empresa
    static async update(IdEmpresa, empresaData) {
        try {
            const [result] = await pool.query(
                'UPDATE Empresas SET EmpNombre = ?, EmpDireccion = ?, EmpTelefono = ? WHERE IdEmpresa = ?',
                [empresaData.nombre, empresaData.direccion, empresaData.telefono, IdEmpresa]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    //Crear una nueva empresa
    static async create(empresa) {
        try {
            const [result] = await pool.query(
                'INSERT INTO Empresas (EmpNombre, EmpDireccion, EmpTelefono) VALUES (?, ?, ?)',
                [empresa.nombre, empresa.direccion, empresa.telefono]
            );
            return {
                IdEmpresa: result.insertId,
                ...empresa
            };
        } catch (error) {
            throw error;
        }
    }
    
    //Eliminar una empresa
    static async delete(IdEmpresa){
        try {
            await pool.query('DELETE FROM Empresas WHERE IdEmpresa = ?', [IdEmpresa]);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = Empresa;
    

