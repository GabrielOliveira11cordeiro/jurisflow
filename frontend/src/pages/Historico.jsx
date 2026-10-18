import { useState } from 'react';
import Layout from '../components/Layout';

export default function Historico() {
  // Dados fictícios estruturados exatamente como o HistoricoAtividade.js do banco (US18)
  const historicoFake = [
    {
      id: 1,
      entidade: 'diligencias',
      entidade_id: 45,
      acao: 'criacao',
      descricao: 'Gabriel Cordeiro criou a diligência "Solicitar PPP à empresa".',
      data_hora: '15/10/2026 às 16:45',
      usuario_nome: 'Dr. Gabriel Cordeiro'
    },
    {
      id: 2,
      entidade: 'processos',
      entidade_id: 10,
      acao: 'atualizacao',
      descricao: 'Milena Ramos registrou um novo andamento processual: "Audiência designada".',
      data_hora: '15/10/2026 às 14:20',
      usuario_nome: 'Dra. Milena Ramos'
    },
    {
      id: 3,
      entidade: 'clientes',
      entidade_id: 1,
      acao: 'criacao',
      descricao: 'Gabriel Cordeiro cadastrou o novo cliente "Antônio Silva de Almeida".',
      data_hora: '14/10/2026 às 09:15',
      usuario_nome: 'Dr. Gabriel Cordeiro'
    },
    {
      id: 4,
      entidade: 'casos',
      entidade_id: 3,
      acao: 'atualizacao',
      descricao: 'João Silva alterou o status do caso #103 para "Suspenso".',
      data_hora: '13/10/2026 às 11:30',
      usuario_nome: 'João Silva (Estagiário)'
    }
  ];

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
