const { Router } = require('express');
const { check } = require('express-validator');
const { pathRoleGet, pathRolePost, pathRoleDelete } = require('../controllers/pathRoleController');
const { checkJWT, checkFields, checkRoles } = require('../helpers/_index');

const router = Router();
const route_name = "/pathRole";

router.get(route_name + "/:id", [
    checkJWT,
    checkRoles,
    checkFields
], pathRoleGet);

router.post(route_name, [
    checkJWT,
    checkRoles,
    check('id_path', 'The path id is necessary').not().isEmpty(),
    check('id_path', 'The path id must be a number').isNumeric(),
    check('id_role', 'The role id is necessary').not().isEmpty(),
    check('id_role', 'The role id must be a number').isNumeric(),
    checkFields
], pathRolePost);

router.delete(route_name, [
    checkJWT,
    checkRoles,
    check('id_path', 'The path id is necessary').not().isEmpty(),
    check('id_path', 'The path id must be a number').isNumeric(),
    check('id_role', 'The role id is necessary').not().isEmpty(),
    check('id_role', 'The role id must be a number').isNumeric(),
    checkFields
], pathRoleDelete);

module.exports = router;