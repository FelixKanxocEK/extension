import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OmbuContacts } from "./ombu_contacts.entity";

@Entity('ombu_extensions')
export class OmbuExtensions{
    @PrimaryGeneratedColumn()
    extension_id: number;

    @Column()
    name: string;

    @Column()
    extension: number;

    @Column()
    did_number: string;

    @OneToOne(type => OmbuContacts, OmbuContacts => OmbuContacts.extension)
    contact: OmbuContacts;

}