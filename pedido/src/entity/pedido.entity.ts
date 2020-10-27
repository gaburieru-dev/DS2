import { UsuarioEntity } from './usuario.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlugarJogoEntity } from './alugarjogo.entity';

@Entity({name: 'pedido'})
export class PedidoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 6})
    codigo: string;

    @Column({nullable: false, type: 'date'})
    dtpedido: Date;

    @ManyToOne( type => UsuarioEntity, {eager: true, nullable: false})
    usuario: UsuarioEntity;

    @OneToMany(type => AlugarJogoEntity, jogo => jogo.pedido, {eager: true, cascade: true})
    jogos: AlugarJogoEntity[];
}