/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const Item = ({ title, children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <button
        type="button"
        aria-label="Toggle FAQ item"
        title="Toggle FAQ item"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </p>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 text-gray-600 dark:text-gray-300 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="2,7 12,17 22,7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-gray-600 dark:text-gray-400">{children}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <div className="px-4 py-16 mx-auto w-11/12 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          {/* Heading */}
          <div className="max-w-xl mb-10 text-center md:mx-auto md:mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 md:text-lg">
              Everything you need to know about sending, tracking, and managing
              your parcels with ParcelXpress.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            <Item title="How can I send a parcel with ParcelXpress?">
              You can easily send a parcel by creating an account, entering the
              delivery details, and scheduling a pickup from your dashboard. Our
              delivery agents will handle the rest.
            </Item>

            <Item title="How do I track my shipment?">
              Go to the “Track Parcel” page and enter your tracking ID. You’ll
              get real-time updates on your parcel’s current location and
              estimated delivery time.
            </Item>

            <Item title="What areas does ParcelXpress deliver to?">
              ParcelXpress currently delivers across all major cities and
              districts in Bangladesh. We’re constantly expanding to cover more
              areas.
            </Item>

            <Item title="What should I do if my parcel is delayed or lost?">
              You can contact our support team directly through the “Support”
              page or email us at{" "}
              <span className="text-[#009CFE] dark:text-[#33B7FF] font-medium">
                support@parcelxpress.com
              </span>
              . Our team will assist you in resolving the issue promptly.
            </Item>

            <Item title="Does ParcelXpress offer same-day delivery?">
              Yes! We offer same-day and next-day delivery options within select
              cities. Delivery speed may vary depending on the pickup and
              destination locations.
            </Item>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
