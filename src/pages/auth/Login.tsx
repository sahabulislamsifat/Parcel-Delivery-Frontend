import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simulate login
    if (
      formData.email === "test@parcelxpress.com" &&
      formData.password === "Password123"
    ) {
      navigate("/"); // Successful login
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Right Side: Image */}
      <div className="hidden lg:block relative">
        <img
          src="https://img.freepik.com/premium-vector/package-delivery-truck-delivery-man-unload-delivery-car-boxes-illustration_327176-1501.jpg"
          alt="Parcel Xpress"
          className="absolute inset-0 w-full h-full object-cover brightness-95"
        />
      </div>

      {/* Left Side: Form */}
      <div className="w-6/12 mx-auto flex flex-col justify-center p-6 md:p-12 bg-white">
        <div className="mb-8 text-center">
          <img
            src="https://play-lh.googleusercontent.com/J3Ew-toK2n80uS4m85sKELgXNgNZ798HeOlk5iHI99aDccULENBJK4ZuYMyE_68Ye_59"
            alt="ParcelXpress Logo"
            className="mx-auto w-16 h-16 rounded-full"
          />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-600">
            Log in to your ParcelXpress account to track and manage parcels.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#009CFE]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#009CFE]"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-[#009CFE] hover:bg-[#005DB5] text-white font-semibold rounded transition-colors duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#009CFE] hover:text-[#005DB5] underline"
          >
            Register
          </Link>
        </div>

        <div className="relative my-6 text-center">
          <span className="relative z-10 px-2 bg-white text-gray-500">
            or login with
          </span>
          <div className="absolute inset-0 top-1/2 border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={() => window.open("https://accounts.google.com/signin")}
          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <FaGoogle />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
