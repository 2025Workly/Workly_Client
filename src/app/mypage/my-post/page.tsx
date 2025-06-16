"use client";
import Category from "@/app/components/common/category-layout";
import styles from "../../styles/mypage/saved-tip.module.css";
import { useState, useEffect } from "react";
import MyBoard from "@/app/components/mypage/post/myboard-box";
import axios from "axios";

type MyBoardProps = {
  id: string;
  title: string;
  tag: string;
};

export default function MyPostPage() {
  const categories = ["전체", "고민", "질문"];
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [open, setOpen] = useState(false);
  const [board, setBoard] = useState<MyBoardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/board/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBoard(response.data.boards);
      } catch (err) {
        console.error("api 호출 오류  ", err);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };
  return (
    <div className={styles.savedPostAllContainer}>
      <div className={styles.savedContainer}>
        <p className={styles.saveText}>나의 게시물</p>
        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <Category
              key={category}
              type={category}
              onClick={() => handleCategoryClick(category)}
              isActive={category === activeCategory}
            />
          ))}
        </div>
        <div style={{ paddingTop: "31px" }}>
          {board.length === 0 ? (
            <p>게시판에 올린 게시물이 없어요!</p>
          ) : (
            board.map((item) => (
              <MyBoard
                key={item.id}
                id={item.id}
                title={item.title}
                tag={item.tag}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
