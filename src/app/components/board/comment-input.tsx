import {useState, useEffect} from "react";
import axios from "axios";

type CommentInputProps = {
  boardId: string;
  onCommentPosted: () => void; // 댓글 작성 완료 콜백
};

export default function CommentInput({ boardId, onCommentPosted }: CommentInputProps) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:5000/comment/${boardId}`,
        { comment: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText("");
      onCommentPosted(); // 댓글 작성 후 목록 갱신 요청
    } catch (err) {
      console.error("댓글 작성 실패", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="댓글을 남겨보세요!"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">입력</button>
    </form>
  );
}
