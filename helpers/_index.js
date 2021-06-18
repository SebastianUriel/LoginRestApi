const checkFields = require('./check-fields');
const checkJWT = require('./check-jwt');
const generateJWT = require('./generate-jwt');
const checkRoles = require('./check-roles');

module.exports = {
    ...checkFields,
    ...checkJWT,
    ...generateJWT,
    ...checkRoles
}