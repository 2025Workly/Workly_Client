"use client"
import Category from "@/app/components/common/category-layout"
import styles from "../../styles/mypage/saved-tip.module.css"
import { useState } from "react"
export default function SavedPage() {
    const categories = ["단어", "팁"]
    const [activeCategory, setActiveCategory] = useState<string>("단어")


    const handleCategoryClick = (category: string) => {
        setActiveCategory(category)
    }
    return (
        <div className={styles.savedPostAllContainer}>
            <p className={styles.saveText}>저장</p>
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
        </div>
    )
}