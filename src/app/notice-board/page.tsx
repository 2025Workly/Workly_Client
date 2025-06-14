"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "@/app/api/fetchWithAuth";
import { fetchWithAuth } from "@/app/api/fetchWithAuth";
import BorderBox from "../components/board/border-box";
import TagButton from "../components/board/tag-button";
import BoardCardContainer from "../components/board/board-card";
import BoardWrite from "../components/board/board-write";
import PostedCard from "../components/WordTip/posted-layout";
import styles from "../styles/board/board-main.module.css";
import { useRouter } from "next/navigation";

type Board = {
  title: string;
  content: string;
  tag: string;
};

export default function Board() {
  const router = useRouter();
  const [tagactive, setTagactive] = useState<string>("전체");
  const [boards, setBoards] = useState<any[]>([]);
  const tagtext = ["전체", "고민", "질문"];
  const [showWrite, setShowWrite] = useState(false);
  const [showPosted, setShowPosted] = useState(false);
  const [showDetail, setshowDetail] = useState(false);

  const tagMapping: { [key: string]: string } = {
    고민: "worry",
    질문: "question",
  };

  const fetchData = async (tag: string) => {
    setTagactive(tag);
    try {
      let apiEndpoint;
      if (tag === "전체") {
        apiEndpoint = "http://localhost:5000/board";
      } else {
        const mappedTag = tagMapping[tag];
        apiEndpoint = `http://localhost:5000/board/${mappedTag}`;
      }

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
    router.push(`/notice-board/${id}`);
  };

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

      <div>
        {showWrite && (
          <BoardWrite
            closeOnClick={() => setShowWrite(false)}
            onSuccessPost={() => {
              setShowWrite(false);
              setShowPosted(true);
              fetchData(tagactive);
              setTimeout(() => {
                setShowPosted(false);
              }, 2500);
            }}
          />
        )}
      </div>

      {showPosted && <PostedCard />}
    </div>
  );
}
