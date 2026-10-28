import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      // 🌟 REQUISIÇÃO REAL PRIMEIRO: Tenta autenticar direto no banco do Cazé
      const response = await api.post('/login', {
        login: login,
        senha: senha
      });

      // Se a rota do Cazé existir e validar o usuário no banco, entra por aqui
      if (response.data && response.data.perfil_id) {
        const usuario = response.data;

        if (usuario.status === false || usuario.status === 'inativo') {
          setErro('Usuário inativo. Acesso negado.');
          return;
        }

        // Salva as credenciais REAIS vindas do PostgreSQL
        localStorage.setItem('@JurisFlow:usuario', JSON.stringify(usuario));
        localStorage.setItem('@JurisFlow:perfil_id', String(usuario.perfil_id)); 

        navigate('/dashboard');
        return; // Encerra a execução pois o login real deu certo
      } else {
        setErro('Credenciais incorretas informadas pelo servidor.');
      }
    } catch (err) {
      console.log("Back-end off-line ou rota /login não criada. Usando validação simulada para o TCC.");
      
      // 🔄 CONTINGÊNCIA: Só entra aqui se a requisição real falhar (Ex: erro 404)
      if (login === 'milena.admin' && senha === '123') {
        const usuarioMock = {
          nome: 'Dra. Milena Romano',
          login: 'milena.admin',
          email: 'milena.admin@jurisflow.com',
          status: true,
          perfil_id: 3
        };
        localStorage.setItem('@JurisFlow:usuario', JSON.stringify(usuarioMock));
        localStorage.setItem('@JurisFlow:perfil_id', '3'); 
        navigate('/dashboard');
      } else if (login === 'admin' && senha === '123') {
        localStorage.setItem('@JurisFlow:perfil_id', '3'); 
        navigate('/dashboard');
      } else if (login === 'milena123' && senha === 'senha123') { 
        localStorage.setItem('@JurisFlow:perfil_id', '1'); 
        navigate('/dashboard');
      } else if (login === 'estagiario' && senha === '123') {
        localStorage.setItem('@JurisFlow:perfil_id', '2'); 
        navigate('/dashboard');
      } else {
        setErro('Credenciais inválidas. Verifique seu login e senha.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1325] flex flex-col items-center justify-center p-4 antialiased">
      <div className="bg-white px-10 py-12 rounded-[24px] shadow-xl w-full max-w-[460px] border border-slate-100">
        
        {/* Cabeçalho da Identidade Visual */}
        <div className="text-center mb-8">
          {/* Símbolo da Balança estilizado em Dourado */}
          <div className="text-juris-gold text-4xl mb-2 flex justify-center">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0-17.25a3.75 3.75 0 1 1-7.5 0M12 3a3.75 3.75 0 1 1 7.5 0M4.5 19.5h15M5.625 12h12.75M12 12h.008v.008H12V12Zm0-6h.008v.008H12V6Zm0 6h.008v.008H12V12Z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-[#0e1f38] tracking-widest font-serif uppercase">JurisFlow</h1>
          <span className="text-[11px] font-extrabold text-[#c5a473] tracking-widest uppercase mt-0.5 block">Plataforma Web</span>
          
          {/* Linha separadora discreta sob a descrição */}
          <p className="text-xs text-slate-500 font-medium mt-4 max-w-[260px] mx-auto relative after:content-[''] after:block after:w-16 after:h-[1px] after:bg-[#c5a473]/40 after:mx-auto after:mt-3">
            Gestão inteligente para escritórios de advocacia
          </p>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs font-bold mb-4 text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] font-extrabold text-[#0e1f38] uppercase tracking-wider mb-1.5">
              E-mail de Acesso
            </label>
            <input
              type="text"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Ex: milena9919@gmail.com"
              className="w-full px-4 py-3 bg-[#e8f0fe] border border-transparent rounded-xl focus:outline-none focus:border-[#c5a473] text-[#0e1f38] font-medium text-sm transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-extrabold text-[#0e1f38] uppercase tracking-wider">
                Senha
              </label>
              <a href="#esqueci" className="text-[11px] font-bold text-[#c5a473]/90 hover:text-[#c5a473] transition-colors">
                Esqueceu a senha?
              </a>
            </div>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#c5a473] text-[#0e1f38] text-sm transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3.5 bg-[#0e1f38] hover:bg-[#162f54] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer mt-2"
          >
            Entrar no Sistema
          </button>
        </form>
      </div>
      
      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-6">
        JurisFlow &copy; 2026
      </p>
    </div>
  );
}