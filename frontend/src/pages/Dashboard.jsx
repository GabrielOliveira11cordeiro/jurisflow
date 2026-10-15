import Layout from '../components/Layout'

export default function Dashboard() {
  return (
    <Layout>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-extrabold text-juris-blue mb-2">Painel Principal</h1>
        <p className="text-slate-500">Seja bem-vindo ao painel inteligente do Jurisflow.</p>
        
        {/* Aqui depois criaremos os cards de resumos (widgets) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-2xl">⚖️</span>
            <h3 className="font-bold text-slate-700 mt-2">Casos Ativos</h3>
            <p className="text-2xl font-black text-juris-blue mt-1">12</p>
          </div>
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-2xl">📅</span>
            <h3 className="font-bold text-slate-700 mt-2">Diligências Hoje</h3>
            <p className="text-2xl font-black text-juris-blue mt-1">3</p>
          </div>
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-2xl">🔔</span>
            <h3 className="font-bold text-slate-700 mt-2">Avisos Pendentes</h3>
            <p className="text-2xl font-black text-juris-blue mt-1">5</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
