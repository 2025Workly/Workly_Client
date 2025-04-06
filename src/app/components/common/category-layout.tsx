import React from "react";
import styles from "../../styles/category-layout.module.css"
import { on } from "events";
interface CategoryProps {
    type: string,
    onClick: () => void,
    isActive: boolean;
}

export default function Category({ type, onClick, isActive }: CategoryProps) {
    return (
        <div>
            <div className={`${styles.category} ${isActive ? styles.activeCategory : ""}`}
                onClick={onClick}>
                {type}
            </div>
        </div>
    )
}
