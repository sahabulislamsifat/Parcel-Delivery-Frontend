import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 dark:bg-[#101828] dark:text-gray-300 dark:border-gray-700 transition-colors duration-300">
      <div className="px-4 pt-16 mx-auto w-[95%] sm:w-11/12 ">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {/* Links section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 row-gap-8 lg:col-span-4">
            <div>
              <p className="font-medium tracking-wide text-black dark:text-white">
                Services
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/track"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Track Parcel
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    My Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Pricing & Plans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide text-black dark:text-white">
                Company
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide text-black dark:text-white">
                Resources
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide text-black dark:text-white">
                Support
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/help"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Contact Support
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@parcelxpress.com"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base break-all"
                  >
                    support@parcelxpress.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+8801632165523"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    +880 1632 165 523
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Branding & social */}
          <div className="md:max-w-md lg:col-span-2 sm:col-span-2 col-span-1">
            <div className="flex flex-col sm:flex-row sm:items-center mb-4">
              <img
                src="https://play-lh.googleusercontent.com/J3Ew-toK2n80uS4m85sKELgXNgNZ798HeOlk5iHI99aDccULENBJK4ZuYMyE_68Ye_59"
                alt="ParcelXpress Logo"
                className="w-10 h-10 mx-auto sm:mx-0"
              />
              <span className="mt-2 sm:mt-0 sm:ml-2 text-2xl font-bold text-black dark:text-white text-center sm:text-left">
                ParcelXpress
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base text-center sm:text-left">
              Delivering parcels seamlessly across Bangladesh. Send, track, and
              manage every shipment from one smart dashboard.
            </p>
            <div className="mt-6 flex justify-center sm:justify-start space-x-4">
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400 transition-colors duration-300"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500 transition-colors duration-300"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-200 dark:border-gray-700 sm:flex-row text-center sm:text-left space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} ParcelXpress. All rights reserved.
          </p>
          <div className="flex justify-center sm:justify-end items-center space-x-4">
            <a
              href="/terms"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm"
            >
              Privacy
            </a>
            <a
              href="/contact"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 text-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
