"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import styles from "../../styles/Calender/calender.module.css";

type CalendarProps = {
  setSelectedDate: (date: dayjs.Dayjs) => void;
  selectedDate: dayjs.Dayjs;
  checkDates: { month: number; day: number }[];
};

const Calendar = ({
  setSelectedDate,
  selectedDate,
  checkDates,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const weeks = [];
  let date = startDate;
  while (date.isBefore(endDate, "day")) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(date);
      date = date.add(1, "day");
    }
    weeks.push(week);
  }

  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const goToNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div className={styles.container}>
      <div className={styles.calenderContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{currentDate.format("YYYY년 MM월")}</h2>
          <div className={styles.prevNextBtnContainer}>
            <Image
              src={"/images/calender-prev-btn.png"}
              onClick={goToPrevMonth}
              className={styles.button}
              alt="prev"
              width={10}
              height={16}
            />
            <Image
              src={"/images/calender-next-btn.png"}
              onClick={goToNextMonth}
              className={styles.button}
              alt="next"
              width={10}
              height={16}
            />
          </div>
        </div>

        <div className={styles.calenderContent}>
          <div className={styles.weekdays}>
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <div key={day} className={styles.dayText}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.days}>
            {weeks.map((week, wi) =>
              week.map((day, di) => {
                const isOtherMonth = !day.isSame(currentDate, "month");
                const isSelected = selectedDate.isSame(day, "day");
                const hasCheckList = checkDates.some(
                  (d) => d.month === day.month() + 1 && d.day === day.date()
                );

                let className = `${styles.day}`;
                if (isOtherMonth) className += ` ${styles.other}`;
                if (hasCheckList) className += ` ${styles.hasCheckList}`;
                if (isSelected) className += ` ${styles.selected}`;

                return (
                  <div
                    key={`${wi}-${di}`}
                    onClick={() => setSelectedDate(day)}
                    className={className}
                  >
                    {day.date()}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
