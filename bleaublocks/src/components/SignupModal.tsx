"use client";

import { useState } from "react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    dateNaissance: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inscription attempt:", formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[var(--thirdcolor)] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--foreground)] text-[var(--background)] rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Créer un compte</h2>
            <button
              onClick={onClose}
              className="text-[var(--background)] hover:opacity-70 transition-opacity"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[var(--thirdcolor)] rounded-lg focus:outline-none focus:ring-2 bg-white text-[var(--background)]"
              />
            </div>

            <div>
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[var(--thirdcolor)] rounded-lg focus:outline-none focus:ring-2 bg-white text-[var(--background)]"
              />
            </div>

            <div>
              <input
                type="text"
                name="pseudo"
                placeholder="Pseudo"
                value={formData.pseudo}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[var(--thirdcolor)] rounded-lg focus:outline-none focus:ring-2 bg-white text-[var(--background)]"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[var(--thirdcolor)] rounded-lg focus:outline-none focus:ring-2 bg-white text-[var(--background)]"
              />
            </div>

            <div>
              <label className="block text-sm opacity-80 mb-1">Date de naissance</label>
              <input
                type="date"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[var(--thirdcolor)] rounded-lg focus:outline-none focus:ring-2 bg-white text-[var(--background)]"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 p-3 rounded-lg border border-[var(--thirdcolor)] hover:opacity-80 transition-opacity font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 p-3 rounded-lg hover:opacity-90 transition-opacity font-semibold bg-[var(--fourthcolor)] text-[var(--foreground)]"
              >
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
