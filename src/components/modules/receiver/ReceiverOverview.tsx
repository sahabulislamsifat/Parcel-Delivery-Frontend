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
  BarChart3,
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
import { motion } from "framer-motion";

const ReceiverOverview = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching, refetch, isError } =
    useGetReceiverStatsQuery(undefined);

  const stats = useMemo(() => {
    const s = data?.data || {};
    return {
      total: (s as any).total || 0,
      delivered: (s as any).delivered || 0,
      pending: (s as any).pending || 0,
      cancelled: (s as any).cancelled || 0,
      totalEarnings: (s as any).revenue || 0,
      recentParcels: [],
    };
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
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

  // simple % calculation for chart
  const deliveredPercent = stats.total
    ? ((stats.delivered / stats.total) * 100).toFixed(1)
    : 0;
  const pendingPercent = stats.total
    ? ((stats.pending / stats.total) * 100).toFixed(1)
    : 0;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {[
          {
            title: "Total Parcels",
            value: stats.total,
            icon: (
              <PackageCheck className="h-6 w-6 text-blue-500 bg-blue-100 p-1 rounded-[2px]" />
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
          <div>
            <p className="text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
              Delivered ({deliveredPercent}%)
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${deliveredPercent}%` }}
              ></div>
            </div>
          </div>

          <div>
            <p className="text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
              Pending ({pendingPercent}%)
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full transition-all"
                style={{ width: `${pendingPercent}%` }}
              ></div>
            </div>
          </div>
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

export default ReceiverOverview;
