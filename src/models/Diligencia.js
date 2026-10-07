import { Model, DataTypes } from 'sequelize';

class Diligencia extends Model {
    static init(sequelize) {
        super.init(
            {
                titulo: { type: DataTypes.STRING, allowNull: false },
                data_prevista: { type: DataTypes.DATEONLY, allowNull: true },
                status: {
                    type: DataTypes.ENUM('pendente', 'em_andamento', 'concluida', 'cancelada'),
                    allowNull: false,
                    defaultValue: 'pendente',
                },
            },
            { sequelize, tableName: 'diligencias' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Caso, { foreignKey: 'caso_id', as: 'caso' });
        this.hasMany(models.DiligenciaResponsavel, { foreignKey: 'diligencia_id', as: 'responsaveis' });
        this.hasMany(models.DiligenciaAlertaConfig, { foreignKey: 'diligencia_id', as: 'alertasConfig' });
    }
}

export default Diligencia;
