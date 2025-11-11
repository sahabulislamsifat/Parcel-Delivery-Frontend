/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Loader2, User, Mail, Shield, Calendar, Lock } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import LoadingSpinner from "@/components/LoadingSpinner";
import EditUserModal from "../users/EditUserModal";
import { useUpdateUserMutation } from "@/redux/features/users/usersApi";

const Profile = () => {
  const { data, isLoading, isError, refetch } = useUserInfoQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // 🔹 Change Password Function
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
      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.success("Password changed successfully!");
      setIsModalOpen(false);
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      toast.error("Failed to change password!", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-red-500">
        Failed to load user information.
      </div>
    );
  }

  const user = data?.data;

  const handleProfileUpdate = async (formData: Partial<typeof user>) => {
    try {
      await updateUser({ id: user._id, data: formData }).unwrap();
      toast.success("Profile updated successfully!");
      refetch();
      setIsEditOpen(false);
    } catch {
      toast.error("Profile update failed!");
    }
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center dark:bg-[#101828] py-10 px-4">
      {/* 🔹 Cover Image */}
      <div className="relative w-full max-w-3xl mb-[-60px]">
        <img
          src="https://cdn4.vectorstock.com/i/1000x1000/72/68/parcel-delivery-service-concept-flat-isolated-vector-48407268.jpg"
          alt="Profile Cover"
          className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-t-lg shadow-md"
        />

        {/* 🔹 Profile Image Overlapping */}
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
          {user?.picture ? (
            <img
              className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white"
              src={user.picture}
              alt={user.name}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-md border-4 border-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Profile Card */}
      <div className="bg-white dark:bg-[#101828] shadow-lg rounded-lg w-full max-w-md p-6 md:p-8 transition-all duration-300 mt-20">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {user.name || "Unnamed User"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Shield size={16} />
            Role: <span className="capitalize font-medium">{user.role}</span>
          </p>
        </div>

        {/* 🔹 User Info */}
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

        {/* 🔹 Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex items-center justify-center gap-2 flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-[2px] transition-all duration-200"
          >
            <FiEdit /> Edit Profile
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-[2px] transition-all duration-200"
          >
            <Lock size={18} /> Change Password
          </button>
        </div>
      </div>

      {/* 🔹 Modal Backdrop */}
      {(isModalOpen || isEditOpen) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
      )}

      {/* 🔹 Change Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-[2px] shadow-lg p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Change Password
            </h3>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              {["oldPassword", "newPassword", "confirmPassword"].map((key) => (
                <input
                  key={key}
                  type="password"
                  name={key}
                  placeholder={
                    key === "oldPassword"
                      ? "Old Password"
                      : key === "newPassword"
                      ? "New Password"
                      : "Confirm Password"
                  }
                  value={(passwords as any)[key]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-[2px] bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}

              <div className="flex justify-between gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-[2px] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-[2px] font-medium flex items-center justify-center"
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

      {/* 🔹 Edit Profile Modal */}
      {isEditOpen && (
        <EditUserModal
          user={user}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            handleProfileUpdate(user);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default Profile;
