import models from '../models/index.js';
const { Caso } = models;

export const createCaso = async (req, res) => {
    try {
        const caso = await Caso.create({
            pasta_id: req.body.pasta_id,
            titulo: req.body.titulo,
            fase: req.body.fase,
            status: req.body.status,
            responsavel_principal_id: req.body.responsavel_principal_id,
            observacao_pre_processual: req.body.observacao_pre_processual || null,
        });
        res.status(201).json(caso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const getAllCasos = async (req, res) => {
const casos = await Caso.findAll({
    include: ['pasta', 'responsavelPrincipal', 'processos'],
    order: [['id', 'ASC']],
});
    res.status(200).json(casos);
} 

export const getCasoById = async (req, res) => {
    try {
        const caso = await Caso.findByPk(req.params.id, {
            include: ['pasta', 'responsavelPrincipal', 'responsaveis', 'processos', 'diligencias'],
        });
        if (!caso) return res.status(404).json({ message: 'Caso não encontrado' });
        res.status(200).json(caso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCaso = async (req, res) => {
    try {
        const caso = await Caso.findByPk(req.params.id);
        if (!caso) return res.status(404).json({ message: 'Caso não encontrado' });
        await caso.update(req.body);
        res.status(200).json(caso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteCaso = async (req, res) => {
    try {
        const caso = await Caso.findByPk(req.params.id);
        if (!caso) return res.status(404).json({ message: 'Caso não encontrado' });
        await caso.destroy();
        res.status(200).json({ message: 'Caso deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
