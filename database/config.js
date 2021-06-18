const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

const dbConnection = async() => {
    await sequelize.authenticate()
        .then(() => {
            console.log(`${process.env.DB_NAME} is connected...`);
        })
        .catch(err => {
            console.log(`${process.env.DB_NAME} isn't connected: ${err.toString()}...`);
        });
}

const dbDisconnection = async() => {
    await sequelize.close()
        .then(() => {
            console.log(`${process.env.DB_NAME} is disconnected...`);
        })
        .catch(err => {
            console.log(`${process.env.DB_NAME} isn't disconnected: ${err.toString()}...`);
        });
}

module.exports = {
    sequelize,
    dbConnection,
    dbDisconnection
}