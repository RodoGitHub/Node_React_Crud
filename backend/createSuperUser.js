const bcrypt = require('bcrypt');
const sequelize = require('./db');
const User = require('./models/User');

const crearSuperUsuario = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    const existingUser = await User.findOne({ where: { email: 'admin@admin.com' } });
    if (existingUser) {
      console.log('Superusuario ya existe');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = await User.create({
      name: 'Super Admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin',
      age: 99
    });

    console.log('Superusuario creado:', user.email);
  } catch (error) {
    console.error('Error creando superusuario:', error);
  } 
};

module.exports = crearSuperUsuario;
