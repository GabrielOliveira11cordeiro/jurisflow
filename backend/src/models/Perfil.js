import { Model, DataTypes  } from 'sequelize';

class Perfil extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: { type: DataTypes.STRING, allowNull: false },
            },
            { sequelize, tableName: 'perfis' },
        );
    }

    static associate(models) {
        this.hasMany(models.Usuario, { foreignKey: 'perfil_id', as: 'usuarios' });
        this.hasMany(models.PerfilPermissao, { foreignKey: 'perfil_id', as: 'perfilPermissoes' });
    }
}

export default Perfil;
