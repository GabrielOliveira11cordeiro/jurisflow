import { Model, DataTypes } from 'sequelize';

class DiligenciaResponsavel extends Model {
    static init(sequelize) {
        super.init(
            {
                diligencia_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                usuario_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                data_atribuicao: { type: DataTypes.DATE, allowNull: false },
                data_remocao: { type: DataTypes.DATE, allowNull: true },
            },
            { sequelize, tableName: 'diligencia_responsaveis' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Diligencia, { foreignKey: 'diligencia_id', as: 'diligencia' });
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
}

export default DiligenciaResponsavel;