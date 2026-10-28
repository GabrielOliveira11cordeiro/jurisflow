import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../services/api'

export default function Clientes() {
  const navigate = useNavigate()
  
  // 🌟 Pegamos o ID do perfil logado
  const perfilId = localStorage.getItem('@JurisFlow:perfil_id')

  // 👑 Regra do TCC Corrigida: Administrador-Chefe (ID '3') e Advogado (ID '1') podem interagir.
  // Estagiário (ID '2') não cadastra ou altera clientes.
  const podeCadastrarEAlterar = perfilId === '3' || perfilId === '1'; 
  
  // Lista de clientes vinda do back-end (GET /cliente)
  const [clientesFake, setClientesFake] = useState([])

  useEffect(() => {
    api.get('/cliente')
      .then((res) => setClientesFake(res.data))
      .catch((err) => console.error('Erro ao carregar clientes:', err))
  }, [])

   return (
    <Layout>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Cabeçalho da Página */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-juris-blue mb-1">Gestão de Clientes</h1>
            <p className="text-slate-500 text-sm">Listagem sincronizada com o modelo `Cliente.js` do Sequelize.</p>
          </div>
          
          {/* 🌟 O botão só renderiza na tela se o usuário for Admin ou Advogado */}
          {podeCadastrarEAlterar && (
            <button 
              onClick={() => navigate('/clientes/novo')}
              className="bg-juris-blue hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors cursor-pointer shadow-sm"
            >
              + Cadastrar Cliente
            </button>
          )}
        </div>

        {/* 📊 Tabela de Clientes */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                <th className="p-4">Nome / Razão Social</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">CPF / CNPJ</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {clientesFake.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-juris-blue">{cliente.nome}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                      cliente.tipo_pessoa === 'fisica' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {cliente.tipo_pessoa}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 font-mono">
                    {cliente.tipo_pessoa === 'fisica' ? cliente.cpf : cliente.cnpj}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                      cliente.status === true 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cliente.status === true ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    {podeCadastrarEAlterar ? (
                      <>
                        <button className="text-amber-600 hover:text-amber-700 font-semibold text-xs transition-colors cursor-pointer">Editar</button>
                        <span className="text-slate-300">|</span>
                        <button className="text-red-600 hover:text-red-700 font-semibold text-xs transition-colors cursor-pointer">Desativar</button>
                      </>
                    ) : (
                      <span className="text-slate-400 italic text-xs">Sem permissão</span>
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