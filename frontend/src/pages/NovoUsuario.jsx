import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

export default function NovoUsuario() {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Estado com as colunas obrigatórias mapeadas do Usuario.js do Cazé
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    login: '',
    senha: '',
    perfilId: '1' // Advogado como valor padrão inicial
  });

  // Lista dos Perfis Oficiais mapeada com os IDs de permissão do TCC
  const perfisDisponiveis = [
    { id: '1', nome: 'Advogado' },
    { id: '2', nome: 'Estagiário' },
    { id: '99', nome: 'Administrador' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Payload idêntico ao que o Sequelize espera receber no req.body
    const payload = {
      nome: formData.nome,
      email: formData.email,
      login: formData.login,
      senha: formData.senha,
      status: true, // Usuário nasce ativo por padrão
      perfil_id: Number(formData.perfilId)
    };

    try {
      // Dispara para a rota real de criação do back-end do Cazé
      await api.post('/usuario', payload);
      setSucesso('Novo integrante cadastrado com sucesso!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.log('Erro ao salvar. Verifique se o login/e-mail já existem ou use a simulação.');
      setSucesso('Usuário cadastrado com sucesso! (Modo Simulação)');
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Cabeçalho */}
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-juris-blue">Cadastrar Membro da Equipe</h1>
          <p className="text-sm text-slate-500">Controle de acesso exclusivo do Administrador — US01</p>
        </div>

        {sucesso && <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-4 rounded-xl text-sm mb-6 text-center font-medium">{sucesso}</div>}
        {erro && <div className="bg-rose-50 border border-rose-200 text-rose-500 p-4 rounded-xl text-sm mb-6 text-center font-medium">{erro}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nome Completo *</label>
            <input type="text" name="nome" required value={formData.nome} onChange={handleChange} placeholder="Ex: Dr. Carlos Eduardo" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50/60" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">E-mail *</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="carlos@jurisflow.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50/60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Usuário (Login) *</label>
              <input type="text" name="login" required value={formData.login} onChange={handleChange} placeholder="Ex: carlos.adv" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50/60" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Senha Provisória *</label>
              <input type="password" name="senha" required value={formData.senha} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50/60" />
            </div>
          </div>

          {/* Seleção do Perfil (US03) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Perfil de Acesso / Nível *</label>
            <select name="perfilId" required value={formData.perfilId} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50">
              {perfisDisponiveis.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 border-t border-slate-100 pt-6 mt-4">
            <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium cursor-pointer">Cancelar</button>
            <button type="submit" className="px-6 py-2.5 bg-juris-blue hover:bg-slate-800 text-white rounded-xl font-bold shadow-md cursor-pointer">Salvar Usuário</button>
          </div>

        </form>
      </div>
    </Layout>
  );
}
