'use client';

import React from 'react';
import axios from 'axios';
import CategoryBox from '@/app/components/board/category-box';

type Post = {
  tag: string;
  title: string;
  content: string;
};

export default function BoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const [post, setPost] = React.useState<Post | null>(null);

  React.useEffect(() => {
    async function fetchPost() {
      try {
        const token = localStorage.getItem('token');
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

  if (!post) return <div>로딩중...</div>;

  return (
    <div style={{ padding: '20px', background: 'white' }}>
      <CategoryBox tag={post.tag} />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
