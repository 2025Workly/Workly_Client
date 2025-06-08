"use client";
import styles from "../../styles/Home/banner-layout.module.css";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import Banner1 from "../../../../public/images/Banner1.jpg";
import Banner2 from "../../../../public/images/Banner2.jpg";
import Banner3 from "../../../../public/images/Banner3.png";

interface BannerSlicerProps {
    isMain: boolean;
}

export default function BannerSlicer({ isMain }: BannerSlicerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const banners: StaticImageData[] = [Banner1, Banner2, Banner3];
    const total = banners.length;

    const getPrevIndex = () => (currentIndex - 1 + total) % total;
    const getNextIndex = () => (currentIndex + 1) % total;

    return (
        <div className={styles.bannerSlider}>
            <div className={styles.bannerContainer}>
                <Image
                    src={banners[(currentIndex - 1 + banners.length) % banners.length]}
                    alt="Prev"
                    className={`${styles.bannerImage} ${styles.sub}`}
                />
                <Image
                    src={banners[currentIndex]}
                    alt="Current"
                    className={`${styles.bannerImage} ${styles.main}`}
                />
                <Image
                    src={banners[(currentIndex + 1) % banners.length]}
                    alt="Next"
                    className={`${styles.bannerImage} ${styles.sub}`}
                />
            </div>

            <div className={styles.indicatorContainer}>
                {banners.map((_, idx) => (
                    <button
                        key={idx}
                        className={`${styles.indicator} ${currentIndex === idx ? styles.activeIndicator : ""}`}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </div>
        </div>

    );
}
