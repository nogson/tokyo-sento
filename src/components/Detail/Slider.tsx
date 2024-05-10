import React from "react";
import Image from "next/image";
import styles from "@/components/Detail/Slider.module.scss";
import { Carousel } from "@mantine/carousel";


interface SliderProps {
  // Define your props here
}

const Slider: React.FC<SliderProps> = (props) => {
  // Implement your component logic here

  return (
    <div className={styles.slider}>
      <Carousel loop align="start">
        <Carousel.Slide>
          <div className={styles.sliderItem}>
            <Image
              className="h-auto w-full"
              src="/assets/images/detail/detail_image01.png"
              alt="Search"
              width={0}
              height={0}
              sizes="100vw"
              priority
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className={styles.sliderItem}>
            <Image
              className="h-auto w-full"
              src="/assets/images/detail/detail_image01.png"
              alt="Search"
              width={0}
              height={200}
              sizes="100vw"
              priority
            />
          </div>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
};

export default Slider;
