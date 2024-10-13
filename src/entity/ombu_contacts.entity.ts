import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OmbuExtensions } from "./ombutel_extensions.entity";

@Entity('ombu_contacts')
export class OmbuContacts {

    @PrimaryGeneratedColumn()
    contact_id: number;

    @Column()
    extension_id: number;

    @Column()
    organization: string;

    @Column()
    location: string;

    @OneToOne(type => OmbuExtensions, OmbuExtensions => OmbuExtensions.contact)
    @JoinColumn({name: 'extension_id'})
    extension: OmbuExtensions;

}