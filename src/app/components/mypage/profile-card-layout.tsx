"use client";
import styles from "../../styles/mypage/profile-card.module.css";
import Modal from "./modal-layout";
import { useState } from "react";

interface ProfileContentProps {
  username: any;
  userId: any;
}

export default function ProfileCard({ username, userId }: ProfileContentProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.contentContainer}>
        <img
          src="/images/profileImg.png"
          className={styles.profileImg}
          alt="profileImg"
        />
        <p className={styles.username}>{username}</p>
        <p className={styles.userId}>{userId}</p>
      </div>

      <img
        src="/images/modal.png"
        alt="modal"
        onClick={() => setOpen(!open)}
        style={{ width: "7px", height: "34px", cursor: "pointer" }}
      />
      {open ? <Modal /> : null}
    </div>
  );
}
