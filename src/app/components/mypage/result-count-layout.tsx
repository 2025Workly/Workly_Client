import Button from "../common/button-layout"
import styles from "../../styles/mypage/result-count.module.css"
export default function ResultCount() {
    const resultValue = ["국민연금", "건강보험", "장기요양", "고용보험", "소득세", "지방소득세"]
    return (
        <div className={styles.resultContainer}>
            <p className={styles.monthTitle}>한 달 기준 공제액</p>
            <div className={`${styles.line} ${styles.line1}`}></div>

            <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
                {resultValue.map((item) => (
                    <div className={styles.resultMount}>
                        <span className={styles.resultValue}>{item}</span>
                        <div className={styles.resultNumberContainer}>
                            <p className={styles.num}>{0}</p>
                            <p className={styles.num} style={{ fontSize: "25px" }}>원</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`${styles.line} ${styles.line2}`}></div>

            <div className={styles.resultMount} style={{ marginBottom: "89px" }}>
                <p className={styles.totalTxt}>공재액 합계</p>
                <div className={styles.resultNumberContainer}>
                    <p className={styles.resultNum}>{0}</p>
                    <p className={styles.resultNum}>원</p>
                </div>
            </div>

            <Button title="재시작" />
        </div >
    )
}