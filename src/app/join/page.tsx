"use client";

import { useState } from "react";
import axios from "axios";
import styles from "../styles/Login/login.module.css"
import KaKaoGoogle from "../components/common/kakao-google";

export default function JoinPage() {
  const [form, setForm] = useState({
    name: "",
    userId: "",
    pass: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/user/join",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { userId, name, email } = response.data;
      setMessage("회원가입이 완료되었습니다. 로그인해주세요!");
      console.log("서버 응답:", response.data);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      console.log("저장한 정보", userId, name, email)

    } catch (error: any) {
      console.error("회원가입 오류:", error);
      setMessage(
        error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div className={styles.allContainer}>
      <h2 className={styles.h2}>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", margin: "60px 0 33px 0" }}>
          <div>
            <input
              name="name"
              placeholder="닉네임을 입력해주세요"
              value={form.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div>
            <input
              name="userId"
              placeholder="아이디를 입력해주세요 (5~20자, 영문/숫자)"
              value={form.userId}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div>
            <input
              name="pass"
              type="password"
              placeholder="비밀번호를 입력해주세요 (8~20자, 영문+숫자)"
              value={form.pass}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={form.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.checkboxContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <label htmlFor="" className={styles.agreement}>개인정보 이용에 동의 하십니까?</label>
        </div>
        <button type="submit" className={styles.loginButton}>회원가입</button>

        <KaKaoGoogle />
      </form>
      <p>{message}</p>
    </div>
  );
}
