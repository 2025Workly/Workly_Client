"use client"
import styled from "styled-components"
import styles from "../../styles/mypage/profile-card.module.css"
import Link from "next/link"

const ModalContainer = styled.div`
position:absolute;
top:350px;
right:21%;
display:flex;
flex-direction: column;
width: 188px;
height: 138px;
flex-shrink: 0;
border-radius: 22px;
background: #FFF;
box-shadow: 0px 4px 33.3px 0px rgba(0, 0, 0, 0.02);
padding:33px 0 0 44px;
`

export default function Modal() {
    return (
        <ModalContainer>
            <span className={styles.save} style={{ marginBottom: "20px" }}>
                <Link href={"/mypage/my-post"}>나의 게시물</Link>
            </span>
            <span className={styles.save}>
                <Link href={"/mypage/save-post"}>저장</Link>
            </span>
        </ModalContainer>
    )
}