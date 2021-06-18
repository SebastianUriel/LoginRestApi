const { response } = require("express");
const { user_role, role } = require("../database/models/_index");

const userRoleGet = async(req, res = response) => {
    try {
        const { id } = req.params;

        let dbUserRoles = await role.findAll({
            include: [{
                model: user_role,
                required: true,
                where: {
                    id_user: id
                }
            }],
        });

        if (!dbUserRoles) {
            return res.status(400).json({
                error: `The user with id ${id} doesn't exist.`
            });
        }

        // Delete the fields not necessary
        let userRoles = [];
        for (let value of dbUserRoles) {
            const { user_roles, status, ...newObj } = value.dataValues;
            userRoles.push(newObj);
        }

        return res.status(200).json({
            userRoles
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const userRolePost = async(req, res = response) => {
    try {
        const { id_user, id_role } = req.body;

        // Create new user role
        let newUserRole = await user_role.create({
            id_user,
            id_role
        });

        if (!newUserRole) {
            return res.status(400).json({
                error: 'There is a problem with the new user role to create, please verify the data.'
            });
        }

        // Delete the fields not necessary
        const {...dbUseRole } = newUserRole.dataValues;

        return res.status(200).json({
            userRole: dbUseRole
        });
    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }

}

const userRoleDelete = async(req, res = response) => {
    try {
        const { id_user, id_role } = req.body;

        // Delete the user role
        await user_role.destroy({
            where: {
                id_user,
                id_role
            }
        });

        return res.status(200).json({
            message: `User with id: ${id_user} and role id: ${id_role} was eliminated.`
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

module.exports = {
    userRoleGet,
    userRolePost,
    userRoleDelete
}