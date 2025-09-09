import { useState, useEffect } from 'react';
import { Bloc } from '@/types';
import { ApiService } from '@/services/api';

interface UseBlocsReturn {
  blocs: Bloc[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBlocs = (): UseBlocsReturn => {
  const [blocs, setBlocs] = useState<Bloc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlocs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ApiService.getBlocs();
      setBlocs(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      console.error('Erreur lors du chargement des blocs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocs();
  }, []);

  return {
    blocs,
    isLoading,
    error,
    refetch: fetchBlocs,
  };
};
