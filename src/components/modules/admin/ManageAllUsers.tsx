/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { Loader2, Trash2, ShieldBan, ShieldCheck, Edit2 } from "lucide-react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { toast } from "sonner";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/users/usersApi";
import { setFilters } from "@/redux/features/users/usersSlice";
import type { IResponseWithMeta, IUserListResponse } from "@/types";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const ManageAllUsers = () => {
  const dispatch = useAppDispatch();
  const { page, limit, role, status, search } = useAppSelector(
    (state) => state.user
  );

  const [localSearch, setLocalSearch] = useState(search);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [updateData, setUpdateData] = useState({ role: "", status: "" });
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // for delete dialog

  const { data, isLoading, refetch } = useGetAllUsersQuery({
    page,
    limit,
    role: role || undefined,
    status: status || undefined,
    search: search || undefined,
  }) as {
    data?: IResponseWithMeta<IUserListResponse>;
    isLoading: boolean;
    refetch: () => void;
  };

  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const users = Array.isArray(data?.data) ? data.data : [];
  const meta = data?.meta || { totalPages: 1, page: 1 };

  useEffect(() => {
    refetch();
  }, [page, limit, role, status, search, refetch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilters({ search: localSearch, page: 1 }));
  };

  const handleBlockToggle = async (id: string, currentStatus: string) => {
    const block = currentStatus !== "BLOCKED";
    try {
      await blockUser({ id, block }).unwrap();
      toast.success(`User ${block ? "blocked" : "unblocked"} successfully`);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const confirmDelete = async () => {
    if (!selectedUserId) return;
    try {
      await deleteUser(selectedUserId).unwrap();
      toast.success("User deleted successfully");
      setSelectedUserId(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete user");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > meta.totalPages) return;
    dispatch(setFilters({ page: newPage }));
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setUpdateData({ role: user.role, status: (user as any).status });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({ id: editingUser._id, data: updateData }).unwrap();
      toast.success("User updated successfully");
      setEditingUser(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage All Users</h2>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by name, email..."
            className="border rounded-none px-3 py-2 w-60"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-none cursor-pointer hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        <select
          value={role}
          onChange={(e) => dispatch(setFilters({ role: e.target.value || "" }))}
          className="border dark:bg-[#101828] rounded-none px-3 py-2"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="SENDER">Sender</option>
          <option value="RECEIVER">Receiver</option>
        </select>

        <select
          value={status}
          onChange={(e) =>
            dispatch(setFilters({ status: e.target.value || "" }))
          }
          className="border rounded-none bg-white dark:bg-[#101828] px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white dark:bg-[#101828] rounded-none shadow">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gradient-to-l from-blue-300 via-white to-gray-200 dark:text-black text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={
                          user.picture ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span>{user.name || "N/A"}</span>
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-none text-sm font-medium ${
                          (user as any).status === "BLOCKED"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {(user as any).status}
                      </span>
                    </td>
                    <td className="p-3 text-right flex justify-end gap-2">
                      <button
                        onClick={() =>
                          handleBlockToggle(user._id, (user as any).status)
                        }
                        className={`p-2 cursor-pointer rounded-none ${
                          (user as any).status === "BLOCKED"
                            ? "bg-green-100 hover:bg-green-200 text-green-600"
                            : "bg-red-100 hover:bg-red-200 text-red-600"
                        }`}
                        title={
                          (user as any).status === "BLOCKED"
                            ? "Unblock User"
                            : "Block User"
                        }
                      >
                        {(user as any).status === "BLOCKED" ? (
                          <ShieldCheck size={18} />
                        ) : (
                          <ShieldBan size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 rounded-none cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-600"
                        title="Edit User"
                      >
                        <Edit2 size={18} />
                      </button>

                      {/* Delete with AlertDialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => setSelectedUserId(user._id)}
                            className="p-2 rounded-none cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-none">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete this user?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. The user’s data will
                              be permanently removed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              className="rounded-none"
                              onClick={() => setSelectedUserId(null)}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={confirmDelete}
                              className="bg-red-600 rounded-none hover:bg-red-700"
                            >
                              Yes, Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          title="Previous"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 border rounded-none px-5 cursor-pointer disabled:opacity-50"
        >
          <FaArrowLeftLong />
        </button>
        <span className="text-sm">
          Page {meta.page} of {meta.totalPages}
        </span>
        <button
          title="Next"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= meta.totalPages}
          className="p-2 border rounded-none cursor-pointer px-6 disabled:opacity-50 flex items-center gap-1"
        >
          <FaArrowRightLong />
        </button>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#101828] rounded-none shadow-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">
              Edit User: {editingUser.name}
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Role</label>
                <select
                  value={updateData.role}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, role: e.target.value })
                  }
                  className="w-full border rounded-none dark:bg-[#101828] px-3 py-2"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="SENDER">Sender</option>
                  <option value="RECEIVER">Receiver</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Status</label>
                <select
                  value={updateData.status}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, status: e.target.value })
                  }
                  className="w-full border rounded-none dark:bg-[#101828] px-3 py-2"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="BLOCKED">Blocked</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border rounded-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAllUsers;
