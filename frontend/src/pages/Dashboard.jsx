import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem('@JurisFlow:usuario')) || { nome: 'Operador' };

  const [metricas, setMetricas] = useState({
    clientesTotais: 0,
    casosAtivosTotal: 0,
    comProcessoJudicial: 0,
    fasePreProcessual: 0,
    diligenciasPendentes: 0,
    notificacoesNaoLidas: 2
  });

  const [alertasCriticos, setAlertasCriticos] = useState([]);

  useEffect(() => {
    api.get('/dashboard')
      .then((res) => {
        setMetricas((prev) => ({
          ...prev,
          ...res.data.metricas
        }));
        setAlertasCriticos(res.data.alertasCriticos);
      })
      .catch((err) => console.error('Erro ao carregar o dashboard:', err));

    api.get('/notificacoes/nao-lidas')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setMetricas((prev) => ({
            ...prev,
            notificacoesNaoLidas: res.data.length
          }));
        }
      })
      .catch(() => console.log('Mantendo contagem simulada de notificações no Dashboard.'));
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Boas-vindas */}
        <div className="bg-gradient-to-r from-juris-blue to-slate-800 p-6 rounded-2xl text-white shadow-xs">
          <h1 className="text-2xl font-bold">Olá, {usuario.nome}! 👋</h1>
          <p className="text-slate-300 text-sm mt-1">Bem-vindo ao JurisFlow. Veja o panorama do escritório hoje.</p>
        </div>

        {/* 📊 Seção de Cards Indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Clientes */}
          <div onClick={() => navigate('/clientes')} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl">👤</span>
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider">Clientes Totais</span>
            </div>
            <h2 className="text-3xl font-extrabold text-juris-blue group-hover:text-amber-500 transition-colors">{metricas.clientesTotais}</h2>
            <p className="text-xs text-slate-400 mt-1">Cadastrados na base</p>
          </div>

          {/* Card 2: Casos Ativos */}
          <div onClick={() => navigate('/casos')} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl">⚖️</span>
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider">Casos Ativos</span>
            </div>
            <h2 className="text-3xl font-extrabold text-juris-blue group-hover:text-amber-500 transition-colors">{metricas.casosAtivosTotal}</h2>
            
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
            <p className="text-xs text-slate-400 mt-1">Aguardando conclusão</p>
          </div>

          {/* Card 4: Notificações */}
          <div onClick={() => navigate('/notificacoes')} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl">🔔</span>
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider">Notificações</span>
            </div>
            <h2 className="text-3xl font-extrabold text-juris-blue group-hover:text-amber-500 transition-colors">{metricas.notificacoesNaoLidas}</h2>
            <p className="text-xs text-slate-400 mt-1">Alertas não lidos</p>
          </div>

        </div>

        {/* ⚠️ Seção do Alerta Crítico */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
            <span className="text-lg">🚨</span>
            <h3 className="text-md font-bold text-slate-800">Alertas de Casos Sem Movimentação</h3>
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
