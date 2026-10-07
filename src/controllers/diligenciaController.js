import models from '../models/index.js';
const { Diligencia } = models;

export const createDiligencia = async (req, res) => {
    try {
        const diligencia = await Diligencia.create({
            caso_id: req.body.caso_id,
            titulo: req.body.titulo,
            data_prevista: req.body.data_prevista,
            status: req.body.status,
        });
        res.status(201).json(diligencia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllDiligencias = async (req, res) => {
    try {
        const diligencias = await Diligencia.findAll({ include: 'caso' });
        res.status(200).json(diligencias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getDiligenciaById = async (req, res) => {
    try {
        const diligencia = await Diligencia.findByPk(req.params.id, {
            include: ['caso', 'responsaveis', 'alertasConfig'],
        });
        if (!diligencia) return res.status(404).json({ message: 'Diligência não encontrada' });
        res.status(200).json(diligencia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateDiligencia = async (req, res) => {
    try {
        const diligencia = await Diligencia.findByPk(req.params.id);
        if (!diligencia) return res.status(404).json({ message: 'Diligência não encontrada' });
        await diligencia.update(req.body);
        res.status(200).json(diligencia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteDiligencia = async (req, res) => {
    try {
        const diligencia = await Diligencia.findByPk(req.params.id);
        if (!diligencia) return res.status(404).json({ message: 'Diligência não encontrada' });
        await diligencia.destroy();
        res.status(200).json({ message: 'Diligência deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
