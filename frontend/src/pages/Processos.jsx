import Layout from '../components/Layout'

export default function Processos() {
  // Dados fictícios baseados no que o processoController do Gabriel deve enviar
  const processosFake = [
    {
      id: 1,
      numero: '0012345-67.2026.8.16.0001',
      cliente: 'Antônio Silva de Almeida',
      parteContraria: 'Banco X9 S/A',
      tribunal: 'TJPR - 2ª Vara Cível',
      tipo: 'Indenizatória',
      status: 'Em Andamento'
    },
    {
      id: 2,
      numero: '5047321-12.2025.4.04.7000',
      cliente: 'Maria Eduarda Rodrigues',
      parteContraria: 'INSS',
      tribunal: 'TRF4 - 1ª Vara Federal',
      tipo: 'Previdenciário',
      status: 'Concluso para Sentença'
    },
    {
      id: 3,
      numero: '0000987-43.2026.5.09.0002',
      cliente: 'Carlos Eduardo Ramos',
      parteContraria: 'Indústria Metalúrgica Ltda',
      tribunal: 'TRT9 - 2ª Vara do Trabalho',
      tipo: 'Trabalhista',
      status: 'Arquivado'
    }
  ]

  return (
    <Layout>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Cabeçalho da Página */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-juris-blue mb-1">Processos Judiciais</h1>
            <p className="text-slate-500 text-sm">Controle de ações, comarcas e andamentos vinculados ao `processoController`.</p>
          </div>
          
          {/* Botão Novo Processo */}
          <button className="bg-juris-blue hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors cursor-pointer shadow-sm whitespace-nowrap">
            + Distribuir Ação
          </button>
        </div>

        {/* 🔍 Barra de Filtro Rápido */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por número CNJ, cliente ou tribunal..."
            className="w-full max-w-md px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-juris-blue placeholder-slate-400 focus:outline-none focus:border-juris-gold focus:bg-white transition-colors"
          />
        </div>

        {/* 📊 Tabela de Processos */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                <th className="p-4">Número Único (CNJ)</th>
                <th className="p-4">Cliente / Parte Contrária</th>
                <th className="p-4">Órgão Julgador</th>
                <th className="p-4">Ação</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {processosFake.map((processo) => (
                <tr key={processo.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Número CNJ destacado em azul marinho */}
                  <td className="p-4 font-mono font-bold text-juris-blue break-all">
                    {processo.numero}
                  </td>
                  
                  {/* Cliente vs Réu */}
                  <td className="p-4">
                    <div className="font-medium text-slate-900">{processo.cliente}</div>
                    <div className="text-xs text-slate-400 mt-0.5">vs {processo.parteContraria}</div>
                  </td>
                  
                  {/* Tribunal */}
                  <td className="p-4 text-slate-500 font-medium">
                    {processo.tribunal}
                  </td>
                  
                  {/* Tipo de Ação */}
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-medium">
                      {processo.tipo}
                    </span>
                  </td>
                  
                  {/* Status Colorido */}
                  <td className="p-4 text-center whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                      processo.status === 'Em Andamento' 
                        ? 'bg-blue-50 text-blue-600' 
                        : status === 'Concluso para Sentença'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {processo.status}
                    </span>
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
