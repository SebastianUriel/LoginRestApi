const { response } = require("express");
const { user, user_role, role } = require("../database/models/_index");
const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');

const userGetAll = async(req, res = response) => {
    try {
        const { limit = 10, offset = 0 } = req.query;

        let dbUsers = await user.findAndCountAll({
            offset: Number(offset),
            limit: Number(limit)
        });

        if (!dbUsers) {
            return res.status(400).json({
                error: 'There is a problem with get all users from the DB.'
            });
        }

        let users = [];
        for (let value of dbUsers.rows) {
            // Delete the fields not necessary
            const { password, ...dbUser } = value.dataValues;

            // Find the roles of the user
            let dbRoles = await role.findAll({
                include: [{
                    model: user_role,
                    required: true,
                    where: {
                        id_user: value.dataValues.id_user
                    }
                }],
            });

            let roles = [];
            if (dbRoles) {
                for (let val of dbRoles) {
                    let object = {
                        id_role: val.id_role,
                        name: val.name
                    }
                    roles.push(object);
                }
            }
            dbUser.id_roles = roles;
            users.push(dbUser);
        }

        return res.status(200).json({
            totalRecords: dbUsers.count,
            limit,
            offset,
            users
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const userGet = async(req, res = response) => {
    try {
        const { id } = req.params;

        let dbUser = await user.findOne({
            where: {
                id_user: id
            }
        });

        if (!dbUser) {
            return res.status(400).json({
                error: `The user with id ${id} doesn't exist.`
            });
        }

        // Delete the fields not necessary
        const { password, ...newObj } = dbUser.dataValues;

        // Find the roles of the user
        let dbRoles = await role.findAll({
            include: [{
                model: user_role,
                required: true,
                where: {
                    id_user: id
                }
            }],
        });

        let roles = [];
        if (dbRoles) {
            for (let value of dbRoles) {
                let object = {
                    id_role: value.id_role,
                    name: value.name
                }
                roles.push(object);
            }
        }

        newObj.id_roles = roles;

        return res.status(200).json({
            user: newObj
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const userPost = async(req, res = response) => {
    try {
        const { name, last_name, email, birthday } = req.body;
        let encryptPass = req.body.password;

        // Encrypt the password
        const salt = bcryptjs.genSaltSync();
        encryptPass = bcryptjs.hashSync(encryptPass, salt);

        // Create new user
        let newUser = await user.create({
            name,
            last_name,
            email,
            birthday,
            password: encryptPass,
            createdAt: Sequelize.fn('NOW'),
            updatedAt: Sequelize.fn('NOW')
        });

        if (!newUser) {
            return res.status(400).json({ error: 'There is a problem with the new user to create, please verify the data.' });
        }

        // Delete the fields not necessary
        const { password, createdAt, updatedAt, ...dbUser } = newUser.dataValues;

        return res.status(200).json({
            user: dbUser
        });
    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }

}

const userPut = async(req, res = response) => {
    try {
        const { id } = req.params;
        const { name, last_name, email, birthday, status } = req.body;
        let encryptPass = req.body.password;


        // Find the user in the DB
        const dbUser = await user.findOne({ where: { id_user: id } });
        if (!dbUser) {
            return res.status(400).json({
                error: `The user with id ${id} doesn't exist.`
            });
        }

        let data = {
            name,
            last_name,
            email,
            birthday,
            updatedAt: Sequelize.fn('NOW'),
            status
        };

        // Encrypt the password
        if (encryptPass) {
            const salt = bcryptjs.genSaltSync();
            encryptPass = bcryptjs.hashSync(encryptPass, salt);
            data.password = encryptPass;
        }

        // Update the user
        let update = await dbUser.update(data);

        // Delete the fields not necessary
        const { password, createdAt, updatedAt, ...userUpdated } = update.dataValues;

        return res.status(200).json({
            user: userUpdated
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

const userDelete = async(req, res = response) => {
    try {
        const { id } = req.params;

        // Find the user in the DB
        const dbUser = await user.findOne({ where: { id_user: id } });
        if (!dbUser) {
            return res.status(400).json({
                error: `The user with id ${id} doesn't exist.`
            });
        }

        // Update the user
        let update = await dbUser.update({
            updatedAt: Sequelize.fn('NOW'),
            status: false
        });

        // Delete the fields not necessary
        const { password, createdAt, updatedAt, ...userUpdated } = update.dataValues;

        return res.status(200).json({
            user: userUpdated
        });

    } catch (error) {
        return res.status(500).json({
            error: 'There is a problem with the service.',
            message: error
        });
    }
}

module.exports = {
    userGetAll,
    userGet,
    userPost,
    userPut,
    userDelete
}