import models from '../models/index.js';
const { AtualizacaoProcesso } = models;

export const createAtualizacaoProcesso = async (req, res) => {
    try {
        const registro = await AtualizacaoProcesso.create({
            processo_id: req.body.processo_id,
            descricao: req.body.descricao,
            usuario_id: req.body.usuario_id,
            data_atualizacao: req.body.data_atualizacao,
        });
        res.status(201).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllAtualizacoesProcesso = async (req, res) => {
    try {
        const registros = await AtualizacaoProcesso.findAll({ include: ['processo', 'usuario'] });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAtualizacaoProcessoById = async (req, res) => {
    try {
        const registro = await AtualizacaoProcesso.findByPk(req.params.id, { include: ['processo', 'usuario'] });
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        res.status(200).json(registro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteAtualizacaoProcesso = async (req, res) => {
    try {
        const registro = await AtualizacaoProcesso.findByPk(req.params.id);
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        await registro.destroy();
        res.status(200).json({ message: 'Registro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
