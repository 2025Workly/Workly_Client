"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Calender/checklist.module.css";
import Image from "next/image";
import dayjs from "dayjs";

type CheckListItem = {
  checkId: number;
  content: string;
  checked: boolean;
};

type CheckListProps = {
  selectedDate: dayjs.Dayjs;
  refreshDates: () => void;
};

export default function CheckList({
  selectedDate,
  refreshDates,
}: CheckListProps) {
  const [inputs, setInputs] = useState<CheckListItem[]>([]);
  const [newInput, setNewInput] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  const month = selectedDate.month() + 1;
  const day = selectedDate.date();

  const fetchCheckList = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/check?month=${month}&day=${day}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      const checkList = data.checkList.map((item: any) => ({
        checkId: item.id,
        content: item.content,
        checked: item.checked === 1,
      }));
      setInputs(checkList);
    } catch (error) {
      console.error("불러오기 실패:", error);
    }
  };

  const handleAddInputField = () => {
    if (!showInput) {
      setShowInput(true);
    }
  };

  const handleAdd = async () => {
    const content = newInput.trim();
    if (!content) return;
    try {
      await fetch("http://localhost:5000/check", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, month, day }),
      });
      setNewInput("");
      setShowInput(false);
      fetchCheckList();
      refreshDates();
    } catch (error) {
      console.error("추가 실패:", error);
    }
  };

  const handleDelete = async (checkId: number) => {
    try {
      await fetch(`http://localhost:5000/check/${checkId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCheckList();
      refreshDates();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  const handleCheckToggle = async (checkId: number, checked: boolean) => {
    try {
      await fetch(`http://localhost:5000/check/${checkId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checked: checked ? 0 : 1 }),
      });
      fetchCheckList();
    } catch (error) {
      console.error("체크 상태 변경 실패:", error);
    }
  };

  useEffect(() => {
    fetchCheckList();
    setShowInput(false);
  }, [selectedDate]);

  return (
    <div className={styles.CheckListAllContainer}>
      <div style={{ padding: "0 39px 0 49px" }}>
        <div className={styles.addAndToggleContainer}>
          <div className={styles.AddCheckList}>
            <p className={styles.checkListText}>체크리스트</p>
            <Image
              src={"/images/addIcon.png"}
              alt="addIcon"
              width={14}
              height={14}
              style={{ cursor: "pointer" }}
              onClick={handleAddInputField}
            />
          </div>
        </div>
        <div className={styles.line}></div>
      </div>

      {inputs.length === 0 && !showInput && (
        <p className={styles.emptyMessage}>
          아직 체크리스트가 없습니다. 추가해주세요!
        </p>
      )}

      {/* 기존 체크리스트 렌더링 */}
      <div className={styles.inputContainer}>
        {inputs.map((item) => (
          <div key={item.checkId} className={styles.writeContainer}>
            {/* 커스텀 체크박스 */}
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleCheckToggle(item.checkId, item.checked)}
            >
              <Image
                src={
                  item.checked
                    ? "/images/checkbox.png"
                    : "/images/checkedbox.png"
                }
                alt="checkbox"
                width={27}
                height={27}
              />
            </div>

            <p className={styles.text}>{item.content}</p>

            <Image
              src="/images/checkListDeleteBtn.png"
              width={12}
              height={12}
              alt="delete"
              onClick={() => handleDelete(item.checkId)}
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                marginRight: "55px",
              }}
            />
          </div>
        ))}
      </div>

      {/* 새로 추가할 입력창 */}
      {showInput && (
        <div
          className={styles.writeContainer}
          style={{ paddingBottom: "8px", position: "relative" }}
        >
          <div style={{ width: "27px", height: "27px" }}>
            <Image
              src="/images/checkbox.png"
              alt="checkbox"
              width={27}
              height={27}
            />
          </div>
          <input
            type="text"
            placeholder="할일 입력"
            className={styles.input}
            value={newInput}
            onChange={(e) => setNewInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>
      )}
    </div>
  );
}
