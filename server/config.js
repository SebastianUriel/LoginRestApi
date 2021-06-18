const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth: "/v1/api/auth"
        };

        //-- DB
        this.conectarDB();

        //-- Middlewares
        this.middleware();

        //-- Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middleware() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.path.auth, require('../routers/auth'));
        this.app.use(this.path.auth, require('../routers/user'));
        this.app.use(this.path.auth, require('../routers/role'));
        this.app.use(this.path.auth, require('../routers/path'));
        this.app.use(this.path.auth, require('../routers/pathRole'));
        this.app.use(this.path.auth, require('../routers/userRole'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server run on the port: ${this.port}`);
        });
    }

}

module.exports = Server;