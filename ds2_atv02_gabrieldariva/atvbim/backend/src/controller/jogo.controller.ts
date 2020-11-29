import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { JogoEntity } from "../entity/jogo.entity";

class JogoController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const jogos: JogoEntity[] = await getRepository(JogoEntity).find();
            res.send(jogos);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const jogo = req.body;

        try {

            await getRepository(JogoEntity).save( jogo );
            
            //Emitir um sinal para o socket cliente
            req.io.emit('createJogo', jogo);

            res.status(201).send(jogo);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const jogo = await getRepository(JogoEntity).findOne(id);

            //Se não exnotrar uma jogo, devolve erro 404
            if (jogo) {
                res.send(jogo);    
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
            const jogo = await getRepository(JogoEntity).findOne(id);

            //Se não exnotrar uma jogo, devolve erro 404
            if (jogo) {
                //Atualizar o registro
                await getRepository(JogoEntity).update(jogo.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = jogo.id;

                const updated = await getRepository(JogoEntity).findOne(id);

                //Emitir um sinal para o socket cliente
                req.io.emit('updateJogo', updated);
                
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
            const jogo = await getRepository(JogoEntity).findOne(id);

            //Se não exnotrar uma jogo, devolve erro 404
            if (jogo) {
                //Excluir o registro
                await getRepository(JogoEntity).delete(jogo);

                //Emitir um sinal para o socket cliente
                req.io.emit('deleteJogo', jogo);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new JogoController();
