import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity({name: 'atualizacoes'})
export class AtualizacoesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    versao: string;

    @Column({nullable: false, length: 500})
    conteudo: string;

    @ManyToOne (type => UsuarioEntity, {eager: true, nullable: false})
    usuario: UsuarioEntity
}