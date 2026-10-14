import { Model, DataTypes } from 'sequelize';

class HistoricoAtividade extends Model {
    static init(sequelize) {
        super.init(
            {
                entidade: { type: DataTypes.STRING, allowNull: false },
                entidade_id: { type: DataTypes.INTEGER, allowNull: false },
                acao: { type: DataTypes.ENUM('criacao', 'atualizacao', 'exclusao'), allowNull: false },
                descricao: { type: DataTypes.TEXT, allowNull: true },
            },
            { sequelize, tableName: 'historico_atividades' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
}

export default HistoricoAtividade;
