"use client";

import { useState } from "react";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

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
      alert("로그인 성공");
    } else {
      // 로그인 실패 시 오류 메시지
      setError(data.message);
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
