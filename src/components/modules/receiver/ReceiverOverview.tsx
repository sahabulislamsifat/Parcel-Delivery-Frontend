/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  Truck,
  PackageCheck,
  Clock,
  XCircle,
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
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useGetReceiverStatsQuery } from "@/redux/features/parcels/parcelApi";
import LoadingSpinner from "@/components/LoadingSpinner";

const ReceiverOverview = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching, refetch, isError } =
    useGetReceiverStatsQuery(undefined);

  const stats = useMemo(() => {
    const s = data?.data || {};
    return {
      total: s.total || 0,
      delivered: s.delivered || 0,
      pending: s.pending || 0,
      cancelled: s.cancelled || 0,
      totalEarnings: s.revenue || 0,
      recentParcels: Array.isArray(s.recentParcels) ? s.recentParcels : [],
    };
  }, [data]);

  // console.log(data);
  // console.log(stats);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <p className="text-gray-500 dark:text-gray-300">
          Failed to load receiver overview.
        </p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );

  return (
    <div className="w-full px-4 md:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Receiver Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Overview of your parcel activities.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-none mt-4 md:mt-0 flex items-center"
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
            title: "Total Spent",
            value: `৳${stats.totalEarnings.toFixed(2)}`,
            icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
          },
        ].map((card) => (
          <Card
            key={card.title}
            className="rounded-none border dark:bg-[#101828] bg-white shadow-sm"
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

      {/* Recent Parcels */}
      <Card className="rounded-none border-none dark:bg-[#101828] bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Parcels</CardTitle>
          <CardDescription>Latest parcels you’ve received.</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentParcels.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No recent parcels found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 px-3 font-semibold">Tracking ID</th>
                    <th className="py-2 px-3 font-semibold">Sender</th>
                    <th className="py-2 px-3 font-semibold">Status</th>
                    <th className="py-2 px-3 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentParcels.map((p: any) => (
                    <tr
                      key={p._id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <td className="py-2 px-3">{p.trackingId}</td>
                      <td className="py-2 px-3">{p.sender?.name || "-"}</td>
                      <td className="py-2 px-3">
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
                      </td>
                      <td className="py-2 px-3">৳{p.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Shortcuts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        <Button
          onClick={() => navigate("/receiver-dashboard/incoming-parcels")}
          className="w-full rounded-none flex items-center cursor-pointer justify-center gap-2"
        >
          View Incoming Parcels <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => navigate("/receiver-dashboard/delivery-history")}
          className="w-full rounded-none cursor-pointer flex items-center justify-center gap-2"
        >
          View Delivery History <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ReceiverOverview;
