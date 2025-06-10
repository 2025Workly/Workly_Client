"use client"

import {useEffect, useState} from "react";
import styles from "../styles/mypage/mypage.module.css";
import ProfileCard from "../components/mypage/profile-card-layout";
import Calculator from "../components/mypage/calculator-layout";
export default function Mypage() {
    const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    setToken(storedToken);
    setUsername(storedName);
    setEmail(storedEmail);
  }, []);


    console.log(token)
    return (
        <div className={styles.allContainer}>
            <div className={styles.profileContainer}>
                <p className={`${styles.contentName} ${styles.mypageTitle}`}>마이페이지</p>
                {/* 프로필 카드 컴포넌트 (내용은 임시) */}
                <ProfileCard
                    username={username ? username : "Guest"}
                    userId={email ? email : "itshow@e-mirim.hs.kr"}
                />
            </div>

            {/* 실수령액 계산기 */}
            <Calculator />

        </div>
    )
}