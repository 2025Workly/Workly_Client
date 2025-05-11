"use client"
import { useState } from "react"
import styles from "../../styles/mypage/family-count.module.css"
type titleProps = {
    title: string;
}
export default function FamilyCount({ title }: titleProps) {
    const [count, setCount] = useState(0)

    const plus = () => { setCount(count + 1) }
    const minus = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    return (
        <div className={styles.FamilyCountContainer}>
            <p className={styles.title}>{title}</p>

            <div className={styles.upDownButtonContainer}>
                <img src="/images/plusButton.png"
                    onClick={plus} className={styles.btn} />
                <span className={styles.count}>{count}</span>
                <img src="/images/minusButton.png"
                    onClick={minus} className={styles.btn} />

            </div>
        </div>
    )
}