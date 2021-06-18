const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const role = sequelize.define('role', {
    id_role: {
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
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'role',
    timestamps: false
});

module.exports = {
    role
}