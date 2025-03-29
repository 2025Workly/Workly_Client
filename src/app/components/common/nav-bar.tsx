
"use client";
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

import Logo from "../../../../public/images/testLogo.png"
import styles from "../../styles/nav-bar.module.css"

export default function Nav() {
    //const router = useRouter();
    return (
        <div className={styles.allContainer}>
            <nav className={styles.navBar}>
                <Link href={"/"}>
                    <Image src={Logo} alt="logo" className={styles.logoImg} />
                </Link>
                <ul className={styles.ul}>
                    <li>
                        <Link href={"/notice-board"}>게시판</Link >
                    </li>
                    <li>
                        <Link href={"/job-tips-words"}>직무</Link >
                    </li>
                    <li>
                        <Link href={"/mypage"}>마이페이지</Link >
                    </li>

                </ul>

            </nav>
        </div>
    )
}