import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity({name: 'jogo'})
export class JogoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 40})
    nome_jogo: string;

    @Column({nullable: false, length: 40})
    ano_lanc: string;

    @Column({nullable: false, length: 50})
    quant_vend: string;

    @Column({nullable: false, length: 500})
    resumo: string;

    @ManyToOne (type => UsuarioEntity, {eager: true, nullable: false})
    usuario: UsuarioEntity
}