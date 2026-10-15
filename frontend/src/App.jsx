import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Processos from './pages/Processos'
import Clientes from './pages/Clientes' // 1. Importa a nova página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/processos" element={<Processos />} />
        <Route path="/clientes" element={<Clientes />} /> {/* 2. Adiciona a rota */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
