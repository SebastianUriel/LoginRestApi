const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const { path } = require('./path');
const { role } = require('./role');

const path_role = sequelize.define('path_role', {
    id_path: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_role: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'path_role',
    timestamps: false
});

path_role.belongsTo(path, { foreignKey: 'id_path' });
path_role.belongsTo(role, { foreignKey: 'id_role' });
path.hasMany(path_role, { foreignKey: 'id_path' });
role.hasMany(path_role, { foreignKey: 'id_role' });

module.exports = {
    path_role
}