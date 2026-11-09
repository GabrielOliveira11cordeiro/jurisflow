import express from 'express';
import { login, me } from '../controllers/Authcontroller.js';
import { autenticar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', autenticar, me);

export default router;