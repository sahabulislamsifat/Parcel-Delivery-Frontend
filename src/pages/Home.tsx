import Hero from "../components/home/Hero";
import FAQ from "./FAQ";
import TrackParcel from "./TrackParcel";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <Hero />

      {/* TrackParcel Section */}
      <TrackParcel />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Home;
