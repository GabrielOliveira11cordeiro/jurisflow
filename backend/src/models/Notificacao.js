import { Model, DataTypes } from 'sequelize';

class Notificacao extends Model {
    static init(sequelize) {
        super.init(
            {
                tipo: { type: DataTypes.STRING, allowNull: false },
                entidade: { type: DataTypes.STRING, allowNull: true },
                entidade_id: { type: DataTypes.INTEGER, allowNull: true },
                lida: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            },
            { sequelize, tableName: 'notificacoes' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
        this.hasMany(models.NotificacaoDestinatario, { foreignKey: 'notificacao_id', as: 'destinatarios' });
    }
}

export default Notificacao;
