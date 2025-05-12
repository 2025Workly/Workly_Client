"use client";

import { useState } from "react";
import axios from "axios";

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

      setMessage("회원가입이 완료되었습니다. 로그인해주세요!");
      console.log("서버 응답:", response.data);
    } catch (error: any) {
      console.error("회원가입 오류:", error);
      setMessage(
        error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="userId"
            placeholder="아이디 (5~20자, 영문/숫자)"
            value={form.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="pass"
            type="password"
            placeholder="비밀번호 (8~20자, 영문+숫자)"
            value={form.pass}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
