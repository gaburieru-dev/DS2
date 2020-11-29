import { timeStamp } from "console";
import { type } from "os";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { JogoEntity } from "./jogo.entity";
import { UsuarioEntity } from "./usuario.entity";

@Entity({name: 'alugar'})
export class AlugarEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    nome_jogo: string;

    @Column({nullable: false, length: 50})
    quant_vend: string;

    @Column({nullable: false, length: 500})
    resumo: string;

    @Column({nullable: false, type: 'timestamp'})
    data: Date;

    @Column({nullable: false, length: 50})
    email: string;

    @Column({nullable: false, length: 50})
    senha: string;

    @ManyToOne (type => UsuarioEntity, {eager: true, nullable: false})
    usuario: UsuarioEntity

    @OneToOne (type => JogoEntity, {eager: true, nullable: false})
    jogo: JogoEntity
}
