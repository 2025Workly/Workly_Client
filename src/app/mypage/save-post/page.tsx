"use client";
import Category from "@/app/components/common/category-layout";
import styles from "../../styles/mypage/saved-tip.module.css";
import { useState, useEffect } from "react";
import InfoCard from "@/app/components/WordTip/infoCard-layout";
import axios from "axios";

export default function SavedPage() {
  const categories = ["단어", "팁"];
  const [activeCategory, setActiveCategory] = useState<string>("단어");
  const [savePost, setSavePost] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  //즐찾 보여주는 api 연결
  const handleCategoryClick = async (category: string) => {
    setActiveCategory(category);
    const type = category === "단어" ? "word" : "tip";
    const sub = "전체";

    if (!token) {
      return "토근없음";
    }
    try {
      const response = await axios.get(
        `http://43.201.95.2/stored/${type}/${sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      setSavePost(data);
      console.log(response.data.words);
    } catch (err) {
      console.error("api호출 오류 : ", err);
    }
  };

  useEffect(() => {
    if (token) {
      handleCategoryClick("단어");
    }
  }, [token]);

  const isWord = activeCategory === "단어";
  return (
    <div className={styles.savedPostAllContainer}>
      <div className={styles.container}>
        <p className={styles.saveText}>저장</p>
        <div
          className={styles.categoryContainer}
          style={{ marginBottom: "31px" }}
        >
          {categories.map((category) => (
            <Category
              key={category}
              type={category}
              onClick={() => handleCategoryClick(category)}
              isActive={category === activeCategory}
            />
          ))}
        </div>

        {/* 정보 카드들 */}
        <div
          className={
            activeCategory === "단어"
              ? styles.infoCardContainer
              : styles.tipContainer
          }
        >
          {savePost.length > 0 ? (
            savePost.map((post) => (
              <InfoCard
                tabType={isWord ? "word" : "tip"}
                key={post.id}
                title={isWord ? post.word : post.tip}
                detail={post.explanation}
                width={isWord ? "344px" : "527px"}
                padding={isWord ? "39px 52px" : "43px 57px"}
                className={isWord ? "span" : "titleSpan"}
                gap="10px"
                marginRight="0"
                contentId={post.id}
                category={isWord ? "word" : "tip"}
              />
            ))
          ) : (
            <div className={styles.noneDataFieldContainer}>
              <p className={styles.noneMsg}>
                {activeCategory === "단어"
                  ? "저장된 단어가 없어요!"
                  : "저장된 팁이 없어요!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
