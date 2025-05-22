const bcrypt = require('bcrypt');
const User = require('../models/User');

const getUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ data: users, message: 'Usuarios encontrados' });
    } catch (error) {
        console.error("Error leyendo usuarios:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ data: user, message: 'Usuario encontrado' });
    } catch (error) {
        console.error("Error leyendo usuario:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, age, password, role} = req.body;

        const existingUserEmail = await User.findOne({ where: { email } });
        if (existingUserEmail) {
            return res.status(409).json({ message: 'El email ya existe' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, age, password: hashedPassword, role });
        res.status(201).json({ data: newUser, message: 'Usuario creado correctamente' });
    } catch (error) {
        console.error("Error creando usuario:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const updateUser = async (req, res) => {
    try {
        const { name, email, age, password, role} = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (age !== undefined) user.age = age;

        const hashedPassword = await bcrypt.hash(password, 10);
        if (password !== undefined) user.password = hashedPassword;
        if (role !== undefined) user.role = role;

        await user.save();
        res.status(200).json({ data: user, message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error("Error actualizando usuario:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        await user.destroy();
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
