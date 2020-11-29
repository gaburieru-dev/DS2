import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AlugarEntity } from "../entity/alugar_jogo.entity";

class AlugarController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const alugars: AlugarEntity[] = await getRepository(AlugarEntity).find();
            res.send(alugars);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const alugar = req.body;

        try {

            await getRepository(AlugarEntity).save( alugar );
            
            //Emitir um sinal para o socket cliente
            req.io.emit('createAlugar', alugar);

            res.status(201).send(alugar);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const alugar = await getRepository(AlugarEntity).findOne(id);

            //Se não exnotrar uma alugar, devolve erro 404
            if (alugar) {
                res.send(alugar);    
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
            const alugar = await getRepository(AlugarEntity).findOne(id);

            //Se não exnotrar uma alugar, devolve erro 404
            if (alugar) {
                //Atualizar o registro
                await getRepository(AlugarEntity).update(alugar.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = alugar.id;

                const updated = await getRepository(AlugarEntity).findOne(id);

                //Emitir um sinal para o socket cliente
                req.io.emit('updateAlugar', updated);
                
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
            const alugar = await getRepository(AlugarEntity).findOne(id);

            //Se não exnotrar uma alugar, devolve erro 404
            if (alugar) {
                //Excluir o registro
                await getRepository(AlugarEntity).delete(alugar);

                //Emitir um sinal para o socket cliente
                req.io.emit('deleteAlugar', alugar);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new AlugarController();
