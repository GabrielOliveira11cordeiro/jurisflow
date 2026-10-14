import models from '../models/index.js'
const { Processo } = models;

export const createProcesso = async (req, res) => {
    try {
        const processo = await Processo.create({
            caso_id: req.body.caso_id,
            numero_processo: req.body.numero_processo,
            comarca: req.body.comarca,
            vara: req.body.vara,
            situacao: req.body.situacao,
            responsavel_id: req.body.responsavel_id,
        });
        res.status(201).json(processo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllProcessos = async (req, res) => {
    try {
        const processos = await Processo.findAll({ include: ['caso', 'responsavel'] });
        res.status(200).json(processos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProcessoById = async (req, res) => {
    try {
        const processo = await Processo.findByPk(req.params.id, { include: ['caso', 'responsavel', 'atualizacoes'] });
        if (!processo) return res.status(404).json({ message: 'Processo não encontrado' });
        res.status(200).json(processo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProcesso = async (req, res) => {
    try {
        const processo = await Processo.findByPk(req.params.id);
        if (!processo) return res.status(404).json({ message: 'Processo não encontrado' });
        await processo.update(req.body);
        res.status(200).json(processo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteProcesso = async (req, res) => {
    try {
        const processo = await Processo.findByPk(req.params.id);
        if (!processo) return res.status(404).json({ message: 'Processo não encontrado' });
        await processo.destroy();
        res.status(200).json({ message: 'Processo deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}