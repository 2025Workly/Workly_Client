"use client";
import styles from "../styles/Calender/calender-main.module.css";
import Calendar from "../components/calender/calender-layout";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import CheckList from "../components/calender/check-list-layout";

export default function CalenderMain() {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 기본값 오늘 날짜로 설정
  const [checkDates, setCheckDates] = useState<
    { month: number; day: number }[]
  >([]);

  const fetchCheckDates = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const list = data.checkList.map((item: any) => {
        const createdAt = dayjs(item.createdAt);
        return { month: createdAt.month() + 1, day: createdAt.date() };
      });
      setCheckDates(list);
    } catch (error) {
      console.error("날짜 불러오기 실패:", error);
    }
  };
  console.log("checkDates 전달값: ", checkDates);

  useEffect(() => {
    fetchCheckDates();
  }, []);

  return (
    <div className={styles.allContainer}>
      <div style={{ width: "1070px", margin: "auto" }}>
        <h2 className={styles.h2}>야근 및 일정관리</h2>
        <div style={{ display: "flex", gap: "24px" }}>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            checkDates={checkDates}
          />

          <CheckList
            selectedDate={selectedDate}
            refreshDates={fetchCheckDates}
          />
        </div>
      </div>
    </div>
  );
}
