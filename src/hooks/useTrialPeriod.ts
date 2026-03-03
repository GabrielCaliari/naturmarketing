import { useState, useEffect, useCallback } from 'react';
import { useUserAuth } from './useUserAuth';

interface TrialInfo {
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  daysRemaining: number;
}

/**
 * Hook para gerenciar período de trial do usuário
 */
export function useTrialPeriod() {
  const { user } = useUserAuth();
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTrialInfo = useCallback(async () => {
    if (!user) {
      setTrialInfo(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // TODO: Implementar busca real do período de trial
      // Por enquanto, retorna trial padrão de 14 dias
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 14);

      const daysRemaining = Math.ceil(
        (endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );

      const defaultTrialInfo: TrialInfo = {
        isActive: true,
        startDate,
        endDate,
        daysRemaining,
      };

      setTrialInfo(defaultTrialInfo);
    } catch (error) {
      console.error('Erro ao buscar informações de trial:', error);
      setTrialInfo(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTrialInfo();
  }, [fetchTrialInfo]);

  const isTrialExpired = useCallback(() => {
    if (!trialInfo) return false;
    return trialInfo.daysRemaining <= 0;
  }, [trialInfo]);

  const getDaysRemaining = useCallback(() => {
    return trialInfo?.daysRemaining || 0;
  }, [trialInfo]);

  const isTrialActive = useCallback(() => {
    return trialInfo?.isActive && !isTrialExpired();
  }, [trialInfo, isTrialExpired]);

  return {
    trialInfo,
    loading,
    isTrialExpired,
    getDaysRemaining,
    isTrialActive,
  };
}
