import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { NoticiasEntity } from "../entity/noticias.entity";

class NoticiasController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const noticias: NoticiasEntity[] = await getRepository(NoticiasEntity).find();
            res.send(noticias);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const noticia = req.body;

        try {

            await getRepository(NoticiasEntity).save( noticia );
            res.status(201).send(noticia);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const noticia = await getRepository(NoticiasEntity).findOne(id);

            //Se não exnotrar uma noticia, devolve erro 404
            if (noticia) {
                res.send(noticia);    
            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Buscar o registro pela ID
            const noticia = await getRepository(NoticiasEntity).findOne(id);

            //Se não exnotrar uma noticia, devolve erro 404
            if (noticia) {
                //Atualizar o registro
                await getRepository(NoticiasEntity).update(noticia.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = noticia.id;
                
                res.send(novo);

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const noticia = await getRepository(NoticiasEntity).findOne(id);

            //Se não exnotrar uma noticia, devolve erro 404
            if (noticia) {
                //Excluir o registro
                await getRepository(NoticiasEntity).delete(noticia);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new NoticiasController();