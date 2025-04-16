const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gestiondocumental',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para verificar conexión
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`Conexión a base de datos ${process.env.DB_NAME || 'gestiondocumental'} 
        establecida correctamente en modo ${process.env.NODE_ENV || 'desarrollo'}`);
        connection.release();
        return true;
    } catch (error) {
        console.error(`[ERROR DB] No se pudo conectar a 
            ${process.env.DB_NAME || 'gestiondocumental'}: ${error.message}`);
        // En producción podríamos querer intentar reconectar
        if (process.env.NODE_ENV === 'production') {
            console.log('Reintentando conexión en 5 segundos...');
            setTimeout(testConnection, 5000);
        }
        return false;
    }
};

// Función para ejecutar queries con manejo de errores
const executeQuery = async (sql, params = []) => {
    try {
      const [results] = await pool.execute(sql, params);
      return results;
    } catch (error) {
      console.error(`[ERROR QUERY] ${error.message} en: ${sql}`);
      throw error;
    }
};
  
// Función para cerrar la pool al terminar la aplicación
const closePool = async () => {
    try {
      await pool.end();
      console.log('Conexión a la base de datos cerrada correctamente');
    } catch (err) {
      console.error('Error al cerrar la conexión a la base de datos:', err);
    }
};
  
// Manejo de señales para cerrar adecuadamente
process.on('SIGINT', async () => {
    await closePool();
    process.exit(0);
});

// Exportamos las funciones y la pool
module.exports = { 
    pool, 
    testConnection, 
    executeQuery,
    closePool
};


