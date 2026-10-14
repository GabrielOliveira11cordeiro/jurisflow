import express from 'express';
import {
    createPerfil,
    getAllPerfis,
    getPerfilById,
    updatePerfil,
    deletePerfil,
} from '../controllers/perfilController.js';

const router = express.Router();

router.post('/', createPerfil);
router.get('/', getAllPerfis);
router.get('/:id', getPerfilById);
router.put('/:id', updatePerfil);
router.delete('/:id', deletePerfil);

export default router;