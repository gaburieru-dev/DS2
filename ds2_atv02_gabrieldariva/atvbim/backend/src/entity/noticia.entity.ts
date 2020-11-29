import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity({name: 'noticia'})
export class NoticiaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 500})
    novidades: string;

    @Column({nullable: false, length: 500})
    jogos_semana: string;

    @Column({nullable: false, length: 500})
    noticias_cenario: string;

    @ManyToOne(type => UsuarioEntity, {eager: true, nullable: false})
    usuario: UsuarioEntity;
}