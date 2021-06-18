const { Router } = require('express');
const { check } = require('express-validator');
const { pathGet, pathGetAll, pathPost, pathPut, pathDelete } = require('../controllers/pathController');
const { checkJWT, checkFields, checkRoles } = require('../helpers/_index');

const router = Router();
const route_name = "/path";

router.get(route_name, [
    checkJWT,
    checkRoles,
    checkFields
], pathGetAll);

router.get(route_name + "/:id", [
    checkJWT,
    checkRoles,
    checkFields
], pathGet);

router.post(route_name, [
    checkJWT,
    checkRoles,
    check('name', 'The name is necessary').not().isEmpty(),
    check('name', 'The name must be a string').isString(),
    check('name', 'The length of the name must be between 3 and 30 characters').isLength({ min: 3, max: 30 }),
    check('path', 'The path is necessary').not().isEmpty(),
    check('path', 'The path must be a string').isString(),
    check('path', 'The length of the path must be between 3 and 50 characters').isLength({ min: 3, max: 50 }),
    checkFields
], pathPost);

router.put(route_name + "/:id", [
    checkJWT,
    checkRoles,
    check('name', 'The name is necessary').not().isEmpty(),
    check('name', 'The name must be a string').isString(),
    check('name', 'The length of the name must be between 3 and 30 characters').isLength({ min: 3, max: 30 }),
    check('path', 'The path is necessary').not().isEmpty(),
    check('path', 'The path must be a string').isString(),
    check('path', 'The length of the path must be between 3 and 50 characters').isLength({ min: 3, max: 50 }),
    check('menu', 'The menu is necessary').not().isEmpty(),
    check('menu', 'The menu must be a boolean').isBoolean(),
    check('status', 'The status is necessary').not().isEmpty(),
    check('status', 'The status must be a boolean').isBoolean(),
    checkFields
], pathPut);

router.delete(route_name + "/:id", [
    checkJWT,
    checkRoles,
    checkFields
], pathDelete);

module.exports = router;