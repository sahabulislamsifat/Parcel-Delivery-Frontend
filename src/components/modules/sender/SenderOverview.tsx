import { useMemo } from "react";
import { useGetMyParcelsQuery } from "@/redux/features/parcels/parcelApi";
import {
  PackageCheck,
  Truck,
  XCircle,
  Clock,
  DollarSign,
  Loader2,
  ArrowRight,
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
import { useNavigate } from "react-router";

const SenderOverview = () => {
  //  Fetch parcels with a higher limit for overview
  const { data, isLoading, refetch, isFetching } = useGetMyParcelsQuery({
    page: 1,
    limit: 50,
  });

  const router = useNavigate();

  //  Safely extract parcel array
  const parcels = useMemo(() => {
    if (!data?.data) return [];
    return Array.isArray(data.data) ? data.data : [];
  }, [data?.data]);

  //  Get total count from API response (if backend supports it)
  const totalParcels = data?.total ?? parcels.length;

  //  Sort by createdAt (newest first) and take 5 latest parcels
  const recentParcels = useMemo(() => {
    return [...parcels]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [parcels]);

  //  Compute stats for cards
  const stats = useMemo(() => {
    const delivered = parcels.filter((p) => p.status === "DELIVERED").length;
    const cancelled = parcels.filter((p) => p.status === "CANCELLED").length;
    const pending = parcels.filter(
      (p) =>
        p.status === "REQUESTED" ||
        p.status === "APPROVED" ||
        p.status === "DISPATCHED" ||
        p.status === "IN_TRANSIT" ||
        p.status === "OUT_FOR_DELIVERY"
    ).length;

    return {
      total: totalParcels,
      delivered,
      pending,
      cancelled,
      totalEarnings: parcels
        .filter((p) => p.isPaid)
        .reduce((sum, p) => sum + (p.totalAmount ?? 0), 0),
    };
  }, [parcels, totalParcels]);

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
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Sender Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Overview of your parcel activities and earnings.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-[2.5px] mt-4 md:mt-0 cursor-pointer"
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
            className="rounded-[2.5px] border dark:bg-[#101828] bg-white shadow-sm"
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
      <Card className="rounded-[2.5px] border-none dark:bg-[#101828] bg-white">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">Recent Parcels</CardTitle>
            <CardDescription>Last 5 parcels you created.</CardDescription>
          </div>
          {/* See More Button */}
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            onClick={() => router("/sender-dashboard/my-parcels")}
          >
            See More <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {recentParcels.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No parcels found.</p>
          ) : (
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
              className="overflow-x-auto"
            >
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
                  {recentParcels.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell>{p.trackingId}</TableCell>
                      <TableCell>{p.type ?? "N/A"}</TableCell>
                      <TableCell>{p.weight ?? 0} kg</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-[2.5px] ${
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
