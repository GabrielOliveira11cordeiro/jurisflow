import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

export default function AndamentoProcesso() {
  const navigate = useNavigate();
  const { id } = useParams(); // ID do caso vindo da URL (botão "Detalhes do Processo")
  
  const [novoAndamento, setNovoAndamento] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  // Dados fixos do Processo, vindos do back-end (Processo.js)
  const [dadosProcesso, setDadosProcesso] = useState({
    numero_processo: '',
    comarca: '',
    vara: '',
    titulo_caso: ''
  });
  const [processoId, setProcessoId] = useState(null);

  // Histórico de Atualizações em ordem cronológica decrescente (US17), vindo do back-end
  const [historicoFake, setHistoricoFake] = useState([]);

  const carregarHistorico = async (idProcesso) => {
    const res = await api.get('/atualizacao-processo', { params: { processo_id: idProcesso } });
    setHistoricoFake(res.data.map((a) => ({
      id: a.id,
      data: new Date(a.data_atualizacao).toLocaleDateString('pt-BR'),
      descricao: a.descricao,
      registrado_por: a.usuario?.nome || 'Usuário'
    })));
  };

  useEffect(() => {
    api.get(`/caso/${id}`)
      .then(async (res) => {
        const caso = res.data;
        const processo = caso.processos?.[0];

        if (!processo) {
          setDadosProcesso({
            numero_processo: 'Sem processo vinculado',
            comarca: '-',
            vara: '-',
            titulo_caso: caso.titulo
          });
          setErro('Este caso ainda não possui processo vinculado.');
          return;
        }

        setProcessoId(processo.id);
        setDadosProcesso({
          numero_processo: processo.numero_processo,
          comarca: processo.comarca || '-',
          vara: processo.vara || '-',
          titulo_caso: caso.titulo
        });
        await carregarHistorico(processo.id);
      })
      .catch(() => setErro('Não foi possível carregar os dados do processo.'));
  }, [id]);

  const handleSubmitAndamento = async (e) => {
    e.preventDefault();
    setSucesso('');
    setErro('');

    const usuario = JSON.parse(localStorage.getItem('@JurisFlow:usuario'));

    if (!processoId) {
      setErro('Este caso não possui processo para receber andamentos.');
      return;
    }
    if (!usuario?.id) {
      setErro('Não foi possível identificar o usuário logado. Saia e entre novamente.');
      return;
    }

    const payload = {
      descricao: novoAndamento,
      processo_id: processoId, // Vincula a FK na tabela
      usuario_id: usuario.id // Quem registrou o andamento
    };

    try {
      await api.post('/atualizacao-processo', payload);
      setSucesso('Andamento processual lançado com sucesso!');
      setNovoAndamento('');
      carregarHistorico(processoId).catch(() => {});
    } catch (err) {
      if (err.response) {
        // O back-end respondeu com erro
        setErro(err.response.data?.message || 'Não foi possível lançar o andamento.');
        return;
      }
      console.log('Back-end offline. Simulando andamento lançado no TCC.');
      setSucesso('Andamento processual lançado! (Modo Simulação)');
      setNovoAndamento('');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        
        {/* Botão Voltar */}
        <button 
          onClick={() => navigate('/casos')} 
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 cursor-pointer flex items-center space-x-1"
        >
          <span>⬅️</span> <span>Voltar para Casos</span>
        </button>

        {/* Card Superior com os Dados Fixos */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-800">
          <span className="text-[10px] font-extrabold uppercase text-amber-500 tracking-wider">Painel Judicial</span>
          <h1 className="text-xl font-bold mt-1 mb-4">{dadosProcesso.titulo_caso}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800 pt-4 text-sm">
            <div>
              <span className="text-slate-400 block text-xs">Número do Processo</span>
              <strong className="font-mono text-slate-200">{dadosProcesso.numero_processo}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Comarca</span>
              <span className="font-medium text-slate-200">{dadosProcesso.comarca}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Vara Judicial</span>
              <span className="font-medium text-slate-200">{dadosProcesso.vara}</span>
            </div>
          </div>
        </div>

        {/* Formulário: Informar Nova Atualização Processual (US16) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-md font-bold text-slate-800 mb-4 flex items-center space-x-2">
            <span>📝</span> <span>Informar Nova Atualização Processual</span>
          </h3>

          {sucesso && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs p-3 rounded-xl text-center font-bold mb-4">
              {sucesso}
            </div>
          )}
          {erro && (
            <div className="bg-rose-50 border border-rose-200 text-rose-500 text-xs p-3 rounded-xl text-center font-bold mb-4">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmitAndamento} className="space-y-4">
            <textarea
              required
              rows="4"
              value={novoAndamento}
              onChange={(e) => setNovoAndamento(e.target.value)}
              placeholder="Digite em caixa de texto o andamento atualizado do caso... (Ex: Sentença proferida julgando o pedido procedente)"
              className="w-full border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-amber-500 bg-slate-50/50 resize-none"
            ></textarea>
            
            <div className="flex justify-end">
              <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md cursor-pointer transition-all">
                Salvar Novo Andamento
              </button>
            </div>
          </form>
        </div>

        {/* Histórico Cronológico das Atualizações (US17) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-md font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <span>⏳</span> <span>Histórico de Atualizações do Processo</span>
          </h3>

          <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
            {historicoFake.map((hist) => (
              <div key={hist.id} className="relative pl-6">
                {/* Indicador visual na linha do tempo */}
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 bg-amber-500 border-4 border-white rounded-full"></span>
                <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium mb-1">
                  <span>📅 {hist.data}</span>
                  <span>•</span>
                  <span>👤 {hist.registrado_por}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-100 inline-block max-w-full">
                  {hist.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}