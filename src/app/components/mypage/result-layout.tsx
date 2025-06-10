"use client"
import styles from "../../styles/mypage/result.module.css"
type infoProps = {
    value: string;
    resultWon: string;
}
export default function ResultField({ value, resultWon }: infoProps) {
    return (
        <div className={styles.allContainer}>
            <p className={styles.value}>{value}</p>
            <div>
                <span className={styles.resultWon}>{resultWon}</span>
                <span className={styles.won}>원</span>
            </div>
        </div>
    )
}