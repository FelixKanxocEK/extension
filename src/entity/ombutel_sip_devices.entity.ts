import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ombu_sip_devices')
export class SipAssword{
    @PrimaryGeneratedColumn()
    device_id: number;

    @Column()
    secret: string;

    @Column()
    user: number;

}
