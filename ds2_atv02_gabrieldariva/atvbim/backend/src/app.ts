import express from 'express';
import cors from 'cors';
import {createServer, Server} from 'http';
import socketIO from 'socket.io';

import alugar_jogoRoute from './router/alugar_jogo.router'
import atualizacoesRoute from './router/atualizacoes.router'
import jogoRoute from './router/jogo.router'
import noticiaRoute from './router/noticia.router'
import usuarioRoute from './router/usuario.router'

export class App {
    private express: express.Application;
    private io: SocketIO.Server;

    public server: Server;

    constructor() {
        this.express = express();

        this.middleware();
        this.socket();//Somente se utilizar socket
        this.routes();
    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    //Somente se utilizar socket
    private socket(): void {
        this.server = createServer( this.express );
        this.io = socketIO(this.server);
    }

    private routes(): void {
        //Somente se utilizar socket
        this.express.use((req, res, next) => {
            req.io = this.io;
            
            next();
        });

        this.express.use('/alugar', alugar_jogoRoute);
        this.express.use('/atualizacoes', atualizacoesRoute);
        this.express.use('/jogos', jogoRoute);
        this.express.use('/noticias', noticiaRoute);
        this.express.use('/usuarios', usuarioRoute);
    }

}

export default new App();
