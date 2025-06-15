import axios from "axios";

// axios instance 만들기
export const apiManager = axios.create({
  baseURL: "http://localhost:5000",
});

apiManager.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  console.log(token);

  if (!token) {
    console.error("토큰이 존재하지 않습니다.");
    throw new Error("로그인되지 않았습니다.");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  console.log("사용할 토큰:", token);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      console.error("서버 응답 실패:", response.status);
      throw new Error("서버 응답 오류");
    }

    return response;
  } catch (error) {
    console.error("요청 에러:", error);
    throw new Error("요청을 처리할 수 없습니다.");
  }
};
