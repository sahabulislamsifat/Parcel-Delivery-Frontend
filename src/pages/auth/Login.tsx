/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import type { SubmitHandler } from "react-hook-form";
import type { ILogin } from "@/types";
import config from "@/components/config";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<ILogin>({ email: "", password: "" });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res?.success) {
        // store user + token (if backend returned token)
        dispatch(setUser({ user: res.data as any, token: res.token }));
        toast.success("✅ Logged in successfully");

        // role-based redirect
        const role = (res.data as any).role;
        if (role === "ADMIN") navigate("/admin/dashboard");
        else if (role === "SENDER") navigate("/sender/dashboard");
        else if (role === "RECEIVER") navigate("/receiver/dashboard");
        else navigate("/");
      } else {
        toast.error(res.message || "Invalid email or password");
      }
    } catch (err: any) {
      console.error(err);
      if (err?.data?.message === "Password does not match") {
        toast.error("❌ Invalid credentials");
      } else if (err?.data?.message === "User is not verified") {
        toast.error("⚠️ Your account is not verified");
        navigate("/verify", { state: formData.email });
      } else {
        toast.error(
          err?.data?.message || "Something went wrong! Please try again."
        );
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleGoogleLogin = () => {
    window.open(`${config.baseUrl}/auth/google`, "_self");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );

  return (
    <div
      data-aos="fade-zoom-up"
      data-aos-easing="ease-in-back"
      data-aos-delay="100"
      data-aos-offset="0"
      className="grid min-h-screen lg:grid-cols-2 dark:bg-[#101828]"
    >
      <div className="hidden lg:block relative">
        <img
          src="https://png.pngtree.com/png-clipart/20231005/original/pngtree-courier-with-a-lot-of-parcels-isolated-on-white-background-illustration-png-image_13122703.png"
          alt="Parcel Xpress"
          className="absolute inset-0 w-full h-full object-cover brightness-95"
        />
      </div>

      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto flex flex-col justify-center p-6 md:p-12 bg-white dark:bg-[#101828] dark:border rounded-[2.5px] shadow-md">
        <div className="mb-8 text-center">
          <img
            src="https://play-lh.googleusercontent.com/J3Ew-toK2n80uS4m85sKELgXNgNZ798HeOlk5iHI99aDccULENBJK4ZuYMyE_68Ye_59"
            alt="ParcelXpress Logo"
            className="mx-auto w-16 h-16 rounded-full"
          />
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
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
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-[2.5px] focus:outline-none focus:ring-2 focus:ring-[#009CFE] dark:bg-gray-700 dark:text-gray-100"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-[2.5px] focus:outline-none focus:ring-2 focus:ring-[#009CFE] dark:bg-gray-700 dark:text-gray-100"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#009CFE] hover:bg-[#005DB5] text-white font-semibold rounded-[2.5px] transition-colors duration-300 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#009CFE] hover:text-[#005DB5] underline"
          >
            Register
          </Link>
        </div>

        <div className="relative my-6 text-center">
          <span className="relative z-10 px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300">
            or login with
          </span>
          <div className="absolute inset-0 top-1/2 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 dark:border-gray-600 rounded-[2.5px] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer dark:text-gray-100"
        >
          <FaGoogle />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
