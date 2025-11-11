import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import ModeToggle from "./ModeToggle";
import {
  useUserInfoQuery,
  useLogoutMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hook";
import { authApi } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { role } from "@/constants/role";

// 🔹 Helper: return dashboard route based on user role
const getDashboardRoute = (userRole: string) => {
  switch (userRole) {
    case role?.admin:
      return "/admin-dashboard";
    case role?.sender:
      return "/sender-dashboard";
    case role?.receiver:
      return "/receiver-dashboard";
    default:
      return "/";
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = data?.data;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout(undefined);
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully");
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
    } catch {
      toast.error("Failed to logout");
    }
  };

  const activeClass =
    "font-medium tracking-wide text-[#009CFE] border-b-2 border-[#009CFE]";
  const normalClass =
    "font-medium tracking-wide text-gray-700 dark:text-gray-300 hover:text-[#005DB5] dark:hover:text-[#33B7FF] transition-colors duration-200";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm relative w-full transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 flex justify-between items-center relative">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full"
            src="https://play-lh.googleusercontent.com/J3Ew-toK2n80uS4m85sKELgXNgNZ798HeOlk5iHI99aDccULENBJK4ZuYMyE_68Ye_59"
            alt="ParcelXpress"
          />
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide uppercase text-black dark:text-white">
            ParcelXpress
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-4 xl:space-x-8">
          {["Home", "Contact", "About Us"].map((name) => {
            const to =
              name === "Home"
                ? "/"
                : `/${name.toLowerCase().replace(" ", "-")}`;
            return (
              <li key={name}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  {name}
                </NavLink>
              </li>
            );
          })}

          {user && (
            <li>
              <NavLink
                to={getDashboardRoute(user.role)}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}

          <li>
            <ModeToggle />
          </li>

          {!user ? (
            <li>
              <NavLink
                to="/login"
                className="inline-flex items-center justify-center h-8 sm:h-9 px-3 sm:px-4 font-medium bg-[#009CFE] hover:bg-[#005DB5] text-white text-sm sm:text-base rounded-[2px] transition-colors"
              >
                Login
              </NavLink>
            </li>
          ) : (
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <img
                  src={
                    user?.picture ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="User Avatar"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer"
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-36 sm:w-40 bg-white dark:bg-gray-800 shadow-md rounded-md border border-gray-200 dark:border-gray-700 py-2 z-50"
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium px-4 truncate">
                      {user?.name || "User"}
                    </p>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            aria-label="Toggle Menu"
            className="p-2 focus:outline-none focus:ring-2 focus:ring-[#009CFE] rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 dark:text-gray-300"
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
                className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 dark:text-gray-300"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-gray-900 w-full border-t border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            <ul className="flex flex-col items-center space-y-3 sm:space-y-4 py-4 sm:py-5">
              {["Home", "Contact", "About Us"].map((name) => {
                const to =
                  name === "Home"
                    ? "/"
                    : `/${name.toLowerCase().replace(" ", "-")}`;
                return (
                  <li key={name}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#009CFE] font-semibold"
                          : "text-gray-700 dark:text-gray-300"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {name}
                    </NavLink>
                  </li>
                );
              })}

              {user && (
                <li>
                  <NavLink
                    to={getDashboardRoute(user.role)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#009CFE] font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}

              <li>
                <ModeToggle />
              </li>

              {!user ? (
                <li>
                  <NavLink
                    to="/login"
                    className="inline-flex items-center justify-center h-8 sm:h-9 px-4 sm:px-5 font-medium bg-[#009CFE] hover:bg-[#005DB5] text-white rounded-[2px] text-sm sm:text-base transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="inline-flex items-center justify-center h-8 sm:h-9 px-4 sm:px-5 font-medium bg-red-500 hover:bg-red-600 text-white rounded-[2px] text-sm sm:text-base transition-colors"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
