"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryBox from "@/app/components/board/category-box";
import styles from "../../styles/board/board-modal.module.css";
import CommentSection from "./commentSection";

type Post = {
  id: string;
  title: string;
  tag: string;
  content: string;
};

export default function BoardModal({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const token = localStorage.getItem("token");
        await axios.post(`http://43.201.95.2/board/${id}/views`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const response = await axios.get(
          `http://43.201.95.2/board/search?id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPost(response.data.board);
      } catch (err) {
        console.error("응답 에러: ", err);
      }
    }
    fetchPost();
  }, [id]);

  if (!post) return null; // 아직 로딩 중이면 아무것도 안 보이게

  return (
    <div>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.closeButton} onClick={onClose}>
          <img
            src="/images/close-btn.png"
            alt="닫기 버튼"
            style={{ width: "28px", height: "28px" }}
          />
        </div>

        <div className={styles.board} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <CategoryBox tag={post.tag} />
            <h2>{post.title}</h2>
          </div>
          <div className={styles.line}></div>
          <p className={styles.content}>{post.content}</p>
          <div className={styles.line}></div>
          <h2 className={styles.comment}>댓글</h2>
          <CommentSection boardId={post.id} />
        </div>
      </div>
    </div>
  );
}
