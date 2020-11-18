import express, { Response, Request, NextFunction } from 'express';
import helmet from 'helmet';
import env from 'dotenv';
import cors from 'cors';
import { createConnection } from 'typeorm';
import orm from './ormConfig';
import userRouter from './routes/userRoute';
import loginRouter from './routes/loginRoute';
import boardRouter from './routes/boardRoute';
import JWT from './jwtToken';

env.config();

const port = process.env.PORT || 4000;

const app = express();

app.use(helmet());

// app.use(cors({ origin: 'localhost:3000', credentials: true }));
app.use(
    helmet({
        expectCt: {
            enforce: true,
            maxAge: 86400,
        },
        referrerPolicy: { policy: 'no-referrer' },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('ExpressError : ', err);
});

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use('/board', JWT.isMember, boardRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);

createConnection(orm)
    .then(() => {
        console.log('db연결됨');
        app.listen(port, () => console.log(`포트번호 ${port}로 서버시작됨`));
    })
    .catch((err) => {
        console.log('db연결에러');
        console.log('Error : ', err);
    });
