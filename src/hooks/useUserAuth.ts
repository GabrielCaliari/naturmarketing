import { useAuthContext } from '@/context/AuthContext';

/**
 * Hook para acessar informações de autenticação do usuário
 */
export function useUserAuth() {
  const { user } = useAuthContext();

  return {
    user,
    isAuthenticated: !!user,
    userId: user?.uid,
    userEmail: user?.email,
  };
}
