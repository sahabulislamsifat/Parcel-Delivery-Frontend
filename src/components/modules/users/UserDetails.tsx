/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import LoadingSpinner from "@/components/LoadingSpinner";
import { ShieldBan, ShieldCheck, Trash2, ArrowLeft } from "lucide-react";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/users/usersApi";
import EditUserModal from "./EditUserModal";

// Defensive Type for User
interface IUser {
  _id: string;
  name?: string;
  email: string;
  phone?: string;
  picture?: string;
  status?: string;
  role: string;
  address?: {
    street?: string;
    city?: string;
    district?: string;
    postalCode?: string;
  };
  createdAt: string | number | Date;
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  //  handle missing id
  const { data, isLoading, isError, refetch } = useGetSingleUserQuery(
    id ?? "",
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);

  //  Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );
  }

  //  Error or Empty state
  if (isError || !data?.data) {
    return (
      <div className="p-6 text-center text-red-600">
        Failed to load user.{" "}
        <button onClick={() => refetch()} className="underline">
          Retry
        </button>
      </div>
    );
  }

  const user: IUser = data.data;

  //  Block / Unblock user
  const handleBlockToggle = async () => {
    try {
      const block = user.status !== "BLOCKED";
      await blockUser({ id: user._id, block }).unwrap();
      toast.success(`User ${block ? "blocked" : "unblocked"} successfully`);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  //  Delete user
  const handleDelete = async () => {
    if (
      !confirm("Are you sure to delete this user? This action is irreversible.")
    )
      return;
    try {
      await deleteUser(user._id).unwrap();
      toast.success("User deleted successfully");
      navigate("/admin/users");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete user");
    }
  };

  //  Promote to admin
  const handlePromoteToAdmin = async () => {
    try {
      await updateUser({ id: user._id, data: { role: "ADMIN" } }).unwrap();
      toast.success("User promoted to Admin");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update role");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-none border hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-semibold">User Details</h2>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1 bg-white dark:bg-[#101828] p-4 rounded-none shadow">
          <img
            src={
              user.picture ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={user.name || "User Avatar"}
            className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-center text-xl font-medium">{user.name}</h3>
          <p className="text-center text-sm text-gray-500">{user.email}</p>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Status:</strong> {user.status || "ACTIVE"}
            </p>
            <p>
              <strong>User ID:</strong> {user._id}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(user.createdAt).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleBlockToggle}
              disabled={isBlocking}
              className={`flex-1 py-2 rounded-none border flex items-center justify-center gap-2 ${
                user.status === "BLOCKED"
                  ? "text-green-600 border-green-600"
                  : "text-red-600 border-red-600"
              }`}
              title={user.status === "BLOCKED" ? "Unblock user" : "Block user"}
            >
              {user.status === "BLOCKED" ? <ShieldCheck /> : <ShieldBan />}
              {user.status === "BLOCKED" ? "Unblock" : "Block"}
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="py-2 px-3 rounded-none bg-red-600 text-white flex items-center gap-2 hover:bg-red-700"
            >
              <Trash2 />
              Delete
            </button>
          </div>
        </div>

        {/* Details Card */}
        <div className="col-span-2 bg-white dark:bg-[#101828] p-4 rounded-none shadow">
          <h4 className="text-lg font-semibold mb-3">Profile Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Full name</div>
              <div className="font-medium">{user.name || "N/A"}</div>
            </div>
            <div>
              <div className="text-gray-500">Email</div>
              <div className="font-medium">{user.email}</div>
            </div>
            <div>
              <div className="text-gray-500">Phone</div>
              <div className="font-medium">{user.phone || "N/A"}</div>
            </div>
            <div>
              <div className="text-gray-500">Address</div>
              <div className="font-medium">
                {user.address
                  ? `${user.address.street || ""}${
                      user.address.city ? `, ${user.address.city}` : ""
                    }${
                      user.address.district ? `, ${user.address.district}` : ""
                    }${
                      user.address.postalCode
                        ? ` (${user.address.postalCode})`
                        : ""
                    }`
                  : "N/A"}
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="mt-6">
            <h5 className="font-semibold mb-2">Admin Actions</h5>
            <div className="text-sm text-gray-600 mb-3">
              Manage this user’s access, promotion, or profile edits below.
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePromoteToAdmin}
                className="px-4 py-2 bg-yellow-400 text-black rounded-none hover:bg-yellow-500"
              >
                Promote to Admin
              </button>

              <button
                onClick={() => setIsEditOpen(true)}
                className="px-4 py-2 border rounded-none hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Edit (Full)
              </button>
            </div>
          </div>
        </div>
      </div>
      {isEditOpen && (
        <EditUserModal
          user={user}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
};

export default UserDetails;
