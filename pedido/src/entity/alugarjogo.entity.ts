import { PedidoEntity } from './pedido.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JogoEntity } from "./jogo.entity";

@Entity({name: 'alugarjogo'})
export class AlugarJogoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: 'float'})
    qtdade: number;

    @Column({nullable: false, type: 'float'})
    vlrunit: number;

    @ManyToOne( type => JogoEntity, {eager: true, nullable: false})
    produto: JogoEntity;

    @ManyToOne( type => JogoEntity, {nullable: false})
    pedido: JogoEntity;

}