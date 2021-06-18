const { Router } = require('express');
const { check } = require('express-validator');
const { roleGet, roleGetAll, rolePost, rolePut, roleDelete } = require('../controllers/roleController');
const { checkJWT, checkFields, checkRoles } = require('../helpers/_index');

const router = Router();
const route_name = "/role";

router.get(route_name, [
    checkJWT,
    checkRoles,
    checkFields
], roleGetAll);

router.get(route_name + "/:id", [
    checkJWT,
    checkRoles,
    checkFields
], roleGet);

router.post(route_name, [
    checkJWT,
    checkRoles,
    check('name', 'The name is necessary').not().isEmpty(),
    check('name', 'The name must be a string').isString(),
    check('name', 'The length of the name must be between 3 and 30 characters').isLength({ min: 3, max: 30 }),
    checkFields
], rolePost);

router.put(route_name + "/:id", [
    checkJWT,
    checkRoles,
    check('name', 'The name is necessary').not().isEmpty(),
    check('name', 'The name must be a string').isString(),
    check('name', 'The length of the name must be between 3 and 30 characters').isLength({ min: 3, max: 30 }),
    check('status', 'The status is necessary').not().isEmpty(),
    check('status', 'The status must be a boolean').isBoolean(),
    checkFields
], rolePut);

router.delete(route_name + "/:id", [
    checkJWT,
    checkRoles,
    checkFields
], roleDelete);

module.exports = router;