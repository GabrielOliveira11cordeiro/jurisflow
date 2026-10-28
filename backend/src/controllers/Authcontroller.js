import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import models from '../models/index.js';
const { Usuario } = models;

export const login = async (req, res) => {
    try {
        const { login: loginInformado, senha } = req.body;

        if (!loginInformado || !senha) {
            return res.status(400).json({ message: 'Informe login e senha' });
        }

        // scope 'comSenha' traz o campo senha, que fica escondido por padrão
        // aceita tanto o login quanto o e-mail no mesmo campo
        const usuario = await Usuario.scope('comSenha').findOne({
            where: { [Op.or]: [{ login: loginInformado }, { email: loginInformado }] },
            include: 'perfil',
        });

        const senhaConfere = usuario ? await bcrypt.compare(senha, usuario.senha) : false;

        // mesma mensagem nos dois casos para não revelar se o login existe
        if (!usuario || !senhaConfere) {
            return res.status(401).json({ message: 'Login ou senha inválidos' });
        }

        if (!usuario.status) {
            return res.status(403).json({ message: 'Usuário inativo' });
        }

        const token = jwt.sign(
            { id: usuario.id, perfil_id: usuario.perfil_id },
            process.env.JWT_SECRET,
            { expiresIn: '8h' },
        );

        const dados = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            login: usuario.login,
            status: usuario.status,
            perfil_id: usuario.perfil_id,
        };

        res.status(200).json({
            ...dados, // formato plano, que o Login.jsx do front já lê
            token,
            usuario: { ...dados, perfil: usuario.perfil },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const me = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuarioId, { include: 'perfil' });
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}