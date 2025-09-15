"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import PageHeader from "@/components/PageHeader";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[var(--background)] text-[var(--background)] pb-20">
        <PageHeader title="Mon Profil" />

        <div className="px-6 py-8">
          <div className="bg-[var(--foreground)] rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Résumé de votre activité
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4  rounded-lg">
                <div className="text-2xl font-bold text-[var(--primarycolor)] mb-1">
                  7
                </div>
                <div className="text-sm">Blocs complétés</div>
              </div>

              <div className="text-center p-4 rounded-lg">
                <div className="text-2xl font-bold text-[var(--secondcolor)] mb-1">
                  2
                </div>
                <div className="text-sm">En projet</div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--foreground)] rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Informations du compte
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Nom d'utilisateur</span>
                <span className="font-medium text-[var(--background)]">
                  {user?.name || "Non défini"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Email</span>
                <span className="font-medium">
                  {user?.email || "Non défini"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span>Membre depuis</span>
                <span className="font-medium">Aujourd'hui</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full bg-[var(--fourthcolor)] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Déconnexion...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Se déconnecter</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
