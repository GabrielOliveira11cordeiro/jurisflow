import models from '../models/index.js';
const { Usuario } = models;

export const createUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.create({
            nome: req.body.nome,
            email: req.body.email,
            login: req.body.login,
            senha: req.body.senha,
            perfil_id: req.body.perfil_id,
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ include: 'perfil' });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, { include: 'perfil' });
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        await usuario.update(req.body);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        await usuario.destroy();
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}