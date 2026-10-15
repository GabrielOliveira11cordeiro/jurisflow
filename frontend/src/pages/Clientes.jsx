import Layout from '../components/Layout'

export default function Clientes() {
  // Dados fictícios apenas para deixar o visual pronto antes do back-end
  const clientesFake = [
    { id: 1, nome: 'Antônio Silva de Almeida', documento: '123.456.789-00', email: 'antonio@email.com', status: 'Ativo' },
    { id: 2, nome: 'Maria Eduarda Rodrigues', documento: '987.654.321-11', email: 'maria.eduarda@email.com', status: 'Ativo' },
    { id: 3, nome: 'Advocacia Ramos & Associados', documento: '12.345.678/0001-99', email: 'contato@ramosadv.com', status: 'Inativo' },
  ]

  return (
    <Layout>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Cabeçalho da Página */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-juris-blue mb-1">Gestão de Clientes</h1>
            <p className="text-slate-500 text-sm">Cadastro e histórico de contatos integrados ao `clienteController`.</p>
          </div>
          
          {/* Botão Novo Cliente */}
          <button className="bg-juris-blue hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors cursor-pointer shadow-sm">
            + Cadastrar Cliente
          </button>
        </div>

        {/* 📊 Tabela de Clientes */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                <th className="p-4">Nome / Razão Social</th>
                <th className="p-4">CPF / CNPJ</th>
                <th className="p-4">E-mail</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {clientesFake.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-juris-blue">{cliente.nome}</td>
                  <td className="p-4 text-slate-500">{cliente.documento}</td>
                  <td className="p-4 text-slate-500">{cliente.email}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                      cliente.status === 'Ativo' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cliente.status}
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
