import styles from "../styles/write-content-popup.module.css"
import Button from "./button-layout"
import Category from "./category-layout";
import { useState } from "react"
interface PopupProps {
    mainPlaceholder: string,
    contentPlaceholder: string,
    buttonTitle: string,
    closeOnClick: () => void;
}
export default function Write({ mainPlaceholder, contentPlaceholder, closeOnClick, buttonTitle }: PopupProps) {
    const [formData, setFormData] = useState({
        title: "",
        content: ""  //임시(나중에 명세서 보고 수정)
    })
    const [activeCategory, setActiveCategory] = useState('디자인')
    const categories = ["디자인", "개발"]
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value //현재 입력한 필드만 업데이트
        }))
    }
    const handleSubmit = () => {
        //서버
    }
    return (
        <div className={styles.allContainer}>
            <div className={styles.background}></div>
            <img src="/images/close-btn.png" width={28}
                onClick={closeOnClick}
                className={styles.closeBtnImg}></img>

            <form className={styles.formContainer} onSubmit={handleSubmit}>
                {/* 제목(단어, 팁) */}
                <div className={styles.inputContainer}>
                    <input
                        className={styles.inputStyle}
                        type="text" name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder={`${mainPlaceholder} 입력해 주세요!`}
                        required
                    ></input>
                </div>

                {/* 내용 */}
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder={`${contentPlaceholder} 입력해 주세요!`}
                    className={styles.textareaStyle}
                    required
                />
                <div style={{ width: "100%", background: "#E8E8E8", height: "1px", marginTop: "43px" }}></div>

                <div className={styles.selectCategoryContainer}>
                    <h3 className={styles.selectMessage}>카테고리를 선택해주세요!</h3>
                    <div className={styles.categories}>
                        {categories.map((category) => (
                            <Category
                                key={category}
                                type={category}
                                onClick={() => setActiveCategory(category)}
                                isActive={category === activeCategory}
                            />
                        ))}
                    </div>
                </div>
                <Button onClick={handleSubmit} title={buttonTitle} />
            </form>
        </div>
    )
}