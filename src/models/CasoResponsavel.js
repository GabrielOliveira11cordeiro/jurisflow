import { Model, DataTypes } from 'sequelize';

class CasoResponsavel extends Model {
    static init(sequelize) {
        super.init(
            {
                caso_id: {
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
            { sequelize, tableName: 'caso_responsaveis' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Caso, { foreignKey: 'caso_id', as: 'caso' });
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
}

export default CasoResponsavel;