import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OmbuExtensions } from './ombutel_extensions.entity';

@Entity('ombu_contacts')
export class OmbuContacts{
    @PrimaryGeneratedColumn()
    contact_id: number;

    @Column()
    extension_id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    location: string;

    @Column()
    prefix: string;

    @Column()
    phone: string;

    @Column()
    organization: string;

    @OneToOne(() => OmbuExtensions, OmbuExtensions => OmbuExtensions.contact)
    @JoinColumn({name: 'extension_id'})
    extension: OmbuExtensions;
}