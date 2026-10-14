import express from 'express';
import {
    createPastaResponsavel,
    getAllPastaResponsaveis,
    updatePastaResponsavel,
    deletePastaResponsavel,
} from '../controllers/pastaResponsavelController.js';

const router = express.Router();

router.post('/', createPastaResponsavel);
router.get('/', getAllPastaResponsaveis);
router.put('/:pasta_id/:usuario_id', updatePastaResponsavel);
router.delete('/:pasta_id/:usuario_id', deletePastaResponsavel);

export default router;