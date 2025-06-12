'use client'
import React from "react"
import styles from "../../styles/Calender/overtime-toggle.module.css"

type LanguageToggleProps = {
    isActive: boolean;
    onToggle: () => void;
}

export default function OvertimeToggle({ isActive, onToggle }: LanguageToggleProps) {
    return (
        <div className={styles["toggle-container"]}>
            <p className={styles.overTimeText}>야근</p>
            <label className={styles["toggle-switch"]}>
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={onToggle}
                />
                <span className={styles["toggle-slider"]} />
            </label>
        </div>
    );
}