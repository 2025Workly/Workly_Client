"use client";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import styles from "../../styles/Calender/calender.module.css";
import { CalenderDayItemType, generateCalendarDays } from "../../../utils/util";
import { CALENDER_THEME, WEEK_DAY_LIST } from "../../../utils/const";

type CalendarProps = {
  currentYear: number;
  currentMonth: number;
  activeDay: number;
  checkedDayList: number[];
  overTimeDayList: number[];
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  setActiveDay: Dispatch<SetStateAction<number>>;
};

const Calendar = ({
  currentYear,
  currentMonth,
  activeDay,
  checkedDayList,
  overTimeDayList,
  setCurrentMonth,
  setActiveDay,
}: CalendarProps) => {
  const calenderDays = generateCalendarDays({
    year: currentYear,
    month: currentMonth,
    checkedDayList,
    overTimeDayList,
  });

  const onClickDayItem = (item: CalenderDayItemType) => {
    if (item.type === "nextMonth") {
      setCurrentMonth((prev) => prev + 1);
    }
    setActiveDay(item.day);
  };

  const onClickMonthNavigator = (type: "prevMonth" | "nextMonth") => {
    setActiveDay(0);
    setCurrentMonth((prev) => (type === "prevMonth" ? prev - 1 : prev + 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.calenderContainer}>
        <div className={styles.header}>
          <h2
            className={styles.title}
          >{`${currentYear}년 ${currentMonth}월`}</h2>
          <div className={styles.prevNextBtnContainer}>
            <Image
              src={"/images/calender-prev-btn.png"}
              onClick={() => onClickMonthNavigator("prevMonth")}
              className={styles.button}
              alt="prev"
              width={10}
              height={16}
            />
            <Image
              src={"/images/calender-next-btn.png"}
              onClick={() => onClickMonthNavigator("nextMonth")}
              className={styles.button}
              alt="next"
              width={10}
              height={16}
            />
          </div>
        </div>

        <div className={styles.calenderContent}>
          <div className={styles.weekdays}>
            {WEEK_DAY_LIST.map((weekDay) => (
              <div key={weekDay} className={styles.dayText}>
                {weekDay}
              </div>
            ))}
          </div>

          <div className={styles.days}>
            {calenderDays.map((item, index) => {
              const isNextMonthDayItem = item.type === "nextMonth";
              const isActive = !isNextMonthDayItem && item.day === activeDay;

              const style = (function () {
                if (isActive) return { backgroundColor: CALENDER_THEME.ACTIVE };
                if (item.isOverTime)
                  return { backgroundColor: CALENDER_THEME.IS_OVER_TIME };
                if (item.hasCheckList)
                  return { backgroundColor: CALENDER_THEME.HAS_CHECKLIST };

                return { backgroundColor: CALENDER_THEME.EMPTY };
              })();

              return (
                <div
                  key={`calender-day-item-${index}`}
                  onClick={() => onClickDayItem(item)}
                  className={`${styles.day} ${
                    isNextMonthDayItem ? styles.other : ""
                  }`}
                  style={{
                    backgroundColor: style.backgroundColor,
                    color: style.backgroundColor
                      ? CALENDER_THEME.ACTIVE_ITEM_TEXT_COLOR
                      : "",
                  }}
                >
                  {item.day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
