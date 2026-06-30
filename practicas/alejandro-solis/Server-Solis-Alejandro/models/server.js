const express = require('express');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT   
        
        this.middlewares();
        this.routes();
        this.listen();
    }
    middlewares(){
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.get('/consultarUsuarios', (req, res) => {
            res.json({
                user: 'Alex',
                pass: '12345',
                rol: 'admin'
            });
        });
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("http://127.0.0.1:" + this.port);
        });
    }
}
module.exports = Server;