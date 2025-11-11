import { FaTruck, FaUsers, FaGlobe } from "react-icons/fa";

const About = () => {
  return (
    <div
      data-aos="fade-zoom-up"
      data-aos-easing="ease-in-back"
      data-aos-delay="100"
      data-aos-offset="0"
      className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 dark:bg-gray-900 dark:text-gray-100"
    >
      {/* Header Section */}
      <div className="max-w-xl sm:mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
          About <span className="text-[#009CFE]">ParcelXpress</span>
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          We deliver parcels seamlessly across Bangladesh. Our mission is to
          make sending, tracking, and managing shipments simple and reliable.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 shadow-sm transition duration-300 hover:shadow-lg">
          <FaTruck className="text-[#009CFE] w-12 h-12 mb-4 transition-colors duration-300 hover:text-[#005DB5]" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Fast Delivery
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Our logistics network ensures your parcels reach their destination
            quickly and safely.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 shadow-sm transition duration-300 hover:shadow-lg">
          <FaUsers className="text-[#009CFE] w-12 h-12 mb-4 transition-colors duration-300 hover:text-[#005DB5]" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Trusted by Thousands
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Thousands of customers trust ParcelXpress for hassle-free shipping
            and reliable support.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 shadow-sm transition duration-300 hover:shadow-lg">
          <FaGlobe className="text-[#009CFE] w-12 h-12 mb-4 transition-colors duration-300 hover:text-[#005DB5]" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Nationwide Coverage
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            We cover all major cities and towns in Bangladesh, ensuring you can
            send parcels anywhere.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Our Story
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          ParcelXpress started with a vision to simplify logistics for everyone.
          We combine technology and a dedicated team to offer a seamless
          shipping experience across Bangladesh.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Whether you are a business sending multiple parcels or an individual,
          we make sure your package is handled with care and delivered on time.
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <a
          href="/track"
          className="inline-block px-6 py-3 font-semibold text-white transition duration-300"
          style={{ backgroundColor: "#009CFE" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#005DB5")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#009CFE")
          }
        >
          Track Your Parcel
        </a>
      </div>
    </div>
  );
};

export default About;
