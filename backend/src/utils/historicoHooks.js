import models, { sequelize } from '../models/index.js';
import { contexto } from '../middlewares/identificarUsuario.js';

const { HistoricoAtividade } = models;

// Texto de cada entidade registrada. O nome de quem fez a ação é acrescentado pela tela.
const descricoes = {
    Cliente: (i) => `o cliente "${i.nome}"`,
    Caso: (i) => `o caso "${i.titulo}"`,
    Processo: (i) => `o processo ${i.numero_processo}`,
    Diligencia: (i) => `a diligência "${i.titulo}"`,
    AtualizacaoProcesso: (i) => `um andamento do processo #${i.processo_id}`,
};

const verbos = { criacao: 'cadastrou', atualizacao: 'atualizou', exclusao: 'removeu' };

const registrar = (acao) => async (instance) => {
    const descrever = descricoes[instance.constructor.name];
    const usuarioId = contexto.getStore()?.usuarioId;

    // só registra entidades conhecidas e quando há usuário logado identificado pelo token
    if (!descrever || !usuarioId) return;

    try {
        await HistoricoAtividade.create({
            usuario_id: usuarioId,
            entidade: instance.constructor.tableName,
            entidade_id: instance.id,
            acao,
            descricao: `${verbos[acao]} ${descrever(instance)}.`,
        });
    } catch (error) {
        console.error('Erro ao registrar histórico:', error.message);
    }
};

// hooks globais: valem para todos os models
sequelize.addHook('afterCreate', registrar('criacao'));
sequelize.addHook('afterUpdate', registrar('atualizacao'));
sequelize.addHook('afterDestroy', registrar('exclusao'));