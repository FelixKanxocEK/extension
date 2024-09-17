import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ombu_extensions')
export class OmbuExtensions{
    @PrimaryGeneratedColumn()
    extension_id: number;

    @Column()
    name: string;

    @Column()
    extension: number;

    @Column()
    external_cid: number;

}