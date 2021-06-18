const { response } = require("express");
const { path } = require("../database/models/_index");

const pathGetAll = async(req, res = response) => {
    try {
        const { limit = 10, offset = 0 } = req.query;

        let dbpaths = await path.findAndCountAll({
            offset: Number(offset),
            limit: Number(limit)
        });

        if (!dbpaths) {
            return res.status(400).json({
                error: 'There is a problem with get all paths from the DB.'
            });
        }

        return res.status(200).json({
            totalRecords: dbpaths.count,
            limit,
            offset,
            paths: dbpaths.rows
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const pathGet = async(req, res = response) => {
    try {
        const { id } = req.params;

        let dbpath = await path.findOne({
            where: {
                id_path: id
            }
        });

        if (!dbpath) {
            return res.status(400).json({
                error: `The path with id ${id} doesn't exist.`
            });
        }

        // Delete the fields not necessary
        const {...newObj } = dbUser.dataValues;

        return res.status(200).json({
            path: newObj
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const pathPost = async(req, res = response) => {
    try {

        // Create new path
        let newPath = await path.create({
            name: req.body.name,
            path: req.body.path
        });

        if (!newPath) {
            return res.status(400).json({
                error: 'There is a problem with the new path to create, please verify the data.'
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

const pathPut = async(req, res = response) => {
    try {

        const { id } = req.params;

        // Find the path in the DB
        const dbpath = await path.findOne({ where: { id_path: id } });
        if (!dbpath) {
            return res.status(400).json({
                error: `The path with id ${id} doesn't exist.`
            });
        }

        let data = {
            name: req.body.name,
            path: req.body.path,
            menu: req.body.menu,
            status: req.body.status
        };

        // Update the path
        let update = await dbpath.update(data);

        // Delete the fields not necessary
        const {...pathUpdated } = update.dataValues;

        return res.status(200).json({
            path: pathUpdated
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const pathDelete = async(req, res = response) => {
    try {

        const { id } = req.params;

        // Find the path in the DB
        const dbpath = await path.findOne({ where: { id_path: id } });
        if (!dbpath) {
            return res.status(400).json({
                error: `The path with id ${id} doesn't exist.`
            });
        }

        // Update the path
        let update = await dbpath.update({
            status: false
        });

        // Delete the fields not necessary
        const {...pathUpdated } = update.dataValues;

        return res.status(200).json({
            path: pathUpdated
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

module.exports = {
    pathGetAll,
    pathGet,
    pathPost,
    pathPut,
    pathDelete
}