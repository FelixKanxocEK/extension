import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OmbuContacts } from "./ombutel_contacts.entity";

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

    @Column()
    did_number: string;

    @OneToOne(() => OmbuContacts, OmbuContacts => OmbuContacts.extension)
    contact: OmbuContacts;

}