import express from 'express';
import {
    createPerfilPermissao,
    getAllPerfilPermissoes,
    deletePerfilPermissao,
} from '../controllers/perfilPermissaoController.js';

const router = express.Router();

router.post('/', createPerfilPermissao);
router.get('/', getAllPerfilPermissoes);
router.delete('/:perfil_id/:permissao_id', deletePerfilPermissao);

export default router;