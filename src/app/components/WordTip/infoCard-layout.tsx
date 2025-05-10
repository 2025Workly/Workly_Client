import styles from "../../styles/tips/infoCard.module.css"
interface InfoCardProps {
    width: string,
    padding: string,
    title: string,
    detail: string,
    gap: string,
    className: string
}
export default function InfoCard({ width, padding, title, detail, gap, className }: InfoCardProps) {
    return (
        <div className={styles.infoCardContainer} style={{ width: width, padding: padding }}>
            <div className={styles.title} style={{ gap: gap }}>
                <span className={`${className ? styles[className] : ""}`}>{title}</span>
                <img src="/images/book-mark.png" style={{ width: "19px", height: "25px" }} />
            </div>
            <div className={styles.detail}>{detail}</div>
        </div >
    )
}