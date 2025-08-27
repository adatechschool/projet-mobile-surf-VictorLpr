"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Bloc, Comment } from "../types";
import { getLevelColor } from "../utils";

interface BlocDetailModalProps {
  bloc: Bloc | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlocDetailModal({
  bloc,
  isOpen,
  onClose,
}: BlocDetailModalProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (bloc) {
      setComments(bloc.comments || []);
    }
  }, [bloc]);

  if (!isOpen || !bloc) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        user: "Utilisateur",
        text: newComment,
        date: new Date().toLocaleDateString("fr-FR"),
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <div className="flex items-center justify-between p-4 bg-[var(--thirdcolor)] text-[var(--background)] shadow-sm flex-shrink-0">
        <button
          onClick={onClose}
          className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Retour</span>
        </button>
        <h2 className="text-xl font-bold">{bloc.name}</h2>
        <div className="w-20"></div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 max-w-2xl mx-auto pb-6">
          <div className="mb-4">
            <Image
              src={bloc.image}
              alt={bloc.name}
              width={600}
              height={400}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-[var(--fourthcolor)]">
                  Niveau
                </h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getLevelColor(
                      bloc.level
                    )}`}
                  >
                    {bloc.level}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--fourthcolor)]">
                  Position de départ
                </h3>
                <p className="text-sm">{bloc.startPosition}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-[var(--fourthcolor)]">
                  Localisation
                </h3>
                <p className="text-sm">{bloc.location.area}</p>
                <p className="text-xs opacity-70">
                  {bloc.location.lat.toFixed(6)}, {bloc.location.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-[var(--fourthcolor)] mb-2">
              Description
            </h3>
            <p className="text-sm leading-relaxed">{bloc.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-[var(--fourthcolor)] mb-4">
              Commentaires ({comments.length})
            </h3>

            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto text-[var(--background)]">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-[var(--fifthcolor)] p-3 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{comment.user}</span>
                    <span className="text-xs opacity-70">{comment.date}</span>
                  </div>
                  <p className="text-sm ">{comment.text}</p>
                </div>
              ))}

              {comments.length === 0 && (
                <p className="text-sm opacity-70 text-center text-[var(--foreground)] py-4">
                  Aucun commentaire pour le moment. Soyez le premier à commenter
                  !
                </p>
              )}
            </div>

            <form onSubmit={handleSubmitComment} className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajoutez votre commentaire..."
                className="w-full p-3 border border-[var(--thirdcolor)] rounded-lg focus:outline-none focus:ring-2 bg-[var(--fifthcolor)] text-[var(--background)] resize-none"
                rows={3}
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="flex-1 p-3 rounded-lg font-semibold transition-opacity bg-[var(--fourthcolor)] text-[var(--foreground)] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                >
                  Publier le commentaire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
