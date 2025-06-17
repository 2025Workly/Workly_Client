"use client";
import styles from "../styles/Calender/calender-main.module.css";
import Calendar from "../components/calender/calender-layout";
import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import CheckList from "../components/calender/check-list-layout";
import { apiManager } from "../api/fetchWithAuth";
import { getExtractedDayList } from "../../utils/util";

type GetCheckDatesByMonthType = {
  checkListDays: string[];
};

type GetOverTimeDateListType = {
  overtimeDays: string[];
};

export default function CalenderMain() {
  const [checkedDayList, setCheckedDayList] = useState<number[]>([]); // 체크리스트 값 있는 일자 리스트
  const [currentMonth, setCurrentMonth] = useState<number>(dayjs().month() + 1); // 선택된 월
  const [activeDay, setActiveDay] = useState<number>(dayjs().date()); // 선택된 일자
  const [overTimeDayList, setOverTimeDayList] = useState<number[]>([]);

  const currentYear = dayjs().year(); // 현재 년도
  const isOverTimeToggled = useMemo(
    () => overTimeDayList.some((item) => activeDay === item),
    [overTimeDayList, activeDay]
  );

  const getOvertimeList = async () => {
    try {
      const res: GetOverTimeDateListType = (
        await apiManager.get(
          `http://43.201.95.2/overtime?year=${currentYear}&month=${currentMonth}`
        )
      ).data;
      const overTimeDayList = getExtractedDayList(res.overtimeDays);
      setOverTimeDayList(overTimeDayList);
    } catch (error) {
      console.error("야근 정보 불러오기 실패:", error);
    }
  };

  const getCheckedDates = async (month: number) => {
    try {
      const res: GetCheckDatesByMonthType = (
        await apiManager.get(
          `http://43.201.95.2/check/month?year=${currentYear}&month=${month}`
        )
      ).data;

      setCheckedDayList(getExtractedDayList(res.checkListDays));
    } catch (error) {
      console.error("월별 체크리스트 불러오기 실패:", error);
      setCheckedDayList([]);
    }
  };

  // 선택한 월 값이 바뀔 때마다 월별 체크리스트 다시 불러오기
  useEffect(() => {
    getOvertimeList();
    getCheckedDates(currentMonth);
  }, [currentMonth]);

  return (
    <div className={styles.allContainer}>
      <div style={{ width: "1070px", margin: "auto" }}>
        <h2 className={styles.h2}>야근 및 일정관리</h2>
        <div style={{ display: "flex", gap: "24px" }}>
          <Calendar
            currentMonth={currentMonth}
            currentYear={currentYear}
            activeDay={activeDay}
            checkedDayList={checkedDayList}
            overTimeDayList={overTimeDayList}
            setCurrentMonth={setCurrentMonth}
            setActiveDay={setActiveDay}
          />

          <CheckList
            year={currentYear}
            day={activeDay}
            month={currentMonth}
            isOvertimeToggled={isOverTimeToggled}
            refreshOverTimeDates={getOvertimeList}
            refreshCheckDates={() => getCheckedDates(currentMonth)}
          />
        </div>
      </div>
    </div>
  );
}
