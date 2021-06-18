const { Router } = require('express');
const { check } = require('express-validator');
const { login, checkRole } = require('../controllers/authController');
const { checkJWT, checkFields } = require('../helpers/_index');

const router = Router();

router.post('/login', [
    check('email', 'The email is necessary').isEmail(),
    check('password', 'The password is necessary').not().isEmpty(),
    check('password', 'The password must be a string').isString(),
    checkFields
], login);

router.get('/check/role', [
    checkJWT,
    check('path_name', 'The path name is necessary').not().isEmpty(),
    check('path_name', 'The path name must be a string').isString(),
    checkFields
], checkRole);

module.exports = router;