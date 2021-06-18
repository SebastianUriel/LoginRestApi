const { path_role, user_role, path, role } = require('../database/models/_index');

const checkRoles = async(req, res, next) => {
    try {
        if (!req.userAuth) {
            return res.status(500).json({
                error: 'It`s necessary a user identified.'
            });
        }

        // Search the User's Roles
        const { id_user, name } = req.userAuth;
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
                if (req.originalUrl.includes(value.path)) {
                    flg = true;
                    break;
                }
            }
        }

        if (flg) {
            next();
        } else {
            return res.status(401).json({
                error: `The user '${name}' is not allowed to this path ${req.originalUrl}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: `There is a problem with the validations of the user's roles.`,
            message: error
        });
    }
}

module.exports = {
    checkRoles
}