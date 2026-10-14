import models from '../models/index.js';
const { HistoricoAtividade } = models;

export const createHistoricoAtividade = async (req, res) => {
    try {
        const registro = await HistoricoAtividade.create({
            usuario_id: req.body.usuario_id,
            entidade: req.body.entidade,
            entidade_id: req.body.entidade_id,
            acao: req.body.acao,
            descricao: req.body.descricao,
        });
        res.status(201).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllHistoricoAtividades = async (req, res) => {
    try {
        const registros = await HistoricoAtividade.findAll({ include: 'usuario' });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getHistoricoAtividadeById = async (req, res) => {
    try {
        const registro = await HistoricoAtividade.findByPk(req.params.id, { include: 'usuario' });
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        res.status(200).json(registro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteHistoricoAtividade = async (req, res) => {
    try {
        const registro = await HistoricoAtividade.findByPk(req.params.id);
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        await registro.destroy();
        res.status(200).json({ message: 'Registro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
