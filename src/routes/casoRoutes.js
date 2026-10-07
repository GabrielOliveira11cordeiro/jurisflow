import express from 'express';
import {
    createCaso,
    getAllCasos,
    getCasoById,
    updateCaso,
    deleteCaso,
} from '../controllers/casoController.js';

const router = express.Router();

router.post('/', createCaso);
router.get('/', getAllCasos);
router.get('/:id', getCasoById);
router.put('/:id', updateCaso);
router.delete('/:id', deleteCaso);

export default router;