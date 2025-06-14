import CategoryBox from "./category-box"
import styles from "../../styles/board/board.module.css"

type CategoryProps  = {
    tag : string,
    title : string,
    userId : string,
    onClick : () => void;
}

export default function BorderBox({ tag, title, userId, onClick } : CategoryProps ) {
    return (
        <div className={styles.borderbox} onClick={onClick}>
            <CategoryBox tag={tag}/>
            <div className={styles.title}>{title}</div>
            <div className={styles.name}>{userId}</div>
        </div>
    );
}