import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UsuarioEntity } from "../entity/usuario.entity";

class UsuarioController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const usuarios: UsuarioEntity[] = await getRepository(UsuarioEntity).find();
            res.send(usuarios);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const usuario = req.body;

        console.log('Este aqui -> ', usuario);

        try {

            await getRepository(UsuarioEntity).save( usuario );
            res.status(201).send(usuario);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const usuario = await getRepository(UsuarioEntity).findOne(id);

            //Se não exnotrar uma usuario, devolve erro 404
            if (usuario) {
                res.send(usuario);    
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
            const usuario = await getRepository(UsuarioEntity).findOne(id);

            //Se não exnotrar um usuario, devolve erro 404
            if (usuario) {
                //Atualizar o registro
                await getRepository(UsuarioEntity).update(usuario.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = usuario.id;
                
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
            const usuario = await getRepository(UsuarioEntity).findOne(id);

            //Se não exnotrar um usuario, devolve erro 404
            if (usuario) {
                //Excluir o registro
                await getRepository(UsuarioEntity).delete(usuario);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new UsuarioController();