import { useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Active link class
  const activeClass =
    "font-medium tracking-wide text-[#009CFE] border-b-2 border-[#009CFE]";

  const normalClass =
    "font-medium tracking-wide text-gray-700 hover:text-[#005DB5] transition-colors duration-200";

  return (
    <div className="shadow-sm relative">
      <div className="text-black px-4 py-1 mx-auto max-w-11/12 relative">
        <div className="relative flex items-center justify-between">
          <a
            href="/"
            aria-label="ParcelXpress"
            title="ParcelXpress"
            className="inline-flex items-center"
          >
            <img
              className="w-16 h-16 rounded-full"
              src="https://play-lh.googleusercontent.com/J3Ew-toK2n80uS4m85sKELgXNgNZ798HeOlk5iHI99aDccULENBJK4ZuYMyE_68Ye_59"
              alt="Logo"
            />
            <span className="pt-6 text-xl font-semibold tracking-wide uppercase">
              ParcelXpress
            </span>
          </a>

          {/* Desktop Menu */}
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/truckparcel"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                TruckParcel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                About us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex items-center justify-center h-8 px-4 font-medium bg-[#009CFE] text-white"
                    : "inline-flex items-center justify-center h-8 px-4 font-medium bg-[#009CFE] hover:bg-[#005DB5] text-white"
                }
              >
                Login
              </NavLink>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 focus:outline-none focus:ring-2 focus:ring-[#009CFE]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white w-full border-t border-gray-200 shadow-sm absolute left-0 top-[100%] z-40">
          <ul className="flex flex-col items-center space-y-4 py-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-[#009CFE] font-semibold" : "text-gray-700"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/truckparcel"
                className={({ isActive }) =>
                  isActive ? "text-[#009CFE] font-semibold" : "text-gray-700"
                }
              >
                TruckParcel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-[#009CFE] font-semibold" : "text-gray-700"
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-[#009CFE] font-semibold" : "text-gray-700"
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex items-center justify-center h-8 px-4 font-medium bg-[#009CFE] text-white"
                    : "inline-flex items-center justify-center h-8 px-4 font-medium bg-[#009CFE] hover:bg-[#005DB5] text-white"
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
