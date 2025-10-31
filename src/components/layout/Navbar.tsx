import { useState } from "react";
import { NavLink } from "react-router";
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
      return "/admin";
    case role?.sender:
      return "/sender";
    case role?.receiver:
      return "/receiver";
    default:
      return "/";
  }
};

// console.log(role);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const user = data?.data;
  // console.log(user?.role);

  const handleLogout = async () => {
    try {
      await logout(undefined);
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const activeClass =
    "font-medium tracking-wide text-[#009CFE] border-b-2 border-[#009CFE]";
  const normalClass =
    "font-medium tracking-wide text-gray-700 dark:text-gray-300 hover:text-[#005DB5] dark:hover:text-[#33B7FF] transition-colors duration-200";

  return (
    <div className="shadow-sm relative bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="text-black dark:text-gray-100 px-4 py-1 mx-auto max-w-11/12 relative">
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

            {/* Dashboard only for logged-in users */}
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

            {/* Mode Toggler */}
            <ModeToggle />

            {/* Auth Section */}
            {!user ? (
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
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer"
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-gray-800 shadow-md rounded-none border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium px-4">
                      {user?.name || "User"}
                    </p>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
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
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
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
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
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
        <div className="lg:hidden bg-white dark:bg-gray-900 w-full border-t border-gray-200 dark:border-gray-700 shadow-sm absolute left-0 top-[100%] z-40 transition-colors duration-300">
          <ul className="flex flex-col items-center space-y-4 py-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#009CFE] font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/truckparcel"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#009CFE] font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                TruckParcel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#009CFE] font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#009CFE] font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                About Us
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink
                  to={getDashboardRoute(user.role)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#009CFE] font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            <ModeToggle />

            {!user ? (
              <li>
                <NavLink
                  to="/login"
                  className="inline-flex items-center justify-center h-8 px-4 font-medium bg-[#009CFE] hover:bg-[#005DB5] text-white"
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center h-8 px-4 font-medium bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
