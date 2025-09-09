"use client";

import { Comment } from "@/types";

interface CommentsListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="space-y-3 mb-4 p-2 rounded-lg max-h-40 overflow-y-auto text-[var(--background)] bg-[var(--fourthcolor)] scrollbar-hide">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-[var(--fifthcolor)] p-3 rounded-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{comment.user_username}</span>
            <span className="text-xs opacity-70">{comment.date}</span>
          </div>
          <p className="text-sm">{comment.text}</p>
        </div>
      ))}

      {comments.length === 0 && (
        <p className="text-sm opacity-70 text-center text-[var(--foreground)] py-4">
          Aucun commentaire pour le moment. Soyez le premier à commenter !
        </p>
      )}
    </div>
  );
}
