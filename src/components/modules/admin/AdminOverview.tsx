import { useMemo, useState } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import { useGetAllParcelsQuery } from "@/redux/features/parcels/parcelApi";
import {
  PackageCheck,
  Truck,
  XCircle,
  Clock,
  DollarSign,
  Loader2,
  BarChart3,
  RotateCcw,
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

// Progress bar component
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

const AdminOverview = () => {
  // State
  const [page] = useState(1);
  const limit = 50;

  // Queries
  const {
    data: adminData,
    isLoading: adminLoading,
    isError: adminError,
  } = useUserInfoQuery();
  const { data, isLoading, isFetching, isError, refetch } =
    useGetAllParcelsQuery({ page, limit });

  // Normalize parcels data
  const parcels = Array.isArray(data?.data) ? data.data : [];

  // Stats calculation (useMemo always called)
  const stats = useMemo(() => {
    const total = parcels.length;
    const delivered = parcels.filter((p) => p.status === "DELIVERED").length;
    const pending = parcels.filter((p) =>
      [
        "REQUESTED",
        "APPROVED",
        "DISPATCHED",
        "IN_TRANSIT",
        "OUT_FOR_DELIVERY",
      ].includes(p.status)
    ).length;
    const returned = parcels.filter((p) => p.status === "RETURNED").length;
    const cancelled = parcels.filter((p) => p.status === "CANCELLED").length;
    const totalEarnings = parcels.reduce(
      (sum, p) => sum + (p.totalAmount || 0),
      0
    );

    return { total, delivered, pending, returned, cancelled, totalEarnings };
  }, [parcels]);

  const deliveredPercent = stats.total
    ? ((stats.delivered / stats.total) * 100).toFixed(1)
    : 0;
  const pendingPercent = stats.total
    ? ((stats.pending / stats.total) * 100).toFixed(1)
    : 0;
  const returnedPercent = stats.total
    ? ((stats.returned / stats.total) * 100).toFixed(1)
    : 0;

  // Handle loading
  if (adminLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );
  }

  // Handle error
  if (adminError || isError || !adminData?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <p className="text-red-500 font-semibold">
          Failed to load admin overview.
        </p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  // Admin data
  const admin = adminData.data;

  return (
    <div className="w-full px-4 md:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="text-blue-600 h-7 w-7" /> Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back, {admin.name?.split(" ")[0] || "Admin"}. Here’s a quick
            overview of platform performance.
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

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Role", value: admin.role },
          { title: "Email", value: admin.email },
          {
            title: "Joined On",
            value: new Date(admin.createdAt).toLocaleDateString(),
          },
        ].map((card) => (
          <Card
            key={card.title}
            className="dark:bg-[#101828] dark:border-gray-700 hover:shadow-sm rounded-[2.5px] transition"
          >
            <CardHeader>
              <CardTitle className="text-gray-700 dark:text-gray-300 text-base font-medium">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className={`text-lg font-semibold ${
                  card.title === "Role"
                    ? "capitalize text-primary"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Parcel Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-5">
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
            title: "Returned",
            value: stats.returned,
            icon: (
              <RotateCcw className="h-6 w-6 text-orange-500 bg-orange-100 p-1 rounded-[2px]" />
            ),
            color: "from-orange-500/10 to-orange-500/20",
          },
          {
            title: "Total Earnings",
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

      {/* Delivery Progress */}
      <Card className="rounded-xl border-none dark:bg-[#101828] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
            Delivery Progress Overview
          </CardTitle>
          <CardDescription>
            Summary of parcel performance across the platform.
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
            label="Returned"
            color="bg-orange-500"
            percent={returnedPercent}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
