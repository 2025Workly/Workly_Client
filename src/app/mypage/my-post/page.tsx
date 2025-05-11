"use client"
import Category from "@/app/components/common/category-layout"
import styles from "../../styles/mypage/saved-tip.module.css"
import { useState } from "react"
export default function MyPostPage() {
    const categories = ["전체", "고민", "질문"]
    const [activeCategory, setActiveCategory] = useState<string>("전체")


    const handleCategoryClick = (category: string) => {
        setActiveCategory(category)
    }
    return (
        <div className={styles.savedPostAllContainer}>
            <p className={styles.saveText}>나의 게시물</p>
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