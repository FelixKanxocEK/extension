import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cdr")
export class CdrAsterisk {
    @PrimaryGeneratedColumn()
    cdr_id: number;

    @Column()
    calldate: string;

    @Column({type: "decimal", precision: 100, default: 0.00})
    uniqueid: number;

    @Column({type: "decimal", precision: 100, default: 0.00})
    linkedid: number;

    @Column()
    sequence: number;
}