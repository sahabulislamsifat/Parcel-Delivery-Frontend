/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Loader2, PackageCheck, Truck, RotateCcw, Eye } from "lucide-react";
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
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useGetIncomingParcelsQuery,
  useConfirmDeliveryMutation,
} from "@/redux/features/parcels/parcelApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import ParcelDetailsModal from "../parcels/ParcelDetailsModal";

const ConfirmDelivery = () => {
  const [page, setPage] = useState(1);
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const limit = 10;

  // Fetch incoming parcels
  const { data, isLoading, isFetching, refetch } = useGetIncomingParcelsQuery({
    page,
    limit,
  });

  // Confirm / Return mutation
  const [confirmDelivery, { isLoading: actionLoading }] =
    useConfirmDeliveryMutation();

  const parcels = data?.data || [];
  const total = data?.total || 0;
  const currentPage = data?.page || 1;
  const totalPages = Math.ceil(total / limit);

  // Stats
  const stats = useMemo(() => {
    const total = parcels.length;
    const totalPending = parcels.filter(
      (p: any) => p.status !== "DELIVERED"
    ).length;
    return { total, totalPending };
  }, [parcels]);

  // Handle delivery actions
  const handleAction = async (id: string, action: "DELIVERED" | "RETURNED") => {
    try {
      await confirmDelivery({ id, action }).unwrap();
      toast.success(
        action === "DELIVERED"
          ? "Parcel delivery confirmed successfully!"
          : "Parcel marked as returned successfully!"
      );
      refetch();
      setSelectedParcelId(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Confirm Delivery
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Confirm or return your incoming parcels.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-[2.5px] mt-4 md:mt-0 flex items-center"
        >
          {isFetching ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Truck className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
        <Card className="rounded-[2.5px] border dark:bg-[#101828] bg-white shadow-sm">
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Parcels</CardTitle>
            <PackageCheck className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5px] border dark:bg-[#101828] bg-white shadow-sm">
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Confirmation
            </CardTitle>
            <RotateCcw className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPending}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="rounded-[2.5px] border-none dark:bg-[#101828] bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Incoming Parcels</CardTitle>
          <CardDescription>
            Review, confirm or return your parcels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {parcels.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No incoming parcels found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parcels.map((p: any) => (
                    <TableRow key={p._id}>
                      <TableCell>{p.trackingId}</TableCell>
                      <TableCell>{p.sender?.name || "N/A"}</TableCell>
                      <TableCell>{p.weight} kg</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            p.status === "DELIVERED"
                              ? "bg-green-100 text-green-700"
                              : p.status === "RETURNED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        {["OUT_FOR_DELIVERY", "IN_TRANSIT"].includes(
                          p.status
                        ) ? (
                          <>
                            <Button
                              size="sm"
                              className="rounded-[2.5px]"
                              onClick={() => handleAction(p._id, "DELIVERED")}
                              disabled={actionLoading}
                            >
                              {actionLoading && (
                                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                              )}
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="rounded-[2.5px]"
                              onClick={() => handleAction(p._id, "RETURNED")}
                              disabled={actionLoading}
                            >
                              {actionLoading && (
                                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                              )}
                              Return
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View Details"
                            onClick={() => setSelectedParcelId(p._id)}
                            className="rounded-[2.5px]"
                          >
                            <Eye className="h-4 w-4 text-blue-500" />
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
        <div className="flex justify-end gap-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Prev
          </Button>
          <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            {currentPage}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Parcel Details Modal */}
      {selectedParcelId && (
        <ParcelDetailsModal
          parcelId={selectedParcelId}
          onClose={() => setSelectedParcelId(null)}
        />
      )}
    </div>
  );
};

export default ConfirmDelivery;
