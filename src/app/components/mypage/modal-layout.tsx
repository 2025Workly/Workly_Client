"use client";
import styled from "styled-components";
import styles from "../../styles/mypage/profile-card.module.css";
import Link from "next/link";

const ModalContainer = styled.div`
  position: absolute;
  top: 335px;
  right: 26%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0px 4px 33.3px 0px rgba(0, 0, 0, 0.02);
  padding: 33px 44px;
`;

export default function Modal() {
  const Logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    console.log("로그아웃");
  };
  return (
    <ModalContainer>
      <span className={styles.save}>
        <Link href={"/mypage/my-post"}>나의 게시물</Link>
      </span>
      <span className={styles.save}>
        <Link href={"/mypage/save-post"}>저장</Link>
      </span>
      <span className={styles.logout} onClick={Logout}>
        <Link href={"/loginPage"}>로그아웃</Link>
      </span>
    </ModalContainer>
  );
}
