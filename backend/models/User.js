const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password: {
        type:DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'view',
        validate: {
            isIn: [['admin', 'edit', 'view']], 
        },
    },
});

module.exports = User;
