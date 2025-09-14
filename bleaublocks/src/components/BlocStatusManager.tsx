"use client";

import { useState } from "react";
import { Bloc } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { ApiService } from "@/services/api";

interface BlocStatusManagerProps {
  bloc: Bloc;
  onStatusChange?: () => void;
}

export default function BlocStatusManager({ bloc, onStatusChange }: BlocStatusManagerProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useAuth();

  const currentStatus = bloc.user_completion_status;

  const handleStatusChange = async (newStatus: 'en projet' | 'complété' | null) => {
    if (!user || isUpdating) return;

    setIsUpdating(true);
    try {
      await ApiService.updateBlocStatus(bloc.id, newStatus);
      
      if (onStatusChange) {
        onStatusChange();
      }
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const isProjectActive = currentStatus === 'en projet';
  const isCompletedActive = currentStatus === 'complété';
  const hasStatus = Boolean(currentStatus && currentStatus !== 'none');

  return (
    <div className="mb-6">
      <h3 className="font-semibold  mb-3">
        Mon statut pour ce bloc
      </h3>
      
      <div className="flex space-x-3">
        <button
          onClick={() => handleStatusChange(isProjectActive ? null : 'en projet')}
          disabled={isUpdating}
          className={`flex-1 p-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isProjectActive
              ? 'bg-[var(--fourthcolor)] text-[var(--foreground)]'
              : 'border border-[var(--fourthcolor)] text-[var(--fourthcolor)] hover:bg-[var(--fourthcolor)] hover:text-[var(--foreground)]'
          }`}
        >
          {isUpdating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              {isProjectActive ? 'Retrait...' : 'Ajout...'}
            </div>
          ) : (
            <> En projet</>
          )}
        </button>

        <button
          onClick={() => handleStatusChange(isCompletedActive ? null : 'complété')}
          disabled={isUpdating}
          className={`flex-1 p-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isCompletedActive
              ? 'bg-[var(--fourthcolor)] text-[var(--foreground)]'
              : 'border border-[var(--fourthcolor)] text-[var(--fourthcolor)] hover:bg-[var(--fourthcolor)] hover:text-[var(--foreground)]'
          }`}
        >
          {isUpdating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              {isCompletedActive ? 'Retrait...' : 'Marquage...'}
            </div>
          ) : (
            <> Réalisé</>
          )}
        </button>
      </div>

      
    </div>
  );
}
