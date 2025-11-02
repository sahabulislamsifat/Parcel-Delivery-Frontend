import { useMemo } from "react";
import { useGetMyParcelsQuery } from "@/redux/features/parcels/parcelApi";
import {
  PackageCheck,
  Truck,
  XCircle,
  Clock,
  DollarSign,
  Loader2,
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
import LoadingSpinner from "@/components/LoadingSpinner";

interface Parcel {
  _id: string;
  trackingId: string;
  type: string;
  weight: number;
  status: string;
  isPaid: boolean;
  totalAmount?: number;
}

const SenderOverview = () => {
  const { data, isLoading, refetch, isFetching } = useGetMyParcelsQuery({
    page: 1,
    limit: 5,
  });

  const parcels: Parcel[] = Array.isArray(data?.data) ? data.data : [];

  const stats = useMemo(() => {
    const total = parcels.length;
    const delivered = parcels.filter((p) => p.status === "DELIVERED").length;
    const pending = parcels.filter(
      (p) =>
        p.status === "REQUESTED" ||
        p.status === "APPROVED" ||
        p.status === "IN_TRANSIT" ||
        p.status === "OUT_FOR_DELIVERY"
    ).length;
    const cancelled = parcels.filter((p) => p.status === "CANCELLED").length;
    const totalEarnings = parcels
      .filter((p) => p.isPaid)
      .reduce((sum, p) => sum + (p.totalAmount ?? 0), 0);

    return { total, delivered, pending, cancelled, totalEarnings };
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
            Sender Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Overview of your recent parcel activity and earnings.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-none mt-4 md:mt-0 cursor-pointer"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {[
          {
            title: "Total Parcels",
            value: stats.total,
            icon: <PackageCheck className="h-5 w-5 text-blue-500" />,
          },
          {
            title: "Delivered",
            value: stats.delivered,
            icon: <Truck className="h-5 w-5 text-green-500" />,
          },
          {
            title: "Pending",
            value: stats.pending,
            icon: <Clock className="h-5 w-5 text-yellow-500" />,
          },
          {
            title: "Cancelled",
            value: stats.cancelled,
            icon: <XCircle className="h-5 w-5 text-red-500" />,
          },
          {
            title: "Earnings",
            value: `৳${stats.totalEarnings.toFixed(2)}`,
            icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
          },
        ].map((card) => (
          <Card
            key={card.title}
            className="rounded-none border dark:bg-[#101828] bg-white shadow-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
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

      {/* Recent Parcels */}
      <Card className="rounded-none border-none dark:bg-[#101828] bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Parcels</CardTitle>
          <CardDescription>Last 5 parcels you created.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : parcels.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No parcels found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parcels.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell>{p.trackingId}</TableCell>
                      <TableCell>{p.type}</TableCell>
                      <TableCell>{p.weight} kg</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-none ${
                            p.status === "DELIVERED"
                              ? "bg-green-100 text-green-700"
                              : p.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {p.status}
                        </span>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SenderOverview;
