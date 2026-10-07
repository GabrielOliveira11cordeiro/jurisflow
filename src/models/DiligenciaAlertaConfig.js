import { Model, DataTypes } from 'sequelize';

class DiligenciaAlertaConfig extends Model {
    static init(sequelize) {
        super.init(
            {
                dias_antes: { type: DataTypes.INTEGER, allowNull: false },
            },
            { sequelize, tableName: 'diligencia_alerta_configs' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Diligencia, { foreignKey: 'diligencia_id', as: 'diligencia' });
    }
}

export default DiligenciaAlertaConfig;
