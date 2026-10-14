import { Model, DataTypes } from 'sequelize';

class NotificacaoDestinatario extends Model {
    static init(sequelize) {
        super.init(
            {
                data_envio: { type: DataTypes.DATE, allowNull: false },
                data_leitura: { type: DataTypes.DATE, allowNull: true },
            },
            { sequelize, tableName: 'notificacao_destinatarios' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Notificacao, { foreignKey: 'notificacao_id', as: 'notificacao' });
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
}

export default NotificacaoDestinatario;
