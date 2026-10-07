import { Model, DataTypes } from 'sequelize';

class PastaResponsavel extends Model {
    static init(sequelize) {
        super.init(
            {
                pasta_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                usuario_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                data_inicio: { type: DataTypes.DATE, allowNull: false },
                data_fim: { type: DataTypes.DATE, allowNull: true },
            },
            { sequelize, tableName: 'pasta_responsaveis' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Pasta, { foreignKey: 'pasta_id', as: 'pasta' });
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
}

export default PastaResponsavel;