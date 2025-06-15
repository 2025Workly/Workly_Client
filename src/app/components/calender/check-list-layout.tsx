"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Calender/checklist.module.css";
import Image from "next/image";
import { apiManager } from "@/app/api/fetchWithAuth";
import { getFullNumber } from "../../../utils/util";

type CheckListItem = {
  checkId: number;
  content: string;
  checked: boolean;
};

type CheckListProps = {
  year: number;
  day: number;
  month: number;
  isOvertimeToggled: boolean;
  refreshOverTimeDates: () => void;
  refreshCheckDates: () => void;
};

type GetCheckListDateType = {
  checkList: {
    id: number;
    content: string;
    checked: number; // false: 0, true: 1
    date: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export default function CheckList({
  year: currentYear,
  day: activeDay,
  month: currentMonth,
  isOvertimeToggled,
  refreshOverTimeDates,
  refreshCheckDates,
}: CheckListProps) {
  const [checkListItemList, setCheckListItemList] = useState<CheckListItem[]>(
    []
  );
  const [newInput, setNewInput] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

  const fetchCheckList = async () => {
    try {
      const res: GetCheckListDateType = (
        await apiManager.get(
          `http://localhost:5000/check?month=${currentMonth}&day=${activeDay}`
        )
      ).data;

      const checkList = res.checkList.map((item) => ({
        checkId: item.id,
        content: item.content,
        checked: item.checked === 1,
      }));
      setCheckListItemList(checkList);
    } catch (error) {
      console.error("불러오기 실패:", error);
    }
  };

  // 야근 정보 토글링
  const toggleIsOvertime = async () => {
    try {
      const requestBody = {
        date: `${currentYear}-${getFullNumber(currentMonth)}-${getFullNumber(
          activeDay
        )}`,
      };

      if (!isOvertimeToggled) {
        // 야근 추가
        await apiManager.post("http://localhost:5000/overtime", requestBody);
      } else {
        // 야근 제거
        await apiManager.delete("http://localhost:5000/overtime", {
          data: requestBody,
        });
      }

      refreshOverTimeDates();
    } catch (error) {
      console.error("야근 토글 실패:", error);
    }
  };

  const resetInputValue = () => {
    setNewInput("");
    setShowInput(false);
  };

  const handleAddInputField = () => {
    if (!showInput) setShowInput(true);
  };

  const handleAdd = async () => {
    const content = newInput.trim();
    if (!content) return;
    try {
      const requestBody = {
        content,
        month: currentMonth,
        day: activeDay,
        checked: 0,
      };

      await apiManager.post("http://localhost:5000/check", requestBody);
      resetInputValue();
      await fetchCheckList();
      await refreshCheckDates();
    } catch (error) {
      console.error("추가 실패:", error);
    }
  };

  const handleDelete = async (checkId: number) => {
    try {
      await apiManager.delete(`http://localhost:5000/check/${checkId}`);
      await fetchCheckList();
      await refreshCheckDates();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  const handleCheckToggle = async (checkId: number, checked: boolean) => {
    try {
      const requestBody = { checked: checked ? 0 : 1 };

      await apiManager.patch(
        `http://localhost:5000/check/${checkId}`,
        requestBody
      );
      await fetchCheckList();
    } catch (error) {
      console.error("체크 상태 변경 실패:", error);
    }
  };

  useEffect(() => {
    // 현재 선택된 날짜 없으면 체크리스트 조회 api 호출x
    if (!activeDay) {
      setCheckListItemList([]);
      return;
    }

    fetchCheckList();
    resetInputValue();
  }, [activeDay, currentMonth]);

  return (
    <div className={styles.CheckListAllContainer}>
      <div style={{ padding: "0 39px 0 49px" }}>
        <div className={styles.addAndToggleContainer}>
          <div className={styles.AddCheckList}>
            <p onClick={handleAddInputField} className={styles.checkListText}>
              체크리스트 +{" "}
            </p>

            <div style={{ display: "flex", alignItems: "center" }}>
              <p className={styles.overtimeText}>야근</p>

              <div
                onClick={toggleIsOvertime}
                className={styles.outLineToggle}
                style={{
                  backgroundColor: isOvertimeToggled ? "#1A1E6C" : "#E9E9E9",
                }}
              >
                <div
                  className={styles.toggleCircle}
                  style={{
                    left: isOvertimeToggled ? "22px" : "4px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
      </div>

      {checkListItemList.length === 0 && !showInput && (
        <p className={styles.emptyMessage}>
          아직 체크리스트가 없습니다. 추가해주세요!
        </p>
      )}

      <div className={styles.inputContainer}>
        {checkListItemList.map((item) => (
          <div key={item.checkId} className={styles.writeContainer}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleCheckToggle(item.checkId, item.checked)}
            >
              <Image
                src={
                  item.checked
                    ? "/images/checkedbox.png"
                    : "/images/checkbox.png"
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
            placeholder="할일 입력(Enter 치면 입력이 완료됩니다)"
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
