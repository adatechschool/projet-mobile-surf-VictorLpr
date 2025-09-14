"use client";

import { Comment } from "@/types";

interface CommentsListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="space-y-3 mb-2 p-2 rounded-lg max-h-40 overflow-y-auto text-[var(--background)] scrollbar-hide">
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <div className="bg-[var(--fifthcolor)] p-3 rounded-lg">
            <p className="text-sm mb-2">{comment.text}</p>
            <div className="flex items-center justify-between ">
              <span className="text-xs">{comment.user_username}</span>
              <span className="text-xs opacity-70">{new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          {index < comments.length - 1 && (
            <div className="h-px bg-[var(--background)] my-3 "></div>
          )}
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
