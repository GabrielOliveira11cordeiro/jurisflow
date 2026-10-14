import models from '../models/index.js';
const { PastaResponsavel } = models;

export const createPastaResponsavel = async (req, res) => {
    try {
        const registro = await PastaResponsavel.create({
            pasta_id: req.body.pasta_id,
            usuario_id: req.body.usuario_id,
            data_inicio: req.body.data_inicio,
        });
        res.status(201).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllPastaResponsaveis = async (req, res) => {
    try {
        const registros = await PastaResponsavel.findAll({ include: ['pasta', 'usuario'] });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePastaResponsavel = async (req, res) => {
    try {
        const { pasta_id, usuario_id } = req.params;
        const registro = await PastaResponsavel.findOne({ where: { pasta_id, usuario_id } });
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        await registro.update(req.body);
        res.status(200).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletePastaResponsavel = async (req, res) => {
    try {
        const { pasta_id, usuario_id } = req.params;
        const registro = await PastaResponsavel.findOne({ where: { pasta_id, usuario_id } });
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        await registro.destroy();
        res.status(200).json({ message: 'Responsável removido da pasta com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
