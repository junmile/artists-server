import jwt from 'jsonwebtoken';
import env from 'dotenv';
import { NextFunction, Request, Response } from 'express';
env.config();

const createToken = (userId: string) => {
    const token = jwt.sign({ userId }, process.env.JWT_KEY || '');
    return token;
};

const decodeToken = (token: string) => {
    const user = jwt.verify(token, process.env.JWT_KEY || '');
    return user;
};

const isMember = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('일 : ', req.cookies);
        const user = decodeToken(req.cookies.user);
        console.log('이 : ', user);
        next();
    } catch (err) {
        res.status(400).json({ message: '올바른 토큰이 아닙니다.' });
    }
};

export default { createToken, decodeToken, isMember };
