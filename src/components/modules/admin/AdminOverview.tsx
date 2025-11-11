import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import ParcelAnalytics from "./ParcelAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminOverview = () => {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );

  if (isError || !data?.data)
    return (
      <div className="text-center text-red-500 font-semibold">
        Failed to load admin info.
      </div>
    );

  const admin = data?.data;

  return (
    <div className="p-6 space-y-10 w-full mx-auto">
      {/* ===== Admin Header Section ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back, {admin.name?.split(" ")[0] || "Admin"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Here’s a quick summary of your platform performance today.
          </p>
        </div>
      </div>

      {/* ===== Quick Info Section ===== */}
      <div
        data-aos="flip-up"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <Card className="dark:bg-[#101828] dark:border-gray-700 hover:shadow-sm rounded-[2.5px] transition">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-300 text-base font-medium">
              Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold capitalize text-primary">
              {admin.role}
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-[#101828] dark:border-gray-700 hover:shadow-sm rounded-[2.5px] transition">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-300 text-base font-medium">
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {admin.email}
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-[#101828] dark:border-gray-700 hover:shadow-sm rounded-[2.5px] transition">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-300 text-base font-medium">
              Joined On
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {new Date(admin.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ===== Parcel Analytics Section ===== */}
      <div className="mt-8">
        <ParcelAnalytics />
      </div>
    </div>
  );
};

export default AdminOverview;
