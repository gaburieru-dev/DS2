import { Router } from 'express';
import alugarController from '../controller/alugar_jogo.controller'

class AlugarRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de alugar
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(alugarController.findAll)
            .post(alugarController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(alugarController.findByID)
            .put(alugarController.update)
            .delete(alugarController.delete);
    }

}

export default new AlugarRoute().router;
