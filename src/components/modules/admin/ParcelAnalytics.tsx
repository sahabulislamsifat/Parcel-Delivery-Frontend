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
  Truck,
  XCircle,
  Clock,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetParcelStatisticsQuery } from "@/redux/features/parcels/parcelApi";

// Colors
const PIE_COLORS = ["#16a34a", "#3b82f6", "#ef4444", "#facc15"];
// const LINE_COLOR = "#6366f1";

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

  const stats = data.data;

  const chartData = [
    { name: "Delivered", value: stats.delivered },
    { name: "In Transit", value: stats.inTransit },
    { name: "Cancelled", value: stats.cancelled },
    { name: "Pending", value: stats.pending },
  ];

  // Example trend data (you can replace with monthly data if your backend supports it)
  const trendData = [
    {
      month: "Jan",
      Delivered: 45,
      "In Transit": 30,
      Cancelled: 10,
      Pending: 20,
    },
    {
      month: "Feb",
      Delivered: 55,
      "In Transit": 25,
      Cancelled: 8,
      Pending: 18,
    },
    {
      month: "Mar",
      Delivered: 60,
      "In Transit": 22,
      Cancelled: 6,
      Pending: 15,
    },
    {
      month: "Apr",
      Delivered: 70,
      "In Transit": 20,
      Cancelled: 5,
      Pending: 12,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Parcel Analytics Overview
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Insights into deliveries, cancellations, and overall performance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {[
          {
            title: "Total Parcels",
            value: stats.total,
            icon: <PackageCheck className="text-indigo-500 w-7 h-7" />,
            color: "border-indigo-500/20",
          },
          {
            title: "Delivered",
            value: stats.delivered,
            icon: <PackageCheck className="text-green-500 w-7 h-7" />,
            color: "border-green-500/20",
          },
          {
            title: "In Transit",
            value: stats.inTransit,
            icon: <Truck className="text-blue-500 w-7 h-7" />,
            color: "border-blue-500/20",
          },
          {
            title: "Cancelled",
            value: stats.cancelled,
            icon: <XCircle className="text-red-500 w-7 h-7" />,
            color: "border-red-500/20",
          },
          {
            title: "Pending",
            value: stats.pending,
            icon: <Clock className="text-yellow-500 w-7 h-7" />,
            color: "border-yellow-500/20",
          },
          {
            title: "Total Revenue",
            value: `৳ ${stats.revenue.toLocaleString()}`,
            icon: <Wallet className="text-emerald-500 w-7 h-7" />,
            color: "border-emerald-500/20",
          },
        ].map((card, idx) => (
          <Card
            key={idx}
            className={`rounded-none ${card.color} dark:bg-[#101828] dark:border-gray-700 transition hover:shadow-md`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="p-6 bg-white dark:bg-gray-900 hover:shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Delivery Status Breakdown
          </h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="p-6 bg-white dark:bg-gray-900 hover:shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Monthly Parcel Trends
          </h3>
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
                  dataKey="In Transit"
                  stroke="#3b82f6"
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
                  dataKey="Pending"
                  stroke="#facc15"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelAnalytics;
