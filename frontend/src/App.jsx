import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard' 
import Casos from './pages/Casos' 
import Clientes from './pages/Clientes'
import NovoCliente from './pages/NovoCliente'
import NovoCaso from './pages/NovoCaso'
import NovaDiligencia from './pages/NovaDiligencia' 
import AndamentoProcesso from './pages/AndamentoProcesso'
import Historico from './pages/Historico'
import NovoUsuario from './pages/NovoUsuario'

// Importamos apenas o Guardião de Segurança aqui
import PermissaoGuard from './components/PermissaoGuard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Quando abrir o sistema, joga direto para a tela de Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rota Pública de Autenticação */}
        <Route path="/login" element={<Login />} />

        {/* 🔒 Rotas Protegidas (Sem o <Layout> aqui, pois você já importa dentro delas) */}
        
        {/* Dashboard -> 🌟 Incluído o '3' */}
        <Route path="/dashboard" element={
          <PermissaoGuard perfisPermitidos={['3', '99', '1', '2']}>
            <Dashboard />
          </PermissaoGuard>
        } />

        {/* Casos -> 🌟 Incluído o '3' */}
        <Route path="/casos" element={
          <PermissaoGuard perfisPermitidos={['3', '99', '1', '2']}>
            <Casos />
          </PermissaoGuard>
        } />
        
        <Route path="/casos/novo" element={
          <PermissaoGuard perfisPermitidos={['3', '99', '1', '2']}>
            <NovoCaso />
          </PermissaoGuard>
        } />
        
        <Route path="/casos/processo/:id" element={
          <PermissaoGuard perfisPermitidos={['3', '99', '1', '2']}>
            <AndamentoProcesso />
          </PermissaoGuard>
        } />
        
        <Route path="/diligencias/nova" element={
          <PermissaoGuard perfisPermitidos={['3', '99', '1', '2']}>
            <NovaDiligencia />
          </PermissaoGuard>
        } />

        {/* Clientes -> 🌟 Incluído o '3' */}
        <Route path="/clientes" element={
          <PermissaoGuard perfisPermitidos={['3', '99', '1', '2']}>
            <Clientes />
          </PermissaoGuard>
        } />

        {/* TRAVA DE CADASTRO: 🌟 Incluído o '3' (Estagiário ID 2 continua bloqueado) */}
        <Route path="/clientes/novo" element={
          <PermissaoGuard perfisPermitidos={['3', '99', '1']}>
            <NovoCliente />
          </PermissaoGuard>
        } />
        
        {/* ⏳ Histórico Geral -> 🌟 Incluído o '3' */}
        <Route path="/historico" element={
          <PermissaoGuard perfisPermitidos={['3', '99', '1', '2']}>
            <Historico />
          </PermissaoGuard>
        } />
        
        {/* 🔒 TRAVA DE ADMIN: 🌟 Apenas o '3' e '99' entram para cadastrar equipe */}
        <Route path="/usuarios/novo" element={
          <PermissaoGuard perfisPermitidos={['3', '99']}> 
            <NovoUsuario />
          </PermissaoGuard>
        } />

        {/* Se digitar qualquer rota inexistente, volta pro login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
