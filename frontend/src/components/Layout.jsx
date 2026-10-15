import { useNavigate, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  // Lista de botões do menu lateral baseada nos controllers do Cazé
  const menuItems = [
    { text: 'Painel Principal', path: '/dashboard', icon: '📊' },
    { text: 'Processos', path: '/processos', icon: '⚖️' },
    { text: 'Clientes', path: '/clientes', icon: '👤' }, // Deixamos pronto se precisar criar depois
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* 🟦 BARRA LATERAL (SIDEBAR) - Usando o Azul Marinho Oficial */}
      <aside className="w-64 bg-juris-blue text-white flex flex-col justify-between shadow-xl fixed h-full">
        <div>
          {/* Topo da Sidebar com a Marca */}
          <div className="p-6 border-b border-slate-800 text-center">
            <h2 className="text-xl font-extrabold tracking-wider font-serif uppercase text-white">
              Jurisflow
            </h2>
            <p className="text-juris-gold text-xxs font-bold tracking-widest uppercase mt-0.5">
              Plataforma Web
            </p>
          </div>

          {/* Links de Navegação */}
          <nav className="p-4 space-y-2 mt-4">
            {menuItems.map((item) => {
              // Verifica se o usuário está na página atual para acender o botão
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
            onClick={() => navigate('/login')}
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
