"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  

  const protectedRoutes = ['/blocs', '/profil', '/contribuer'];
  const shouldShowAuthPrompt = (route: string) => {
    return protectedRoutes.includes(route) && !user;
  };

  const handleProtectedRouteClick = (e: React.MouseEvent, route: string) => {
    if (shouldShowAuthPrompt(route)) {
      e.preventDefault();
      setAuthMode('login');
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t px-4 py-3 bg-[var(--foreground)] border-[var(--thirdcolor)]">
        <div className="flex justify-around items-center">
          <Link
            href="/"
            className={`flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity ${
              pathname === "/"
                ? "text-[var(--fourthcolor)]"
                : "text-[var(--background)]"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-sm">Accueil</span>
          </Link>

          <Link
            href="/map"
            className={`flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity ${
              pathname === "/map"
                ? "text-[var(--fourthcolor)]"
                : "text-[var(--background)]"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"
              />
            </svg>
            <span className="text-sm">Carte</span>
          </Link>
          <Link
            href="/contribuer"
            onClick={(e) => handleProtectedRouteClick(e, '/contribuer')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg hover:opacity-90 transition-opacity ${
              shouldShowAuthPrompt('/contribuer') 
                ? 'bg-gray-400 text-gray-600 opacity-50' 
                : 'bg-[var(--fourthcolor)] text-[var(--foreground)]'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-xs">Contribuer</span>
          </Link>

          <Link
            href="/blocs"
            onClick={(e) => handleProtectedRouteClick(e, '/blocs')}
            className={`flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity ${
              pathname === "/blocs"
                ? "text-[var(--fourthcolor)]"
                : "text-[var(--background)]"
            } ${shouldShowAuthPrompt('/blocs') ? 'opacity-50' : ''}`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">Mes Blocs</span>
          </Link>

          <Link
            href="/profil"
            onClick={(e) => handleProtectedRouteClick(e, '/profil')}
            className={`flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity ${
              pathname === "/profil"
                ? "text-[var(--fourthcolor)]"
                : "text-[var(--background)]"
            } ${shouldShowAuthPrompt('/profil') ? 'opacity-50' : ''}`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm">
              {user ? user.name : 'Profil'}
            </span>
          </Link>

        </div>

        
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
