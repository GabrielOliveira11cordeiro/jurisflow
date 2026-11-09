import jwt from 'jsonwebtoken';
import { AsyncLocalStorage } from 'node:async_hooks';

// Guarda, durante cada requisição, quem é o usuário logado.
// Assim o histórico de atividades sabe quem fez cada ação, sem mexer nos controllers.
export const contexto = new AsyncLocalStorage();

// Identifica o usuário pelo token, quando existir. Não bloqueia nenhuma rota.
export const identificarUsuario = (req, res, next) => {
    let usuarioId = null;
    const cabecalho = req.headers.authorization;

    if (cabecalho?.startsWith('Bearer ')) {
        try {
            usuarioId = jwt.verify(cabecalho.slice(7), process.env.JWT_SECRET).id;
        } catch (error) {
            // token inválido ou expirado: segue sem usuário identificado
        }
    }

    req.usuarioId = usuarioId;
    contexto.run({ usuarioId }, next);
};