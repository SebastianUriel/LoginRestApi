const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const path = sequelize.define('path', {
    id_path: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'path',
    timestamps: false
});

module.exports = {
    path
}