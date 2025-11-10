/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
// @ts-ignore - module may not have type declarations in this project
import "swiper/css";
// @ts-ignore - module may not have type declarations in this project
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { useGetAllReceiversQuery } from "@/redux/features/users/usersApi";

const fallbackTestimonials = [
  "ParcelPro made sending my packages super easy! The tracking updates were instant, and I love the clean dashboard.",
  "Delivery was fast and seamless. I could confirm my parcel arrival with just one click. Highly recommended!",
  "As an online seller, I rely on ParcelPro daily. Their system is reliable, and the admin team is super responsive!",
  "Excellent experience! I got regular delivery updates and great customer support.",
  "ParcelPro is my go-to courier service — safe, quick, and professional!",
];

const Testimonial = () => {
  const { data, isLoading, isError } = useGetAllReceiversQuery(undefined);

  // Safely extract user list
  const users = data?.data?.data || data?.data || [];

  return (
    <section className="dark:bg-[#101828] py-16 px-4 md:px-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Hear from real customers who use our parcel delivery system daily.
        </p>

        {/* Loading & Error States */}
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : isError ? (
          <p className="text-red-500">Failed to load testimonials.</p>
        ) : (
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
            {(Array.isArray(users) ? users.slice(0, 6) : []).map(
              (user: any, idx: number) => (
                <SwiperSlide key={user._id || idx}>
                  <div className="bg-white dark:bg-[#101828] rounded-[2px] shadow-sm p-6 mx-3 flex flex-col items-center justify-between transition-all hover:shadow-md duration-300 mb-2 h-[340px]">
                    <div className="flex flex-col items-center">
                      <FaQuoteLeft className="text-indigo-500 text-3xl mb-3" />
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 leading-relaxed line-clamp-5">
                        {
                          fallbackTestimonials[
                            idx % fallbackTestimonials.length
                          ]
                        }
                      </p>
                    </div>

                    <div className="flex flex-col items-center mt-auto">
                      <img
                        src={
                          user?.profileImage ||
                          `https://randomuser.me/api/portraits/${
                            idx % 2 === 0 ? "men" : "women"
                          }/${idx + 20}.jpg`
                        }
                        alt={user?.name || "User"}
                        className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-indigo-500"
                      />
                      <h4 className="text-gray-800 dark:text-white font-semibold capitalize">
                        {user?.name || "Anonymous User"}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Receiver
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
