/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  Loader2,
  PackageCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Eye,
} from "lucide-react";
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

  const { data, isLoading, isFetching, refetch } = useGetIncomingParcelsQuery({
    page,
    limit,
  });

  const parcels = Array.isArray(data?.data) ? data.data : [];
  const meta = data || { totalPages: 1, page: 1 };

  const [confirmDelivery, { isLoading: actionLoading }] =
    useConfirmDeliveryMutation();

  const stats = useMemo(() => {
    const delivered = parcels.filter(
      (p: any) => p.status === "DELIVERED"
    ).length;
    const pending = parcels.filter((p: any) =>
      ["REQUESTED", "IN_TRANSIT", "OUT_FOR_DELIVERY"].includes(p.status)
    ).length;
    const returned = parcels.filter((p: any) => p.status === "RETURNED").length;
    return { total: parcels.length, delivered, pending, returned };
  }, [parcels]);

  const handleAction = async (id: string, action: "DELIVERED" | "RETURNED") => {
    try {
      await confirmDelivery({ id, action }).unwrap();
      toast.success(
        action === "DELIVERED"
          ? "Parcel delivery confirmed!"
          : "Parcel marked as returned!"
      );
      refetch();
      setSelectedParcelId(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="w-full px-4 md:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Confirm Delivery</h1>
          <p className="text-muted-foreground">
            Confirm or return your received parcels.
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

      {/* Stats - modern layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            title: "Total",
            value: stats.total,
            color: "text-blue-500",
            icon: PackageCheck,
          },
          {
            title: "Delivered",
            value: stats.delivered,
            color: "text-green-500",
            icon: CheckCircle2,
          },
          {
            title: "Pending",
            value: stats.pending,
            color: "text-yellow-500",
            icon: Truck,
          },
          {
            title: "Returned",
            value: stats.returned,
            color: "text-red-500",
            icon: RotateCcw,
          },
        ].map((s) => (
          <Card
            key={s.title}
            className="rounded-[2.5px] border dark:bg-[#111927] bg-gray-50 shadow-md hover:shadow-lg transition"
          >
            <CardHeader className="flex justify-between items-center pb-1">
              <CardTitle className="text-sm font-semibold">{s.title}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="rounded-[2.5px] border dark:bg-[#101828] bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">
            Delivery Actions
          </CardTitle>
          <CardDescription>
            Confirm successful deliveries or mark returns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {parcels.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No parcels found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell className="flex gap-2 justify-end">
                        {["OUT_FOR_DELIVERY", "IN_TRANSIT"].includes(
                          p.status
                        ) ? (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white rounded-[2.5px]"
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
      {(meta as any)?.totalPages > 1 && (
        <div className="flex justify-end gap-2">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            {page}
          </span>
          <Button
            disabled={page === (meta as any).totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}

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
