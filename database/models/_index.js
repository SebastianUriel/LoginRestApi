const rol = require('./role');
const path = require('./path');
const path_role = require('./pathRole');
const user = require('./user');
const user_role = require('./userRole');

module.exports = {
    ...rol,
    ...path,
    ...path_role,
    ...user,
    ...user_role
}