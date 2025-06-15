"use client";

import { useEffect, useState } from "react";
import "@/app/api/fetchWithAuth";
import { fetchWithAuth } from "@/app/api/fetchWithAuth";
import BorderBox from "../components/board/border-box";
import TagButton from "../components/board/tag-button";
import BoardCardContainer from "../components/board/board-card";
import BoardWrite from "../components/board/board-write";
import PostedCard from "../components/WordTip/posted-layout";
import styles from "../styles/board/board-main.module.css";
import BoardModal from "../components/board/board_modal"; // 게시글 상세 모달 컴포넌트

type Board = {
  id: string;
  title: string;
  content: string;
  tag: string;
  userId: string;
};

export default function Board() {
  const [tagactive, setTagactive] = useState<string>("전체");
  const [boards, setBoards] = useState<Board[]>([]);
  const tagtext = ["전체", "고민", "질문"];
  const [showWrite, setShowWrite] = useState(false);
  const [showPosted, setShowPosted] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);

  const tagMapping: { [key: string]: string } = {
    고민: "worry",
    질문: "question",
  };

  const fetchData = async (tag: string) => {
    setTagactive(tag);
    try {
      let apiEndpoint =
        tag === "전체"
          ? "http://localhost:5000/board"
          : `http://localhost:5000/board/${tagMapping[tag]}`;

      const response = await fetchWithAuth(apiEndpoint);
      const data = await response.json();
      setBoards(data.boards);
    } catch (err) {
      console.error("api 호출 오류  ", err);
    }
  };

  useEffect(() => {
    fetchData("전체");
  }, []);

  const handleClick = (id: string) => {
    setSelectId(id);
  };

  const selectedPost = boards.find((item) => item.id === selectId);

  return (
    <div style={{ background: "#F7F7F7", padding: "72px 0 74px 0" }}>
      <div style={{ margin: "auto", width: "1070px" }}>
        <h2>Top3</h2>
        <div>
          <BoardCardContainer />
        </div>

        <h2>게시판</h2>
        <div className={styles.tagbox}>
          {tagtext.map((tag) => (
            <TagButton
              key={tag}
              type={tag}
              onClick={() => fetchData(tag)}
              isActive={tag === tagactive}
            />
          ))}
          <span
            className={styles.board_plus}
            onClick={() => setShowWrite(true)}
          >
            게시물 추가하기 +
          </span>
        </div>

        {boards.map((item) => (
          <BorderBox
            key={item.id}
            tag={item.tag}
            title={item.title}
            userId={item.userId}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </div>

      {showWrite && (
        <BoardWrite
          closeOnClick={() => setShowWrite(false)}
          onSuccessPost={() => {
            setShowWrite(false);
            setShowPosted(true);
            fetchData(tagactive);
            setTimeout(() => setShowPosted(false), 2500);
          }}
        />
      )}

      {showPosted && <PostedCard />}

      {selectedPost && (
        <BoardModal
          id={selectedPost.id}
          tag={selectedPost.tag}
          title={selectedPost.title}
          content={selectedPost.content}
        />
      )}
    </div>
  );
}