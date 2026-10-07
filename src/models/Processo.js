import { DataTypes, Model } from 'sequelize'

class Processo extends Model {
    static init(sequelize) {
        super.init(
            {
                numero_processo: { type: DataTypes.STRING, allowNull: false },
                comarca: { type: DataTypes.STRING, allowNull: true },
                vara: { type: DataTypes.STRING, allowNull: true },
                situacao: { type: DataTypes.TEXT, allowNull: true },
            },
            { sequelize, tableName: 'processos' },
        )
    }
    static associate(models) {
        this.belongsTo(models.Caso, { foreignKey: 'caso_id', as: 'caso' });
        this.belongsTo(models.Usuario, { foreignKey: 'responsavel_id', as: 'responsavel' });
        this.hasMany(models.AtualizacaoProcesso, { foreignKey: 'processo_id', as: 'atualizacoes' });
    }
}
export default Processo;