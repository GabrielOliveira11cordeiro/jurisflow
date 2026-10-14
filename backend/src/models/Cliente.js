import { Model, DataTypes } from 'sequelize';

class Cliente extends Model {
    static init(sequelize) {
        super.init(
            {
                tipo_pessoa: { type: DataTypes.ENUM('fisica', 'juridica'), allowNull: false },
                nome: { type: DataTypes.STRING, allowNull: false },
                cpf: { type: DataTypes.STRING, allowNull: true },
                cnpj: { type: DataTypes.STRING, allowNull: true },
                status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            },
            { sequelize, tableName: 'clientes' },
        );
    }

    static associate(models) {
        this.hasMany(models.ClienteHistoricoContato, { foreignKey: 'cliente_id', as: 'historicoContatos' });
        this.hasMany(models.Pasta, { foreignKey: 'cliente_id', as: 'pastas' });
    }
}

export default Cliente;
