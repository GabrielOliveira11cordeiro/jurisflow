import { Model, DataTypes } from "sequelize";

class Caso extends Model {
    static init(sequelize) {
        super.init(
            {
                titulo: { type: DataTypes.STRING, allowNull: false },
                fase: {
                    type: DataTypes.ENUM('inicial', 'instrucao', 'recursal', 'execucao', 'encerrado'),
                    allowNull: false,
                    defaultValue: 'inicial',
                },
                status: {
                    type: DataTypes.ENUM('ativo', 'suspenso', 'encerrado'),
                    allowNull: false,
                    defaultValue: 'ativo',
                },
            },
            { sequelize, tableName: 'casos' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Pasta, { foreignKey: 'pasta_id', as: 'pasta' });
        this.belongsTo(models.Usuario, { foreignKey: 'responsavel_principal_id', as: 'responsavelPrincipal' });
        this.hasMany(models.CasoResponsavel, { foreignKey: 'caso_id', as: 'responsaveis' });
        this.hasMany(models.Diligencia, { foreignKey: 'caso_id', as: 'diligencias' });
        this.hasMany(models.Processo, { foreignKey: 'caso_id', as: 'processos' });
    }
}

export default Caso;