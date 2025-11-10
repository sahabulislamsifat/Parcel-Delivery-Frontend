/* eslint-disable @typescript-eslint/ban-ts-comment */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// @ts-ignore - module may not have type declarations in this project
import "swiper/css";
// @ts-ignore - module may not have type declarations in this project
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import carouselOne from "../../assets/images/carousel-one.jpg";
import carouselTwo from "../../assets/images/carousel-two.webp";
import carouselThree from "../../assets/images/carousel-three.webp";
import carouselFour from "../../assets/images/carousel-four.jpg";
import carouselFive from "../../assets/images/carousel-five.jpg";
import carouselSix from "../../assets/images/carousel-six.jpg";
import carouselSeven from "../../assets/images/carousel-seven.jpg";
import carouselEight from "../../assets/images/carousel-eight.jpg";
import carouselNine from "../../assets/images/carousel-nine.webp";
import Slide from "./Slide";

const Carousel = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 w-full">
      <div className="w-full max-w-[100vw] overflow-hidden">
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper w-full h-[600px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px]"
        >
          <SwiperSlide>
            <Slide
              image={carouselOne}
              text="Fast, Secure & Reliable Parcel Delivery Across Bangladesh"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={carouselTwo}
              text="Send or Receive Parcels with Real-Time Tracking"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={carouselThree}
              text="Smart Dashboard for Senders, Receivers & Admins"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={carouselFour}
              text="Track Your Parcel Anytime, Anywhere"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={carouselFive}
              text="Stay Updated with Live Delivery Status Logs"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={carouselSix}
              text="Simple, Secure, and Role-Based Parcel Management"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={carouselSeven}
              text="Empowering Businesses with Reliable Courier Solutions"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={carouselEight}
              text="Deliver Happiness — One Parcel at a Time"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={carouselNine}
              text="ParcelXpress — Connecting Senders & Receivers Seamlessly"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
