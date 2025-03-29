import styles from "../styles/button-layout.module.css"
interface ButtonProps {
    title: string,
    onClick: () => void,
    paddingValue: string;
}

export default function Button({ title, onClick, paddingValue }: ButtonProps) {
    return (
        <div style={{ padding: paddingValue }}>
            <button className={styles.Button}
                onClick={onClick}><span className={styles.title}>{title}</span></button>
        </div>
    )
}