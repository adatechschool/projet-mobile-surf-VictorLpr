import { useState, useEffect } from 'react';
import { Bloc } from '@/types';
import { ApiService } from '@/services/api';

interface UseBlocDetailReturn {
  blocDetail: Bloc | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBlocDetail = (blocId: number | null): UseBlocDetailReturn => {
  const [blocDetail, setBlocDetail] = useState<Bloc | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlocDetail = async () => {
    if (!blocId) {
      setBlocDetail(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ApiService.getBlocById(blocId);
      setBlocDetail(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      console.error('Erreur lors du chargement des détails du bloc:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocDetail();
  }, [blocId]);

  return {
    blocDetail,
    isLoading,
    error,
    refetch: fetchBlocDetail,
  };
};
