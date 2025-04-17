const {pool} = require('../config/database');

class Abogado{

    //Mostrar todas los Abogados
    static async getAll(){
        try{
            const[rows] = await pool.query('SELECT * FROM Abogados');
            return rows;
        }
        catch (error){
            throw error;
        }
    }

    //Mostrar Abogados por ID
    static async getById(IdAbogado){
        try {
            const [rows] = await pool.query('SELECT * FROM Abogados WHERE IdAbogado  =?',[IdAbogado]);
            return rows[0];
        }
        catch (error)
        {
            throw error;
        }
    }

    // Actualizar un Abogado
    static async update(IdAbogado, abogadoData) {
        try {
            const [result] = await pool.query(
                'UPDATE Abogados SET AboNombre = ?, AboEmail = ?, AboTelefono = ? WHERE IdEmpleado = ?',
                [abogadoData.nombre, abogadoData.Email, abogadoData.telefono, abogadoData.IdEmpleado]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    //Crear un nuevo abogado
    static async create(abogado) {
        try {
            const [result] = await pool.query(
                'INSERT INTO Abogados (AboNombre, AboEmail, AboTelefono, IdEmpleado) VALUES (?, ?, ?, ?)',
                [abogado.Nombre, abogado.Email, abogado.Telefono, abogado.IdEmpleado]
            );
            return {
                IdAbogado: result.insertId,
                ...abogado
            };
        } catch (error) {
            throw error;
        }
    }
    
    //Eliminar un Abogado
    static async delete(IdAbogado){
        try {
            await pool.query('DELETE FROM Abogados WHERE IdAbogado = ?', [IdAbogado]);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = Abogado;
    