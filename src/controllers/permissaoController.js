import models from '../models/index.js'
const { Permissao } = models;

export const createPermissao = async (req, res) => {
    try {
        const permissao = await Permissao.create({ nome: req.body.nome});
        res.status(201).json(permissao);
    } catch (error){
        res.status(400).json({ message: error.message});
    }
}
export const getAllPermissoes = async (req, res) => {
    try {
        const permissoes = await Permissao.findAll();
        res.status(200).json(permissoes)
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}
export const getPermissaoById = async (req, res) => {
    try {
        const permissao = await permissao.findByPk(req.params.id);
        if(!permissao) return res.status(404).json({ message: 'Permissao noa encontrada'});
        res.status(200).json(permissao);
    } catch (error){
        res.status(500).json({ message: error.message});
    }
}
export const updatePermissao = async (req, res) => {
    try {
        const permissao = await Permissao.findByPk(req.params.id);
        if (!permissao) return res.status(404).json({ message: 'Permissão não encontrada' });
        await permissao.update(req.body);
        res.status(200).json(permissao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletePermissao = async (req, res) => {
    try {
        const permissao = await Permissao.findByPk(req.params.id);
        if (!permissao) return res.status(404).json({ message: 'Permissão não encontrada' });
        await permissao.destroy();
        res.status(200).json({ message: 'Permissão deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}