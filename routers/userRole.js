const { Router } = require('express');
const { check } = require('express-validator');
const { userRoleGet, userRolePost, userRoleDelete } = require('../controllers/userRoleController');
const { checkJWT, checkFields, checkRoles } = require('../helpers/_index');

const router = Router();
const route_name = "/userRole";

router.get(route_name + "/:id", [
    checkJWT,
    checkRoles,
    checkFields
], userRoleGet);

router.post(route_name, [
    checkJWT,
    checkRoles,
    check('id_user', 'The user id is necessary').not().isEmpty(),
    check('id_user', 'The user id must be a number').isNumeric(),
    check('id_role', 'The role id is necessary').not().isEmpty(),
    check('id_role', 'The role id must be a number').isNumeric(),
    checkFields
], userRolePost);

router.delete(route_name, [
    checkJWT,
    checkRoles,
    check('id_user', 'The user id is necessary').not().isEmpty(),
    check('id_user', 'The user id must be a number').isNumeric(),
    check('id_role', 'The role id is necessary').not().isEmpty(),
    check('id_role', 'The role id must be a number').isNumeric(),
    checkFields
], userRoleDelete);

module.exports = router;