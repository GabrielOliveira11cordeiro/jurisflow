import models from '../models/index.js';
const { Alerta } = models;

export const createAlerta = async (req, res) => {
    try {
        const alerta = await Alerta.create({
            tipo: req.body.tipo,
            entidade: req.body.entidade,
            entidade_id: req.body.entidade_id,
        });
        res.status(201).json(alerta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllAlertas = async (req, res) => {
    try {
        const alertas = await Alerta.findAll();
        res.status(200).json(alertas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAlertaById = async (req, res) => {
    try {
        const alerta = await Alerta.findByPk(req.params.id);
        if (!alerta) return res.status(404).json({ message: 'Alerta não encontrado' });
        res.status(200).json(alerta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAlerta = async (req, res) => {
    try {
        const alerta = await Alerta.findByPk(req.params.id);
        if (!alerta) return res.status(404).json({ message: 'Alerta não encontrado' });
        await alerta.update(req.body);
        res.status(200).json(alerta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteAlerta = async (req, res) => {
    try {
        const alerta = await Alerta.findByPk(req.params.id);
        if (!alerta) return res.status(404).json({ message: 'Alerta não encontrado' });
        await alerta.destroy();
        res.status(200).json({ message: 'Alerta deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
