import express from 'express';
import cors from 'cors';

import noticiaRoute from './router/noticias.route'
import usuarioRoute from './router/usuario.route'
import pedidoRoute from './router/pedido.route'
import jogoRoute from './router/jogo.route'
import atualizacoesRoute from './router/atualizacoes.route'

export class App {
    public express: express.Application;

    constructor(){
        this.express = express();

        this.middleware();
        this.routes();
    }

    private middleware() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private routes(): void {
        this.express.use('/noticias', noticiaRoute);
        this.express.use('/usuarios', usuarioRoute);
        this.express.use('/pedidos', pedidoRoute);
        this.express.use('/jogos', jogoRoute);
        this.express.use('/tabelasprecos', atualizacoesRoute);
    }

}

export default new App().express;