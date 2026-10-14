import models from '../models/index.js';
const { ClienteHistoricoContato } = models;

export const createHistoricoContato = async (req, res) => {
    try {
        const registro = await ClienteHistoricoContato.create({
            cliente_id: req.body.cliente_id,
            usuario_id: req.body.usuario_id,
            data_hora: req.body.data_hora,
        });
        res.status(201).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllHistoricoContato = async (req, res) => {
    try {
        const registros = await ClienteHistoricoContato.findAll({ include: ['cliente', 'usuario'] });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getHistoricoContatoById = async (req, res) => {
    try {
        const registro = await ClienteHistoricoContato.findByPk(req.params.id, { include: ['cliente', 'usuario'] });
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        res.status(200).json(registro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteHistoricoContato = async (req, res) => {
    try {
        const registro = await ClienteHistoricoContato.findByPk(req.params.id);
        if (!registro) return res.status(404).json({ message: 'Registro não encontrado' });
        await registro.destroy();
        res.status(200).json({ message: 'Registro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
