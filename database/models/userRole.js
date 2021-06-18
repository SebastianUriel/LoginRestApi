const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const { user } = require('./user');
const { role } = require('./role');

const user_role = sequelize.define('user_role', {
    id_user: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: "id_user"
        }
    },
    id_role: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: role,
            key: "id_role"
        }
    }
}, {
    tableName: 'user_role',
    timestamps: false
});

user_role.belongsTo(user, { foreignKey: 'id_user' });
user_role.belongsTo(role, { foreignKey: 'id_role' });
user.hasMany(user_role, { foreignKey: 'id_user' });
role.hasMany(user_role, { foreignKey: 'id_role' });

module.exports = {
    user_role
}