"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      <nav className="fixed bottom-0 left-0 right-0 border-t px-4 py-3 bg-[var(--foreground)] border-[var(--thirdcolor)]">
        <div className="flex justify-around items-center">
          <Link
            href="/map"
            className="flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity text-[var(--background)]"
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
            <span className="text-xs">Carte</span>
          </Link>

          <Link
            href="/blocs"
            className="flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity text-[var(--background)]"
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
            <span className="text-xs">Mes Blocs</span>
          </Link>

          <Link
            href="/profil"
            className="flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity text-[var(--background)]"
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
            <span className="text-xs">Profil</span>
          </Link>

          <Link
            href="/contribuer"
            className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg hover:opacity-90 transition-opacity bg-[var(--fourthcolor)] text-[var(--foreground)]"
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
        </div>
      </nav>
    </div>
  );
}
