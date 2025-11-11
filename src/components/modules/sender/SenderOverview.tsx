import { useMemo } from "react";
import { useGetMyParcelsQuery } from "@/redux/features/parcels/parcelApi";
import {
  PackageCheck,
  Truck,
  XCircle,
  Clock,
  DollarSign,
  Loader2,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useNavigate } from "react-router";

const SenderOverview = () => {
  const { data, isLoading, refetch, isFetching, isError } =
    useGetMyParcelsQuery({ page: 1, limit: 50 });
  const navigate = useNavigate();

  const parcels = Array.isArray(data?.data) ? data.data : [];
  const totalParcels = data?.total ?? parcels.length;

  // Memoized stats calculation
  const stats = useMemo(() => {
    const delivered = parcels.filter((p) => p.status === "DELIVERED").length;
    const cancelled = parcels.filter((p) => p.status === "CANCELLED").length;
    const pending = parcels.filter((p) =>
      [
        "REQUESTED",
        "APPROVED",
        "DISPATCHED",
        "IN_TRANSIT",
        "OUT_FOR_DELIVERY",
      ].includes(p.status)
    ).length;

    // Always calculate earnings safely
    const totalEarnings = parcels.reduce((sum, p) => {
      const amount =
        typeof p.totalAmount === "number"
          ? p.totalAmount
          : (p.codAmount || 0) - (p.deliveryCharge || 0);
      return sum + amount;
    }, 0);

    return {
      total: totalParcels,
      delivered,
      pending,
      cancelled,
      totalEarnings,
    };
  }, [parcels, totalParcels]);

  const deliveredPercent = stats.total
    ? ((stats.delivered / stats.total) * 100).toFixed(1)
    : 0;
  const pendingPercent = stats.total
    ? ((stats.pending / stats.total) * 100).toFixed(1)
    : 0;
  const cancelledPercent = stats.total
    ? ((stats.cancelled / stats.total) * 100).toFixed(1)
    : 0;

  const recentParcels = useMemo(() => {
    return [...parcels]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [parcels]);

  return (
    <div className="w-full px-4 md:px-8 space-y-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-80">
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
          <p className="text-gray-500 dark:text-gray-300">
            Failed to load sender overview.
          </p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <BarChart3 className="text-blue-600 h-7 w-7" /> Sender Dashboard
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Overview of your parcel activities and earnings.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
              className="rounded-[2px] mt-4 md:mt-0 flex items-center"
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
                icon: (
                  <PackageCheck className="h-6 w-6 text-[#009CFE] bg-blue-100 p-1 rounded-[2px]" />
                ),
                color: "from-blue-500/10 to-blue-500/20",
              },
              {
                title: "Delivered",
                value: stats.delivered,
                icon: (
                  <Truck className="h-6 w-6 text-green-500 bg-green-100 p-1 rounded-[2px]" />
                ),
                color: "from-green-500/10 to-green-500/20",
              },
              {
                title: "Pending",
                value: stats.pending,
                icon: (
                  <Clock className="h-6 w-6 text-yellow-500 bg-yellow-100 p-1 rounded-[2px]" />
                ),
                color: "from-yellow-500/10 to-yellow-500/20",
              },
              {
                title: "Cancelled",
                value: stats.cancelled,
                icon: (
                  <XCircle className="h-6 w-6 text-red-500 bg-red-100 p-1 rounded-[2px]" />
                ),
                color: "from-red-500/10 to-red-500/20",
              },
              {
                title: "Earnings",
                value: `৳${stats.totalEarnings.toFixed(2)}`,
                icon: (
                  <DollarSign className="h-6 w-6 text-emerald-500 bg-emerald-100 p-1 rounded-[2px]" />
                ),
                color: "from-emerald-500/10 to-emerald-500/20",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`rounded-[2px] border bg-gradient-to-br ${card.color} dark:bg-[#101828] shadow-sm hover:shadow-md transition`}
                >
                  <CardHeader className="flex justify-between pb-2 items-center">
                    <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {card.title}
                    </CardTitle>
                    {card.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {card.value}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Delivery Progress Overview */}
          <Card className="rounded-xl border-none dark:bg-[#101828] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Delivery Performance
              </CardTitle>
              <CardDescription>
                Summary of your recent parcel activity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressItem
                label="Delivered"
                color="bg-green-500"
                percent={deliveredPercent}
              />
              <ProgressItem
                label="Pending"
                color="bg-yellow-500"
                percent={pendingPercent}
              />
              <ProgressItem
                label="Cancelled"
                color="bg-red-500"
                percent={cancelledPercent}
              />
            </CardContent>
          </Card>

          {/* Recent Parcels Section */}
          <Card className="rounded-[2px] border-none dark:bg-[#101828] bg-white">
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">
                  Recent Parcels
                </CardTitle>
                <CardDescription>Last 5 parcels you created.</CardDescription>
              </div>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                onClick={() => navigate("/sender-dashboard/my-parcels")}
              >
                See More <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {recentParcels.length === 0 ? (
                <p className="text-center text-gray-500 py-6">
                  No parcels found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left p-3">Tracking ID</th>
                        <th className="text-left p-3">Type</th>
                        <th className="text-left p-3">Weight</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentParcels.map((p) => (
                        <tr
                          key={p._id}
                          className="border-b dark:border-gray-700"
                        >
                          <td className="p-3">{p.trackingId}</td>
                          <td className="p-3">{p.type ?? "N/A"}</td>
                          <td className="p-3">{p.weight ?? 0} kg</td>
                          <td className="p-3">
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
                          </td>
                          <td className="p-3">
                            {p.isPaid ? (
                              <span className="text-green-600 font-medium">
                                Paid
                              </span>
                            ) : (
                              <span className="text-red-500 font-medium">
                                Unpaid
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

// Progress Item Component
const ProgressItem = ({
  label,
  color,
  percent,
}: {
  label: string;
  color: string;
  percent: string | number;
}) => (
  <div>
    <p className="text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
      {label} ({percent}%)
    </p>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className={`${color} h-3 rounded-full transition-all`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  </div>
);

export default SenderOverview;
