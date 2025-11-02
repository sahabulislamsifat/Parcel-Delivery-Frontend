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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import LoadingSpinner from "@/components/LoadingSpinner";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const [triggerTrackParcel, { data, isLoading, isFetching, isError }] =
    useLazyTrackParcelQuery();

  const trackingData = data?.data;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError("Please enter a valid tracking ID.");
      return;
    }
    setError("");

    try {
      const res = await triggerTrackParcel(trackingId).unwrap();
      if (res?.data) {
        toast.success("Parcel found!");
      } else {
        setError("No parcel found with this Tracking ID.");
        toast.error("Tracking failed. Please check your ID.");
      }
    } catch {
      setError("No parcel found with this Tracking ID.");
      toast.error("Tracking failed. Please check your ID.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );

  return (
    <div className="w-full px-4 md:px-8 py-16">
      <Card className="rounded-none border-none dark:bg-[#101828] bg-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            Track Your Parcel
          </CardTitle>
          <CardDescription>
            Enter your tracking ID below to see your delivery progress
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Search Bar */}
          <form
            onSubmit={handleTrack}
            className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 mt-4"
          >
            <input
              type="text"
              placeholder="Enter Tracking ID (e.g., TRK-20250821-325934)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-full px-4 py-[6px] border border-gray-300 dark:border-gray-700 dark:bg-[#101828] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009CFE] transition-colors duration-300"
            />
            <Button
              type="submit"
              disabled={isFetching}
              className="rounded-none flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {isFetching ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <FaSearchLocation size={18} />
              )}
              {isFetching ? "Tracking..." : "Track Parcel"}
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

          {/* Success Card */}
          {trackingData && (
            <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-[#101828]  rounded-none shadow-sm p-6 transition-colors duration-300">
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
                  <span className="text-[#009CFE] font-semibold">
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
                  <span className="font-medium">Price:</span> ৳
                  {trackingData.price}
                </p>
                <p>
                  <span className="font-medium">Delivery Charge:</span> ৳
                  {trackingData.deliveryCharge}
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
                  className="rounded-none flex bg-[#101828] cursor-pointer items-center gap-2"
                  onClick={() => setShowDialog(true)}
                >
                  <Eye className="h-4 w-4 text-blue-500" />
                  View Full Details
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Parcel Details Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-none dark:bg-[#101828] border-none">
          {trackingData ? (
            <>
              <DialogHeader className="pb-4 border-b">
                <DialogTitle className="text-2xl font-bold">
                  Parcel Details
                </DialogTitle>
                <DialogDescription>
                  Complete tracking information for your parcel
                </DialogDescription>
              </DialogHeader>

              {/* Parcel Info */}
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Parcel Info</h3>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <strong>Type:</strong> {trackingData.type}
                    </li>
                    <li>
                      <strong>Weight:</strong> {trackingData.weight} kg
                    </li>
                    <li>
                      <strong>Price:</strong> ৳{trackingData.price}
                    </li>
                    <li>
                      <strong>Delivery Charge:</strong> ৳
                      {trackingData.deliveryCharge}
                    </li>
                    <li>
                      <strong>Total Amount:</strong> ৳{trackingData.totalAmount}
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Delivery Info</h3>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <strong>Delivery Date:</strong>{" "}
                      {trackingData.deliveryDate
                        ? new Date(
                            trackingData.deliveryDate
                          ).toLocaleDateString()
                        : "Not scheduled"}
                    </li>
                    <li>
                      <strong>Payment:</strong>{" "}
                      {trackingData.isPaid ? (
                        <span className="text-green-600 font-medium">Paid</span>
                      ) : (
                        <span className="text-red-500 font-medium">Unpaid</span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sender & Receiver */}
              <div className="grid md:grid-cols-2 gap-6 border-t pt-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sender Info</h3>
                  <p className="text-sm">
                    <strong>Name:</strong> {trackingData.sender?.name}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {trackingData.sender?.email}
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> {trackingData.sender?.phone}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {trackingData.senderAddress}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Receiver Info</h3>
                  <p className="text-sm">
                    <strong>Name:</strong> {trackingData.receiver?.name}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {trackingData.receiver?.email}
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> {trackingData.receiver?.phone}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {trackingData.receiverAddress}
                  </p>
                </div>
              </div>

              {/* Status Logs */}
              {trackingData.statusLogs?.length > 0 && (
                <div className="border-t pt-4 mt-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Delivery Status History
                  </h3>
                  <ul className="space-y-3">
                    {trackingData.statusLogs.map((log: any, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                      >
                        <span className="mt-1 w-2 h-2 bg-[#009CFE] rounded-full"></span>
                        <div>
                          <p className="font-medium">
                            {log.status}{" "}
                            <span className="text-sm text-gray-500">
                              ({new Date(log.timestamp).toLocaleString()})
                            </span>
                          </p>
                          {log.note && (
                            <p className="text-sm text-gray-500 italic">
                              {log.note}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center py-6">
              No tracking data found.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrackParcel;
