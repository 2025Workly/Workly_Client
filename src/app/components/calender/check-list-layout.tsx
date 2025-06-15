"use client";
import React from "react";
import styles from "../../styles/Calender/checklist.module.css";
import Image from "next/image";
import dayjs from "dayjs";
import { useCheckListLayout } from "./useCheckLisLayout";

type CheckListProps = {
  selectedDate: dayjs.Dayjs;
  refreshDates: () => void;
};

export default function CheckList({
  selectedDate,
  refreshDates,
}: CheckListProps) {
  const {
    newInput,
    inputs,
    showInput,
    handleCheckToggle,
    handleDelete,
    handleAddInputField,
    setNewInput,
    handleAdd,
    overtime,
    toggleOvertime,
  } = useCheckListLayout({ selectedDate, refreshDates });

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
                onClick={toggleOvertime}
                className={styles.outLineToggle}
                style={{
                  backgroundColor: overtime ? "#1A1E6C" : "#E9E9E9",
                }}
              >
                <div
                  className={styles.toggleCircle}
                  style={{
                    left: overtime ? "22px" : "4px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
      </div>

      {inputs.length === 0 && !showInput && (
        <p className={styles.emptyMessage}>
          아직 체크리스트가 없습니다. 추가해주세요!
        </p>
      )}

      <div className={styles.inputContainer}>
        {inputs.map((item) => (
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
