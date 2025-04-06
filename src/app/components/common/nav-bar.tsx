
"use client";
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { usePathname } from "next/navigation";
import Logo from "../../../../public/images/testLogo.png"
import styles from "../../styles/nav-bar.module.css"
import path from "path";

export default function Nav() {
    const pathname = usePathname();
    //const router = useRouter();
    return (
        <div className={styles.allContainer}>
            <nav className={styles.navBar}>
                <Link href={"/"}>
                    <Image src={Logo} alt="logo" className={styles.logoImg} />
                </Link>

                <ul className={styles.ul}>
                    <li className={pathname === "/calender" ? styles.active : ""}>
                        <Link href={"/calender"}>일정관리</Link >
                    </li>
                    <li className={pathname === "/notice-board" ? styles.active : ""}>
                        <Link href={"/notice-board"}>게시판</Link >
                    </li>
                    <li className={pathname === "/job-tips-words" ? styles.active : ""}>
                        <Link href={"/job-tips-words"}>직무</Link >
                    </li>
                    <li className={pathname === "/mypage" ? styles.active : ""}>
                        <Link href={"/mypage"}>마이페이지</Link >
                    </li>

                </ul>

            </nav>
        </div>
    )
}