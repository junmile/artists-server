import express from 'express';
import { loginUser } from '../controller/userController';

const router = express.Router();

router.post('/', loginUser);
export default router;
