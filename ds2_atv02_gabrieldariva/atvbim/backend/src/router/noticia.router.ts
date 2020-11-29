import { Router } from 'express';
import noticiaController from '../controller/noticia.controller'

class NoticiaRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de noticia
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(noticiaController.findAll)
            .post(noticiaController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(noticiaController.findByID)
            .put(noticiaController.update)
            .delete(noticiaController.delete);
    }

}

export default new NoticiaRoute().router;