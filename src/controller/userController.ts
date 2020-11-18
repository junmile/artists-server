import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../entities/User';
import bcrypt from 'bcrypt';
import JWT from '../jwtToken';

const saltRounds = 10;

const passwordHashing = (password: string) => {
    return bcrypt.hash(password, saltRounds);
};

const passwordComparing = (passwordValue: string, hashedPassword: string) => {
    return bcrypt.compare(passwordValue, hashedPassword);
};

export const createUser = async (req: Request, res: Response) => {
    const {
        body: { name, userId, password1, password2 },
    } = req;

    console.log(req.body);
    if (password1 !== password2) {
        res.status(400).json({ message: '비밀번호는 동일해야 합니다.' });
    } else {
        await check('name').not().isEmpty().withMessage('이름을 입력해 주세요.').run(req);
        await check('userId').not().isEmpty().withMessage('아이디를 입력해 주세요.').run(req);
        await check('password1').not().isEmpty().withMessage('비밀번호를 입력해 주세요.').isLength({ min: 3, max: 15 }).withMessage('비밀번호는 3~15사이의 값으로 가능합니다.').run(req);

        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        } else {
            const hashedPassword = await passwordHashing(password1);
            console.log(hashedPassword);
            try {
                const user = await User.create({ name, userId, password: hashedPassword }).save();
                res.status(200).send(user);
            } catch (error) {
                res.status(400).json({ status: 'error', message: '이미 등록되어있는 아이디 입니다.' });
            }
        }
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const {
        params: { id: userId },
        body: { beforePassword, newPassword1, newPassword2 },
    } = req;
    console.log(req.body);
    if (newPassword1 === newPassword2) {
        await check('newPassword1').isLength({ min: 3, max: 15 }).withMessage('비밀번호는 3~15사이의 값으로 가능합니다.').bail().run(req);

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        } else {
            const user = await User.findOne({ userId });
            console.log(user);
            const savedPassword = user!.password;

            const test = await passwordComparing(beforePassword, savedPassword);
            if (user && test) {
                const hashedPassword = await passwordHashing(newPassword1);
                await User.update({ userId }, { password: hashedPassword });
                res.status(200).json({ message: '바뀜' });
            } else {
                res.status(400).json({ message: '기존에 저장되어 있던 비밀번호와 맞지 않습니다.' });
            }
        }
    } else {
        res.status(400).json({ message: '비밀번호는 동일해야 합니다.' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const {
        body: { userId, password },
    } = req;
    await check('userId').not().isEmpty().withMessage('아이디를 입력해 주세요.').run(req);
    await check('password').not().isEmpty().withMessage('비밀번호를 입력해 주세요.').isLength({ min: 3, max: 15 }).withMessage('비밀번호는 3~15사이의 값으로 가능합니다.').run(req);
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    } else {
        try {
            const user = await User.findOne({ userId });
            if (user) {
                const compareResult = await passwordComparing(password, user.password);
                if (!compareResult) {
                    res.status(400).json({ message: '비밀번호가 맞지 않습니다.' });
                } else {
                    //토큰생성
                    console.log('가라 : ', req.cookies);
                    const token = JWT.createToken(userId);
                    res.cookie('user', token);
                    res.status(200).json({ message: '로그인' });
                }
            } else {
                res.status(400).json({ message: `${userId}로 가입된 정보가 없습니다.` });
            }
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
};
