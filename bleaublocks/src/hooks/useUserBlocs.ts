import { useState, useEffect } from 'react';
import { ApiService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import {  UserWithBlocs } from '@/types';





interface UseUserBlocsReturn {
  userBlocs: UserWithBlocs | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUserBlocs = (): UseUserBlocsReturn => {
  const [userBlocs, setUserBlocs] = useState<UserWithBlocs | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchUserBlocs = async () => {
    if (!user) {
      setUserBlocs(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const data = await ApiService.getUserWithBlocs(user.id);
      setUserBlocs(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      console.error('Erreur lors du chargement des blocs utilisateur:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBlocs();
  }, [user]);

  return {
    userBlocs,
    isLoading,
    error,
    refetch: fetchUserBlocs,
  };
};
