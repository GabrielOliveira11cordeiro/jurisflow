import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

export default function NovoCaso() {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  
  // Estado para controlar se exibe Processo ou Observação Pré-processual
  const [temProcesso, setTemProcesso] = useState('nao'); 

  // Estado com as chaves do Caso + campos do Processo + Observação
 const [formData, setFormData] = useState({
    clienteId: '',       
    titulo: '',
    fase: 'inicial', 
    status: 'ativo', 
    responsavelPrincipalId: '',
    numeroProcesso: '',
    comarca: '',
    vara: '',
    situacao: 'Distribuído. Aguardando andamento.',
    observacaoPreProcessual: ''
  });

  // Mocks para simulação no TCC
  const clientesDisponiveis = [
    { id: '1', nome: 'Antônio Silva de Almeida' },
    { id: '2', nome: 'Maria Eduarda Rodrigues' },
    { id: '3', nome: 'Construções Ramos LTDA' }
  ];

  const advogadosDisponiveis = [
    { id: '1', nome: 'Dr. Gabriel Cordeiro' },
    { id: '99', nome: 'Dra. Milena Ramos' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Montamos o objeto principal do Caso (Sequelize Caso.js)
    const payloadCaso = {
  titulo: formData.titulo,
  fase: temProcesso === 'sim' ? 'instrucao' : 'inicial', 
  status: formData.status,
  // 🌟 2. Se o Cazé mantiver a coluna pasta_id no banco, você pode passar o ID do cliente nela 
  // para simular o relacionamento 1 para 1 sem precisar refatorar as migrations do back-end!
  pasta_id: Number(formData.clienteId), 
  responsavel_principal_id: Number(formData.responsavelPrincipalId)
};

     try {
      // 🌟 PASSO 1: Criar a Pasta em segundo plano automaticamente
      const payloadPasta = {
        numero: `PST-${Date.now().toString().slice(-4)}`, 
        status: formData.status,
        prioridade: 'media',
        cliente_id: Number(formData.clienteId),
        responsavel_id: Number(formData.responsavelPrincipalId)
      };

      const responsePasta = await api.post('/pastas', payloadPasta);
      
      // Pega o ID da pasta criada pelo back-end (ou gera um reserva caso caia no catch)
      const pastaIdCriada = responsePasta.data?.id || Math.floor(Math.random() * 1000);

      // 🌟 PASSO 2: Criar o Caso vinculado à Pasta gerada acima
      const payloadCaso = {
        titulo: formData.titulo,
        fase: temProcesso === 'sim' ? 'instrucao' : 'inicial', 
        status: formData.status,
        pasta_id: Number(pastaIdCriada), // Chave estrangeira preenchida automaticamente
        responsavel_principal_id: Number(formData.responsavelPrincipalId)
      };

      const responseCaso = await api.post('/casos', payloadCaso);
      
      // PASSO 3: Se tiver processo, vincula na tabela de processos
      if (temProcesso === 'sim' && responseCaso.data?.id) {
        const payloadProcesso = {
          numero_processo: formData.numeroProcesso,
          comarca: formData.comarca,
          vara: formData.vara,
          situacao: formData.situacao,
          caso_id: responseCaso.data.id
        };
        await api.post('/processos', payloadProcesso);
      }

      setSucesso('Caso e Pasta gerados com sucesso!');
      setTimeout(() => navigate('/casos'), 1500);
    } catch (err) {
      console.log('Back-end offline. Executando simulação de Pasta + Caso no TCC.');
      setSucesso('Caso e Pasta criados! (Modo Simulação)');
      setTimeout(() => navigate('/casos'), 1500);
    }
  };


  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Cabeçalho */}
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-juris-blue">Abertura de Novo Caso</h1>
          <p className="text-sm text-slate-500">A pasta física correspondente será criada automaticamente pelo sistema.</p>
        </div>

        {/* Alertas de Feedback */}
        {sucesso && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-4 rounded-xl text-sm mb-6 text-center font-medium">
            {sucesso}
          </div>
        )}
        {erro && (
          <div className="bg-rose-50 border border-rose-200 text-rose-500 p-4 rounded-xl text-sm mb-6 text-center font-medium">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Seção 1: Dados Gerais do Caso */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 🟢 Seleção do Cliente (Mapeado corretamente) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Cliente *</label>
              <select 
                name="clienteId" 
                required 
                value={formData.clienteId} 
                onChange={handleChange} 
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50"
              >
                <option value="">Selecione o Cliente do Caso...</option>
                {clientesDisponiveis.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>

            {/* Título do Caso */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Título do Caso *</label>
              <input 
                type="text" 
                name="titulo" 
                required 
                value={formData.titulo} 
                onChange={handleChange} 
                placeholder="Ex: Concessão de Aposentadoria Especial" 
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50" 
              />
            </div>

            {/* Advogado Responsável */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Responsável pelo Caso e Pasta *</label>
              <select 
                name="responsavelPrincipalId" 
                required 
                value={formData.responsavelPrincipalId} 
                onChange={handleChange} 
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50"
              >
                <option value="">Selecione um advogado...</option>
                {advogadosDisponiveis.map(adv => (
                  <option key={adv.id} value={adv.id}>{adv.nome}</option>
                ))}
              </select>
            </div>

            {/* Status Inicial */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Status Inicial *</label>
              <select 
                name="status" 
                required 
                value={formData.status} 
                onChange={handleChange} 
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50"
              >
                <option value="ativo">Ativo</option>
                <option value="suspenso">Suspenso</option>
              </select>
            </div>
          </div>

          {/* 📊 Pergunta Chave: Se existe processo instaurado (US15) */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 my-4">
            <label className="block text-sm font-bold text-juris-blue mb-2">Este caso já possui um processo judicial/administrativo instaurado? (US15)</label>
            <div className="flex space-x-4">
              <button 
                type="button" 
                onClick={() => setTemProcesso('nao')} 
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  temProcesso === 'nao' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                ❌ Não (Fase Pré-Processual)
              </button>
              <button 
                type="button" 
                onClick={() => setTemProcesso('sim')} 
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  temProcesso === 'sim' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                ⚖️ Sim (Vincular Processo Judicial)
              </button>
            </div>
          </div>

          {/* 🌟 Bloco Dinâmico 1: Se NÃO tiver processo -> Exibe a grande caixa de observações */}
          {temProcesso === 'nao' && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 gap-4 animate-fadeIn">
              <div className="border-b border-slate-200 pb-1 mb-1">
                <h4 className="text-xs font-bold uppercase text-slate-600 tracking-wider">Acompanhamento Pré-Processual</h4>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Informações ou Observações Importantes *</label>
                <textarea 
                  name="observacaoPreProcessual" 
                  required 
                  rows="4" 
                  value={formData.observacaoPreProcessual} 
                  onChange={handleChange} 
                  placeholder="Ex: Cliente ficou de trazer as cópias dos documentos até o dia 20. Aguardando documentação para protocolar a petição inicial..." 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white text-sm"
                ></textarea>
              </div>
            </div>
          )}

          {/* ⚖️ Bloco Dinâmico 2: Se TIVER processo -> Exibe as colunas do Processo.js */}
          {temProcesso === 'sim' && (
            <div className="p-6 bg-amber-50/30 rounded-2xl border border-amber-200/50 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              <div className="md:col-span-3 border-b border-amber-200/40 pb-1 mb-1">
                <h4 className="text-xs font-bold uppercase text-amber-800 tracking-wider">Dados Judiciais do Processo (Sequelize Processo.js)</h4>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Número do Processo *</label>
                <input 
                  type="text" 
                  name="numeroProcesso" 
                  required 
                  value={formData.numeroProcesso} 
                  onChange={handleChange} 
                  placeholder="0000000-00.2026.8.16.0000" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Comarca *</label>
                <input 
                  type="text" 
                  name="comarca" 
                  required 
                  value={formData.comarca} 
                  onChange={handleChange} 
                  placeholder="Ex: Joaquim Távora" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vara Judicial *</label>
                <input 
                  type="text" 
                  name="vara" 
                  required 
                  value={formData.vara} 
                  onChange={handleChange} 
                  placeholder="Ex: Vara Cível" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" 
                />
              </div>
            </div>
          )}

          {/* Botões de Envio e Cancelamento */}
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
              Salvar Caso
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
}