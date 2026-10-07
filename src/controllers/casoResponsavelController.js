import models from '../models/index.js';
const { CasoResponsavel } = models;

export const createCasoResponsavel = async (req, res) => {
    try {
        const registro = await CasoResponsavel.create({
            caso_id: req.body.caso_id,
            usuario_id: req.body.usuario_id,
            data_inicio: req.body.data_inicio,
        });
        res.status(201).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllCasoResponsaveis = async (req, res) => {
    try {
        const registros = await CasoResponsavel.findAll({ include: ['caso', 'usuario'] });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCasoResponsavel = async (req, res) => {
    try {
        const { caso_id, usuario_id } = req.params;
        const registro = await CasoResponsavel.findOne({ where: { caso_id, usuario_id } });
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        await registro.update(req.body);
        res.status(200).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteCasoResponsavel = async (req, res) => {
    try {
        const { caso_id, usuario_id } = req.params;
        const registro = await CasoResponsavel.findOne({ where: { caso_id, usuario_id } });
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        await registro.destroy();
        res.status(200).json({ message: 'Responsável removido do caso com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
