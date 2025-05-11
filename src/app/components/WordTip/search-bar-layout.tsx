"use client"
import styles from "../../styles/search-bar.module.css"
import { useState, useEffect } from "react"
interface SearchBarProps {
    title: string;
    input: string;
    setInput: (value: string) => void;
}

export default function SearchBar({ title, input, setInput }: SearchBarProps) {
    return (
        <div className={styles.searchBarContainer}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`${title}를 검색해보세요!`}
                className={styles.searchbarInput}>
            </input>
            <img src="/images/search-bar.png" className={styles.searchBarImg}></img>
        </div>
    )
}