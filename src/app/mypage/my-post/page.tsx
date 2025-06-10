"use client"
import Category from "@/app/components/common/category-layout"
import styles from "../../styles/mypage/saved-tip.module.css"
import { useState } from "react"
import DeleteSugguestionPopup from "@/app/components/mypage/delete-suggestion"

export default function MyPostPage() {
    const categories = ["전체", "고민", "질문"]
    const [activeCategory, setActiveCategory] = useState<string>("전체")
    const [open, setOpen] = useState(false)

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category)
    }
    return (
        <div className={styles.savedPostAllContainer}>
            <div className={styles.savedContainer}>
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

                {/*임시*/}
                <button onClick={() => setOpen(p => !p)}>삭제</button>
                {open && <DeleteSugguestionPopup
                    handleDeleteClick={() => { }}
                    handleCancleClick={() => { setOpen(p => !p) }}
                />}


            </div>
        </div>
    )
}