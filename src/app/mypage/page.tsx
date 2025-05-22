"use client"
import styles from "../styles/mypage/mypage.module.css";
import ProfileCard from "../components/mypage/profile-card-layout";
import Calculator from "../components/mypage/calculator-layout";
import { useRef } from "react";
import { motion } from "framer-motion";
export default function Mypage() {

    return (
        <div className={styles.allContainer}>
            <div className={styles.profileContainer}>
                <p className={`${styles.contentName} ${styles.mypageTitle}`}>마이페이지</p>
                {/* 프로필 카드 컴포넌트 (내용은 임시) */}
                <ProfileCard
                    username="닉네임"
                    userId="d2329@e-mirim.hs.kr"
                />
            </div>

            {/* 실수령액 계산기 */}
            <Calculator />

        </div>
    )
}