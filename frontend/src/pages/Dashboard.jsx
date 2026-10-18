import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Dashboard() {
  const navigate = useNavigate();

  // Pegamos o perfil para simular a saudação personalizada
  const usuario = JSON.parse(localStorage.getItem('@JurisFlow:usuario')) || { nome: 'Operador' };

  // 📊 Estatísticas Gerenciais baseadas nos seus Models (US23)
  // 🟢 MUDOU: Ajustamos a contagem para refletir a sua listagem real (3 casos ativos no total)
  const metricas = {
    clientesTotais: 3,        // Mapeia do Cliente.js
    casosAtivosTotal: 3,      // Mapeia do Caso.js (Total Geral de demandas)
    comProcessoJudicial: 2,   // Mapeia de quantos Casos possuem Processo.js vinculado
    fasePreProcessual: 1,     // Mapeia de quantos Casos estão na fase "inicial" sem processo
    diligenciasPendentes: 4   // Mapeia do Diligencia.js (status: 'pendente')
  };

  // ⚠️ Alertas automáticos exigidos na US22 (Casos/Processos sem atualização há mais de 30 dias)
  const alertasCriticos = [
    { id: 1, titulo: 'Execução de Contrato - Ramos', dias: 42, responsavel: 'Dra. Milena' },
    { id: 2, titulo: 'Ação Previdenciária - Antônio', dias: 35, responsavel: 'Dr. Gabriel Cordeiro' }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Boas-vindas */}
        <div className="bg-gradient-to-r from-juris-blue to-slate-800 p-6 rounded-2xl text-white shadow-xs">
          <h1 className="text-2xl font-bold">Olá, {usuario.nome}! 👋</h1>
          <p className="text-slate-300 text-sm mt-1">Bem-vindo ao JurisFlow. Veja o panorama do escritório hoje.</p>
        </div>

        {/* 📊 Seção de Cards Indicadores Unificada e Corrigida (US23) */}
        {/* 🟢 MUDOU: Mudamos para md:grid-cols-3 para os 3 cards ficarem perfeitamente distribuídos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Clientes */}
          <div onClick={() => navigate('/clientes')} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl">👤</span>
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider">Clientes Totais</span>
            </div>
            <h2 className="text-3xl font-extrabold text-juris-blue group-hover:text-amber-500 transition-colors">{metricas.clientesTotais}</h2>
            <p className="text-xs text-slate-400 mt-1">Sincronizado com Cliente.js</p>
          </div>

          {/* 🌟 CARD NOVO E UNIFICADO: Casos Ativos (Engloba Casos macros e Processos) */}
          <div onClick={() => navigate('/casos')} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl">⚖️</span>
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider">Casos Ativos</span>
            </div>
            {/* 🟢 Exibe o total geral de demandas ativas (3) de forma unificada */}
            <h2 className="text-3xl font-extrabold text-juris-blue group-hover:text-amber-500 transition-colors">{metricas.casosAtivosTotal}</h2>
            
            {/* 🟢 Legenda interna que detalha as tabelas reais do banco do Cazé (Processo.js vs Caso.js) */}
            <div className="mt-4 pt-2 border-t border-slate-100 flex justify-between text-xxs text-slate-500 font-medium">
              <span className="flex items-center space-x-1">
                <span>📁 Judicial:</span> <strong className="text-juris-blue ml-0.5">{metricas.comProcessoJudicial}</strong>
              </span>
              <span className="flex items-center space-x-1">
                <span>❌ Pré-Processual:</span> <strong className="text-slate-600 ml-0.5">{metricas.fasePreProcessual}</strong>
              </span>
            </div>
          </div>

          {/* Card 3: Diligências */}
          <div onClick={() => navigate('/casos')} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl">📅</span>
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider">Diligências Pendentes</span>
            </div>
            <h2 className="text-3xl font-extrabold text-juris-blue group-hover:text-amber-500 transition-colors">{metricas.diligenciasPendentes}</h2>
            <p className="text-xs text-slate-400 mt-1">Sincronizado com Diligencia.js</p>
          </div>

        </div>

        {/* ⚠️ Seção do Alerta Crítico - US22 (Casos parados há mais de 30 dias) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
            <span className="text-lg">🚨</span>
            <h3 className="text-md font-bold text-slate-800">Alertas de Casos Sem Movimentação (US22)</h3>
          </div>
          
          <div className="space-y-3">
            {alertasCriticos.map((alerta) => (
              <div key={alerta.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-rose-50/50 rounded-xl border border-rose-100 gap-3">
                <div className="flex items-start space-x-3">
                  <span className="text-rose-500 font-bold mt-0.5">⚠️</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{alerta.titulo}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Nenhum andamento ou diligência lançada recentemente neste caso.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-semibold text-slate-500">Resp: {alerta.responsavel}</span>
                  <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-extrabold rounded-lg">
                    {alerta.dias} dias parado
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
