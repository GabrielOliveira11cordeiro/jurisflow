import express from 'express';
import {
    createUsuario,
    getAllUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
} from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/', createUsuario);
router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;