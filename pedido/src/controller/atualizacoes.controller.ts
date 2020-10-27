import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AtualizacoesEntity } from "../entity/atualizacoes.entity";

class AtualizacoesController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const atualizacoes: AtualizacoesEntity[] = await getRepository(AtualizacoesEntity).find();
            res.send(atualizacoes);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const atualizacoes = req.body;

        try {

            await getRepository(AtualizacoesEntity).save( atualizacoes );
            res.status(201).send(atualizacoes);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const atualizacoes = await getRepository(AtualizacoesEntity).findOne(id);

            //Se não encotrar uma tabela preco, devolve erro 404
            if (atualizacoes) {
                res.send(atualizacoes);    
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
            const atualizacoes = await getRepository(AtualizacoesEntity).findOne(id);

            //Se não encotrar uma tabela preco, devolve erro 404
            if (atualizacoes) {
                //Atualizar o registro
                await getRepository(AtualizacoesEntity).update(atualizacoes.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = atualizacoes.id;
                
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
            const atualizacoes = await getRepository(AtualizacoesEntity).findOne(id);

            //Se não encotrar uma tabela preco, devolve erro 404
            if (atualizacoes) {
                //Excluir o registro
                await getRepository(AtualizacoesEntity).delete(atualizacoes);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new AtualizacoesController();