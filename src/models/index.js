import sequelize from '../config/database.js';

import Perfil from './Perfil.js';
import Usuario from './Usuario.js';
import Permissao from './Permissao.js';
import PerfilPermissao from './PerfilPermissao.js';
import TokenRecuperacaoSenha from './TokenRecuperacaoSenha.js';
import Cliente from './Cliente.js';
import ClienteHistoricoContato from './ClienteHistoricoContato.js';
import Pasta from './Pasta.js';
import PastaResponsavel from './PastaResponsavel.js';
import Caso from './Caso.js';
import CasoResponsavel from './CasoResponsavel.js';
import Processo from './Processo.js';
import AtualizacaoProcesso from './AtualizacaoProcesso.js';
import Diligencia from './Diligencia.js';
import DiligenciaResponsavel from './DiligenciaResponsavel.js';
import DiligenciaAlertaConfig from './DiligenciaAlertaConfig.js';
import HistoricoAtividade from './HistoricoAtividade.js';
import Notificacao from './Notificacao.js';
import NotificacaoDestinatario from './NotificacaoDestinatario.js';
import Alerta from './Alerta.js';

// 1. Inicializa todos os models (define as colunas/tabelas)
Perfil.init(sequelize);
Usuario.init(sequelize);
Permissao.init(sequelize);
PerfilPermissao.init(sequelize);
TokenRecuperacaoSenha.init(sequelize);
Cliente.init(sequelize);
ClienteHistoricoContato.init(sequelize);
Pasta.init(sequelize);
PastaResponsavel.init(sequelize);
Caso.init(sequelize);
CasoResponsavel.init(sequelize);
Processo.init(sequelize);
AtualizacaoProcesso.init(sequelize);
Diligencia.init(sequelize);
DiligenciaResponsavel.init(sequelize);
DiligenciaAlertaConfig.init(sequelize);
HistoricoAtividade.init(sequelize);
Notificacao.init(sequelize);
NotificacaoDestinatario.init(sequelize);
Alerta.init(sequelize);

const models = {
    Perfil,
    Usuario,
    Permissao,
    PerfilPermissao,
    TokenRecuperacaoSenha,
    Cliente,
    ClienteHistoricoContato,
    Pasta,
    PastaResponsavel,
    Caso,
    CasoResponsavel,
    Processo,
    AtualizacaoProcesso,
    Diligencia,
    DiligenciaResponsavel,
    DiligenciaAlertaConfig,
    HistoricoAtividade,
    Notificacao,
    NotificacaoDestinatario,
    Alerta,
};

// 2. Configura as associacoes (relacionamentos) entre os models
Object.values(models).forEach((model) => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

export { sequelize };
export default models;
