import { Model, DataTypes } from 'sequelize';

class Pasta extends Model {
    static init(sequelize) {
        super.init(
            {
                numero: { type: DataTypes.STRING, allowNull: false },
                area_direito: { type: DataTypes.STRING, allowNull: true },
                status: {
                    type: DataTypes.ENUM('aberta', 'em_andamento', 'encerrada', 'arquivada'),
                    allowNull: false,
                    defaultValue: 'aberta',
                },
                prioridade: {
                    type: DataTypes.ENUM('baixa', 'media', 'alta', 'urgente'),
                    allowNull: false,
                    defaultValue: 'media',
                },
            },
            { sequelize, tableName: 'pastas' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
        this.hasMany(models.PastaResponsavel, { foreignKey: 'pasta_id', as: 'responsaveis' });
        this.hasMany(models.Caso, { foreignKey: 'pasta_id', as: 'casos' });
    }
}

export default Pasta;
