"use client";
import styles from "../../styles/Home/banner-layout.module.css";
import React, { useState } from "react";
import Image from "next/image";

interface BannerSlicerProps {
  isMain: boolean;
}

const banners = [
  "/images/Banner1.jpg",
  "/images/Banner2.jpg",
  "/images/Banner3.png",
];

export default function BannerSlicer({ isMain }: BannerSlicerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = banners.length;

  return (
    <div className={styles.bannerSlider}>
      <div className={styles.bannerContainer}>
        <Image
          src={banners[(currentIndex - 1 + total) % total]}
          alt="Prev"
          width={500}
          height={300}
          className={`${styles.bannerImage} ${styles.sub}`}
        />
        <Image
          src={banners[currentIndex]}
          alt="Current"
          width={500}
          height={300}
          className={`${styles.bannerImage} ${styles.main}`}
          priority={true} // 메인 이미지는 LCP 개선용으로 우선 로드
        />
        <Image
          src={banners[(currentIndex + 1) % total]}
          alt="Next"
          width={500}
          height={300}
          className={`${styles.bannerImage} ${styles.sub}`}
        />
      </div>

      <div className={styles.indicatorContainer}>
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.indicator} ${
              currentIndex === idx ? styles.activeIndicator : ""
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
