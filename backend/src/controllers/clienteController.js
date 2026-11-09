import models from '../models/index.js';
const { Cliente } = models;

// o formulário manda texto vazio nos campos que não se aplicam; no banco isso vira nulo
const vazioParaNull = (valor) => (valor === '' || valor === undefined ? null : valor);

export const createCliente = async (req, res) => {
    try {
        const dados = req.body;
        const cliente = await Cliente.create({
            tipo_pessoa: dados.tipo_pessoa,
            nome: dados.nome,
            cpf: vazioParaNull(dados.cpf),
            cnpj: vazioParaNull(dados.cnpj),
            email: vazioParaNull(dados.email),
            telefone: vazioParaNull(dados.telefone),
            endereco: vazioParaNull(dados.endereco),
            rg: vazioParaNull(dados.rg),
            data_nascimento: vazioParaNull(dados.data_nascimento),
            nome_pais: vazioParaNull(dados.nome_pais),
            senha_gov: vazioParaNull(dados.senha_gov),
            rg_representante: vazioParaNull(dados.rg_representante),
            cpf_representante: vazioParaNull(dados.cpf_representante),
            tipo_processo: vazioParaNull(dados.tipo_processo),
            observacoes: vazioParaNull(dados.observacoes),
        });
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({ order: [['id', 'ASC']] });
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

        // texto vazio vira nulo (evita erro em campos de data, por exemplo)
        const dados = {};
        Object.keys(req.body).forEach((campo) => {
            dados[campo] = vazioParaNull(req.body[campo]);
        });

        await cliente.update(dados);
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