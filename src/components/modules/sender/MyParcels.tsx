/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetMyParcelsQuery,
  useCancelParcelMutation,
} from "@/redux/features/parcels/parcelApi";
import {
  Loader2,
  PackageSearch,
  RefreshCw,
  Eye,
  XCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import LoadingSpinner from "@/components/LoadingSpinner";
import ParcelDetailsModal from "../parcels/ParcelDetailsModal";
import ParcelStatusLogsModal from "../parcels/ParcelStatusModal";

const MyParcels = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [statusParcelId, setStatusParcelId] = useState<string | null>(null);

  const { data, isLoading, isFetching, refetch } = useGetMyParcelsQuery({
    page,
    limit: 10,
    search,
  });

  const [cancelParcel] = useCancelParcelMutation();

  const parcels = Array.isArray(data?.data) ? data.data : [];

  const currentPage = data?.page || 1;
  const totalPages = Math.ceil((data?.total || 0) / (data?.limit || 10));

  const handleCancel = async (id: string) => {
    const toastId = toast.loading("Cancelling parcel...");
    try {
      const response = await cancelParcel(id).unwrap();
      toast.success(response?.message || "Parcel cancelled!", { id: toastId });
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel parcel", {
        id: toastId,
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="w-full px-4 md:px-8 space-y-6">
      {/* Card Header */}
      <Card className="rounded-[2.5px] border-none dark:bg-[#101828] bg-white">
        <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              My Parcels
            </CardTitle>
            <CardDescription>
              View and manage all parcels you’ve created.
            </CardDescription>
          </div>

          {/* Search and Refresh */}
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search by tracking ID or receiver"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1 rounded border dark:bg-[#101828] dark:border-gray-600 dark:text-white"
            />
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
              className="rounded-[2.5px] flex items-center gap-2"
            >
              {isFetching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {parcels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <PackageSearch className="h-10 w-10 mb-2" />
              <p>No parcels found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Weight (kg)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parcels.map((parcel: any) => (
                    <TableRow key={parcel._id}>
                      <TableCell>{parcel.trackingId}</TableCell>
                      <TableCell>{parcel.receiver?.name || "N/A"}</TableCell>
                      <TableCell>{parcel.type}</TableCell>
                      <TableCell>{parcel.weight}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-[2.5px] text-xs font-semibold ${
                            parcel.status === "DELIVERED"
                              ? "bg-green-100 text-green-700"
                              : parcel.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {parcel.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {parcel.deliveryDate
                          ? new Date(parcel.deliveryDate).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {parcel.isPaid ? (
                          <span className="text-green-600 font-medium">
                            Paid
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            Unpaid
                          </span>
                        )}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="flex gap-2">
                        {/* View Details */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedParcelId(parcel._id)}
                        >
                          <Eye className="h-4 w-4 text-blue-500" />
                        </Button>

                        {/* View Status Logs */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setStatusParcelId(parcel._id)}
                        >
                          <Clock className="h-4 w-4 text-indigo-500" />
                        </Button>

                        {/* Cancel */}
                        {parcel.status !== "DELIVERED" &&
                          parcel.status !== "CANCELLED" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCancel(parcel._id)}
                            >
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/*  Parcel Details Modal */}
      {selectedParcelId && (
        <ParcelDetailsModal
          parcelId={selectedParcelId}
          onClose={() => setSelectedParcelId(null)}
        />
      )}

      {/*  Status Logs Modal */}
      {statusParcelId && (
        <ParcelStatusLogsModal
          parcelId={statusParcelId}
          onClose={() => setStatusParcelId(null)}
        />
      )}
    </div>
  );
};

export default MyParcels;
