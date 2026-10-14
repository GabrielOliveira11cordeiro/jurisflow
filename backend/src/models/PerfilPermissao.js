import { Model, DataTypes } from 'sequelize';

class PerfilPermissao extends Model {
    static init(sequelize) {
        super.init(
            {
                perfil_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                permissao_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
            },
            { sequelize, tableName: 'perfil_permissoes' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Perfil, { foreignKey: 'perfil_id', as: 'perfil' });
        this.belongsTo(models.Permissao, { foreignKey: 'permissao_id', as: 'permissao' });
    }
}

export default PerfilPermissao;