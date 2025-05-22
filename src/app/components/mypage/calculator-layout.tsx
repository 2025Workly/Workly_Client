"use client"
import styles from "../../styles/mypage/calculator.module.css"
import { useState } from "react"
import Image from "next/image"
import plusBtn from "../../../../public/images/plusButton.png"
import minusBtn from "../../../../public/images/minusButton.png"
import ResultField from "./result-layout"
import { label, p } from "framer-motion/client"
import PlusMinusBtn from "./plust-minus-btn"
import Button from "../common/button-layout"
import NextBtn from "../../../../public/images/nextbtn.png"
import { useRef } from "react"

export default function Calculator() {
    const [money, setMoney] = useState(0) //세전 월급
    const [houseRent, setHouseRent] = useState(0)
    const [taxFree, setTaxFree] = useState(0) //비과세
    const [numKids, setNumKids] = useState(0)
    const [numFamily, setNumFamily] = useState(1)
    const [result, setResult] = useState(
        {
            nationalPension: 0,
            health: 0, care: 0, jobInsurance: 0, incomeTax: 0,
            localTax: 0, totalTax: 0, realTakeHome: 0
        }
    )
    const resultRef = useRef<HTMLDivElement>(null);
    const scrollTo = () => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    const calcTax = () => {
        const nationalPension = money * 0.045;
        const health = money * 0.035;
        const care = health * 0.12;
        const jobInsurance = money * 0.009;
        const incomeTax = money * 0.03;
        const localTax = incomeTax * 0.1;

        const totalTax = nationalPension + health + care + jobInsurance + incomeTax + localTax;
        const realTakeHome = money - totalTax - houseRent;

        setResult({
            nationalPension, health, care, jobInsurance,
            incomeTax, localTax, totalTax, realTakeHome
        })
        scrollTo();
    }

    const resetAll = () => {
        setMoney(0)
        setHouseRent(0)
        setTaxFree(0)
        setNumFamily(1)
        setNumKids(0)
        setResult({
            nationalPension: 0, health: 0, care: 0,
            jobInsurance: 0, incomeTax: 0, localTax: 0, totalTax: 0, realTakeHome: 0
        })
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const clickMinusBtn = () => {
        if (numFamily > 0) {
            setNumFamily(numFamily - 1)
        }
    }
    const clickMinusBtnCh = () => {
        if (numKids > 0) {
            setNumKids(numKids - 1)
        }
    }

    function formatComma(value: number | string) {
        if (value === "") return ""
        const num = typeof value === "number" ? value : Number(value.replace(",", ""))
        return num.toLocaleString();
    }


    const inputField = [
        { label: "월 실수령액", value: formatComma(money), setValue: setMoney },
        { label: "월세", value: formatComma(houseRent), setValue: setHouseRent },
        { label: "비과세액", value: formatComma(taxFree), setValue: setTaxFree },
    ]
    const resultList = [
        { label: "국민연금", value: formatComma(result.nationalPension) },
        { label: "건강보험", value: formatComma(result.health) },
        { label: "장기요양", value: formatComma(result.care) },
        { label: "고용보험", value: formatComma(result.jobInsurance) },
        { label: "소득세", value: formatComma(result.incomeTax) },
        { label: "지방소득세", value: formatComma(result.localTax) },
        { label: "총 공제액", value: formatComma(result.totalTax) },
    ];

    const plusMinusBtnList = [
        { title: "20세 이하 자녀 수", setNumPlus: () => setNumKids(numKids + 1), setNumMinus: clickMinusBtnCh, numValue: numKids },
        { title: "부양 가족 수(본인포함)", setNumPlus: () => setNumFamily(numFamily + 1), setNumMinus: clickMinusBtn, numValue: numFamily },
    ]



    return (
        <div className={styles.allContainer}>
            <p className={styles.titleHeader}>실수령액 계산기</p>
            <div className={styles.inputCalcContainer}>


                {inputField.map((field, index) => (
                    <label key={index}>
                        <p className={styles.label}>{field.label}</p>
                        <div style={{ display: "flex" }}>
                            <input

                                className={styles.input}
                                type="text"
                                value={field.value}
                                onChange={(e: any) => {
                                    const row = e.target.value.replace(",", "")
                                    const numberValue = Number(row) || 0
                                    field.setValue(numberValue)
                                }}
                                required
                            />
                            <p className={styles.resultMoney}>원</p>
                        </div>
                    </label>
                ))}

                <div style={{ display: "flex", gap: "304px", margin: "104px 0 140px 0" }}>
                    <div>
                        <PlusMinusBtn
                            title={plusMinusBtnList[0].title}
                            setNumPlus={plusMinusBtnList[0].setNumPlus}
                            setNumMinus={plusMinusBtnList[0].setNumMinus}
                            numValue={plusMinusBtnList[0].numValue}
                        />
                    </div>
                    <div>
                        <PlusMinusBtn
                            title={plusMinusBtnList[1].title}
                            setNumPlus={plusMinusBtnList[1].setNumPlus}
                            setNumMinus={plusMinusBtnList[1].setNumMinus}
                            numValue={plusMinusBtnList[1].numValue}
                        />
                    </div>

                </div>
                <Button title={"계산하기"} onClick={calcTax} />
            </div>

            <div style={{
                margin: "31px auto 50px auto", display: "flex",
                justifyContent: "center"
            }}>
                <Image src={NextBtn} width={30} height={30} />
            </div>
            <div className={styles.resultContainer} ref={resultRef}>
                <p className={styles.monthText}>한 달 기준 공제액</p>
                <p className={styles.line}></p>
                <div className={styles.resultList}>
                    {resultList.map((item) => (
                        <ResultField
                            key={item.label}
                            value={item.label}
                            resultWon={item.value}
                            className={"resultMoney"}
                        />
                    ))}

                    <div className={styles.bottomLine}></div>
                    <div className={styles.result}>
                        <p className={styles.monthResultMoney}>예상 실수령액(월)</p>
                        <div style={{ display: "flex" }}>
                            <p className={styles.FinalresultWon}>{formatComma(result.realTakeHome)}</p>
                            <p className={styles.FinalresultWon} style={{ fontSize: "26px" }}>원</p>
                        </div>
                    </div>
                    <Button title={"초기화"} onClick={resetAll} />
                </div>

            </div>
        </div>
    )
}