"use client";
import { useRouter } from "next/navigation";
import styles from "../../styles/tips/posted.module.css";
export default function PostedCard() {
  const router = useRouter();
  return (
    <div className={styles.Container}>
      <div className={styles.postedBtn}>
        <span className={styles.text}>게시되었어요!</span>
      </div>
    </div>
  );
}
