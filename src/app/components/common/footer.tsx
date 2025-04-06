import styles from "../../styles/footer.module.css"
import Link from "next/link"
import Image from "next/image"
import Logo from "../../../../public/images/testLogo.png"
export default function Footer() {
    return (

        <footer className={styles.footer}>
            <Image src={Logo} alt="logo" className={styles.LogoImg} />

            <div className={styles.mainFooter}>
                <div className={styles.producer}>
                    <span>제작자</span>
                    <span className={styles.member}>배주연, 이성미, 박수민, 양현서</span>
                </div>

                <ul className={styles.ul}>
                    <li><Link href={"/calender"}>일정관리</Link></li>
                    <li><Link href={"/notice-board"}>게시판</Link></li>
                    <li><Link href={"/job-tips-words"}>직무</Link></li>
                    <li><Link href={"/mypage"}>마이페이지</Link></li>
                </ul>
            </div>
        </footer>

    )
}