import express from 'express';
import {
    createDiligencia,
    getAllDiligencias,
    getDiligenciaById,
    updateDiligencia,
    deleteDiligencia,
} from '../controllers/diligenciaController.js';

const router = express.Router();

router.post('/', createDiligencia);
router.get('/', getAllDiligencias);
router.get('/:id', getDiligenciaById);
router.put('/:id', updateDiligencia);
router.delete('/:id', deleteDiligencia);

export default router;