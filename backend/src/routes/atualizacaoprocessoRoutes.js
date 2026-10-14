import express from 'express';
import {
    createAtualizacaoProcesso,
    getAllAtualizacoesProcesso,
    getAtualizacaoProcessoById,
    deleteAtualizacaoProcesso,
} from '../controllers/atualizacaoProcessoController.js';

const router = express.Router();

router.post('/', createAtualizacaoProcesso);
router.get('/', getAllAtualizacoesProcesso);
router.get('/:id', getAtualizacaoProcessoById);
router.delete('/:id', deleteAtualizacaoProcesso);

export default router;