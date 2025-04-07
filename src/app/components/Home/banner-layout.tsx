"use client";
import styles from "../../styles/Home/banner-layout.module.css";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import Banner1 from "../../../../public/images/testBanner1.png";
import Banner2 from "../../../../public/images/testBanner2.png";
import Banner3 from "../../../../public/images/testBanner3.png";

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
                {/* 왼쪽 */}
                <Image
                    src={banners[getPrevIndex()]}
                    alt="Previous Banner"
                    className={`${styles.bannerImage} ${styles.sub}`}
                />
                {/* 가운데 */}
                <Image
                    src={banners[currentIndex]}
                    alt="Main Banner"
                    className={`${styles.bannerImage} ${styles.main}`}
                />
                {/*오른쪽 */}
                <Image
                    src={banners[getNextIndex()]}
                    alt="Next Banner"
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
