"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "../../styles/nav-bar.module.css";

export default function Nav() {
  const pathname = usePathname();
  return (
    <div className={styles.allContainer} style={{ background: "#F7F7F7" }}>
      <nav className={styles.navBar}>
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" width={115} height={40} />
        </Link>

        <ul className={styles.ul}>
          <li className={pathname === "/calender" ? styles.active : ""}>
            <Link href={"/calender"}>일정관리</Link>
          </li>
          <li className={pathname === "/notice-board" ? styles.active : ""}>
            <Link href={"/notice-board"}>게시판</Link>
          </li>
          <li className={pathname === "/job-tips-words" ? styles.active : ""}>
            <Link href={"/job-tips-words"}>직무</Link>
          </li>
          <li className={pathname === "/mypage" ? styles.active : ""}>
            <Link href={"/mypage"}>마이페이지</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
