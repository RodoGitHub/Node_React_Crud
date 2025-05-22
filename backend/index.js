require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const crearSuperUsuario = require('./createSuperUser'); 

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}));

// Rutas
const userRoutes = require('./routes/users.routes');
app.use('/users', userRoutes);

const productRoutes = require('./routes/products.routes');
app.use('/products', productRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const rolesRoutes = require('./routes/roles.routes');
app.use('/roles', rolesRoutes);


// Sincronizar la base de datos
sequelize.sync({ force: true }).then(async() => {
    console.log("Base de datos sincronizada"); 
    // crea superusuario       
    await crearSuperUsuario();
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
    
}).catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
});
