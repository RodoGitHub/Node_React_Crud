const { Sequelize } = require('sequelize');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'database', 'database.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: DB_PATH,
    logging: false,
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa');
        
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            console.log('Sincronización de modelos completada');
        }
    } catch (err) {
        console.error('Error al conectar la base de datos:', err);
        process.exit(1);
    }
}

connectDB();

module.exports = sequelize;