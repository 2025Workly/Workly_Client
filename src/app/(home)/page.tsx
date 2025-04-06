// pages/index.js
import Content from "../components/Home/content-layout";
import Image from "next/image";
import styles from "../styles/Home/home-page.module.css"
import HomeLogo from "../../../public/images/testLogo.png"
export default function Home() {
  return (
    <div className={styles.allContainer}>

      <div className={`${styles.card} ${styles.card1}`}>
        <Content
          title="야근 및 일정관리"
          description={`업무를 편리하게 체크리스트로 관리\n
            하고 야근을 한 날을 체크하여\n
            야근수당을 받아요!`}
          href="/calender"
          lineHeight={0.8}
        />
        <Image src={HomeLogo} alt="calender" />
      </div>

      <div className={`${styles.card} ${styles.card2}`}>
        <Image src={HomeLogo} alt="job" />
        <Content
          title="직무용어와 팁"
          description={`자신에 직무의 용어와 팁에 대해서 알아\n보세요!`}
          href="/job-tips-words"
          lineHeight={1.6}
        />
      </div>

      <div className={`${styles.card} ${styles.card3}`}>
        <Content
          title="게시판"
          description={`취업, 직장 생활, 인간관계 등 사회초년생\n이 겪는 다양한 고민을 함께 나누는 공간\n입니다. 질문을 올리고, 경험을 공유해 보세요!`}
          href="/notice-board"
          lineHeight={1.6}
        />
        <Image src={HomeLogo} alt="board" />
      </div>

      <div className={`${styles.card} ${styles.card4}`}>
        <Content
          title="실수령액 계산기"
          description={`월세도 포함하여 더욱 자세한 실수령액을\n 알아보세요!`}
          href="/mypage"
          lineHeight={1.5}
        />
        <Image src={HomeLogo} alt="mypage" />
      </div>


    </div>
  );
}
