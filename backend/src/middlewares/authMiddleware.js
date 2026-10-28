import jwt from 'jsonwebtoken';

export const autenticar = (req, res, next) => {
    const cabecalho = req.headers.authorization;

    if (!cabecalho || !cabecalho.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    const token = cabecalho.slice(7);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = payload.id;
        req.perfilId = payload.perfil_id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}
