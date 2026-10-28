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
                email: { type: DataTypes.STRING, allowNull: true },
                telefone: { type: DataTypes.STRING, allowNull: true },
                endereco: { type: DataTypes.STRING, allowNull: true },
                rg: { type: DataTypes.STRING, allowNull: true },
                data_nascimento: { type: DataTypes.DATEONLY, allowNull: true },
                nome_pais: { type: DataTypes.STRING, allowNull: true },
                senha_gov: { type: DataTypes.TEXT, allowNull: true },
                rg_representante: { type: DataTypes.STRING, allowNull: true },
                cpf_representante: { type: DataTypes.STRING, allowNull: true },
                tipo_processo: { type: DataTypes.STRING, allowNull: true },
                observacoes: { type: DataTypes.TEXT, allowNull: true },
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