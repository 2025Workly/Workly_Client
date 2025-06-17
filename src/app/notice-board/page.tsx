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
  const [currentPage, setCurrentPage] = useState<number>(1); // 추가된 상태
  const tagtext = ["전체", "고민", "질문"];
  const [showWrite, setShowWrite] = useState(false);
  const [showPosted, setShowPosted] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 11; // 페이지당 게시물 수

  const tagMapping: { [key: string]: string } = {
    고민: "worry",
    질문: "question",
  };

  const fetchData = async (tag: string) => {
    setTagactive(tag);
    setCurrentPage(1); // 태그 변경 시 첫 페이지로 이동
    try {
      let apiEndpoint =
        tag === "전체"
          ? "http://43.201.95.2/board"
          : `http://43.201.95.2/board/${tagMapping[tag]}`;

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

  // 페이지네이션 계산
  const totalPages = Math.ceil(boards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBoards = boards.slice(startIndex, endIndex);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
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

        {/* 현재 페이지의 게시물들만 표시 */}
        {currentBoards.map((item) => (
          <BorderBox
            key={item.id}
            tag={item.tag}
            title={item.title}
            userId={item.userId}
            onClick={() => handleClick(item.id)}
          />
        ))}

        {/* 페이지네이션 버튼들 */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginTop: "32px",
            }}
          >
            {/* 이전 버튼 */}
            <div
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              style={{
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
                marginRight: "26px",
              }}
            >
              <img
                src="/images/Polygon 1.png"
                alt="이전"
                style={{
                  width: "14px",
                  height: "14px",
                }}
              />
            </div>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                style={{
                  width: "33px",
                  height: "33px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "23px",
                  backgroundColor: page === currentPage ? "#3B44E6" : "",
                  color: page === currentPage ? "white" : "#000",
                  fontWeight: page === currentPage ? "bold" : "normal",
                }}
              >
                {page}
              </button>
            ))}

            {/* 다음 버튼 */}
            <div
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              style={{
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
                marginLeft: "26px",
              }}
            >
              <img
                src="/images/Polygon 2.png"
                alt="다음"
                style={{
                  width: "14px",
                  height: "14px",
                }}
              />
            </div>
          </div>
        )}
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
        <BoardModal id={selectedPost.id} onClose={() => setSelectId(null)} />
      )}
    </div>
  );
}
