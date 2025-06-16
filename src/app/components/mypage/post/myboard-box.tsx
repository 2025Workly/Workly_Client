import { useState } from "react";
import DeleteSugguestionPopup from "@/app/components/mypage/delete-suggestion";
import axios from "axios";
import CategoryBox from "../../board/category-box";
import styles from "../../../styles/board/board.module.css";

type MyBoardProps = {
  id: string;
  title: string;
  tag: string;
};

export default function MyBoard({ id, title, tag }: MyBoardProps) {
  const [open, setOpen] = useState(false);

  // 삭제 함수 (id 매개변수 제거)
  const handleDeleteClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      await axios.delete(`http://localhost:5000/board/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("삭제가 완료되었습니다.");
      setOpen(false); // 팝업 닫기
      // TODO: 삭제 후 부모에서 목록 갱신 필요
    } catch (err) {
      console.error("응답 API 오류 : ", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div className={styles.borderbox}>
        <CategoryBox tag={tag} />
        <div className={styles.title}>{title}</div>
        <button
          onClick={() => setOpen(true)}
          style={{
            all: "unset",
            paddingRight: "43px",
            fontSize: "17px",
            color: "#525252",
          }}
        >
          삭제
        </button>
        {open && (
          <DeleteSugguestionPopup
            handleDeleteClick={handleDeleteClick}
            handleCancleClick={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
