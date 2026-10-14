import express from 'express';
import {
    createHistoricoAtividade,
    getAllHistoricoAtividades,
    getHistoricoAtividadeById,
    deleteHistoricoAtividade,
} from '../controllers/historicoAtividadeController.js';

const router = express.Router();

router.post('/', createHistoricoAtividade);
router.get('/', getAllHistoricoAtividades);
router.get('/:id', getHistoricoAtividadeById);
router.delete('/:id', deleteHistoricoAtividade);

export default router;