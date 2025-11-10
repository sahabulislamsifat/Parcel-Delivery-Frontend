import Hero from "@/components/home/Hero";
import WhyChooseUs from "./WhyChooseUs";
import TrackParcel from "./TrackParcel";
import ExtraSection from "@/components/home/ExtraSection";
import Testimonial from "@/components/home/Testimonial";
import FAQ from "./FAQ";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us Section (features + stats) */}
      <WhyChooseUs />

      {/* Track Parcel Section */}
      <TrackParcel />

      {/* Extra / Community Section */}
      <ExtraSection />

      {/* Testimonial Section */}
      <Testimonial />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Home;
