import models from '../models/index.js';
const { PerfilPermissao } = models;

export const createPerfilPermissao = async (req, res) => {
    try {
        const registro = await PerfilPermissao.create({
            perfil_id: req.body.perfil_id,
            permissao_id: req.body.permissao_id,
        });
        res.status(201).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllPerfilPermissoes = async (req, res) => {
    try {
        const registros = await PerfilPermissao.findAll({ include: ['perfil', 'permissao'] });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePerfilPermissao = async (req, res) => {
    try {
        const { perfil_id, permissao_id } = req.params;
        const registro = await PerfilPermissao.findOne({ where: { perfil_id, permissao_id } });
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        await registro.destroy();
        res.status(200).json({ message: 'Permissão removida do perfil com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
