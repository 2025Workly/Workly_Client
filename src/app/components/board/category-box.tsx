import styles from "../../styles/board/tag.module.css";

type CategoryBoxProps = {
    tag : string
}

export default function CategoryBox({ tag } : CategoryBoxProps) {
    return (
        <div
        className={styles.tag}
        style={tag==="고민" ? {backgroundColor: "#356EFF"} : {backgroundColor: "#FF4747"}}>
            {tag}
        </div>
    )
}
