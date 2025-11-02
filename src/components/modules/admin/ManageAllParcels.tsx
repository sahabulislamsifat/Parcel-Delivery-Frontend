/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Loader2,
  Trash2,
  ShieldBan,
  ShieldCheck,
  RefreshCcw,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import {
  useBlockUnblockParcelMutation,
  useDeleteParcelMutation,
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useGetParcelByIdQuery,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import LoadingSpinner from "@/components/LoadingSpinner";

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
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null); // Details modal
  const [deleteParcelId, setDeleteParcelId] = useState<string | null>(null); // Delete modal

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

  const { data: parcelDetails, isFetching: detailsLoading } =
    useGetParcelByIdQuery(selectedParcelId!, { skip: !selectedParcelId });

  const parcels = data?.data || [];
  const meta = data?.meta || { totalPages: 1 };
  const parcel = parcelDetails?.data;

  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    try {
      await blockUnblockParcel({ id, data: { block: !isBlocked } }).unwrap();
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
      await updateParcelStatus({ id, data: { status } }).unwrap();
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
        <LoadingSpinner></LoadingSpinner>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-medium mb-6">Manage All Parcels</h2>

      {/* Search Bar */}
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

      {/* Parcels Table */}
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
                    {/* Block/Unblock */}
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

                    {/* Delete */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={() => setDeleteParcelId(parcel._id)}
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
                            onClick={() => setDeleteParcelId(null)}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => {
                              if (!deleteParcelId) return;
                              try {
                                await deleteParcel(deleteParcelId).unwrap();
                                toast.success("Parcel deleted successfully");
                                setDeleteParcelId(null);
                                refetch();
                              } catch {
                                toast.error("Failed to delete parcel");
                              }
                            }}
                            className="bg-red-600 rounded-none text-white hover:bg-red-700"
                          >
                            Yes, Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* Details */}
                    <button
                      onClick={() => setSelectedParcelId(parcel._id)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-full hover:scale-110 transition"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
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

      {/* Parcel Details Modal */}
      <Dialog
        open={!!selectedParcelId}
        onOpenChange={() => setSelectedParcelId(null)}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-none dark:bg-[#101828] border-none">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-2xl font-bold">
              Parcel Details
            </DialogTitle>
            <DialogDescription>
              Comprehensive information about this parcel
            </DialogDescription>
          </DialogHeader>

          {detailsLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="animate-spin h-6 w-6 text-primary" />
            </div>
          ) : parcel ? (
            <div className="space-y-8 py-4">
              {/* Parcel Info */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b pb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Tracking ID: {parcel.trackingId}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Created at{" "}
                    {new Date(parcel.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-none text-sm font-semibold ${
                    parcel.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : parcel.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {parcel.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Parcel Info</h3>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <strong>Type:</strong> {parcel.type}
                    </li>
                    <li>
                      <strong>Weight:</strong> {parcel.weight} kg
                    </li>
                    <li>
                      <strong>Price:</strong> ${parcel.price}
                    </li>
                    <li>
                      <strong>Delivery Charge:</strong> ${parcel.deliveryCharge}
                    </li>
                    <li>
                      <strong>Total Amount:</strong> ${parcel.totalAmount}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Delivery Info</h3>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <strong>Delivery Date:</strong>{" "}
                      {parcel.deliveryDate
                        ? new Date(parcel.deliveryDate).toLocaleDateString()
                        : "Not scheduled"}
                    </li>
                    {parcel.actualDeliveryDate && (
                      <li>
                        <strong>Delivered At:</strong>{" "}
                        {new Date(parcel.actualDeliveryDate).toLocaleString()}
                      </li>
                    )}
                    <li>
                      <strong>Payment:</strong>{" "}
                      {parcel.isPaid ? (
                        <span className="text-green-600 font-medium">Paid</span>
                      ) : (
                        <span className="text-red-500 font-medium">Unpaid</span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 border-t pt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sender Info</h3>
                  <p className="text-sm">
                    <strong>Name:</strong> {parcel.sender?.name}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {parcel.sender?.email}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Receiver Info</h3>
                  <p className="text-sm">
                    <strong>Name:</strong> {parcel.receiver?.name}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {parcel.receiver?.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">No details found.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAllParcels;
