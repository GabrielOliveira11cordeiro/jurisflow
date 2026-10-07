import { Model, DataTypes } from 'sequelize';

class Alerta extends Model {
    static init(sequelize) {
        super.init(
            {
                tipo: { type: DataTypes.STRING, allowNull: false },
                entidade: { type: DataTypes.STRING, allowNull: false },
                entidade_id: { type: DataTypes.INTEGER, allowNull: false },
                resolvido: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            },
            { sequelize, tableName: 'alertas' },
        );
    }
}

export default Alerta;
