import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ombu_contacts')
export class OmbuContacts{
    @PrimaryGeneratedColumn()
    contact_id: number;

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
}