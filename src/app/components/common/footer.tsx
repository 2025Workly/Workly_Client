import styles from "../../styles/footer.module.css"
import Link from "next/link"
import Image from "next/image"
import Logo from "../../../../public/images/testLogo.png"

interface FooterProps {
    isHome: boolean;
}
export default function Footer({ isHome }: FooterProps) {
    return (

        <footer className={styles.footer} style={{ background: isHome ? "linear-gradient(90deg, #3B44E6 0.01%, #396AE0 100%)" : "#F7F7F7" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Image src={Logo} alt="logo" className={styles.LogoImg} />
                <div className={styles.mainFooter}>
                    <div className={styles.producer}>
                        <span style={{ color: isHome ? "#AFAFAF" : "#727272" }}>제작자</span>
                        <span className={styles.member} style={{ color: isHome ? "#A4A4A4" : "#6F6F6F" }}>배주연, 이성미, 박수민, 양현서</span>
                    </div>

                    <ul className={styles.ul}>
                        <li><Link href={"/calender"} style={{ color: isHome ? "#BBB" : "#6F6F6F" }}>일정관리</Link></li>
                        <li><Link href={"/notice-board"} style={{ color: isHome ? "#BBB" : "#6F6F6F" }}>게시판</Link></li>
                        <li><Link href={"/job-tips-words"} style={{ color: isHome ? "#BBB" : "#6F6F6F" }}>직무</Link></li>
                        <li><Link href={"/mypage"} style={{ color: isHome ? "#BBB" : "#6F6F6F" }}>마이페이지</Link></li>
                    </ul>
                </div>
            </div>
        </footer>

    )
}