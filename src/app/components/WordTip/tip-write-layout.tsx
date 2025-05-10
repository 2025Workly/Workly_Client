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
}

export default function TipWrite({ mainPlaceholder, contentPlaceholder, closeOnClick, buttonTitle }: PopupProps) {
    const [formData, setFormData] = useState({
        tip: "",
        explanation: ""  //임시(나중에 명세서 보고 수정)
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

    //1. 로그인 후 토큰 저장하기
    //2. 저장된 토큰 여기로 불러오기
    const token = process.env.NEXT_PUBLIC_API_TOKEN;   //⬇postman으로 발급받은 임의의 토큰임(수정하기)

    const data = {
        tip: formData.tip,
        explanation: formData.explanation,
        category: activeCategory
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/tips', data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

            console.log("응답 data:", response.data)
            alert('게시 되었어요!')

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