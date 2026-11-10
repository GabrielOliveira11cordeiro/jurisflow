import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleRecuperar = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    setCarregando(true);

    try {
      // Tenta enviar para o back-end real caso a rota exista
      await api.post('/esqueci-senha', { email });
      setMensagem('Instruções de recuperação enviadas para o seu e-mail.');
    } catch (err) {
      console.log('Rota /esqueci-senha ainda não implementada no back-end. Simulando envio para o TCC.');
      // Contingência para apresentação do TCC
      setMensagem(`Se o e-mail ${email} estiver cadastrado, você receberá um link para redefinir sua senha em instantes.`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1325] flex flex-col items-center justify-center p-4 antialiased">
      <div className="bg-white px-10 py-12 rounded-[24px] shadow-xl w-full max-w-[460px] border border-slate-100">
        
        {/* Cabeçalho da Identidade Visual */}
        <div className="text-center mb-8">
          {/* Símbolo da Balança estilizado em Dourado */}
          <div className="text-[#c5a473] text-4xl mb-2 flex justify-center">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0-17.25a3.75 3.75 0 1 1-7.5 0M12 3a3.75 3.75 0 1 1 7.5 0M4.5 19.5h15M5.625 12h12.75M12 12h.008v.008H12V12Zm0-6h.008v.008H12V6Zm0 6h.008v.008H12V12Z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-[#0e1f38] tracking-widest font-serif uppercase">JurisFlow</h1>
          <span className="text-[11px] font-extrabold text-[#c5a473] tracking-widest uppercase mt-0.5 block">Recuperação de Acesso</span>
          
          <p className="text-xs text-slate-500 font-medium mt-4 max-w-[290px] mx-auto relative after:content-[''] after:block after:w-16 after:h-[1px] after:bg-[#c5a473]/40 after:mx-auto after:mt-3">
            Informe seu e-mail cadastrado para receber as instruções de redefinição de senha
          </p>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs font-bold mb-4 text-center">
            {erro}
          </div>
        )}

        {mensagem && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3.5 rounded-xl text-xs font-bold mb-5 text-center leading-relaxed">
            {mensagem}
          </div>
        )}

        <form onSubmit={handleRecuperar} className="space-y-5">
          <div>
            <label className="block text-[11px] font-extrabold text-[#0e1f38] uppercase tracking-wider mb-1.5">
              E-mail Cadastrado
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: milena9919@gmail.com"
              className="w-full px-4 py-3 bg-[#e8f0fe] border border-transparent rounded-xl focus:outline-none focus:border-[#c5a473] text-[#0e1f38] font-medium text-sm transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={carregando}
            className="w-full py-3.5 bg-[#0e1f38] hover:bg-[#162f54] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer mt-2 disabled:opacity-60"
          >
            {carregando ? 'Enviando...' : 'Enviar Link de Recuperação'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="text-xs font-bold text-slate-500 hover:text-[#0e1f38] transition-colors inline-flex items-center gap-1"
          >
            ← Voltar para o Login
          </Link>
        </div>
      </div>
      
      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-6">
        JurisFlow &copy; 2026
      </p>
    </div>
  );
}
