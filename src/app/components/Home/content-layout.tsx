import GotoButton from "./goToButton";
import Image from "next/image";
import styles from "../../styles/Home/content.module.css";

interface ContentTitleProps {
    title: string,
    description: string
    href: string,
    lineHeight: number,
}

export default function Content({ title, href, description, lineHeight }: ContentTitleProps) {
    return (
        <div className={styles.allContainer}>
            <div className={styles.messageContainer}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description} style={{ lineHeight: lineHeight }}>{description}</p>
                <GotoButton href={href} />
            </div>
        </div>
    )
}
