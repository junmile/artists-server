import { create } from 'domain';
import express from 'express';
import { createUser, updateUser } from '../controller/userController';

const router = express.Router();

router.post('/', createUser);
router.put('/:id', updateUser);

export default router;
