import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/board/board-card.module.css";

const rankStyles = [
  { bg: '#2A28B8', img: '/images/rank1.png' },
  { bg: '#4B49DD', img: '/images/rank2.png' },
  { bg: '#5173E1', img: '/images/rank3.png' },
];

type PopularBoard = {
  id: number;
  title: string;
};

export default function BoardCardContainer() {
  const [popularBoards, setPopularBoards] = useState<PopularBoard[]>([]);

  useEffect(() => {
    const fetchPopularBoards = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/board/popular", {
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        console.log("response.data:", response.data);

        if (response.data && Array.isArray(response.data.boards)) {
          setPopularBoards(response.data.boards.slice(0, 3));
        } else {
          console.error("API 응답에 boards 배열이 없습니다:", response.data);
        }
      } catch (err) {
        console.error("인기 게시글 호출 실패", err);
      }
    };

    fetchPopularBoards();
  }, []);

  return (
    <div className={styles.board_card}>
      {popularBoards.map((board, index) => {
        const style = rankStyles[index] || { bg: "#fff", img: "" };
        return (
          <div
            key={board.id}
            style={{ backgroundColor: style.bg }}
            className={styles.popular}
          >
            <div className={styles.rank_card_inner}>
              <div className={styles.rank_box}>
                {style.img && (
                  <img
                    src={style.img}
                    alt={`${index + 1}위 이미지`}
                    width={121}
                    height={98}
                  />
                )}
              </div>
              <p
                style={{
                  color: "white",
                  fontSize: "25px",
                  margin: "30px",
                  fontWeight: "bold",
                }}
              >
                {board.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
