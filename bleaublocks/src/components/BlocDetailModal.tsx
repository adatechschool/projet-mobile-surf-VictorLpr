"use client";

import { useState, useEffect } from "react";
import { Comment } from "../types";
import { useBlocDetail } from "@/hooks/useBlocDetail";
import { useAuth } from "@/contexts/AuthContext";
import { ModalLoading, ModalError, ModalHeader } from "./ModalStates";
import BlocInfo from "./BlocInfo";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import BlocStatusManager from "./BlocStatusManager";

interface BlocDetailModalProps {
  blocId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlocDetailModal({
  blocId,
  isOpen,
  onClose,
}: BlocDetailModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  
  const { blocDetail, isLoading, error, refetch } = useBlocDetail(isOpen ? blocId : null);
  const { user } = useAuth();

  useEffect(() => {
    if (blocDetail) {
      setComments(blocDetail.comments || []);
      console.log("BlocDetailModal rendu avec bloc:", blocDetail);
    }
  }, [blocDetail]);

  const handleAddComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  const handleStatusChange = () => {
    refetch();
  };

  if (!isOpen || !blocId) return null;
  
  if (isLoading) {
    return <ModalLoading onClose={onClose} />;
  }

  if (error || !blocDetail) {
    return (
      <ModalError 
        onClose={onClose} 
        error={error || "Impossible de charger les détails du bloc"} 
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <ModalHeader title={blocDetail.name} onClose={onClose} />

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-4 max-w-2xl mx-auto pb-6">
          <BlocInfo bloc={blocDetail} />

          {user && (
            <BlocStatusManager 
              bloc={blocDetail} 
              onStatusChange={handleStatusChange}
            />
          )}

          <div className="mb-6">
            <h3 className="font-semibold text-[var(--fourthcolor)] mb-4">
              Commentaires ({comments.length})
            </h3>

            <CommentsList comments={comments} />
            <CommentForm 
              blocId={blocDetail.id} 
              onAddComment={handleAddComment} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
