"use client";

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function BlocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <header className="shadow-sm p-6 text-center bg-[var(--thirdcolor)] text-[var(--background)]">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold">Mes Blocs</h1>
        </div>
      </header>

      <main className="flex-1 p-6 pb-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-[var(--thirdcolor)] rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[var(--background)]"
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
            </div>
            <h2 className="text-2xl font-bold mb-2">Mes Blocs d'Escalade</h2>
            <p className="text-sm opacity-80">
              Suivez vos progrès et vos blocs réalisés
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-[var(--foreground)] text-[var(--background)] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Franchard Isatis - À Fleur de Peau</h3>
                  <p className="text-sm opacity-70">Niveau: 7a • Réalisé le 15/08/2024</p>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
            </div>

            <div className="bg-[var(--foreground)] text-[var(--background)] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Bas Cuvier - La Super Leininger</h3>
                  <p className="text-sm opacity-70">Niveau: 6a • En cours</p>
                </div>
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
            </div>

            <div className="bg-[var(--foreground)] text-[var(--background)] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Apremont - Fosse Ailleurs</h3>
                  <p className="text-sm opacity-70">Niveau: 7a • En cours</p>
                </div>
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
            </div>
          </div>

          {/* Statistiques */} 
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-[var(--thirdcolor)] text-[var(--background)] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm">Blocs réalisés</div>
            </div>
            <div className="bg-[var(--fourthcolor)] text-[var(--foreground)] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">7a</div>
              <div className="text-sm">Niveau max</div>
            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
}
