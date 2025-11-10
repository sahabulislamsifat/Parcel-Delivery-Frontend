import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Lottie from "lottie-react";
import faqImage from "@/assets/lottie-animation/FAQ.json"; // 🧩 Adjust the path based on your folder structure

const faqItems = [
  {
    question: "How can I send a parcel with ParcelXpress?",
    answer:
      "You can easily send a parcel by creating an account, entering the delivery details, and scheduling a pickup from your dashboard. Our delivery agents will handle the rest.",
  },
  {
    question: "How do I track my shipment?",
    answer:
      "Go to the “Track Parcel” page and enter your tracking ID. You’ll get real-time updates on your parcel’s current location and estimated delivery time.",
  },
  {
    question: "What areas does ParcelXpress deliver to?",
    answer:
      "ParcelXpress currently delivers across all major cities and districts in Bangladesh. We’re constantly expanding to cover more areas.",
  },
  {
    question: "What should I do if my parcel is delayed or lost?",
    answer:
      "You can contact our support team directly through the “Support” page or email us at support@parcelxpress.com. Our team will assist you promptly.",
  },
  {
    question: "Does ParcelXpress offer same-day delivery?",
    answer:
      "Yes! We offer same-day and next-day delivery options within select cities. Delivery speed may vary depending on the pickup and destination locations.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-16 transition-colors duration-300">
      <div className="w-11/12 max-w-7xl mx-auto px-4 md:px-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 md:text-lg">
            Everything you need to know about sending, tracking, and managing
            your parcels with ParcelXpress.
          </p>
        </div>

        {/* FAQ Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left: Lottie Animation */}
          <div className="md:w-1/2 w-full">
            <Lottie
              animationData={faqImage}
              className="w-full max-w-md mx-auto"
            />
          </div>

          {/* Right: FAQ Accordion */}
          <div className="md:w-1/2 w-full space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className=" p-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full font-medium text-lg text-gray-800 dark:text-slate-200"
                >
                  {item.question}
                  {openIndex === index ? (
                    <ChevronUp
                      className="text-gray-500 dark:text-slate-400"
                      size={22}
                    />
                  ) : (
                    <ChevronDown
                      className="text-gray-500 dark:text-slate-400"
                      size={22}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-gray-600 text-sm dark:text-slate-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
