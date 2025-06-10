'use client'
import styles from "../styles/Calender/calender-main.module.css"
import Calendar from "../components/calender/calender-layout"
import CheckList from "../components/calender/check-list-layout"

export default function Calender() {
    return (
        <div className={styles.allContainer}>
            <div style={{ width: "1070px", margin: "auto" }}>
                <h2 className={styles.h2}>야근 및 일정관리</h2>
                <div style={{ display: "flex", gap: "24px" }}>
                    <Calendar />
                    <CheckList />
                </div>
            </div>

        </div >
    )
}