/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router";

const Slide = ({ image, text }: any) => {
  return (
    <div>
      <div
        className="w-full bg-center bg-cover h-[38rem]"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
          <div className="text-center px-4">
            <h1 className="text-3xl font-semibold text-gray-200 lg:text-5xl leading-snug">
              {text}
            </h1>
            <br />
            <Link
              to="/login"
              className="px-6 py-3 text-sm font-medium text-gray-200 capitalize transition-colors duration-300 transform bg-[#009CFE] hover:bg-[#005DB5] focus:outline-none focus:ring-2 focus:ring-[#009CFE]"
            >
              Get Started with ParcelXpress
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
