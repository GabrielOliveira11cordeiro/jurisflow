import { Model, DataTypes } from 'sequelize';

class Permissao extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: { type: DataTypes.STRING, allowNull: false },
            },
            { sequelize, tableName: 'permissoes' },
        );
    }

    static associate(models) {
        this.hasMany(models.PerfilPermissao, { foreignKey: 'permissao_id', as: 'perfilPermissoes' });
    }
}

export default Permissao;
