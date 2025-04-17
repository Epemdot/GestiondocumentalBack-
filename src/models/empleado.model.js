const {pool} = require('../config/database');

class Empleado{

    //Mostrar todas los empleados
    static async getAll(){
        try{
            const[rows] = await pool.query('SELECT * FROM Empleados');
            return rows;
        }
        catch (error){
            throw error;
        }
    }

    //Mostrar empleados por ID
    static async getById(IdEmpleado){
        try {
            const [rows] = await pool.query('SELECT * FROM Empleados WHERE IdEmpleado  =?',[IdEmpleado]);
            return rows[0];
        }
        catch (error)
        {
            throw error;
        }
    }

    // Actualizar un Empleado
    static async update(IdEmpleado, empleadoData) {
        try {
            const [result] = await pool.query(
                'UPDATE Empleados SET EmpNombre = ?, EmpEmail = ?, EmpTelefono = ? WHERE IdEmpleado = ?',
                [empleadoData.nombre, empleadoData.Email, empleadoData.telefono, IdEmpleado]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    //Crear un nuevo empleado
    static async create(empleado) {
        try {
            const [result] = await pool.query(
                'INSERT INTO Empleados (EmpNombre, EmpEmail, EmpTelefono, IdEmpresa) VALUES (?, ?, ?, ?)',
                [empleado.Nombre, empleado.Email, empleado.Telefono, empleado.IdEmpresa]
            );
            return {
                IdEmpleado: result.insertId,
                ...empleado
            };
        } catch (error) {
            throw error;
        }
    }
    
    //Eliminar un Empleado
    static async delete(IdEmpleado){
        try {
            await pool.query('DELETE FROM Empleados WHERE IdEmpleado = ?', [IdEmpleado]);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = Empleado;
    
