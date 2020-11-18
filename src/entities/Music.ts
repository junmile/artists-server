import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
class Music extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: false })
    track: string;

    @Column('text', { nullable: false })
    name: string;

    @Column('text', { nullable: false })
    path: string;

    @ManyToOne((type) => User, (user) => user.music)
    userId: string;
}

export default Music;
