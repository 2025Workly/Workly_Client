import { useState } from "react"
import styles from "../../styles/mypage/deleteSugguestion.module.css"
import Image from "next/image"

type DeleteSugguestionProp = {
    handleCancleClick: () => void;
    handleDeleteClick: () => void;
}
export default function DeleteSugguestionPopup({ handleCancleClick, handleDeleteClick }: DeleteSugguestionProp) {
    return (
        <div className={styles.popupContainer}>
            <div className={styles.suggestionCard}>
                <Image
                    width={66}
                    height={65}
                    src={"/images/deleteIcon.png"}
                    alt="deleteIcon" />

                <p className={styles.deletement}>정말 삭제하시겠습니까?</p>
                <p className={styles.noReturn}>삭제하신 게시물은 다시 복구할 수 없어요!</p>
                <div className={styles.btnContainer}>
                    <button
                        onClick={handleDeleteClick}
                        className={`${styles.delete} ${styles.btn}`}>
                        삭제</button>

                    <button
                        onClick={handleCancleClick}
                        className={`${styles.cancel} ${styles.btn}`}>
                        취소</button>
                </div>
            </div>
        </div>
    )
}