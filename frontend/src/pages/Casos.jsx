import { useNavigate } from 'react-router-dom' 
import Layout from '../components/Layout'

export default function Casos() {
  const navigate = useNavigate() 
  const perfilId = localStorage.getItem('@JurisFlow:perfil_id');
  const podeInteragirComCaso = perfilId === '99' || perfilId === '1' || perfilId === '2';

  const casosFake = [
    { id: 1, titulo: 'Ação Previdenciária - Antônio Silva', fase: 'inicial', status: 'ativo', pasta_id: 101, responsavel_principal: 'Dr. Gabriel Cordeiro', tem_processo: true },
    { id: 2, titulo: 'Reclamatória Trabalhista - Maria Eduarda', fase: 'instrucao', status: 'ativo', pasta_id: 102, responsavel_principal: 'Dr. Gabriel Cordeiro', tem_processo: true },
    { id: 3, titulo: 'Execução de Contrato - Construções Ramos', fase: 'execucao', status: 'suspenso', pasta_id: 103, responsavel_principal: 'Dra. Milena', tem_processo: false },
  ]

  const traduzirFase = (fase) => {
    const fases = { inicial: 'Petição Inicial', instrucao: 'Fase de Instrução', recursal: 'Fase Recursal', execucao: 'Fase de Execução', encerrado: 'Encerrado' }
    return fases[fase] || fase
  }

  return (
    <Layout>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-juris-blue mb-1">Gestão de Casos</h1>
            <p className="text-slate-500 text-sm">Controle de fases e acesso direto ao histórico de andamento dos processos.</p>
          </div>
          
          <button onClick={() => navigate('/casos/novo')} className="bg-juris-blue hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors cursor-pointer shadow-sm">
            + Abrir Novo Caso
          </button>
        </div>

        {/* 📊 Tabela Principal Limpa */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                <th className="p-4">Título do Caso</th>
                <th className="p-4">Pasta ID</th>
                <th className="p-4">Responsável Principal</th>
                <th className="p-4">Fase Processual</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {casosFake.map((caso) => (
                <tr key={caso.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-juris-blue">{caso.titulo}</td>
                  <td className="p-4 text-slate-500 font-mono">#{caso.pasta_id}</td>
                  <td className="p-4 text-slate-600">{caso.responsavel_principal}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">
                      {traduzirFase(caso.fase)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      caso.status === 'ativo' ? 'bg-emerald-50 text-emerald-600' :
                      caso.status === 'suspenso' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {caso.status}
                    </span>
                  </td>
                  <td className="p-4 text-center flex items-center justify-center space-x-2">
                    <button disabled={!podeInteragirComCaso} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${podeInteragirComCaso ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 cursor-pointer border border-amber-200' : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'}`}>
                      ⚙️ Evoluir
                    </button>
                    
                    <button disabled={!podeInteragirComCaso} onClick={() => navigate('/diligencias/nova')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${podeInteragirComCaso ? 'bg-sky-50 text-sky-700 hover:bg-sky-100 cursor-pointer border border-sky-200' : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'}`}>
                      📅 + Diligência
                    </button>
                    
                    <span className="text-slate-300">|</span>

                    {/* 🌟 BOTÃO REDIRECIONANDO PARA A TELA DE CAIXA DE TEXTO */}
                    {caso.tem_processo ? (
                      <button 
                        onClick={() => navigate(`/casos/processo/${caso.id}`)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-all cursor-pointer shadow-xs border border-slate-800"
                      >
                        📁 Detalhes do Processo
                      </button>
                    ) : (
                      <span className="text-slate-400 italic text-xs bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">Sem Processo</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  )
}
