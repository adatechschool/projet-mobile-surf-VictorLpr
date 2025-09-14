"use client";

import { useState } from "react";
import { Comment } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { ApiService } from "@/services/api";
import FormTextarea from "./FormTextarea";

interface CommentFormProps {
  blocId: number;
  onAddComment: (comment: Comment) => void;
}

export default function CommentForm({
  blocId,
  onAddComment,
}: CommentFormProps) {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await ApiService.addComment(
        blocId,
        newComment.trim(),
        rating
      );

      const comment: Comment = {
        id: response.id,
        user_username: response.user_username,
        text: response.text,
        created_at: new Date(response.created_at).toLocaleDateString("fr-FR"),
        rating: response.rating,
      };

      onAddComment(comment);
      setNewComment("");
      setRating(undefined);
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4 bg-[var(--thirdcolor)]/20 rounded-lg text-center">
        <p className="text-[var(--background)] mb-2">
          Connectez-vous pour ajouter un commentaire
        </p>
        <p className="text-sm text-[var(--background)] opacity-70">
          Seuls les utilisateurs connectés peuvent commenter
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmitComment} className="space-y-3">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Ajoutez votre commentaire..."
        className="w-full p-3 border border-[var(--fourthcolor)] rounded-lg  bg-[var(--fifthcolor)] text-[var(--background)] resize-none"
        rows={3}
        disabled={isSubmitting}
      />

      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={!newComment.trim() || isSubmitting}
          className="flex-1 p-3 rounded-lg font-semibold transition-opacity bg-[var(--fourthcolor)] text-[var(--foreground)] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              Publication...
            </div>
          ) : (
            "Publier le commentaire"
          )}
        </button>
      </div>
    </form>
  );
}
