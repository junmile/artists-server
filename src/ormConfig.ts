import { ConnectionOptions } from 'typeorm';
import env from 'dotenv';
import User from './entities/User';
import Music from './entities/Music';
env.config();

const orm: ConnectionOptions = {
    type: 'postgres',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'dlwpdksgo3',
    database: 'artists',
    synchronize: true,
    logging: false,
    entities: [User, Music],
    host: 'localhost',
};

export default orm;
