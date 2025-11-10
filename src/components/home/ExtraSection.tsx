import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import Lottie from "lottie-react";
import deliveryAnimation from "@/assets/lottie-animation/Motorcycle-delivery.json";

const ExtraSection = () => {
  return (
    <section className="relative py-16 px-6 md:px-12 text-center dark:bg-[#101828] transition-colors duration-300">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-snug">
        Join the <span className="text-indigo-600">ParcelXpress</span>{" "}
        community. <br className="hidden md:block" />
        <span className="text-indigo-500">Deliver Faster.</span> Stay Connected.
        Earn Trust.
      </h2>

      {/* Animated Lottie Section */}
      <motion.div
        className="relative mt-10 flex justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Lottie
          animationData={deliveryAnimation}
          className="w-full h-96 max-w-3xl"
        />
      </motion.div>

      {/* Sub Description */}
      <p className="mt-6 text-gray-700 text-lg dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Empowering thousands of senders, receivers, and businesses every day.
        ParcelXpress connects people across Bangladesh through fast, secure, and
        transparent deliveries. Track, manage, and deliver — all in one seamless
        experience.
      </p>

      {/* Scrolling Text Marquee */}
      <Marquee
        speed={50}
        gradient={false}
        className="mt-10 bg-gradient-to-r from-indigo-100 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-4 border-t border-b border-gray-200 dark:border-gray-700"
      >
        <span className="mx-10 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Fast Delivery
        </span>
        <span className="mx-10 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Reliable Service
        </span>
        <span className="mx-10 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Real-Time Tracking
        </span>
        <span className="mx-10 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Customer Satisfaction
        </span>
        <span className="mx-10 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Nationwide Coverage
        </span>
        <span className="mx-10 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Trusted by Thousands
        </span>
      </Marquee>
    </section>
  );
};

export default ExtraSection;
