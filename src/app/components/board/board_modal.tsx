'use client';

import React from 'react';
import axios from 'axios';
import CategoryBox from '@/app/components/board/category-box';
import {useState, useEffect} from "react";
import styles from "../../styles/board/board-modal.module.css";
import CommentSection from './commentSection';

type Post = {
  id : string
    title : string,
    tag : string,
    content : string
};


export default function BoardModal({id, title, tag, content} : Post) {

  const [post, setPost] = useState<Post>({
        id : "",
        title : "",
        tag : "",
        content : ""
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        const token = localStorage.getItem('token');
         await axios.post(`http://localhost:5000/board/${id}/views`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const response = await axios.get(`http://localhost:5000/board/search?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(response.data.board);
      } catch(err) {
        console.error("응답에러 : ", err);
      }
    }
      fetchPost();
    
  }, [id]);


  return (
    <div className={styles.board}>
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
  );
}
