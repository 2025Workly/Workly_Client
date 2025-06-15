// 캘린더 관련 헬퍼 함수

import dayjs from "dayjs";
import { CALENDER_FULL_DAY_LENGTH } from "./const";

export type CalenderDayItemType = {
  day: number;
  hasCheckList: boolean;
  isOverTime: boolean;
  type?: "nextMonth";
};

export function generateCalendarDays({
  year,
  month,
  checkedDayList,
  overTimeDayList,
}: {
  year: number;
  month: number;
  checkedDayList: number[];
  overTimeDayList: number[];
}): CalenderDayItemType[] {
  // dayjs는 0-based month (0: 1월, 11: 12월)
  const firstDayOfMonth = dayjs(new Date(year, month - 1, 1));
  const daysInMonth = firstDayOfMonth.daysInMonth();

  const hasCurrentDay = (dayList: number[], currentDay: number) =>
    dayList.some((day) => day === currentDay);

  // 이번달 일자 리스트 [{ day: 1 }, { day: 2 }, ...]
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => {
    const currentDay = i + 1;
    return {
      day: currentDay,
      hasCheckList: hasCurrentDay(checkedDayList, currentDay),
      isOverTime: hasCurrentDay(overTimeDayList, currentDay),
    };
  });

  // 총 42개 맞추기 위해 부족한 개수 계산
  const remaining = CALENDER_FULL_DAY_LENGTH - currentMonthDays.length;

  // 다음달 시작
  const nextMonthDays = Array.from({ length: remaining }, (_, i) => ({
    day: i + 1,
    type: "nextMonth",
    hasCheckList: false,
    isOverTime: false,
  }));

  return [...currentMonthDays, ...nextMonthDays];
}

export function getExtractedDayList(dateList: string[]): number[] {
  // 일자만 가져오기(2개) -> 중복 제거 -> 오름차순
  const dayNumbers = dateList.map((date) => Number(date.slice(-2)));
  const uniqueDays = [...new Set(dayNumbers)].sort((a, b) => a - b);

  return uniqueDays;
}

export function getFullNumber(dayNum: number) {
  return String(dayNum).padStart(2, "0");
}
