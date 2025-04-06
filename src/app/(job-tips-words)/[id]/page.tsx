"use client"
import Category from "../../components/common/category-layout";
import SearchBar from "@/app/components/WordTip/search-bar-layout";
import Button from "@/app/components/common/button-layout";
import styles from "../../../app/(job-tips-words)/job-layout.module.css"
import { useState } from "react";
import Write from "@/app/components/WordTip/wirte-content-popup";
export default function Job() {
    const [activeCategory, setActiveCategory] = useState<string>("전체")
    const categories = ["전체", "개발", "디자인"];
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category)
    }

    return (
        <div className={styles.allContainer}>
            <Write mainPlaceholder="단어를" buttonTitle="단어 게시하기" contentPlaceholder="단어의 뜻을" />
            <SearchBar title={"단어"} />
            <div className={styles.categoryContainer}>
                <div className={styles.categoryList}>
                    {categories.map((category) => (
                        <Category
                            key={category}
                            type={category}
                            onClick={() => handleCategoryClick(category)}
                            isActive={category === activeCategory}
                        />
                    ))}
                </div>
                <span className={styles.addWordsBtn}>단어추가 +</span>
            </div>
        </div>
    )
}