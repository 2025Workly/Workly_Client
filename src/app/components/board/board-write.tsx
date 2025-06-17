import { useState } from "react";
import axios from "axios";
import styles from "../../styles/write-content-popup.module.css";

type PopupProps = {
  closeOnClick: () => void;
  onSuccessPost: () => void;
};

export default function BoardWrite({
  closeOnClick,
  onSuccessPost,
}: PopupProps) {
  const [form, setForm] = useState({
    tag: "질문", // 기본값 설정
    title: "",
    content: "",
  });

  const tagList = ["질문", "고민"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      tag: e.target.value,
    }));
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      tag: form.tag,
      title: form.title,
      content: form.content,
    };

    try {
      const response = await axios.post("http://43.201.95.2/board", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("응답 data:", response.data);
      onSuccessPost();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.background}></div>
      <div className={styles.contentContainer}>
        <img
          src="/images/close-btn.png"
          onClick={closeOnClick}
          className={styles.closeBtnImg}
        ></img>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputStyle}
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="제목을 입력해 주세요!"
              required
            />
          </div>

          <textarea
            className={styles.textareaStyle}
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="내용을 입력해 주세요!"
            required
          />

          <div
            style={{
              width: "100%",
              background: "#E8E8E8",
              height: "1px",
              marginTop: "43px",
            }}
          ></div>

          <div className={styles.selectCategoryContainer}>
            <h3 className={styles.selectMessage}>카테고리를 선택해주세요!</h3>
            <div className={styles.categories}>
              {tagList.map((item) => (
                <label
                  key={item}
                  className={styles.checkBoxInput}
                  style={{ marginRight: "10px" }}
                >
                  <input
                    className={styles.radioBox}
                    type="radio"
                    name="tag"
                    value={item}
                    checked={form.tag === item}
                    onChange={handleTagChange}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <button className={styles.tipWriteBtn}>게시판에 올리기</button>
        </form>
      </div>
    </div>
  );
}
