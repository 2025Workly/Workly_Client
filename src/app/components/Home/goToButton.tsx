import styles from "../../styles/button-layout.module.css"
import Link from "next/link";
interface GotoButtonProps {
    href: string;
}
export default function GotoButton({ href }: GotoButtonProps) {
    return (
        <Link href={href} className={styles.GotoBtnContainer}>
            <span style={{ color: "#FFF", fontSize: "19px" }}>바로가기</span>
        </Link>
    )
}