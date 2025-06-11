import styles from "../../styles/board/board-main.module.css"

type tagButtonProps = {
    type : string,
    onClick: ()=> void,
    isActive: boolean
    
}

export default function TagButton({type, onClick, isActive} : tagButtonProps) {
    return (
            <div 
             className={`${styles.tag_button} ${isActive ? styles.click : styles.default}`}
             onClick={onClick}
             >{type}</div>
    )
}