const { response } = require("express");
const { user, path_role, user_role, path, role } = require("../database/models/_index");
const { generateJWT } = require("../helpers/_index");
const bcryptjs = require('bcryptjs');

const login = async(req, res = response) => {
    try {
        const { email, password } = req.body;

        let userdb = await user.findAll({ where: { email } });
        userdb = userdb[0];

        // Validation if the email exist
        if (!userdb) {
            return res.status(400).json({ error: 'Email or password are incorrect.' });
        }

        // Validation if the password is correct
        const validPassword = bcryptjs.compareSync(password, userdb.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Email or password are incorrect.' });
        }

        // Validation if the user is desactivated
        if (!userdb.status) {
            return res.status(400).json({ error: 'The account is desactivated.' });
        }

        const token = await generateJWT(userdb.id_user);
        res.json({ token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }

}

const checkRole = async(req, res = response) => {
    try {
        const { id_user, name } = req.userAuth;
        const { path_name } = req.body;

        // Search the User's Roles
        let dbPath = await path.findAll({
            include: [{
                model: path_role,
                required: true,
                include: [{
                    model: role,
                    required: true,
                    include: [{
                        model: user_role,
                        required: true,
                        where: {
                            id_user
                        }
                    }]
                }]
            }]
        });

        // Check the paths
        let flg = false;
        if (dbPath) {
            for (let value of dbPath) {
                if (path_name == value.path) {
                    flg = true;
                    break;
                }
            }
        }

        if (flg) {
            return res.status(200).json({
                success: `The user '${name}' is allowed to this path ${path_name}`
            });
        } else {
            return res.status(401).json({
                error: `The user '${name}' is not allowed to this path ${path_name}`
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }

}

module.exports = {
    login,
    checkRole
}