import express from 'express';
import { getUsers } from './user.service';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await getUsers();
    res.json({ users, 'uri': '/users' });
});

export default router;
