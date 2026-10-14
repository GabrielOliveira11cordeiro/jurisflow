import { Association } from "sequelize"

export function verificarPermissao(nomePermissao){
    return async (req, res, next) => {
        const usuario = await usuario.findbyPk(req.usuarioId, {
            include: {
                Association: 'perfil',
                include: {
                    Association: 'perfilPermissoes',
                    include: 'permissao'
                }
            }
        });
        const temPermissao = usuario.perfil.perfilPermissao
            .some(pp => pp.permissao.nome === nomePermissao);

            if (!temPermissao){
                return res.status(403).json({message: 'sem permissao para essa ação'});
            }
            next();
    }
}