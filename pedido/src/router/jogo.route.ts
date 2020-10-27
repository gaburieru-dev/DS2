import { Router } from 'express';
import jogoController from '../controller/jogo.controller'

class JogoRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de jogo
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(jogoController.findAll)
            .post(jogoController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(jogoController.findByID)
            .put(jogoController.update)
            .delete(jogoController.delete);
    }

}

export default new JogoRoute().router;