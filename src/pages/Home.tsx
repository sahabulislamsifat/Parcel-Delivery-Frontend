import Hero from "../components/home/Hero";
import FAQ from "./FAQ";
import TrackParcel from "./TrackParcel";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero></Hero>
      {/* TrackParcel Section */}
      <TrackParcel></TrackParcel>
      {/* FAQ Section */}
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
