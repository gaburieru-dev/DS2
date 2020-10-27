import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NoticiasEntity } from "./noticias.entity";
import { AtualizacoesEntity } from "./atualizacoes.entity";

@Entity({name: 'usuario'})
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 6})
    codigo: string;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, length: 50})
    email: string;

    @ManyToOne( type => AtualizacoesEntity, {eager: true, nullable: true})
    atualizacoes: AtualizacoesEntity;

    @ManyToOne( type => NoticiasEntity, {eager: true, nullable: false})
    noticias: NoticiasEntity;
}