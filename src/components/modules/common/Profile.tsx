/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Loader2, User, Mail, Shield, Calendar, Lock } from "lucide-react";

const Profile = () => {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !passwords.oldPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      setIsSubmitting(true);
      // 🔹 Replace this with your API call when available:
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("Password changed successfully!");
      setIsModalOpen(false);
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      toast.error("Failed to change password. Try again!", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-red-500">
        Failed to load user info.
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="min-h-[80vh] flex justify-center items-center dark:bg-[#101828] py-10 px-4">
      <div className="bg-white dark:bg-[#101828] shadow-lg rounded-none w-full max-w-md p-6 md:p-8 transition-all duration-300">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-semibold shadow-md">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* Name & Role */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {user.name || "Unnamed User"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Shield size={16} />
            Role: <span className="capitalize font-medium">{user.role}</span>
          </p>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <User size={18} />
            <span>User ID: {user._id}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Calendar size={18} />
            <span>
              Joined:{" "}
              {new Date(user.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={() => toast.info("Edit feature coming soon!")}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-none transition-all duration-200"
          >
            Edit Profile
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-none transition-all duration-200"
          >
            <Lock size={18} />
            Change Password
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-900 rounded-sm shadow-lg p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Change Password
            </h3>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={passwords.oldPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-none bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-none bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwords.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-none bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-between gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-none font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-medium flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
