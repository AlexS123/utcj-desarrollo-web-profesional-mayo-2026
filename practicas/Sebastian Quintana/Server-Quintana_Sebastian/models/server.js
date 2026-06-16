const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.middlewares();
        this.routes();
        this.listen();
    }
    middlewares() {
        this.app.use(express.static('public'));
    }
    routes() {
}
listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor escuchando en puerto" + this.port);
        });
    }
}

module.exports = Server;