import models from '../models/index.js';
const { Cliente } = models;

export const createCliente = async (req, res) => {
    try {
        const cliente = await Cliente.create({
            tipo_pessoa: req.body.tipo_pessoa,
            nome: req.body.nome,
            cpf: req.body.cpf,
            cnpj: req.body.cnpj,
        });
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id, { include: 'pastas' });
        if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
        await cliente.update(req.body);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
        await cliente.destroy();
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
