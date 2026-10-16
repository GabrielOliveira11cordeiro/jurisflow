import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../services/api' // Importa o axios para buscar as notificações

export default function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Pegamos as informações de perfil e usuário cadastradas no login
  const perfilId = localStorage.getItem('@JurisFlow:perfil_id')
  const usuarioLogado = JSON.parse(localStorage.getItem('@JurisFlow:usuario')) || { nome: 'Operador' };

  // 📊 ESTADO PARA GUARDAR AS NOTIFICAÇÕES (Sincronizado com Notificacao.js e NotificacaoDestinatario.js)
  const [notificacoes, setNotificacoes] = useState([
    // Mocks padrão do TCC para a tela não ficar vazia se o back-end do Cazé estiver offline (US19 e US22)
    { id: 1, tipo: 'ALERTA_ATRASO', entidade: 'casos', descricao: 'O caso "Ação Previdenciária - Antônio" está há mais de 30 dias sem movimentação!', lida: false },
    { id: 2, tipo: 'NOVA_DILIGENCIA', entidade: 'diligencias', descricao: 'Uma nova diligência foi atribuída a você: "Solicitar PPP".', lida: false }
  ]);

  // Lista de links de navegação da plataforma com controle de acesso por ID
  const menuItems = [
    { text: 'Painel Principal', path: '/dashboard', icon: '📊', perfisPermitidos: ['99', '1', '2'] },
    { text: 'Clientes', path: '/clientes', icon: '👤', perfisPermitidos: ['99', '1', '2'] }, // 🌟 Movido para cima de Casos
    { text: 'Casos', path: '/casos', icon: '⚖️', perfisPermitidos: ['99', '1', '2'] }, 
    { text: 'Histórico Geral', path: '/historico', icon: '⏳', perfisPermitidos: ['99', '1', '2'] },
    { text: 'Cadastrar Equipe', path: '/usuarios/novo', icon: '➕', perfisPermitidos: ['99']} // 🔒 Só aparece se for o Admin logado!
  ]

  // Filtra os botões do menu com base nas permissões da US03
  const itensFiltrados = menuItems.filter(item => item.perfisPermitidos.includes(perfilId))

  // BUSCA AS NOTIFICAÇÕES NÃO LIDAS DO USUÁRIO LOGADO (US21)
  useEffect(() => {
    async function carregarNotificacoes() {
      try {
        const response = await api.get('/notificacoes/nao-lidas');
        if (response.data) {
          setNotificacoes(response.data);
        }
      } catch (err) {
        console.log('Back-end offline. Mantendo notificações simuladas para o TCC.');
      }
    }
    carregarNotificacoes();
  }, []);

  // Conta quantas notificações não lidas restam para o balão vermelho
  const totalNaoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* 🟦 BARRA LATERAL (SIDEBAR) - Usando o Azul Marinho Oficial */}
      <aside className="w-64 bg-juris-blue text-white flex flex-col justify-between shadow-xl fixed h-full z-40">
        <div>
          {/* 🟢 TOPO DA SIDEBAR CORRIGIDO: Centralização perfeita e fixação do balão */}
          <div className="p-6 border-b border-slate-800 text-center flex flex-col items-center relative group">
            <h2 className="text-xl font-extrabold tracking-wider font-serif uppercase text-white">
              Jurisflow
            </h2>
            <p className="text-juris-gold text-xxs font-bold tracking-widest uppercase mt-0.5 mb-2">
              Plataforma Web
            </p>

            {/* 🔔 CONTAINER DO SININHO ANCORADO */}
            <div className="relative cursor-pointer inline-block mt-2">
              <span className="text-2xl block text-amber-400 hover:text-white transition-colors">
                🔔
              </span>
              
              {/* Balão Vermelho ajustado milimetricamente sobre o sino */}
              {totalNaoLidas > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalNaoLidas}
                </span>
              )}

              {/* 🪟 CAIXA FLUTUANTE (Aparece ao passar o mouse sobre o sino) */}
              <div className="absolute left-10 top-0 w-72 bg-white text-slate-800 rounded-xl shadow-2xl p-4 hidden group-hover:block border border-slate-100 text-left z-50">
                <h4 className="text-xs font-bold text-juris-blue border-b border-slate-100 pb-2 mb-2 uppercase tracking-wider">Centro de Notificações</h4>
                <div className="space-y-2.5 max-h-60 overflow-y-auto">
                  {notificacoes.map(notif => (
                    <div key={notif.id} className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-xxs leading-relaxed">
                      <span className="font-bold text-rose-500 block mb-0.5">
                        {notif.tipo === 'ALERTA_ATRASO' ? '⚠️ Alerta de Atraso' : '📅 Nova Atribuição'}
                      </span>
                      {notif.descricao}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Links de Navegação Filtrados */}
          <nav className="p-4 space-y-2 mt-4">
            {itensFiltrados.map((item) => {
              const isActive = location.pathname === item.path
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-juris-gold text-juris-blue font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Botão de Sair no rodapé da Sidebar */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => {
              localStorage.removeItem('@JurisFlow:usuario');
              localStorage.removeItem('@JurisFlow:perfil_id');
              navigate('/login');
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <span>🚪</span>
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* ⬜ ÁREA DE CONTEÚDO PRINCIPAL (Fica ao lado da Sidebar) */}
      <main className="flex-1 ml-64 p-8 bg-slate-50 min-h-screen">
        {children}
      </main>

    </div>
  )
}
