import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'noticias'})
export class NoticiasEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, length: 2})
    uf: string;
}