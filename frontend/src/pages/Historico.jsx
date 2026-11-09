import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

export default function Historico() {
  // Histórico de atividades vindo do back-end (US18), no formato do HistoricoAtividade.js
  const [historicoFake, setHistoricoFake] = useState([]);

  useEffect(() => {
    api.get('/historico-atividade')
      .then((res) => {
        setHistoricoFake(res.data.map((h) => {
          const data = new Date(h.createdAt);
          const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

          return {
            id: h.id,
            entidade: h.entidade,
            entidade_id: h.entidade_id,
            acao: h.acao,
            // o nome de quem fez a ação vem antes do texto gravado no banco
            descricao: h.usuario?.nome ? `${h.usuario.nome} ${h.descricao}` : h.descricao,
            data_hora: `${data.toLocaleDateString('pt-BR')} às ${hora}`,
            usuario_nome: h.usuario?.nome
          };
        }));
      })
      .catch((err) => console.error('Erro ao carregar o histórico:', err));
  }, []);

  // Helper visual para colocar cores nos distintivos (badges) de ação
  const obterEstiloAcao = (acao) => {
    const estilos = {
      criacao: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      atualizacao: 'bg-amber-50 text-amber-700 border-amber-200',
      exclusao: 'bg-rose-50 text-rose-700 border-rose-200'
    };
    return estilos[acao] || 'bg-slate-50 text-slate-700';
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Cabeçalho */}
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-extrabold text-juris-blue mb-1">Histórico de Atividades</h1>
          <p className="text-slate-500 text-sm">Auditoria completa de ações realizadas no sistema (Sequelize `historico_atividades`).</p>
        </div>

        {/* Linha do Tempo (Timeline) Simples e Direta */}
        <div className="relative border-l-2 border-slate-100 ml-4 space-y-6">
          {historicoFake.map((item) => (
            <div key={item.id} className="relative pl-6 group">
              
              {/* Ponto indicador na linha do tempo */}
              <span className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-xs transition-all ${
                item.acao === 'criacao' ? 'bg-emerald-500' : item.acao === 'atualizacao' ? 'bg-amber-500' : 'bg-rose-500'
              }`}></span>
              
              {/* Bloco de conteúdo do histórico */}
              <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="space-y-1">
                  {/* Descrição direta da ação */}
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {item.descricao}
                  </p>
                  
                  {/* Detalhes de Data/Hora e Usuário */}
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span>🕒 {item.data_hora}</span>
                    <span>•</span>
                    <span>Tabela: <strong className="font-mono text-slate-500">{item.entidade}</strong></span>
                  </div>
                </div>

                {/* Badge da Ação (Criação / Atualização) */}
                <div className="flex items-center">
                  <span className={`px-2.5 py-0.5 rounded-md text-xxs font-bold uppercase border ${obterEstiloAcao(item.acao)}`}>
                    {item.acao === 'criacao' ? 'Criação' : 'Ajuste'}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}