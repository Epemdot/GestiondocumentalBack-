const {pool} = require('../config/database');

class Asistente{

    //Mostrar todas los Asistentes
    static async getAll(){
        try{
            const[rows] = await pool.query('SELECT * FROM Asistentes');
            return rows;
        }
        catch (error){
            throw error;
        }
    }

    //Mostrar Asistentes por ID
    static async getById(IdAsistente){
        try {
            const [rows] = await pool.query('SELECT * FROM Asistentes WHERE IdAsistente  =?',[IdAsistente]);
            return rows[0];
        }
        catch (error)
        {
            throw error;
        }
    }

    // Actualizar un Asistente
    static async update(IdAsistente, asistenteData) {
        try {
            const [result] = await pool.query(
                'UPDATE Asistentes SET AsiNombre = ?, AsiEmail = ?, AsiTelefono = ? WHERE IdAbogado = ?',
                [asistenteData.nombre, asistenteData.Email, asistenteData.telefono, asistenteData.IdAbogado]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    //Crear un nuevo Asistente
    static async create(asistente) {
        try {
            const [result] = await pool.query(
                'INSERT INTO Asistentes (AsiNombre, AsiEmail, AsiTelefono, IdAbogado) VALUES (?, ?, ?, ?)',
                [asistente.Nombre, asistente.Email, asistente.Telefono, asistente.IdAbogado]
            );
            return {
                IdAsistente: result.insertId,
                ...asistente
            };
        } catch (error) {
            throw error;
        }
    }
    
    //Eliminar un Asistente
    static async delete(IdAsistente){
        try {
            await pool.query('DELETE FROM Asistentes WHERE IdAsistente = ?', [IdAsistente]);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = Asistente;
    