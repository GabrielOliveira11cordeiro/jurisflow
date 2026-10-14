import express from 'express';
import {
    createAlerta,
    getAllAlertas,
    getAlertaById,
    updateAlerta,
    deleteAlerta,
} from '../controllers/alertaController.js';

const router = express.Router();

router.post('/', createAlerta);
router.get('/', getAllAlertas);
router.get('/:id', getAlertaById);
router.put('/:id', updateAlerta);
router.delete('/:id', deleteAlerta);

export default router;