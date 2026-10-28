import { fn, col } from 'sequelize';
import models from '../models/index.js';
const { Cliente, Caso, Processo, Diligencia, AtualizacaoProcesso } = models;

// Casos ativos sem andamento ou diligência há mais dias que isso viram alerta (US22)
const DIAS_SEM_MOVIMENTACAO = 30;
const MS_POR_DIA = 24 * 60 * 60 * 1000;

export const getDashboard = async (req, res) => {
    try {
        // ---- Cards (US23) ----
        const clientesTotais = await Cliente.count();
        const casosAtivosTotal = await Caso.count({ where: { status: 'ativo' } });
        const diligenciasPendentes = await Diligencia.count({ where: { status: 'pendente' } });

        const processos = await Processo.findAll({ attributes: ['id', 'caso_id'], raw: true });
        const idsCasosComProcesso = [...new Set(processos.map((p) => p.caso_id))];

        const comProcessoJudicial = idsCasosComProcesso.length
            ? await Caso.count({ where: { status: 'ativo', id: idsCasosComProcesso } })
            : 0;
        const fasePreProcessual = casosAtivosTotal - comProcessoJudicial;

        // ---- Alertas de casos sem movimentação (US22) ----
        const casosAtivos = await Caso.findAll({
            where: { status: 'ativo' },
            include: 'responsavelPrincipal',
        });

        const ultimasAtualizacoes = await AtualizacaoProcesso.findAll({
            attributes: ['processo_id', [fn('MAX', col('data_atualizacao')), 'ultima']],
            group: ['processo_id'],
            raw: true,
        });

        const ultimasDiligencias = await Diligencia.findAll({
            attributes: ['caso_id', [fn('MAX', col('updated_at')), 'ultima']],
            group: ['caso_id'],
            raw: true,
        });

        // guarda a data da última movimentação de cada caso
        const casoDoProcesso = new Map(processos.map((p) => [p.id, p.caso_id]));
        const ultimaMovimentacao = new Map();

        const registrar = (casoId, data) => {
            if (!casoId || !data) return;
            const d = new Date(data);
            if (!ultimaMovimentacao.has(casoId) || d > ultimaMovimentacao.get(casoId)) {
                ultimaMovimentacao.set(casoId, d);
            }
        };

        ultimasAtualizacoes.forEach((a) => registrar(casoDoProcesso.get(a.processo_id), a.ultima));
        ultimasDiligencias.forEach((d) => registrar(d.caso_id, d.ultima));

        const agora = Date.now();
        const alertasCriticos = casosAtivos
            .map((caso) => {
                // sem nenhuma movimentação registrada, conta a partir da criação do caso
                const ultima = ultimaMovimentacao.get(caso.id) || new Date(caso.createdAt);
                const dias = Math.floor((agora - ultima.getTime()) / MS_POR_DIA);
                return {
                    id: caso.id,
                    titulo: caso.titulo,
                    dias,
                    responsavel: caso.responsavelPrincipal?.nome || 'Sem responsável',
                };
            })
            .filter((alerta) => alerta.dias > DIAS_SEM_MOVIMENTACAO)
            .sort((a, b) => b.dias - a.dias);

        res.status(200).json({
            metricas: {
                clientesTotais,
                casosAtivosTotal,
                comProcessoJudicial,
                fasePreProcessual,
                diligenciasPendentes,
            },
            alertasCriticos,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}