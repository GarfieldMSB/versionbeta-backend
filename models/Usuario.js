
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { db } = require('../database/config');


const Usuario = db.define('usuario', {
    rut: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario',
    hooks: {
        beforeCreate: (usuario) => {
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(usuario.password, salt);
          }
    }
});

module.exports = {
    Usuario,
}