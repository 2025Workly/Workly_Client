import GotoButton from "./goToButton";
import Image from "next/image";
import styles from "../../styles/Home/content.module.css";
import Link from "next/link";
import btnStyles from "../../styles/button-layout.module.css";
interface ContentTitleProps {
    title: string,
    description: string
    href: string,
    titleColor: string,
    btnFontColor: string,
    btnBackground: string,
    style?: React.CSSProperties,
}

export default function Content({ title, href, description, style, titleColor, btnFontColor, btnBackground }: ContentTitleProps) {
    return (
        <div className={styles.allContainer}>
            <div className={styles.messageContainer}>
                <h1 className={styles.title} style={{ color: titleColor }}>{title}</h1>
                <p className={styles.description} style={{ ...style }}>{description}</p>
                <Link href={href} className={btnStyles.GotoBtnContainer} style={{ backgroundColor: btnBackground }} >
                    <span style={{ color: btnFontColor, fontSize: "19px", fontWeight: 600 }}>바로가기</span>
                </Link>
            </div>
        </div>
    )
}
