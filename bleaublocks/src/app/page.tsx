"use client";

import Image from "next/image";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();

  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] pb-20">
      <header className="shadow-sm p-6 text-center bg-[var(--thirdcolor)] text-[var(--background)]">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold bg-[var(--foreground)] text-[var(--thirdcolor)]">
            <Image
              src={"/web-app-manifest-512x512.png"}
              alt="BB"
              width={40}
              height={40}
            ></Image>
          </div>
          <h1 className="text-3xl font-bold">BleauBlocks</h1>
          <p className="text-lm">
            Découvrez les blocs de Fontainebleau
          </p>
        </div>
      </header>

      <main className="flex-1 p-6  bg-[var(--background)] text-[var(--foreground)]">
        {!user ? (
          <div className="max-w-md mx-auto rounded-lg shadow-md p-6 mb-6 bg-[var(--foreground)] text-[var(--background)]">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Rejoignez BleauBlocks
            </h2>
            <p className="text-lm text-center mb-6">
              Connectez-vous pour suivre vos blocs, commenter et contribuer à la communauté
            </p>
            
            <div className="flex space-x-3 mb-4">
              <button
                onClick={handleOpenLogin}
                className="flex-1 p-3 rounded-lg hover:opacity-90 transition-opacity font-semibold bg-[var(--fourthcolor)] text-[var(--foreground)]"
              >
                Se connecter
              </button>
              <button
                onClick={handleOpenRegister}
                className="flex-1 p-3 rounded-lg border border-[var(--thirdcolor)] hover:bg-[var(--thirdcolor)] hover:text-[var(--background)] transition-colors font-semibold"
              >
                S'inscrire
              </button>
            </div>

            <p className="text-lm text-center">
              Ou continuez sans vous connecter pour explorer les blocs !
            </p>
          </div>
        ) : (
          <div className="max-w-md mx-auto rounded-lg shadow-md p-6 mb-6 bg-[var(--foreground)] text-[var(--background)]">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Bienvenue, {user.name} ! 👋
            </h2>
            <p className="text-lm  text-center mb-6">
              Prêt à explorer les blocs de Fontainebleau ?
            </p>
            
          </div>
        )}

        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Explorez Fontainebleau</h3>
          <p className=" mb-6">
            Découvrez des milliers de blocs d'escalade dans la forêt de
            Fontainebleau
          </p>
          
          
        </div>
      </main>


      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
