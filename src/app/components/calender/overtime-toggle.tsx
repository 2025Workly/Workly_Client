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