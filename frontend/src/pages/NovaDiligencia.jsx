import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

export default function NovaDiligencia() {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Estado extremamente limpo focado apenas no Caso e no Relato do que está sendo feito
  const [formData, setFormData] = useState({
    casoId: '',  // Qual caso está recebendo essa movimentação
    titulo: '',  // Título rápido do andamento
    descricao: '' // Caixa de texto principal para detalhar o que foi feito
  });

  // Casos em andamento vindos do back-end (GET /caso), sem os encerrados
  const [casosDisponiveis, setCasosDisponiveis] = useState([]);

  useEffect(() => {
    api.get('/caso')
      .then((res) => setCasosDisponiveis(res.data.filter((c) => c.status !== 'encerrado')))
      .catch(() => setErro('Não foi possível carregar a lista de casos.'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Payload estruturado exatamente igual às colunas do seu Diligencia.js no Sequelize
    const payload = {
      titulo: formData.titulo,
      descricao: formData.descricao, // relato detalhado, gravado na coluna descricao
      caso_id: Number(formData.casoId),
      status: 'pendente', // Mantém o valor padrão do ENUM do seu banco
      data_prevista: new Date().toISOString().split('T')[0] // Grava a data de hoje (DATEONLY) automaticamente
    };

    try {
      // Envia os dados oficiais para a API
      await api.post('/diligencias', payload);
      setSucesso('Movimentação registrada com sucesso!');
      setTimeout(() => navigate('/casos'), 1500);
    } catch (err) {
      if (err.response) {
        // O back-end respondeu com erro (ex.: caso inexistente ou campo inválido)
        setErro(err.response.data?.message || 'Não foi possível registrar a movimentação.');
        return;
      }
      console.log('Back-end offline. Executando simulação local para o TCC.');
      setSucesso('Movimentação registrada com sucesso! (Modo Simulação)');
      setTimeout(() => navigate('/casos'), 1500);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Cabeçalho Limpo */}
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-juris-blue">Informar Andamento / Diligência</h1>
          <p className="text-sm text-slate-500">Relate o que está sendo feito ou o que aconteceu no caso jurídico.</p>
        </div>

        {sucesso && <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-4 rounded-xl text-sm mb-6 text-center font-medium">{sucesso}</div>}
        {erro && <div className="bg-rose-50 border border-rose-200 text-rose-500 p-4 rounded-xl text-sm mb-6 text-center font-medium">{erro}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. Seleção Obrigatória do Caso Relacionado */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Selecione o Caso *</label>
            <select 
              name="casoId" 
              required 
              value={formData.casoId} 
              onChange={handleChange} 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50"
            >
              <option value="">Selecione para qual caso deseja despachar...</option>
              {casosDisponiveis.map(c => (
                <option key={c.id} value={c.id}>{c.titulo}</option>
              ))}
            </select>
          </div>

          {/* 2. Resumo da Ação / Título rápido */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Resumo da Atividade / Título *</label>
            <input 
              type="text" 
              name="titulo" 
              required 
              value={formData.titulo} 
              onChange={handleChange} 
              placeholder="Ex: Documento solicitado ao cliente ou Ofício expedido" 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50" 
            />
          </div>

          {/* 3. A Grande Caixa de Texto para Informar o que foi feito */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">O que foi feito / Relato Detalhado *</label>
            <textarea 
              name="descricao" 
              required 
              rows="6" 
              value={formData.descricao} 
              onChange={handleChange} 
              placeholder="Digite detalhadamente aqui o que você fez ou o andamento atual do caso..." 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50"
            ></textarea>
          </div>

          {/* Botões de Controle */}
          <div className="flex justify-end space-x-4 border-t border-slate-100 pt-6">
            <button 
              type="button" 
              onClick={() => navigate('/casos')} 
              className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-juris-blue hover:bg-slate-800 text-white rounded-xl font-bold shadow-md cursor-pointer"
            >
              Salvar Andamento
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
}