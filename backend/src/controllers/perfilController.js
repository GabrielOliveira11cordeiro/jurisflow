import models from '../models/index.js';
const { Perfil } = models;

export const createPerfil = async (req, res) => {
    try {
        const perfil = await Perfil.create({ nome: req.body.nome });
        res.status(201).json(perfil);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllPerfis = async (req, res) => {
    try {
        const perfis = await Perfil.findAll();
        res.status(200).json(perfis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPerfilById = async (req, res) => {
    try {
        const perfil = await Perfil.findByPk(req.params.id);
        if (!perfil) return res.status(404).json({ message: 'Perfil não encontrado' });
        res.status(200).json(perfil);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePerfil = async (req, res) => {
    try {
        const perfil = await Perfil.findByPk(req.params.id);
        if (!perfil) return res.status(404).json({ message: 'Perfil não encontrado' });
        await perfil.update(req.body);
        res.status(200).json(perfil);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletePerfil = async (req, res) => {
    try {
        const perfil = await Perfil.findByPk(req.params.id);
        if (!perfil) return res.status(404).json({ message: 'Perfil não encontrado' });
        await perfil.destroy();
        res.status(200).json({ message: 'Perfil deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
