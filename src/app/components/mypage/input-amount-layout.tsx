import styles from "../../styles/mypage/family-count.module.css"
type mountTypeProps = {
    mountType: string;
}

export default function InputAmount({ mountType }: mountTypeProps) {
    return (
        <div>
            <p className={styles.mountType}>{mountType}</p>
            <input
                className={styles.inputMount}
                type="text"
                placeholder="0"
            />
            <span className={styles.unit}>원</span>
        </div>
    )
}