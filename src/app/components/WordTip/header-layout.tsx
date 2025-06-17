"use client";
import Link from "next/link";
import React from "react";
import styles from "../../styles/tips/tipHeader.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <div className={styles.headerContainer}>
      <p
        className={
          pathname === "/job-tips-words" ? styles.active : styles.notActive
        }
      >
        <Link href={"/job-tips-words"}>직무별 단어</Link>
      </p>
      <p className={styles.divisionLine}></p>
      <p className={pathname === "/tip" ? styles.active : styles.notActive}>
        <Link href={"/tip"}>직무별 팁</Link>
      </p>
    </div>
  );
}
