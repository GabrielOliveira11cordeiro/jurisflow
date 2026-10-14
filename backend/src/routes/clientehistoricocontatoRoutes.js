import express from 'express';
import {
    createHistoricoContato,
    getAllHistoricoContato,
    getHistoricoContatoById,
    deleteHistoricoContato,
} from '../controllers/clienteHistoricoContatoController.js';

const router = express.Router();

router.post('/', createHistoricoContato);
router.get('/', getAllHistoricoContato);
router.get('/:id', getHistoricoContatoById);
router.delete('/:id', deleteHistoricoContato);

export default router;