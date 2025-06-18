// pages/index.js
import Content from "../components/Home/content-layout";
import Image from "next/image";
import styles from "../styles/Home/home-page.module.css";
import BannerSlicer from "../components/Home/banner-layout";

export default function Home() {
  return (
    <div className={styles.allContainer}>
      <BannerSlicer isMain={true} />
      <div
        className={`${styles.card} ${styles.card1}`}
        style={{ marginTop: "60px", alignItems: "center" }}
      >
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
            marginTop: 24,
          }}
        />
        <Image
          src={"/images/icon1.png"}
          alt="calender"
          width={623}
          height={430}
        />
      </div>

      <div className={`${styles.card} ${styles.card2}`}>
        <Image src={"/images/icon1.png"} alt="job" width={430} height={442} />
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
            color: "#424242",
          }}
        />
        <Image src={"/images/icon3.png"} alt="board" width={570} height={302} />
      </div>

      <div className={`${styles.card} ${styles.card4}`}>
        <Image
          src={"/images/icon4.png"}
          alt="mypage"
          width={437}
          height={574}
        />
        <div>
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
              fontWeight: 600,
            }}
          />
        </div>
      </div>
    </div>
  );
}
