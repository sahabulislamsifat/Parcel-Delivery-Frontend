/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { Truck, Loader2, PackageCheck, DollarSign, Eye } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  useGetDeliveredParcelsQuery,
  useGetParcelByIdQuery,
} from "@/redux/features/parcels/parcelApi"; // Make sure you have this API endpoint
import LoadingSpinner from "@/components/LoadingSpinner";

const DeliveryHistory = () => {
  const [page, setPage] = useState(1);
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const limit = 10;

  // Fetch delivered parcels
  const { data, isLoading, isFetching, refetch } = useGetDeliveredParcelsQuery({
    page,
    limit,
  });
  // console.log(data);

  const parcels = Array.isArray(data?.data) ? data.data : [];
  const meta = data?.meta || { totalPages: 1, page: 1 };

  const { data: parcelDetails, isFetching: detailsLoading } =
    useGetParcelByIdQuery(selectedParcelId!, { skip: !selectedParcelId });

  const parcel = parcelDetails?.data;
  // console.log(parcel);

  const stats = useMemo(() => {
    const total = parcels.length;
    const totalEarnings = parcels.reduce(
      (sum: number, p: any) => sum + (p.totalAmount || 0),
      0
    );
    return { total, totalEarnings };
  }, [parcels]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );

  return (
    <div className="w-full px-4 md:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Delivery History
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            All parcels you have delivered.
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
        <Card className="rounded-[2.5px] border dark:bg-[#101828] bg-white shadow-sm">
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Delivered Parcels
            </CardTitle>
            <PackageCheck className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5px] border dark:bg-[#101828] bg-white shadow-sm">
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{stats.totalEarnings?.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivered Parcels Table */}
      <Card className="rounded-[2.5px] border-none dark:bg-[#101828] bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Delivered Parcels</CardTitle>
          <CardDescription>Details of all delivered parcels.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : parcels.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No delivered parcels found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parcels.map((p: any) => (
                    <TableRow key={p._id}>
                      <TableCell>{p.trackingId}</TableCell>
                      <TableCell>{p.receiver?.name || "N/A"}</TableCell>
                      <TableCell>{p.weight} kg</TableCell>
                      <TableCell>
                        {p.actualDeliveryDate
                          ? new Date(p.actualDeliveryDate).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {p.isPaid ? (
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
                          className="cursor-pointer rounded-[2.5px]"
                          onClick={() => setSelectedParcelId(p._id)}
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
        <div className="flex justify-end gap-2">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            {page}
          </span>
          <Button
            disabled={page === meta.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Parcel Details Modal */}
      <Dialog
        open={!!selectedParcelId}
        onOpenChange={() => setSelectedParcelId(null)}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2.5px] dark:bg-[#101828] border-none">
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
              {/* Parcel Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b pb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Tracking ID: {parcel.trackingId}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Created at {new Date(parcel.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-[2.5px] text-sm font-semibold ${
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

              {/* Parcel & Delivery Info */}
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

export default DeliveryHistory;
