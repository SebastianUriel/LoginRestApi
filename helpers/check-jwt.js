const { user } = require('../database/models/_index');
const jwt = require("jsonwebtoken");

const checkJWT = async(req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ error: 'There is not request with token.' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
        let userAuth = await user.findAll({ where: { id_user: uid } });

        userAuth = userAuth[0];
        if (!userAuth) {
            return res.status(401).json({ error: 'The user doesn`t exist.' });
        }

        if (!userAuth.status) {
            return res.status(401).json({ error: 'The user is desactivated.' });
        }
        req.userAuth = userAuth;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'There is a problem with the token.',
            message: error
        });
    }
}

module.exports = {
    checkJWT
}