import { Router } from 'express';
import atualizacoesController from '../controller/atualizacoes.controller'

class AtualizacoesRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de atualizacoes
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(atualizacoesController.findAll)
            .post(atualizacoesController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(atualizacoesController.findByID)
            .put(atualizacoesController.update)
            .delete(atualizacoesController.delete);
    }

}

export default new AtualizacoesRoute().router;
