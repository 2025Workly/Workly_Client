import { eventNames } from "process";
import styles from "../../styles/search-bar.module.css"
import { useState } from "react"
interface SearchBarProps {
    onSearch: (query: string) => void,
    title: string
}
export default function SearchBar({ onSearch, title }: SearchBarProps) {
    const [query, setQuery] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery)
        onSearch(newQuery)
    }

    return (
        <div className={styles.searchBarContainer}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={`${title}를 검색해보세요!`}
                className={styles.searchbarInput}>
            </input>
            <img src="/images/search-bar.png" className={styles.searchBarImg}></img>
        </div>
    )
}