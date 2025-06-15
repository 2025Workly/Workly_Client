'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Login/login.module.css"

export default function Login() {
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const router = useRouter()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 로그인 API 호출
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, pass }),
    });

    const data = await response.json();

    if (response.ok) {
      // 로그인 성공 시 JWT 토큰 저장
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      console.log(data.token)
      alert("로그인 성공");
      router.push('/');

    } else {
      // 로그인 실패 시 오류 메시지
      setError(data.message);
      alert("로그인 실패");
    }
  };

  return (
    <div className={styles.allContainer}>
      <h2 className={styles.h2}>로그인</h2>
      <form onSubmit={handleLogin}>

        <div>
          <input
            className={`${styles.input} ${styles.firstInput}`}
            placeholder="아이디를 입력해주세요"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className={styles.input}
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <div className={styles.joinSuggestionContainer}>
          <p className={styles.joinSuggestion}>계정이 없으면?</p>
          <p onClick={() => router.push('/join')} className={styles.loginMent}> 회원가입</p>
          <p className={styles.joinSuggestion}> 하러가기</p>
        </div>
        <button type="submit" className={styles.loginButton}>로그인</button>

      </form>
    </div>
  );
}
