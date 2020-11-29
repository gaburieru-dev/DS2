import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { NoticiaEntity } from "../entity/noticia.entity";

class NoticiaController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const noticias: NoticiaEntity[] = await getRepository(NoticiaEntity).find();
            res.send(noticias);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const noticia = req.body;

        try {

            await getRepository(NoticiaEntity).save( noticia );
            
            //Emitir um sinal para o socket cliente
            req.io.emit('createNoticia', noticia);

            res.status(201).send(noticia);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const noticia = await getRepository(NoticiaEntity).findOne(id);

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
            const noticia = await getRepository(NoticiaEntity).findOne(id);

            //Se não exnotrar uma noticia, devolve erro 404
            if (noticia) {
                //Atualizar o registro
                await getRepository(NoticiaEntity).update(noticia.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = noticia.id;

                const updated = await getRepository(NoticiaEntity).findOne(id);

                //Emitir um sinal para o socket cliente
                req.io.emit('updateNoticia', updated);
                
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
            const noticia = await getRepository(NoticiaEntity).findOne(id);

            //Se não exnotrar uma noticia, devolve erro 404
            if (noticia) {
                //Excluir o registro
                await getRepository(NoticiaEntity).delete(noticia);

                //Emitir um sinal para o socket cliente
                req.io.emit('deleteNoticia', noticia);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new NoticiaController();
