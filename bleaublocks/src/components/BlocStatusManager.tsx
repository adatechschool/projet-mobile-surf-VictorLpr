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

  // Utiliser directement les valeurs du backend
  const currentStatus = bloc.user_completion_status;

  const handleStatusChange = async (newStatus: 'en projet' | 'complété' | null) => {
    if (!user || isUpdating) return;

    setIsUpdating(true);
    try {
      await ApiService.updateBlocStatus(bloc.id, newStatus);
      
      // Appeler le callback pour refetch les données
      if (onStatusChange) {
        onStatusChange();
      }
      
      console.log(`Statut du bloc ${bloc.id} mis à jour:`, newStatus);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      // TODO: Afficher une notification d'erreur
    } finally {
      setIsUpdating(false);
    }
  };

  const isProjectActive = currentStatus === 'en projet';
  const isCompletedActive = currentStatus === 'complété';
  const hasStatus = Boolean(currentStatus && currentStatus !== 'none');

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-[var(--fourthcolor)] mb-3">
        Mon statut pour ce bloc
      </h3>
      
      <div className="flex space-x-3">
        {/* Bouton En projet */}
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
            <>📌 En projet</>
          )}
        </button>

        {/* Bouton Réalisé */}
        <button
          onClick={() => handleStatusChange(isCompletedActive ? null : 'complété')}
          disabled={isUpdating}
          className={`flex-1 p-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isCompletedActive
              ? 'bg-[var(--thirdcolor)] text-[var(--background)]'
              : 'border border-[var(--thirdcolor)] text-[var(--thirdcolor)] hover:bg-[var(--thirdcolor)] hover:text-[var(--background)]'
          }`}
        >
          {isUpdating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              {isCompletedActive ? 'Retrait...' : 'Marquage...'}
            </div>
          ) : (
            <>✅ Réalisé</>
          )}
        </button>

        {/* Bouton de suppression (optionnel, puisqu'on peut cliquer sur le bouton actif pour retirer) */}
        {hasStatus && (
          <button
            onClick={() => handleStatusChange(null)}
            disabled={isUpdating}
            className="px-4 py-3 rounded-lg font-semibold transition-all border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            title="Retirer de toutes les listes"
          >
            ❌
          </button>
        )}
      </div>

      {/* Messages de statut */}
      {isCompletedActive && (
        <div className="mt-2 text-sm text-[var(--thirdcolor)] text-center">
          🎉 Félicitations ! Vous avez réalisé ce bloc
        </div>
      )}
      {isProjectActive && (
        <div className="mt-2 text-sm text-[var(--fourthcolor)] text-center">
          💪 Ce bloc est dans vos projets
        </div>
      )}
    </div>
  );
}
