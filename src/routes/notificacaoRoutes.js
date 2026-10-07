import express from 'express';
import {
    createNotificacao,
    getAllNotificacoes,
    getNotificacaoById,
    updateNotificacao,
    deleteNotificacao,
} from '../controllers/notificacaoController.js';

const router = express.Router();

router.post('/', createNotificacao);
router.get('/', getAllNotificacoes);
router.get('/:id', getNotificacaoById);
router.put('/:id', updateNotificacao);
router.delete('/:id', deleteNotificacao);

export default router;