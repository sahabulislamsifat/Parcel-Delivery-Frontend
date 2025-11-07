/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyTrackParcelQuery } from "@/redux/features/parcels/parcelApi";
import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { Loader2, PackageSearch, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import type { Parcel } from "@/redux/features/parcels/parcelApi";
import ParcelDetailsModal from "@/components/modules/parcels/ParcelDetailsModal";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState("");
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);

  const [triggerTrackParcel, { data, isLoading, isFetching, isError }] =
    useLazyTrackParcelQuery();

  const trackingData: Parcel | undefined = data?.data;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      setError("Please enter a valid tracking ID.");
      return;
    }
    setError("");

    const toastId = toast.loading("Tracking parcel...");

    try {
      const res = await triggerTrackParcel(trackingId).unwrap();
      if (res?.data) {
        toast.success("Parcel found!", { id: toastId });
      } else {
        toast.error("No parcel found with this Tracking ID.", { id: toastId });
        setError("No parcel found with this Tracking ID.");
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Tracking failed. Please check your ID.",
        { id: toastId }
      );
      setError("No parcel found with this Tracking ID.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="w-full px-4 md:px-8 py-16">
      <Card className="rounded-[2.5px] border-none dark:bg-[#101828] bg-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            Track Your Parcel
          </CardTitle>
          <CardDescription>
            Enter your tracking ID below to see your delivery progress
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Search Form */}
          <form
            onSubmit={handleTrack}
            className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 mt-4"
          >
            <input
              type="text"
              placeholder="Enter Tracking ID (e.g., TRK-20250821-325934)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-full px-4 py-[6px] border border-gray-300 dark:border-gray-700 dark:bg-[#101828] dark:text-gray-200 focus:outline-none rounded-[2.5px] focus:ring-2 focus:ring-[#009CFE] transition-colors duration-300"
            />
            <Button
              type="submit"
              disabled={isFetching}
              className="rounded-[2.5px] flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {isFetching ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Tracking...
                </>
              ) : (
                <>
                  <FaSearchLocation size={18} />
                  Track Parcel
                </>
              )}
            </Button>
          </form>

          {/* Error Message */}
          {error && (
            <p className="text-center text-red-500 mt-4 font-medium">{error}</p>
          )}
          {isError && !error && (
            <p className="text-center text-red-500 mt-4 font-medium">
              Failed to fetch tracking data.
            </p>
          )}

          {/* Empty State */}
          {!trackingData && !isFetching && !error && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <PackageSearch className="h-10 w-10 mb-2" />
              <p>Enter your tracking ID to view parcel details.</p>
            </div>
          )}

          {/* Parcel Summary */}
          {trackingData && (
            <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-[#101828] rounded-[2.5px] shadow-sm p-6 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Parcel Summary
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mb-6">
                <p>
                  <span className="font-medium">Tracking ID:</span>{" "}
                  {trackingData.trackingId}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-[2px] rounded text-xs font-semibold ${
                      trackingData.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : trackingData.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {trackingData.status}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Type:</span> {trackingData.type}
                </p>
                <p>
                  <span className="font-medium">Weight:</span>{" "}
                  {trackingData.weight} kg
                </p>
                <p>
                  <span className="font-medium">Total Amount:</span> ৳
                  {trackingData.totalAmount}
                </p>
                <p>
                  <span className="font-medium">Delivery Date:</span>{" "}
                  {trackingData.deliveryDate
                    ? new Date(trackingData.deliveryDate).toDateString()
                    : "Pending"}
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="rounded-[2.5px] bg-[#101828] text-white hover:bg-[#0a1627] flex items-center gap-2"
                  onClick={() => setSelectedParcelId(trackingData._id)}
                >
                  <Eye className="h-4 w-4 text-blue-400" />
                  View Full Details
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reusable Parcel Details Modal */}
      {selectedParcelId && (
        <ParcelDetailsModal
          parcelId={selectedParcelId}
          onClose={() => setSelectedParcelId(null)}
        />
      )}
    </div>
  );
};

export default TrackParcel;
