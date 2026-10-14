import express from 'express';
import {
    createPasta,
    getAllPastas,
    getPastaById,
    updatePasta,
    deletePasta,
} from '../controllers/pastaController.js';

const router = express.Router();

router.post('/', createPasta);
router.get('/', getAllPastas);
router.get('/:id', getPastaById);
router.put('/:id', updatePasta);
router.delete('/:id', deletePasta);

export default router;