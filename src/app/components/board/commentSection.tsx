'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import CommentInput from "./comment-input";
import Comment from "./comment";

type CommentItemProps = {
  boardId: string;
  userId: string;
  comment: string;
  createdAt: Date;
};

type Props = {
  boardId: string;
};

export default function CommentSection({ boardId }: Props) {
  const [comments, setComments] = useState<CommentItemProps[]>([]);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/comment/${boardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data.comments);
    } catch (err) {
      console.error("댓글 불러오기 실패", err);
    }
  };

  useEffect(() => {
    if (boardId) fetchComments();
  }, [boardId]);

  // CommentInput에서 댓글 작성 후 호출
  const handleNewComment = () => {
    fetchComments(); // 댓글 목록 재조회
  };

  return (
    <div>
      <CommentInput boardId={boardId} onCommentPosted={handleNewComment} />
      <Comment boardId={boardId} comments={comments} />
    </div>
  );
}
