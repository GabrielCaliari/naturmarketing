import { useState, useEffect, useCallback } from 'react';
import { useUserAuth } from './useUserAuth';

interface UserPlan {
  planId: string;
  planName: string;
  status: 'active' | 'inactive' | 'trial' | 'expired';
  startDate?: Date;
  endDate?: Date;
}

/**
 * Hook para gerenciar o plano do usuário
 */
export function useUserPlan() {
  const { user } = useUserAuth();
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserPlan = useCallback(async () => {
    if (!user) {
      setUserPlan(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // TODO: Implementar busca real do plano do usuário
      // Por enquanto, retorna plano padrão
      const defaultPlan: UserPlan = {
        planId: 'glow-start',
        planName: 'Glow Start',
        status: 'active',
      };

      setUserPlan(defaultPlan);
    } catch (error) {
      console.error('Erro ao buscar plano do usuário:', error);
      setUserPlan(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserPlan();
  }, [fetchUserPlan]);

  const getCurrentPlan = useCallback(() => {
    return userPlan?.planId || 'glow-start';
  }, [userPlan]);

  const getCurrentPlanName = useCallback(() => {
    return userPlan?.planName || 'Glow Start';
  }, [userPlan]);

  const isPaidPlan = useCallback(() => {
    const paidPlans = ['glow-pro', 'glow-premium', 'glow-enterprise'];
    return paidPlans.includes(userPlan?.planId || '');
  }, [userPlan]);

  const isPlanActive = useCallback(() => {
    return userPlan?.status === 'active' || userPlan?.status === 'trial';
  }, [userPlan]);

  const refreshUserPlan = useCallback(async () => {
    await fetchUserPlan();
  }, [fetchUserPlan]);

  return {
    userPlan,
    loading,
    getCurrentPlan,
    getCurrentPlanName,
    isPaidPlan,
    isPlanActive,
    refreshUserPlan,
  };
}
