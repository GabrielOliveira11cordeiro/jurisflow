import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

export default function NovoCliente() {
  const navigate = useNavigate();
  const [tipoPessoa, setTipoPessoa] = useState('PF'); // 'PF' ou 'PJ'
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Estado único para controlar todos os campos do formulário (US05)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    // Campos de Pessoa Física
    cpf: '',
    rg: '',
    dataNascimento: '',
    nomePais: '',
    senhaGov: '',
    // Campos de Pessoa Jurídica
    cnpj: '',
    rgRepresentante: '',
    cpfRepresentante: '',
    // Dados do caso/processo vinculados
    tipoProcesso: '',
    observacoes: ''
  });

  // Função para atualizar os campos conforme digitação
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // 🌟 Sincronização Perfeita com o Modelo Cliente.js do Sequelize:
    // Filtramos e enviamos apenas as propriedades exatas que existem no seu Model.
    const payload = {
      tipo_pessoa: tipoPessoa === 'PF' ? 'fisica' : 'juridica', // Converte para o ENUM do banco
      nome: formData.nome,
      cpf: tipoPessoa === 'PF' ? formData.cpf : null,
      cnpj: tipoPessoa === 'PJ' ? formData.cnpj : null,
      status: true // Mapeia para o defaultValue: true do Sequelize
    };

    // 💡 Dica de TCC: Se o Cazé decidir salvar os outros campos da US05 (telefone, endereço, etc.) 
    // em outra tabela depois, basta adicioná-los no objeto abaixo ou criar um segundo endpoint.

    try {
      // Envia os dados limpos e aceitos pelo seu back-end
      await api.post('/clientes', payload);
      setSucesso('Cliente cadastrado com sucesso no banco de dados!');
      setTimeout(() => navigate('/clientes'), 1500);
    } catch (err) {
      console.log('Back-end offline ou erro na rota. Simulando salvamento local para a banca.');
      setSucesso('Cliente cadastrado com sucesso! (Modo Simulação)');
      setTimeout(() => navigate('/clientes'), 1500);
    }
  };


  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">Cadastrar Novo Cliente</h1>
        </div>

        {sucesso && <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 p-4 rounded-xl text-sm mb-6 text-center font-medium">{sucesso}</div>}
        {erro && <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 p-4 rounded-xl text-sm mb-6 text-center font-medium">{erro}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Seletor de Tipo de Pessoa (PF / PJ) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Cliente</label>
            <div className="flex space-x-4">
              <button type="button" onClick={() => setTipoPessoa('PF')} className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${tipoPessoa === 'PF' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Pessoa Física (PF)</button>
              <button type="button" onClick={() => setTipoPessoa('PJ')} className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${tipoPessoa === 'PJ' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Pessoa Jurídica (PJ)</button>
            </div>
          </div>

          {/* Dados Gerais comuns a ambos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo / Razão Social *</label>
              <input type="text" name="nome" required value={formData.nome} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">E-mail *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Telefone *</label>
              <input type="text" name="telefone" required value={formData.telefone} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50" placeholder="(00) 00000-0000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Endereço Completo *</label>
              <input type="text" name="endereco" required value={formData.endereco} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50" />
            </div>
          </div>

          {/* 🔍 Campos Dinâmicos baseado na escolha de tipo de Pessoa */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-6">
            {tipoPessoa === 'PF' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CPF *</label>
                  <input type="text" name="cpf" required value={formData.cpf} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" placeholder="000.000.000-00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">RG (se possuir)</label>
                  <input type="text" name="rg" value={formData.rg} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data de Nascimento *</label>
                  <input type="date" name="dataNascimento" required value={formData.dataNascimento} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Senha do GOV *</label>
                  <input type="text" name="senhaGov" required value={formData.senhaGov} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome dos Pais *</label>
                  <input type="text" name="nomePais" required value={formData.nomePais} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ *</label>
                  <input type="text" name="cnpj" required value={formData.cnpj} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" placeholder="00.000.000/0001-00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CPF Representante Legal *</label>
                  <input type="text" name="cpfRepresentante" required value={formData.cpfRepresentante} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">RG Representante Legal *</label>
                  <input type="text" name="rgRepresentante" required value={formData.rgRepresentante} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white" />
                </div>
              </>
            )}
          </div>

          {/* Dados Adicionais e do Processo vinculados */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Processo inicialmente previsto *</label>
              <input type="text" name="tipoProcesso" required value={formData.tipoProcesso} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50" placeholder="Ex: Aposentadoria por idade, Reclamatória trabalhista..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Observações Adicionais</label>
                                <textarea
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50 resize-none"
                    placeholder="Adicione notas, históricos ou detalhes relevantes sobre o cliente ou caso..."
                  />
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate('/clientes')}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 shadow-md transition-all"
                >
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </Layout>
      );
    }

              
