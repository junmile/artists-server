import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import Music from './Music';

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: false })
    name: string;

    @Column('text', { nullable: false, unique: true })
    userId: string;

    @Column('text', { nullable: false })
    password: string;

    @OneToMany((type) => Music, (music) => music.id)
    @Column('text', { array: true, nullable: true, default: [] })
    music: string[];
}

export default User;
