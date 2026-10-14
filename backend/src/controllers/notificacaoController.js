import models from '../models/index.js';
const { Notificacao } = models;

export const createNotificacao = async (req, res) => {
    try {
        const notificacao = await Notificacao.create({
            tipo: req.body.tipo,
            usuario_id: req.body.usuario_id,
            entidade: req.body.entidade,
            entidade_id: req.body.entidade_id,
        });
        res.status(201).json(notificacao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllNotificacoes = async (req, res) => {
    try {
        const notificacoes = await Notificacao.findAll({ include: 'usuario' });
        res.status(200).json(notificacoes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getNotificacaoById = async (req, res) => {
    try {
        const notificacao = await Notificacao.findByPk(req.params.id, { include: ['usuario', 'destinatarios'] });
        if (!notificacao) return res.status(404).json({ message: 'Notificação não encontrada' });
        res.status(200).json(notificacao);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateNotificacao = async (req, res) => {
    try {
        const notificacao = await Notificacao.findByPk(req.params.id);
        if (!notificacao) return res.status(404).json({ message: 'Notificação não encontrada' });
        await notificacao.update(req.body);
        res.status(200).json(notificacao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteNotificacao = async (req, res) => {
    try {
        const notificacao = await Notificacao.findByPk(req.params.id);
        if (!notificacao) return res.status(404).json({ message: 'Notificação não encontrada' });
        await notificacao.destroy();
        res.status(200).json({ message: 'Notificação deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
