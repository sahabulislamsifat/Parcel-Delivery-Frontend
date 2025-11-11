/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  Truck,
  Clock,
  Loader2,
  PackageCheck,
  Eye,
  RotateCcw,
  CheckCircle,
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
import {
  useGetIncomingParcelsQuery,
  useGetParcelByIdQuery,
} from "@/redux/features/parcels/parcelApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import ParcelDetailsModal from "../parcels/ParcelDetailsModal";

const IncomingParcels = () => {
  const [page, setPage] = useState(1);
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const limit = 10;

  // Fetch all incoming parcels
  const { data, isLoading, isFetching, refetch } = useGetIncomingParcelsQuery({
    page,
    limit,
  });

  const parcels = Array.isArray(data?.data) ? data.data : [];
  const meta = data || { totalPages: 1, page: 1 };

  // Fetch single parcel details when modal open
  useGetParcelByIdQuery(selectedParcelId!, { skip: !selectedParcelId });

  // Stats calculation
  const stats = useMemo(() => {
    const validParcels = parcels.filter((p: any) => p && typeof p === "object");
    const total = validParcels.length;
    const delivered = validParcels.filter(
      (p: any) => p.status === "DELIVERED"
    ).length;
    const pending = validParcels.filter((p: any) =>
      ["REQUESTED", "IN_TRANSIT", "OUT_FOR_DELIVERY"].includes(p.status)
    ).length;
    const returned = validParcels.filter(
      (p: any) => p.status === "RETURNED"
    ).length;

    return { total, delivered, pending, returned };
  }, [parcels]);

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
            Incoming Parcels
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            View your current incoming parcels.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          {
            title: "Total Parcels",
            value: stats.total,
            icon: <PackageCheck className="h-5 w-5 text-blue-500" />,
          },
          {
            title: "Delivered",
            value: stats.delivered,
            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          },
          {
            title: "Pending",
            value: stats.pending,
            icon: <Clock className="h-5 w-5 text-yellow-500" />,
          },
          {
            title: "Returned",
            value: stats.returned,
            icon: <RotateCcw className="h-5 w-5 text-red-500" />,
          },
        ].map((card) => (
          <Card
            key={card.title}
            className="rounded-[2.5px] border dark:bg-[#101828] bg-white shadow-sm"
          >
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Parcels Table */}
      <Card
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        className="rounded-[2.5px] border-none dark:bg-[#101828] bg-white"
      >
        <CardHeader>
          <CardTitle className="text-xl font-bold">Incoming Parcels</CardTitle>
          <CardDescription>
            List of parcels waiting for delivery confirmation.
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
                    <TableHead>View</TableHead>
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
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="View Details"
                          onClick={() => setSelectedParcelId(p._id)}
                          className="rounded-[2.5px]"
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
      {meta && (meta as any).totalPages > 1 && (
        <div className="flex justify-end gap-2">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
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

export default IncomingParcels;
