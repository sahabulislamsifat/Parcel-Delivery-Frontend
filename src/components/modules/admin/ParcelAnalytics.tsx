/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  Loader2,
  PackageCheck,
  XCircle,
  Clock,
  Wallet,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetParcelStatisticsQuery } from "@/redux/features/parcels/parcelApi";

// Pie chart colors
const PIE_COLORS = ["#16a34a", "#3b82f6", "#ef4444", "#facc15", "#f97316"];

const ParcelAnalytics = () => {
  const { data, isLoading, isError } = useGetParcelStatisticsQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  if (isError || !data?.data)
    return (
      <div className="text-center text-red-500 font-semibold">
        Failed to load parcel statistics.
      </div>
    );

  const stats = data.data || {
    total: 0,
    delivered: 0,
    pending: 0,
    cancelled: 0,
    returned: 0,
    revenue: 0,
  };

  const pieData = [
    { name: "Delivered", value: (stats as any).delivered },
    { name: "Pending", value: (stats as any).pending },
    { name: "Cancelled", value: (stats as any).cancelled },
    { name: "Returned", value: (stats as any).returned },
  ];

  // Example trend data (replace with API data if available)
  const trendData = [
    { month: "Jan", Delivered: 45, Pending: 20, Cancelled: 10, Returned: 5 },
    { month: "Feb", Delivered: 55, Pending: 18, Cancelled: 8, Returned: 3 },
    { month: "Mar", Delivered: 60, Pending: 15, Cancelled: 6, Returned: 4 },
    { month: "Apr", Delivered: 70, Pending: 12, Cancelled: 5, Returned: 2 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Parcel Analytics Overview
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Insights into deliveries, cancellations, returns, and overall
          performance.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-5">
        {[
          {
            title: "Total Parcels",
            value: (stats as any).total,
            icon: <PackageCheck className="text-indigo-500 w-7 h-7" />,
            color: "border-indigo-500/20",
          },
          {
            title: "Delivered",
            value: (stats as any).delivered,
            icon: <PackageCheck className="text-green-500 w-7 h-7" />,
            color: "border-green-500/20",
          },
          {
            title: "Pending",
            value: (stats as any).pending,
            icon: <Clock className="text-yellow-500 w-7 h-7" />,
            color: "border-yellow-500/20",
          },
          {
            title: "Cancelled",
            value: (stats as any).cancelled,
            icon: <XCircle className="text-red-500 w-7 h-7" />,
            color: "border-red-500/20",
          },
          {
            title: "Returned",
            value: (stats as any).returned,
            icon: <RotateCcw className="text-orange-500 w-7 h-7" />,
            color: "border-orange-500/20",
          },
          {
            title: "Total Revenue",
            value: `৳ ${(stats as any).revenue.toLocaleString()}`,
            icon: <Wallet className="text-emerald-500 w-7 h-7" />,
            color: "border-emerald-500/20",
          },
        ].map((card, idx) => (
          <Card
            key={idx}
            className={`rounded-[2.5px] ${card.color} dark:bg-[#101828] dark:border-gray-700 transition hover:shadow-md`}
          >
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-gray-700 dark:text-gray-300 text-base font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="p-6 bg-white dark:bg-gray-900 rounded-[2.5px] border border-gray-200 dark:border-gray-700 hover:shadow-sm">
          <CardTitle className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Delivery Status Breakdown
          </CardTitle>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Line Chart */}
        <Card className="p-6 bg-white dark:bg-gray-900 rounded-[2.5px] border border-gray-200 dark:border-gray-700 hover:shadow-sm">
          <CardTitle className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Monthly Parcel Trends
          </CardTitle>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Delivered"
                  stroke="#16a34a"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="Pending"
                  stroke="#facc15"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="Cancelled"
                  stroke="#ef4444"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="Returned"
                  stroke="#f97316"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParcelAnalytics;
