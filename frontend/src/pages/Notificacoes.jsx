import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [filtro, setFiltro] = useState('todas'); // 'todas' ou 'nao_lidas'

  useEffect(() => {
    // Tenta buscar todas as notificações no back-end (ou /notificacoes/nao-lidas)
    api.get('/notificacoes')
      .then((res) => {
        setNotificacoes(res.data.map((n) => {
          const data = new Date(n.createdAt || Date.now());
          const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

          return {
            id: n.id,
            tipo: n.tipo || 'SISTEMA',
            entidade: n.entidade || 'sistema',
            descricao: n.descricao,
            lida: Boolean(n.lida),
            data_hora: `${data.toLocaleDateString('pt-BR')} às ${hora}`
          };
        }));
      })
      .catch(() => {
        console.log('Back-end offline. Mantendo notificações simuladas para o TCC.');
        setNotificacoes([
          {
            id: 1,
            tipo: 'ALERTA_ATRASO',
            entidade: 'casos',
            descricao: 'O caso "Ação Previdenciária - Antônio" está há mais de 30 dias sem movimentação!',
            lida: false,
            data_hora: 'Hoje às 09:30'
          },
          {
            id: 2,
            tipo: 'NOVA_DILIGENCIA',
            entidade: 'diligencias',
            descricao: 'Uma nova diligência foi atribuída a você: "Solicitar PPP".',
            lida: false,
            data_hora: 'Ontem às 16:15'
          },
          {
            id: 3,
            tipo: 'SISTEMA',
            entidade: 'clientes',
            descricao: 'O cliente "Antônio Carlos Silva" teve o cadastro atualizado com sucesso.',
            lida: true,
            data_hora: '07/11/2026 às 14:20'
          }
        ]);
      });
  }, []);

  const marcarComoLida = async (id) => {
    try {
      await api.patch(`/notificacoes/${id}/lida`);
    } catch (err) {
      // Atualiza localmente mesmo se a rota ainda não existir no back-end
    }
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  const marcarTodasComoLidas = async () => {
    try {
      await api.patch('/notificacoes/ler-todas');
    } catch (err) {
      // Atualiza localmente mesmo se a rota ainda não existir no back-end
    }
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  const obterDetalhesTipo = (tipo) => {
    if (tipo === 'ALERTA_ATRASO') {
      return {
        label: '⚠️ Alerta de Atraso',
        badge: 'bg-rose-50 text-rose-700 border-rose-200'
      };
    }
    if (tipo === 'NOVA_DILIGENCIA') {
      return {
        label: '📅 Nova Atribuição',
        badge: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    }
    return {
      label: 'ℹ️ Atualização do Sistema',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
  };

  const notificacoesFiltradas = notificacoes.filter((n) =>
    filtro === 'nao_lidas' ? !n.lida : true
  );

  const totalNaoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Cabeçalho */}
        <div className="mb-6 border-b border-slate-100 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-juris-blue mb-1">Centro de Notificações</h1>
              {totalNaoLidas > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
                  {totalNaoLidas} {totalNaoLidas === 1 ? 'não lida' : 'não lidas'}
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm">Acompanhe alertas de prazos, novas diligências e movimentações do escritório.</p>
          </div>

          {totalNaoLidas > 0 && (
            <button
              onClick={marcarTodasComoLidas}
              className="text-xs font-extrabold uppercase tracking-wider text-juris-blue hover:text-juris-gold transition-colors cursor-pointer self-start md:self-center"
            >
              ✓ Marcar todas como lidas
            </button>
          )}
        </div>

        {/* Abas de Filtro */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setFiltro('todas')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filtro === 'todas'
                ? 'bg-juris-blue text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({notificacoes.length})
          </button>
          <button
            onClick={() => setFiltro('nao_lidas')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filtro === 'nao_lidas'
                ? 'bg-juris-blue text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Não lidas ({totalNaoLidas})
          </button>
        </div>

        {/* Lista de Notificações */}
        <div className="space-y-3">
          {notificacoesFiltradas.length === 0 ? (
            <div className="text-center py-12 bg-slate-50/60 rounded-xl border border-dashed border-slate-200">
              <p className="text-slate-400 text-sm font-medium">Nenhuma notificação encontrada nesta aba.</p>
            </div>
          ) : (
            notificacoesFiltradas.map((item) => {
              const infoTipo = obterDetalhesTipo(item.tipo);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                    item.lida
                      ? 'bg-slate-50/60 border-slate-100 opacity-75'
                      : 'bg-white border-amber-200 shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {!item.lida && (
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" title="Não lida"></span>
                      )}
                      <span className={`px-2.5 py-0.5 rounded-md text-xxs font-bold uppercase border ${infoTipo.badge}`}>
                        {infoTipo.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        • Origem: <strong className="font-mono text-slate-500">{item.entidade}</strong>
                      </span>
                    </div>

                    <p className={`text-sm leading-relaxed ${item.lida ? 'text-slate-600 font-medium' : 'text-slate-800 font-bold'}`}>
                      {item.descricao}
                    </p>

                    <div className="text-xs text-slate-400">
                      🕒 {item.data_hora}
                    </div>
                  </div>

                  {!item.lida && (
                    <button
                      onClick={() => marcarComoLida(item.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-juris-blue hover:text-white text-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 self-start md:self-center"
                    >
                      Marcar como lida
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </Layout>
  );
}
