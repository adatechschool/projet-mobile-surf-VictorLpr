"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import PageHeader from "@/components/PageHeader";
import PageIntro from "@/components/PageIntro";
import TipsSection from "@/components/TipsSection";
import BlocForm from "@/components/BlocForm";

const CONTRIBUTION_TIPS = [
  "Vérifiez que le bloc n'existe pas déjà",
  "Soyez précis dans la description",
  "Choisissez le bon style et la position de départ",
  "Une image aide énormément les autres grimpeurs",
];

export default function ContribuerPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] pb-20">
        <PageHeader title="Contribuer" />

        <main className="flex-1 p-6">
          <div className="max-w-md mx-auto space-y-6">
            <PageIntro
              title="Ajouter un nouveau bloc"
              subtitle="Partagez vos découvertes avec la communauté"
            />

            <div className="bg-[var(--foreground)] text-[var(--background)] rounded-lg p-4">
              <h3 className="font-semibold mb-4">Informations du bloc</h3>
              <BlocForm />
            </div>

            <TipsSection
              title="Conseils pour une bonne contribution"
              tips={CONTRIBUTION_TIPS}
            />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
