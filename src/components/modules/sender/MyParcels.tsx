/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetMyParcelsQuery,
  useGetParcelByIdQuery,
} from "@/redux/features/parcels/parcelApi";
import { Loader2, PackageSearch, RefreshCw, Eye } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import LoadingSpinner from "@/components/LoadingSpinner";

const MyParcels = () => {
  const [page, setPage] = useState(1);
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);

  const { data, isLoading, isFetching, refetch } = useGetMyParcelsQuery({
    page,
    limit: 10,
  });

  const { data: parcelDetails, isFetching: detailsLoading } =
    useGetParcelByIdQuery(selectedParcelId!, {
      skip: !selectedParcelId,
    });

  const parcels = Array.isArray(data?.data) ? data.data : [];
  const meta = data?.meta || { totalPages: 1, page: 1 };

  const parcel = parcelDetails?.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );

  return (
    <div className="w-full px-4 md:px-8">
      <Card className="rounded-none border-none dark:bg-[#101828] bg-white">
        <CardHeader className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              My Parcels
            </CardTitle>
            <CardDescription>
              View and track all parcels you’ve created.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              toast.info("Refreshing data...");
              refetch();
            }}
            disabled={isFetching}
            className="rounded-none mt-3 md:mt-0 cursor-pointer"
          >
            {isFetching ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : parcels.length === 0 ? (
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
                    <TableHead>Action</TableHead>
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
                          className={`px-2 py-1 rounded-none text-xs font-semibold ${
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
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="View Details"
                          className="cursor-pointer rounded-none"
                          onClick={() => setSelectedParcelId(parcel._id)}
                        >
                          <Eye className="h-4 w-4 text-blue-500" />
                        </Button>
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
      {meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </Button>
          <span>
            Page {meta.page} of {meta.totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === meta.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* View Parcel Modal */}
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
              Comprehensive information about your parcel
            </DialogDescription>
          </DialogHeader>

          {detailsLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="animate-spin h-6 w-6 text-primary" />
            </div>
          ) : parcel ? (
            <div className="space-y-8 py-4">
              {/* Header */}
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

              {/* Parcel Info */}
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

              {/* Sender & Receiver */}
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

export default MyParcels;
