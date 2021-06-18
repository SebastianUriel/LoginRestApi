const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userGetAll, userPost, userPut, userDelete } = require('../controllers/userController');
const { checkJWT, checkFields, checkRoles } = require('../helpers/_index');

const router = Router();
const route_name = "/user";

router.get(route_name, [
    checkJWT,
    checkRoles,
    checkFields
], userGetAll);

router.get(route_name + "/:id", [
    checkJWT,
    checkRoles,
    checkFields
], userGet);

router.post(route_name, [
    checkJWT,
    checkRoles,
    check('email', 'The email is necessary').isEmail(),
    check('email', 'The length of the email has a maximun of 120 characters').isLength({ max: 120 }),
    check('name', 'The name is necessary').not().isEmpty(),
    check('name', 'The name must be a string').isString(),
    check('name', 'The length of the name must be between 3 and 40 characters').isLength({ min: 3, max: 40 }),
    check('last_name', 'The last name is necessary').not().isEmpty(),
    check('last_name', 'The last name must be a string').isString(),
    check('last_name', 'The length of the last name must be between 3 and 40 characters').isLength({ min: 3, max: 40 }),
    check('password', 'The password is necessary').not().isEmpty(),
    check('password', 'The password must be a string').isString(),
    check('birthday', 'The birthday is necessary').not().isEmpty(),
    check('birthday', 'The birthday must be a string').isString(),
    checkFields
], userPost);

router.put(route_name + "/:id", [
    checkJWT,
    checkRoles,
    check('email', 'The email is necessary').isEmail(),
    check('email', 'The length of the email has a maximun of 120 characters').isLength({ max: 120 }),
    check('name', 'The name is necessary').not().isEmpty(),
    check('name', 'The name must be a string').isString(),
    check('name', 'The length of the name must be between 3 and 40 characters').isLength({ min: 3, max: 40 }),
    check('last_name', 'The last name is necessary').not().isEmpty(),
    check('last_name', 'The last name must be a string').isString(),
    check('last_name', 'The length of the last name must be between 3 and 40 characters').isLength({ min: 3, max: 40 }),
    check('birthday', 'The birthday is necessary').not().isEmpty(),
    check('birthday', 'The birthday must be a string').isString(),
    check('status', 'The status is necessary').not().isEmpty(),
    check('status', 'The status must be a boolean').isBoolean(),
    checkFields
], userPut);

router.delete(route_name + "/:id", [
    checkJWT,
    checkRoles,
    checkFields
], userDelete);

module.exports = router;