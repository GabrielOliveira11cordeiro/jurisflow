import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    // Fundo usando o tom azul ultra escuro derivado da marca
    <div className="min-h-screen bg-juris-dark flex items-center justify-center p-4">
      
      {/* Card de Login */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
        
        {/* Cabeçalho com o Logotipo em Código */}
        <div className="text-center mb-8">
          {/* Símbolo da Balança estilizado em Dourado */}
          <div className="text-juris-gold text-4xl mb-2 flex justify-center">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0-17.25a3.75 3.75 0 1 1-7.5 0M12 3a3.75 3.75 0 1 1 7.5 0M4.5 19.5h15M5.625 12h12.75M12 12h.008v.008H12V12Zm0-6h.008v.008H12V6Zm0 6h.008v.008H12V12Z" />
            </svg>
          </div>
          
          {/* Nome da Marca com o Azul Marinho Oficial */}
          <h1 className="text-3xl font-extrabold text-juris-blue tracking-wider font-serif uppercase">
            Jurisflow
          </h1>
          {/* Subtítulo com o Dourado Oficial */}
          <p className="text-juris-gold text-xs font-bold tracking-widest uppercase mt-0.5">
            Plataforma Web
          </p>
          {/* Slogan Real extraído da sua imagem */}
          <p className="text-slate-500 mt-4 text-sm font-medium">
            Gestão inteligente para escritórios de advocacia
          </p>
          <div className="w-16 h-0.5 bg-juris-gold mx-auto mt-2 rounded"></div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Campo de E-mail */}
          <div>
            <label className="block text-xs font-bold text-juris-blue uppercase tracking-wider mb-2">
              E-mail de Acesso
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-usuario@jurisflow.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-juris-blue placeholder-slate-400 focus:outline-none focus:border-juris-gold focus:bg-white transition-colors text-sm"
            />
          </div>

          {/* Campo de Senha */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-juris-blue uppercase tracking-wider">
                Senha
              </label>
              <a href="#" className="text-xs text-juris-gold hover:text-juris-blue font-semibold transition-colors">
                Esqueceu a senha?
              </a>
            </div>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-juris-blue placeholder-slate-400 focus:outline-none focus:border-juris-gold focus:bg-white transition-colors text-sm"
            />
          </div>

          {/* Botão Entrar com o Azul Marinho e texto claro */}
          <button
            type="submit"
            className="w-full bg-juris-blue hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer text-center text-sm uppercase tracking-wider mt-2"
          >
            Entrar no Sistema
          </button>
        </form>

        {/* Rodapé */}
        <div className="mt-8 text-center text-xxs text-slate-400 uppercase tracking-widest">
          Jurisflow &copy; 2026
        </div>

      </div>
    </div>
  )
}
