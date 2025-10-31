/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Loader2,
  Trash2,
  ShieldBan,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";
import {
  useBlockUnblockParcelMutation,
  useDeleteParcelMutation,
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
} from "@/redux/features/parcels/parcelApi";
import type { ParcelStatus } from "@/types";

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

const PARCEL_STATUSES: ParcelStatus[] = [
  "REQUESTED",
  "APPROVED",
  "DISPATCHED",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
  "BLOCKED",
];

const ManageAllParcels = () => {
  const [page, setPage] = useState(1);
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [localSearch, setLocalSearch] = useState("");
  const limit = 10;

  const { data, isLoading, refetch } = useGetAllParcelsQuery({
    page,
    limit,
    search: search || undefined,
  });

  const [deleteParcel] = useDeleteParcelMutation();
  const [blockUnblockParcel] = useBlockUnblockParcelMutation();
  const [updateParcelStatus] = useUpdateParcelStatusMutation();

  const parcels = data?.data || [];
  const meta = data?.meta || { totalPages: 1 };

  const handleDelete = async () => {
    if (!selectedParcelId) return;
    try {
      await deleteParcel(selectedParcelId).unwrap();
      toast.success("Parcel deleted successfully");
      setSelectedParcelId(null);
      refetch();
    } catch {
      toast.error("Failed to delete parcel");
    }
  };

  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    try {
      await blockUnblockParcel({
        id,
        data: { block: !isBlocked },
      }).unwrap();
      toast.success(
        `Parcel ${isBlocked ? "unblocked" : "blocked"} successfully`
      );
      refetch();
    } catch {
      toast.error("Failed to update parcel block status");
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateParcelStatus({
        id,
        data: { status },
      }).unwrap();
      toast.success(`Status updated to ${status}`);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(localSearch);
    setPage(1);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-medium mb-6">Manage All Parcels</h2>

      {/* 🔍 Search Bar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by Tracking ID, Sender, or Receiver..."
            className="border rounded-none px-3 py-2 w-72"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-none cursor-pointer hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-none">
        <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 bg-gradient-to-l from-blue-300 via-white to-gray-200 text-black text-left">
              <th className="py-3 px-4 text-left">Tracking ID</th>
              <th className="py-3 px-4 text-left">Sender</th>
              <th className="py-3 px-4 text-left">Receiver</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel: any) => (
                <tr
                  key={parcel._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="py-3 px-4 font-medium">{parcel.trackingId}</td>
                  <td className="py-3 px-4">{parcel.sender?.name}</td>
                  <td className="py-3 px-4">{parcel.receiver?.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={parcel.status}
                        onChange={(e) =>
                          handleStatusUpdate(parcel._id, e.target.value)
                        }
                        className="border rounded-none px-2 py-1 text-sm bg-transparent dark:bg-gray-800"
                      >
                        {PARCEL_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel._id, parcel.status)
                        }
                        className="p-1.5 bg-blue-100 text-blue-700 rounded-full hover:scale-110 transition"
                        title="Update Status"
                      >
                        <RefreshCcw size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">${parcel.totalAmount}</td>
                  <td className="py-3 px-4 text-center flex items-center justify-center gap-3">
                    {/* Block / Unblock */}
                    <button
                      onClick={() =>
                        handleBlockToggle(parcel._id, parcel.isBlocked)
                      }
                      className={`p-2 rounded-full ${
                        parcel.isBlocked
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      } hover:scale-110 transition`}
                      title={parcel.isBlocked ? "Unblock" : "Block"}
                    >
                      {parcel.isBlocked ? (
                        <ShieldCheck size={18} />
                      ) : (
                        <ShieldBan size={18} />
                      )}
                    </button>

                    {/* Delete with AlertDialog */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={() => setSelectedParcelId(parcel._id)}
                          className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-red-100 hover:text-red-600 hover:scale-110 transition"
                          title="Delete Parcel"
                        >
                          <Trash2 size={18} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-none">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this parcel?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The parcel and its
                            data will be permanently removed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            className="rounded-none"
                            onClick={() => setSelectedParcelId(null)}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
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
                  colSpan={6}
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-1 rounded-none bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
        >
          ← Prev
        </button>
        <span className="text-sm">
          Page {page} of {meta.totalPages}
        </span>
        <button
          disabled={page === meta.totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-1 rounded-none bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default ManageAllParcels;
