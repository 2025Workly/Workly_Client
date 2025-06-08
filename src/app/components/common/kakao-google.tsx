
import styles from "../../styles/Login/kakao-google.module.css"
export default function KaKaoGoogle() {
    return (
        <div>
            <div className={styles.lineContainer}>
                <p className={styles.line}></p>
                <p className={styles.or}>또는</p>
                <p className={styles.line}></p>
            </div>
            <div className={styles.iconContainer}>
                <img src="/images/kakaotalk.png" alt="kakaotalk" className={styles.kakaoicon} />
                <img src="/images/google.png" alt="google" className={styles.icon} />
            </div>
        </div>
    )
}