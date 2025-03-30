import styles from "../styles/button-layout.module.css"
interface ButtonProps {
    title: string,
    onClick: () => void;
}
export default function Button({ title, onClick }: ButtonProps) {
    return (
        <div>
            <button className={styles.Button}
                onClick={onClick}><span className={styles.title}>{title}</span></button>
        </div>
    )
}