import models from '../models/index.js';
const { Pasta } = models;

export const createPasta = async (req, res) => {
    try {
        const pasta = await Pasta.create({
            numero: req.body.numero,
            cliente_id: req.body.cliente_id,
            area_direito: req.body.area_direito,
            status: req.body.status,
            prioridade: req.body.prioridade,
        });
        res.status(201).json(pasta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllPastas = async (req, res) => {
    try {
        const pastas = await Pasta.findAll({ include: 'cliente' });
        res.status(200).json(pastas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPastaById = async (req, res) => {
    try {
        const pasta = await Pasta.findByPk(req.params.id, { include: ['cliente', 'casos', 'responsaveis'] });
        if (!pasta) return res.status(404).json({ message: 'Pasta não encontrada' });
        res.status(200).json(pasta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePasta = async (req, res) => {
    try {
        const pasta = await Pasta.findByPk(req.params.id);
        if (!pasta) return res.status(404).json({ message: 'Pasta não encontrada' });
        await pasta.update(req.body);
        res.status(200).json(pasta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletePasta = async (req, res) => {
    try {
        const pasta = await Pasta.findByPk(req.params.id);
        if (!pasta) return res.status(404).json({ message: 'Pasta não encontrada' });
        await pasta.destroy();
        res.status(200).json({ message: 'Pasta deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
