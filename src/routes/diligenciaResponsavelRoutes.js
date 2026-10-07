import express from 'express';
import {
    createDiligenciaResponsavel,
    getAllDiligenciaResponsaveis,
    updateDiligenciaResponsavel,
    deleteDiligenciaResponsavel,
} from '../controllers/diligenciaResponsavelController.js';

const router = express.Router();

router.post('/', createDiligenciaResponsavel);
router.get('/', getAllDiligenciaResponsaveis);
router.put('/:diligencia_id/:usuario_id', updateDiligenciaResponsavel);
router.delete('/:diligencia_id/:usuario_id', deleteDiligenciaResponsavel);

export default router;