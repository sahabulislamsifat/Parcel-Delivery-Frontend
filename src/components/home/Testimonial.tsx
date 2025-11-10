/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
// @ts-ignore - module may not have type declarations in this project
import "swiper/css";
// @ts-ignore - module may not have type declarations in this project
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sadia Akter",
    role: "Regular Sender",
    image:
      "https://thumbs.dreamstime.com/z/experience-pride-patriotism-as-bangladeshi-girl-waves-vibrant-flag-bengal-each-wave-symbolizes-resilience-323380574.jpg",
    message:
      "ParcelPro made sending my packages super easy! The tracking updates were instant, and I love the clean dashboard.",
  },
  {
    name: "Tanvir Hasan",
    role: "Receiver",
    image:
      "https://i.pinimg.com/736x/d2/56/47/d256473aa68d8976500eadd1d2e87f0f.jpg",
    message:
      "Delivery was fast and seamless. I could confirm my parcel arrival with just one click. Highly recommended!",
  },
  {
    name: "Mithila Rahman",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    message:
      "As an online seller, I rely on ParcelPro daily. Their system is reliable, and the admin team is super responsive!",
  },
  {
    name: "Arif Chowdhury",
    role: "Regular Sender",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    message:
      "I trust ParcelPro for my weekly shipments. Excellent service and real-time tracking make it effortless.",
  },
  {
    name: "Nusrat Jahan",
    role: "Receiver",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    message:
      "Receiving parcels has never been easier. Notifications and updates are very accurate and timely.",
  },
  {
    name: "Imran Hossain",
    role: "Business Client",
    image:
      "https://thumbs.dreamstime.com/b/wild-foggy-lonely-morning-wild-foggy-lonely-morning-nature-bangladesh-riverside-157099768.jpg",
    message:
      "ParcelPro handles our corporate deliveries efficiently. Their dashboard and reporting are top-notch.",
  },
  {
    name: "Farzana Ali",
    role: "Regular Sender",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    message:
      "Scheduling pickups and tracking deliveries is very simple. I recommend ParcelPro to everyone.",
  },
  {
    name: "Rafique Islam",
    role: "Receiver",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    message:
      "I always get my packages on time. The staff is courteous, and the system is easy to navigate.",
  },
  {
    name: "Shumi Rahman",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    message:
      "Using ParcelPro for my online business has boosted my efficiency. Reliable and fast service!",
  },
  {
    name: "Joynal Abedin",
    role: "Regular Sender",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    message:
      "ParcelPro’s dashboard is clean, and updates are immediate. I feel confident sending parcels anytime.",
  },
];

const Testimonial = () => {
  return (
    <section className="dark:bg-[#101828] py-16 px-4 md:px-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Hear from real customers who use our parcel delivery system daily.
        </p>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white dark:bg-[#101828] rounded-[2px] shadow-sm p-6 mx-3 flex flex-col items-center justify-between transition-all hover:shadow-md duration-300 mb-10 h-[340px]">
                <div className="flex flex-col items-center">
                  <FaQuoteLeft className="text-indigo-500 text-3xl mb-3" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 leading-relaxed line-clamp-5">
                    {t.message}
                  </p>
                </div>

                <div className="flex flex-col items-center mt-auto">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-indigo-500"
                  />
                  <h4 className="text-gray-800 dark:text-white font-semibold capitalize">
                    {t.name}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t.role}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
