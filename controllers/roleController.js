const { response } = require("express");
const { role } = require("../database/models/_index");

const roleGetAll = async(req, res = response) => {
    try {
        const { limit = 10, offset = 0 } = req.query;

        let dbRoles = await role.findAndCountAll({
            offset: Number(offset),
            limit: Number(limit)
        });

        if (!dbRoles) {
            return res.status(400).json({
                error: 'There is a problem with get all roles from the DB.'
            });
        }

        return res.status(200).json({
            totalRecords: dbRoles.count,
            limit,
            offset,
            roles: dbRoles.rows
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const roleGet = async(req, res = response) => {
    try {
        const { id } = req.params;

        let dbRole = await role.findOne({
            where: {
                id_role: id
            }
        });

        if (!dbRole) {
            return res.status(400).json({
                error: `The role with id ${id} doesn't exist.`
            });
        }

        // Delete the fields not necessary
        const {...newObj } = dbUser.dataValues;

        return res.status(200).json({
            role: newObj
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const rolePost = async(req, res = response) => {
    try {

        const { name } = req.body;

        // Create new role
        let newPath = await role.create({
            name
        });

        if (!newPath) {
            return res.status(400).json({
                error: 'There is a problem with the new role to create, please verify the data.'
            });
        }

        // Delete the fields not necessary
        const {...dbPath } = newPath.dataValues;

        return res.status(200).json({
            path: dbPath
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const rolePut = async(req, res = response) => {
    try {

        const { id } = req.params;
        const { name, status } = req.body;

        // Find the role in the DB
        const dbRole = await role.findOne({ where: { id_role: id } });
        if (!dbRole) {
            return res.status(400).json({
                error: `The role with id ${id} doesn't exist.`
            });
        }

        let data = {
            name,
            status
        };

        // Update the role
        let update = await dbRole.update(data);

        // Delete the fields not necessary
        const {...roleUpdated } = update.dataValues;

        return res.status(200).json({
            role: roleUpdated
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const roleDelete = async(req, res = response) => {
    try {

        const { id } = req.params;

        // Find the role in the DB
        const dbRole = await role.findOne({ where: { id_role: id } });
        if (!dbRole) {
            return res.status(400).json({
                error: `The role with id ${id} doesn't exist.`
            });
        }

        // Update the role
        let update = await dbRole.update({
            status: false
        });

        // Delete the fields not necessary
        const {...roleUpdated } = update.dataValues;

        return res.status(200).json({
            role: roleUpdated
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

module.exports = {
    roleGetAll,
    roleGet,
    rolePost,
    rolePut,
    roleDelete
}