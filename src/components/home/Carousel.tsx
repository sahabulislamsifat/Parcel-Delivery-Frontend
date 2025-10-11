// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
    <div>
      <div className="container px-6 py-10 mx-auto">
        <Swiper
          spaceBetween={30}
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
          className="mySwiper"
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
