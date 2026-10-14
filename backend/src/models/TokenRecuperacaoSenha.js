import { Model, DataTypes } from 'sequelize';

class TokenRecuperacaoSenha extends Model {
    static init(sequelize) {
        super.init(
            {
                token: { type: DataTypes.STRING, allowNull: false },
                expira_em: { type: DataTypes.DATE, allowNull: false },
                utilizado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            },
            { sequelize, tableName: 'token_recuperacao_senhas' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
}

export default TokenRecuperacaoSenha;