import models from '../models/index.js';
const { DiligenciaResponsavel } = models;

export const createDiligenciaResponsavel = async (req, res) => {
    try {
        const registro = await DiligenciaResponsavel.create({
            diligencia_id: req.body.diligencia_id,
            usuario_id: req.body.usuario_id,
            data_atribuicao: req.body.data_atribuicao,
        });
        res.status(201).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllDiligenciaResponsaveis = async (req, res) => {
    try {
        const registros = await DiligenciaResponsavel.findAll({ include: ['diligencia', 'usuario'] });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateDiligenciaResponsavel = async (req, res) => {
    try {
        const { diligencia_id, usuario_id } = req.params;
        const registro = await DiligenciaResponsavel.findOne({ where: { diligencia_id, usuario_id } });
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        await registro.update(req.body);
        res.status(200).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteDiligenciaResponsavel = async (req, res) => {
    try {
        const { diligencia_id, usuario_id } = req.params;
        const registro = await DiligenciaResponsavel.findOne({ where: { diligencia_id, usuario_id } });
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        await registro.destroy();
        res.status(200).json({ message: 'Responsável removido da diligência com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
