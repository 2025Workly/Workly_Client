"use client";

<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
=======
import { useEffect, useState } from "react"
>>>>>>> 65f91b8414f1dbb9af507f771fc6f43174445dae
import "@/app/api/fetchWithAuth";
import axios from "axios";
import { fetchWithAuth } from "@/app/api/fetchWithAuth";
import BorderBox from "../components/board/border-box";
import TagButton from "../components/board/tag-button";
import BoardCardContainer from "../components/board/board-card";
import styles from "../styles/board/board-main.module.css";
<<<<<<< HEAD

export default function Board() {
  const [tagactive, setTagactive] = useState<string>("전체");
  const [boards, setBoards] = useState<any[]>([]);
  const tagtext = ["전체", "고민", "질문"];
=======
import BoardWrite from "../components/board/board-write";
import PostedCard from "../components/WordTip/posted-layout";
import { useRouter } from 'next/navigation';

type Board = {
    title : string,
    content : string,
    tag : string
}


export default function Board() {
    const router = useRouter();
    const [tagactive, setTagactive] = useState<string>("전체");
    const [boards, setBoards] = useState<any[]>([]);
    const tagtext = ["전체", "고민", "질문"];
    const [showWrite, setShowWrite] = useState(false);
    const[showPosted, setShowPosted] = useState(false);
    const[showDetail, setshowDetail] = useState(false);
    
>>>>>>> 65f91b8414f1dbb9af507f771fc6f43174445dae

  const tagMapping: { [key: string]: string } = {
    // 또는 빈 문자열 ""이나 null 처리
    고민: "worry",
    질문: "question",
  };

  const fetchData = async (tag: string) => {
    setTagactive(tag);

    try {
      let apiEndpoint;

      if (tag === "전체") {
        // 전체일 때는 파라미터 없이 모든 게시물 조회
        apiEndpoint = "http://localhost:5000/board";
      } else {
        // 특정 태그일 때는 매핑된 값으로 조회
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

<<<<<<< HEAD
  useEffect(() => {
    fetchData("전체");
  }, []);

  return (
    <div style={{ background: "#F7F7F7", padding: "72px 0 74px 0" }}>
      <div style={{ margin: "auto", width: "1070px" }}>
        <h2>Top3</h2>
        <div className={styles.board_card}>
          {boards.map((board, index) => (
            <BoardCard key={board.id} title={board.title} order={index + 1} />
          ))}
=======
    useEffect(() => {
        fetchData("전체");
    }, [])

    const handleClick = (id: string) => {
        router.push(`/notice-board/${id}`);
    }
    
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

                        <span className={styles.board_plus} onClick={() => setShowWrite(true)}>
                            게시물 추가하기 +
                        </span>
                    </div>

                {boards.map((item) => (
                    <BorderBox 
                        key={item.id}
                        tag={item.tag}
                        title={item.title}
                        userId={item.userId}
                        onClick={() =>  handleClick(item.id)}
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
>>>>>>> 65f91b8414f1dbb9af507f771fc6f43174445dae
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

          <div className={styles.board_plus}>게시물 추가하기 +</div>
        </div>

        {boards.map((item) => (
          <BorderBox
            key={item.id}
            tag={item.tag}
            title={item.title}
            userId={item.userId}
          />
        ))}
      </div>
    </div>
  );
}
