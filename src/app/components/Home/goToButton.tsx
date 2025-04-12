import styles from "../../styles/button-layout.module.css"
import Link from "next/link";
interface GotoButtonProps {
    href: string;
    fontColor: string;
    style1?: React.CSSProperties;
}
export default function GotoButton({ href, fontColor, style1 }: GotoButtonProps) {
    return (
        <Link href={href} className={styles.GotoBtnContainer} style={{ ...style1 }}>
            <span style={{ color: fontColor, fontSize: "19px" }}>바로가기</span>
        </Link>
    )
}