import { Model, DataTypes } from 'sequelize';

class ClienteHistoricoContato extends Model {
    static init(sequelize) {
        super.init(
            {
                data_hora: { type: DataTypes.DATE, allowNull: false },
            },
            { sequelize, tableName: 'cliente_historico_contatos' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
}

export default ClienteHistoricoContato;
