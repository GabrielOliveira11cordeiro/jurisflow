import { Model, DataTypes } from 'sequelize';

class Usuario extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: { type: DataTypes.STRING, allowNull: false },
                email: { type: DataTypes.STRING, allowNull: false, unique: true },
                login: { type: DataTypes.STRING, allowNull: false, unique: true },
                senha: { type: DataTypes.STRING, allowNull: false },
                status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            },
            { sequelize, tableName: 'usuarios' },
        );
    }

    static associate(models) {
        this.belongsTo(models.Perfil, { foreignKey: 'perfil_id', as: 'perfil' });
        this.hasMany(models.TokenRecuperacaoSenha, { foreignKey: 'usuario_id', as: 'tokensRecuperacao' });
        this.hasMany(models.ClienteHistoricoContato, { foreignKey: 'usuario_id', as: 'historicoContatos' });
        this.hasMany(models.PastaResponsavel, { foreignKey: 'usuario_id', as: 'pastasResponsavel' });
        this.hasMany(models.Caso, { foreignKey: 'responsavel_principal_id', as: 'casosPrincipal' });
        this.hasMany(models.CasoResponsavel, { foreignKey: 'usuario_id', as: 'casosResponsavel' });
        this.hasMany(models.Processo, { foreignKey: 'responsavel_id', as: 'processosResponsavel' });
        this.hasMany(models.AtualizacaoProcesso, { foreignKey: 'usuario_id', as: 'atualizacoesProcesso' });
        this.hasMany(models.DiligenciaResponsavel, { foreignKey: 'usuario_id', as: 'diligenciasResponsavel' });
        this.hasMany(models.HistoricoAtividade, { foreignKey: 'usuario_id', as: 'historicoAtividades' });
        this.hasMany(models.Notificacao, { foreignKey: 'usuario_id', as: 'notificacoes' });
        this.hasMany(models.NotificacaoDestinatario, { foreignKey: 'usuario_id', as: 'notificacoesRecebidas' });
    }
}

export default Usuario;
