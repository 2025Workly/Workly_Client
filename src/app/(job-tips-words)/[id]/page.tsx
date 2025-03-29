"use client"
import Category from "../../components/category-layout";
import styles from "../../../app/(job-tips-words)/job-layout.module.css"
import { useState } from "react";
export default function Job() {
    const [activeCategory, setActiveCategory] = useState<string>("전체")
    const categories = ["전체", "개발", "디자인"];
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category)
    }

    return (
        <div className={styles.categoryContainer}>
            {categories.map((category) => (
                <Category
                    key={category}
                    type={category}
                    onClick={() => handleCategoryClick(category)}
                    isActive={category === activeCategory}
                />
            ))}
        </div>
    )
}