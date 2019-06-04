import express from 'express';
import { getUsers, getUser } from './user.service';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await getUsers();
        res.json({ users, 'uri': '/users' });
    } catch (error) {
        next(error);
    }
});

router.get('/:username', async (req, res, next) => {
    try {
        const user = await getUser(req.params.username);
        res.json({ ...user });
    } catch (error) {
        next(error);
    }
});

export default router;
