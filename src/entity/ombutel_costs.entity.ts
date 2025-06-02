import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('costo')
export class OmbutelCosts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    carrier: string;

    @Column()
    tipo: string;

    @Column({ type: 'decimal', precision: 5 })
    costo: number;

}