import { Navigate } from 'react-router-dom';

export default function PermissaoGuard({ perfisPermitidos, children }) {
  // Busca o ID do perfil salvo no localStorage pelo seu Login.jsx
  const perfilId = localStorage.getItem('@JurisFlow:perfil_id');

  // 1. Se não tiver nenhum perfil salvo, significa que não está logado -> joga pro login
  if (!perfilId) {
    return <Navigate to="/login" replace />;
  }

  // 2. Se o ID do usuário não estiver na lista de IDs autorizados daquela rota -> bloqueia
  const temPermissao = perfisPermitidos.includes(String(perfilId));
  
  if (!temPermissao) {
    // Redireciona para a dashboard caso ele tente acessar uma URL que não pode
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Se estiver tudo OK, renderiza a página normalmente
  return children;
}
