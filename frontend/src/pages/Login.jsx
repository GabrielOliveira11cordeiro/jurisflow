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

    // 🌟 INJECTE ESSE BLOCO EXATAMENTE AQUI:
    if (login === 'milena.admin' && senha === '123') {
      const usuarioMock = {
        nome: 'Dra. Milena Romano',
        login: 'milena.admin',
        email: 'milena.admin@jurisflow.com',
        status: true,
        perfil_id: 99
      };
      localStorage.setItem('@JurisFlow:usuario', JSON.stringify(usuarioMock));
      localStorage.setItem('@JurisFlow:perfil_id', '99'); // Libera o acesso total de Admin mestre
      navigate('/dashboard');
      return; // Interrompe a execução aqui para não bater na API que daria erro
    }

    try {
      // Como o print do Cazé usa a rota '/usuario', simulamos a rota de login padrão do back-end
      const response = await api.post('/login', {
        login: login,
        senha: senha
      });

      // 🔥 CORREÇÃO AQUI: Garante que a API respondeu sucesso E retornou um perfil_id válido
      if (response.data && response.data.perfil_id) {
        const usuario = response.data;

        // Regra do TCC: Usuários inativos não poderão acessar o sistema
        if (usuario.status === false || usuario.status === 'inativo') {
          setErro('Usuário inativo. Acesso negado.');
          return;
        }

        // Salva os dados do usuário e do perfil no navegador para controlar os acessos nas outras telas
        localStorage.setItem('@JurisFlow:usuario', JSON.stringify(usuario));
        localStorage.setItem('@JurisFlow:perfil_id', String(usuario.perfil_id)); // Força virar string para bater com o Layout

        // Direciona o usuário conforme suas permissões (Módulo 01 - US01)
        navigate('/dashboard');
      } else {
        // Se a API responder mas os dados estiverem vazios/incorretos
        setErro('Credenciais incorretas informadas pelo servidor.');
      }
    } catch (err) {
      // ... Seu bloco catch atual com os logins simulados (admin, gabriel123, estagiario) fica EXATAMENTE IGUAL ...

      // Enquanto o Cazé não cria a rota exata de autenticação, criamos um mock local para você testar os perfis
      console.log("Back-end off-line ou rota /login não criada. Usando validação simulada para o TCC.");
      
      if (login === 'admin' && senha === '123') {
        localStorage.setItem('@JurisFlow:perfil_id', '99'); // ID fictício para Admin Chefe
        navigate('/dashboard');
      } else if (login === 'milena123' && senha === 'senha123') { // Dados idênticos ao print do Cazé
        localStorage.setItem('@JurisFlow:perfil_id', '1'); // ID 1: Advogado
        navigate('/dashboard');
      } else if (login === 'estagiario' && senha === '123') {
        localStorage.setItem('@JurisFlow:perfil_id', '2'); // ID 2: Estagiário
        navigate('/dashboard');
      } else {
        setErro('Credenciais inválidas. Verifique seu login e senha.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
        
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">⚖️</div>
          <h1 className="text-3xl font-extrabold text-amber-500 tracking-tight">JurisFlow</h1>
          <p className="text-sm text-slate-400 mt-1">Gestão Inteligente para Advocacia</p>
        </div>

        {erro && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm mb-4 text-center font-medium">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Usuário ou Login</label>
            <input
              type="text"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-500 text-slate-100 transition-colors placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Senha</label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-500 text-slate-100 transition-colors placeholder-slate-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0 focus:ring-offset-0" />
              <span className="text-slate-400">Lembrar de mim</span>
            </label>
            <a href="#esqueci" className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
              Esqueci minha senha
            </a>
          </div>

          <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all transform active:scale-98 cursor-pointer">
            Acessar Sistema
          </button>
        </form>
      </div>
      <p className="text-xs text-slate-500 mt-6">JurisFlow &copy; {new Date().getFullYear()} — Sistema em conformidade com a LGPD</p>
    </div>
  );
}
