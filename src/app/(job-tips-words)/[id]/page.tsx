"use client"
import Category from "../../components/common/category-layout";
import SearchBar from "@/app/components/WordTip/search-bar-layout";
import Button from "@/app/components/common/button-layout";
import styles from "../../../app/(job-tips-words)/job-layout.module.css"
import { useState } from "react";
import Link from "next/link";
import Write from "@/app/components/WordTip/wirte-content-popup";
import InfoCard from "@/app/components/WordTip/infoCard-layout";

export default function Job() {
    const [activeCategory, setActiveCategory] = useState<string>("전체")
    const categories = ["전체", "개발", "디자인"];
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category)
    }

    return (
        <div className={styles.allContainer}>
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
                <span className={styles.addWordsBtn}><Link href="">단어추가 +</Link></span>
            </div>
            <InfoCard
                width="527px" padding="43px 57px" gap="98px"
                title="일러스트 CMYK에서 RGB로 변경하기"
                detail="벡터 이미지는 수학적으로 계산된 경로로 구성된 무한 확대 가능한 디지털 그래픽입니다. 벡터는 기본적으로 필요에 의해 늘어나거나 구부러질 수 있습니다."
            />
            {/* <Write mainPlaceholder="단어를" buttonTitle="단어 게시하기" contentPlaceholder="단어의 뜻을" /> */}
        </div>
    )
}