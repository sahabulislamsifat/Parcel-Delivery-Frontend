/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  Truck,
  PackageCheck,
  Clock,
  XCircle,
  DollarSign,
  Loader2,
  ArrowRight,
  BarChart3,
  RotateCcw,
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
import { useGetIncomingParcelsQuery } from "@/redux/features/parcels/parcelApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";

const ReceiverOverview = () => {
  const page = useState(1);
  const limit = 10;
  const navigate = useNavigate();
  const { data, isLoading, isFetching, refetch, isError } =
    useGetIncomingParcelsQuery({ page: page[0], limit });

  const parcels = Array.isArray(data?.data) ? data.data : [];

  //  Calculate stats (same logic as IncomingParcels)
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
    const cancelled = validParcels.filter(
      (p: any) => p.status === "CANCELLED"
    ).length;
    const totalEarnings = validParcels.reduce(
      (sum: number, p: any) => sum + (p.deliveryCharge || 0),
      0
    );

    return { total, delivered, pending, returned, cancelled, totalEarnings };
  }, [parcels]);

  // ✅ Loading state
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );

  // ✅ Error state
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <p className="text-gray-500 dark:text-gray-300">
          Failed to load receiver overview.
        </p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );

  // ✅ Simple % calculations
  const deliveredPercent = stats.total
    ? ((stats.delivered / stats.total) * 100).toFixed(1)
    : 0;
  const pendingPercent = stats.total
    ? ((stats.pending / stats.total) * 100).toFixed(1)
    : 0;
  const returnedPercent = stats.total
    ? ((stats.returned / stats.total) * 100).toFixed(1)
    : 0;

  // ✅ Render UI
  return (
    <div className="w-full px-4 md:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <BarChart3 className="text-blue-600 h-7 w-7" /> Receiver Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track and monitor your parcel activities in real time.
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
            title: "Total Spent",
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

      {/* Progress Section */}
      <Card className="rounded-xl border-none dark:bg-[#101828] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
            Delivery Progress Overview
          </CardTitle>
          <CardDescription>
            Summary of your recent parcel performance.
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

      {/* Navigation Shortcuts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        <Button
          onClick={() => navigate("/receiver-dashboard/incoming-parcels")}
          className="w-full rounded-[2px] flex items-center cursor-pointer justify-center gap-2"
        >
          View Incoming Parcels <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => navigate("/receiver-dashboard/confirm-delivery")}
          className="w-full rounded-[2px] cursor-pointer flex items-center justify-center gap-2"
        >
          View Confirm or Return Parcels <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// ✅ Progress bar helper
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

export default ReceiverOverview;
