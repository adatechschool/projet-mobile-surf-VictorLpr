"use client";

import { useState } from "react";
import { Comment } from "@/types";

interface CommentFormProps {
  onAddComment: (comment: Comment) => void;
}

export default function CommentForm({ onAddComment }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        user_username: "Utilisateur",
        text: newComment,
        date: new Date().toLocaleDateString("fr-FR"),
      };
      onAddComment(comment);
      setNewComment("");
    }
  };

  return (
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
  );
}
