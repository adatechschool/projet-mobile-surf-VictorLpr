import { useState, useEffect } from 'react';
import { ApiService } from '@/services/api';
import { Area } from '@/types';


export function useAreas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await ApiService.getAreas();
        setAreas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des zones');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAreas();
  }, []);

  return { areas, isLoading, error };
}
