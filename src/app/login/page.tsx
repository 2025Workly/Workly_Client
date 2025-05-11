"use client";

import { useState } from "react";
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
    } else {
      console.error("Login failed:", data.message);
      alert(data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="아이디를 입력해주세요"
        value={username}
        onChange={e => setUsername(e.target.value)}
        type="text"
      />
      <input
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
