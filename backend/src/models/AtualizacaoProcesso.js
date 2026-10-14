import { Model, DataTypes } from 'sequelize';

class AtualizacaoProcesso extends Model {
    static init(sequelize) {
        super.init(
            {
                descricao: { type: DataTypes.TEXT, allowNull: false },
                data_atualizacao: { type: DataTypes.DATE, allowNull: false },
            },
            { sequelize, tableName: 'atualizacoes_processo' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Processo, { foreignKey: 'processo_id', as: 'processo' });
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
}

export default AtualizacaoProcesso;
