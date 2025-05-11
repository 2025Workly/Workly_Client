"use client"
import styles from "../../styles/mypage/salary-calculator.module.css"
import Button from "../common/button-layout"
import InputAmount from "./input-amount-layout"
import FamilyCount from "./family-count-layout"
import ResultCount from "./result-count-layout"
import styled from "styled-components"

const SeverancePayText = styled.p`
color: #000; 
font-size: 25px; 
font-weight: 500; 
margin-bottom:19px;
`

const LabelText = styled.label`
color: #424242; 
font-size: 21px; 
font-weight: 500; 
margin : 0 21px 0 14px;
`
export default function Calculator() {
    const amountValue = ["월 실수령액", "월세", "비과세액"]
    const familyValue = ["20세 이하 자녀 수", "부양 가족 수(본인포함)"]

    return (
        <div>
            <div className={styles.calculateInputContainer}>
                <SeverancePayText>퇴직금</SeverancePayText>
                <input type="checkbox" />
                <LabelText>포함</LabelText>
                <input type="checkbox" />
                <LabelText>미포함</LabelText>

                <div className={styles.inputMoney}>
                    {amountValue.map((value) => (
                        <InputAmount
                            mountType={value}
                        />
                    ))}
                </div>

                <div className={styles.familyCount}>
                    {familyValue.map((item) => (
                        <FamilyCount
                            title={item}
                        />
                    ))}
                </div>


                <Button
                    title="계산하기"
                />
            </div>

            <img src="/images/nextbtn.png"
                style={{ margin: "31px auto", display: "flex" }} />


        </div>
    )
}