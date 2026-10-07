import express from 'express';
import {
    createCasoResponsavel,
    getAllCasoResponsaveis,
    updateCasoResponsavel,
    deleteCasoResponsavel,
} from '../controllers/casoResponsavelController.js';

const router = express.Router();

router.post('/', createCasoResponsavel);
router.get('/', getAllCasoResponsaveis);
router.put('/:caso_id/:usuario_id', updateCasoResponsavel);
router.delete('/:caso_id/:usuario_id', deleteCasoResponsavel);

export default router;