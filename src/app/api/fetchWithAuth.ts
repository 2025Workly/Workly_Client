import axios from "axios";

// axios instance 만들기
export const apiManager = axios.create({
  baseURL: "http://43.201.95.2",
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
  if (typeof window === "undefined") {
    console.error(
      "클라이언트 환경이 아닙니다. localStorage에 접근할 수 없습니다."
    );
    throw new Error("클라이언트에서만 호출 가능한 함수입니다.");
  }
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
