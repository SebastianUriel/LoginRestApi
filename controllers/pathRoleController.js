const { response } = require("express");
const { path_role } = require("../database/models/_index");

const pathRoleGet = async(req, res = response) => {
    try {
        const { id } = req.params;

        let dbpathRoles = await path_role.findAll({
            where: {
                id_path: id
            }
        });

        if (!dbpathRoles) {
            return res.status(400).json({
                error: `The path with id ${id} doesn't exist.`
            });
        }

        // Delete the fields not necessary
        let pathRoles = [];
        for (let value of dbpathRoles) {
            const {...newObj } = value.dataValues;
            pathRoles.push(newObj);
        }

        return res.status(200).json({
            pathRoles
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const pathRolePost = async(req, res = response) => {
    try {
        const { id_path, id_role } = req.body;

        // Create new path role
        let newpathRole = await path_role.create({
            id_path,
            id_role
        });

        if (!newpathRole) {
            return res.status(400).json({
                error: 'There is a problem with the new path role to create, please verify the data.'
            });
        }

        // Delete the fields not necessary
        const {...dbpathRole } = newpathRole.dataValues;

        return res.status(200).json({
            pathRole: dbpathRole
        });
    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }

}

const pathRoleDelete = async(req, res = response) => {
    try {
        const { id_path, id_role } = req.body;

        // Delete the path role
        await path_role.destroy({
            where: {
                id_path,
                id_role
            }
        });

        return res.status(200).json({
            message: `path with id: ${id_path} and role id: ${id_role} was eliminated.`
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

module.exports = {
    pathRoleGet,
    pathRolePost,
    pathRoleDelete
}