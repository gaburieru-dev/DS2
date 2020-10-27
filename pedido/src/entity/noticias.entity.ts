import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'noticia'})
export class NoticiaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, length: 2})
    uf: string;
}