// pages/index.js
import Content from "../components/Home/content-layout";
import Image from "next/image";
import styles from "../styles/Home/home-page.module.css"
import BannerSlicer from "../components/Home/banner-layout";

import Icon1 from "../../../public/images/icon1.png";
import Icon2 from "../../../public/images/icon2.png";
import Icon3 from "../../../public/images/icon3.png";
import Icon4 from "../../../public/images/icon4.png";

export default function Home() {
  return (
    <div className={styles.allContainer}>
      <BannerSlicer isMain={true} />
      <div className={`${styles.card} ${styles.card1}`} style={{ marginTop: "60px" }}>
        <Content
          title="야근 및 일정관리"
          description={`업무를 편리하게 체크리스트로 관리\n
            하고 야근을 한 날을 체크하여\n
            야근수당을 받아요!`}
          href="/calender"
          titleColor="#FFF"
          btnBackground="#E6E6E6"
          btnFontColor="#3B44E6"
          style={{
            lineHeight: 0.8,
            color: "#DEDEDE",
            marginTop: 24
          }}
        />
        <Image src={Icon1} alt="calender" className={styles.icon1} />
      </div>

      <div className={`${styles.card} ${styles.card2}`}>
        <Image src={Icon2} alt="job" className={styles.icon2} />
        <Content
          title="직무용어와 팁"
          description={`자신에 직무의 용어와 팁에 대해서 알아\n보세요!`}
          href="/job-tips-words"
          titleColor="#000"
          btnFontColor="#FFF"
          btnBackground=""
          style={{
            lineHeight: 1.6,
            color: "#424242",
          }}
        />
      </div>

      <div className={`${styles.card} ${styles.card3}`}>
        <Content
          title="게시판"
          description={`취업, 직장 생활, 인간관계 등 사회초년생\n이 겪는 다양한 고민을 함께 나누는 공간\n입니다. 질문을 올리고, 경험을 공유해 보세요!`}
          href="/notice-board"
          titleColor="#000"
          btnFontColor="#FFF"
          btnBackground=""
          style={{
            lineHeight: 1.6,
            color: "#424242"
          }}
        />
        <Image src={Icon3} alt="board" className={styles.icon3} />
      </div>

      <div className={`${styles.card} ${styles.card4}`}>
        <Image src={Icon4} alt="mypage" className={styles.icon4} />
        <Content
          title="실수령액 계산기"
          description={`월세도 포함하여 더욱 자세한 실수령액을\n 알아보세요!`}
          href="/mypage"
          titleColor="#FFF"
          btnFontColor="#3B44E6"
          btnBackground="#E6E6E6"
          style={{
            lineHeight: 1.5,
            color: "#DEDEDE",
            fontWeight: 600
          }}
        />
      </div>


    </div>
  );
}
