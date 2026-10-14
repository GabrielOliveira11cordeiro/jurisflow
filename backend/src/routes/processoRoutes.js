import express from 'express';
import {
    createProcesso,
    getAllProcessos,
    getProcessoById,
    updateProcesso,
    deleteProcesso,
} from '../controllers/processoController.js';

const router = express.Router();

router.post('/', createProcesso);
router.get('/', getAllProcessos);
router.get('/:id', getProcessoById);
router.put('/:id', updateProcesso);
router.delete('/:id', deleteProcesso);

export default router;