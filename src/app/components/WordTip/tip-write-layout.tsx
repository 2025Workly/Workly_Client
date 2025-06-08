import styles from "../../styles/write-content-popup.module.css"
import Button from "../common/button-layout"
import Category from "../common/category-layout";
import axios from "axios";
import { useState } from "react"

interface PopupProps {
    mainPlaceholder: string,
    contentPlaceholder: string,
    buttonTitle: string,
    closeOnClick: () => void;
    onSuccessPost: () => void;
}

export default function TipWrite({ mainPlaceholder, contentPlaceholder, closeOnClick, buttonTitle, onSuccessPost }: PopupProps) {
    const [formData, setFormData] = useState({
        Category: "",
        tip: "",
        explanation: ""
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

    const [show, setShow] = useState(false)

    const token = localStorage.getItem("token");

    const data = {
        tip: formData.tip,
        explanation: formData.explanation,
        category: activeCategory
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/tips', data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

            console.log("응답 data:", response.data)
            onSuccessPost()

        } catch (err) {
            console.error('오류 발생', err)
        }
    }
    return (
        <div className={styles.allContainer}>
            <div className={styles.background}></div>
            <div className={styles.contentContainer}>
                <img src="/images/close-btn.png"
                    onClick={closeOnClick}
                    className={styles.closeBtnImg}></img>

                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    {/* 제목(단어, 팁) */}
                    <div className={styles.inputContainer}>
                        <input
                            className={styles.inputStyle}
                            type="text" name="tip"
                            value={formData.tip}
                            onChange={handleChange}
                            placeholder={`${mainPlaceholder} 입력해 주세요!`}
                            required
                        ></input>
                    </div>

                    {/* 내용 */}
                    <textarea
                        name="explanation"
                        value={formData.explanation}
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
                    <Button title={buttonTitle} />
                </form>
            </div>
        </div>
    )
}