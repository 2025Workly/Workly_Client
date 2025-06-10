"use client"
import React, { useState } from "react"
import styles from "../../styles/Calender/checklist.module.css"
import Image from "next/image"
import OvertimeToggle from "./overtime-toggle"
import { fetchWithAuth } from "@/app/api/fetchWithAuth"

type AddCheckListProps = {
    onClick: () => void;
}
function AddCheckList({ onClick }: AddCheckListProps) {

    return (
        <div style={{ padding: "0 39px 0 49px" }}>
            <div className={styles.addAndToggleContainer}>
                <div className={styles.AddCheckList}>
                    <p className={styles.checkListText}>체크리스트</p>
                    <Image src={"/images/addIcon.png"}
                        alt="addIcon"
                        width={14} height={14}
                        onClick={onClick}
                        style={{ cursor: "pointer" }} />
                </div>

                <div className={styles.toggleContainer}>
                    <p className={styles.overTimeText}>야근</p>
                    <OvertimeToggle
                        isActive={true}
                    />
                </div>
            </div>
            <div className={styles.line}></div>
        </div>
    )
}

function WriteInput() {
    return (
        <div className={styles.writeContainer}>
            <input type="checkbox" className={styles.checkbox} />
            <input type="text" className={styles.input} />
        </div>
    )
}
export default function CheckList() {
    const [show, setShow] = useState(false)
    return (
        <div className={styles.CheckListAllContainer}>
            <AddCheckList onClick={() => setShow(true)} />

            <WriteInput />
            {show && <WriteInput />}
        </div>
    )
}