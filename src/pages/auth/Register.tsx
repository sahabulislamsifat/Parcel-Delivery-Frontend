/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import config from "@/components/config";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // RTK Query register mutation
  const [registerUser, { isLoading }] = useRegisterMutation();

  // Local form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "SENDER", // Default role
      } as any;

      const result = await registerUser(payload).unwrap();

      if (result.success) {
        dispatch(setUser(result.data));
        setSuccess("Account created successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(result.message || "Registration failed. Try again.");
      }
    } catch (err: any) {
      setError(
        err?.data?.message ||
          err?.message ||
          "Something went wrong during registration."
      );
    }
  };

  // Handle Google OAuth
  const handleGoogleRegister = () => {
    window.open(`${config.baseUrl}/auth/google`, "_self");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2 dark:bg-gray-900">
      {/* Left Side: Form */}
      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto flex flex-col justify-center p-6 md:p-12 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <div className="mb-8 text-center">
          <img
            src="https://play-lh.googleusercontent.com/J3Ew-toK2n80uS4m85sKELgXNgNZ798HeOlk5iHI99aDccULENBJK4ZuYMyE_68Ye_59"
            alt="ParcelXpress Logo"
            className="mx-auto w-16 h-16 rounded-full"
          />
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create Account
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Register to start sending and tracking parcels with ParcelXpress.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#009CFE] dark:bg-gray-700 dark:text-gray-100"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#009CFE] dark:bg-gray-700 dark:text-gray-100"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            pattern="^(\+?\d{1,3}[- ]?)?\d{10,15}$"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#009CFE] dark:bg-gray-700 dark:text-gray-100"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#009CFE] dark:bg-gray-700 dark:text-gray-100"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#009CFE] dark:bg-gray-700 dark:text-gray-100"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#009CFE] hover:bg-[#005DB5] text-white font-semibold rounded cursor-pointer transition-colors duration-300"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <span className="relative z-10 px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300">
            or continue with
          </span>
          <div className="absolute inset-0 top-1/2 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer dark:text-gray-100"
        >
          <FaGoogle />
          Register with Google
        </button>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#009CFE] hover:text-[#005DB5] underline"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden lg:block relative">
        <img
          src="https://static.vecteezy.com/system/resources/previews/023/743/919/non_2x/courier-delivery-man-holding-parcel-box-with-mobile-phone-fast-online-delivery-service-online-ordering-internet-e-commerce-ideas-for-websites-or-banners-3d-perspective-illustration-free-png.png"
          alt="Register"
          className="absolute inset-0 w-full h-full brightness-95 object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
