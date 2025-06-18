"use client";
import styles from "../../styles/Home/content.module.css";
import Link from "next/link";
import btnStyles from "../../styles/button-layout.module.css";
import { useState, useEffect, useRef } from "react";

interface ContentTitleProps {
  title: string;
  description: string;
  href: string;
  titleColor: string;
  btnFontColor: string;
  btnBackground: string;
  style?: React.CSSProperties;
}

export default function Content({
  title,
  href,
  description,
  style,
  titleColor,
  btnFontColor,
  btnBackground,
}: ContentTitleProps) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // 한 번만 나타나게
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.allContainer} ${styles.fadeInUp} ${
        isVisible ? styles.show : ""
      }`}
    >
      <div className={styles.messageContainer}>
        <h1 className={styles.title} style={{ color: titleColor }}>
          {title}
        </h1>
        <p className={styles.description} style={{ ...style }}>
          {description}
        </p>
        <Link
          href={href}
          className={btnStyles.GotoBtnContainer}
          style={{ backgroundColor: btnBackground }}
        >
          <span
            style={{
              color: btnFontColor,
              fontSize: "19px",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            바로가기
          </span>
        </Link>
      </div>
    </div>
  );
}
