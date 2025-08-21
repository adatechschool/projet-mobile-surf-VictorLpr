"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SignupModal from "./components/SignupModal";
import Navbar from "./components/Navbar";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
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
          <p className="text-sm opacity-80">
            Découvrez les blocs de Fontainebleau
          </p>
        </div>
      </header>

      <main className="flex-1 p-6 pb-24 bg-[var(--background)] text-[var(--foreground)]">
        <div className="max-w-md mx-auto rounded-lg shadow-md p-6 mb-6 bg-[var(--foreground)] text-[var(--background)]">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Connexion (optionnelle)
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-[var(--thirdcolor)] rounded-lg focus:outline-none focus:ring-2 bg-white text-[var(--background)]"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-[var(--thirdcolor)] rounded-lg focus:outline-none focus:ring-2 bg-white text-[var(--background)]"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 rounded-lg hover:opacity-90 transition-opacity font-semibold bg-[var(--fourthcolor)] text-[var(--foreground)]"
            >
              Se connecter
            </button>
          </form>
          
          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="flex-1 p-3 rounded-lg border border-[var(--thirdcolor)] hover:opacity-80 transition-opacity font-semibold"
            >
              S'inscrire
            </button>
          </div>
          
          <p className="text-sm opacity-70 text-center mt-4">
            Pas de compte ? Continuez sans vous connecter !
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Explorez Fontainebleau</h3>
          <p className="opacity-80 mb-6">
            Découvrez des milliers de blocs d'escalade dans la forêt de
            Fontainebleau
          </p>
        </div>
      </main>

      <Navbar />

      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />
    </div>
  );
}
