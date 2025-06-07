"use client"
import Category from "../../components/common/category-layout";
import SearchBar from "@/app/components/WordTip/search-bar-layout";
import Button from "@/app/components/common/button-layout";
import styles from "../../../app/(job-tips-words)/job-layout.module.css"
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Write from "@/app/components/WordTip/wirte-content-popup";
import InfoCard from "@/app/components/WordTip/infoCard-layout";
import Header from "@/app/components/WordTip/header-layout";



export default function Job() {
    const [activeCategory, setActiveCategory] = useState<string>("전체")
    const [showWritePopup, setShowWritePopup] = useState(false)
    const [words, setWords] = useState<any[]>([]) //단어 data 저장할 상태
    const [input, setInput] = useState("")

    const categories = ["전체", "개발", "디자인"];
    const token = localStorage.getItem("token")

    //카테고리별로 카드 보여주는 api 연결
    const handleCategoryClick = async (category: string) => {
        setActiveCategory(category)

        try {
            const response = await axios.get(`http://localhost:5000/words/${category}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setWords(response.data.words)
        } catch (err) {
            console.error('api호출 오류 : ', err)
        }
    }

    useEffect(() => {
        handleCategoryClick('전체')
    }, [])


    //검색 api 연결
    const handleSearch = async (keyword: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/words/search?keyword=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setActiveCategory("검색결과")
            const data = response.data.words
            setWords(data)
            console.log("검색 결과: ", data)
        } catch (err) {
            console.error('검색 API 오류', err)
        }
    }
    // 검색어 변화 감지
    useEffect(() => {
        const timer = setTimeout(() => {
            const trimmed = input.trim()
            if (trimmed) {
                handleSearch(trimmed)
            } else {// 검색어 비엇을때
                handleCategoryClick('전체')
            }
        }, 300)

        return () => clearTimeout(timer) //setTimeout함수 취소
    }, [input])

    return (
        <div className={styles.allContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.searchHeaderContainer}>
                    <Header />
                    <SearchBar
                        title={"단어"}
                        input={input}
                        setInput={setInput}
                    />
                </div>


                {/* 카테고리 / 단어 추가 btn */}
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

                    <span className={styles.addWordsBtn}
                        onClick={() => setShowWritePopup(true)}>
                        단어추가 +
                    </span>
                </div>

                {/* 정보 카드들 */}
                <div className={styles.infoCardContainer}>
                    {words.length > 0 ? (
                        words.map((word) => (
                            <InfoCard
                                key={word.id}
                                title={word.word}
                                detail={word.explanation}
                                width="344px"
                                padding="39px 52px"
                                className="span"
                                gap="0"
                                marginRight="0"
                                category={word.category}
                                contentId={word.id.toString()}
                            />
                        ))
                    ) : (
                        <div className={styles.noneDataFieldContainer}>
                            <p className={styles.noneMsg}>해당 카테고리에 해당하는 직무 팁이 없습니다.</p>
                        </div>
                    )}
                </div>

            </div>
            {/* 작성 팝업 */}
            <div className={styles.popupContainer}>
                {showWritePopup && (
                    <Write
                        mainPlaceholder="단어를"
                        contentPlaceholder="단어의 뜻을"
                        buttonTitle="팁 게시하기"
                        closeOnClick={() => setShowWritePopup(false)}
                    />
                )}
            </div>

        </div >
    )
}