import { Router } from 'express';
import noticiasController from '../controller/noticias.controller'

class NoticiasRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de noticias
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(noticiasController.findAll)
            .post(noticiasController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(noticiasController.findByID)
            .put(noticiasController.update)
            .delete(noticiasController.delete);
    }

}

export default new NoticiasRoute().router;