/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGetParcelByIdQuery } from "@/redux/features/parcels/parcelApi";
import { Loader2 } from "lucide-react";

interface ParcelDetailsModalProps {
  parcelId: string;
  onClose: () => void;
}

const ParcelDetailsModal = ({ parcelId, onClose }: ParcelDetailsModalProps) => {
  const { data: parcelDetails, isFetching } = useGetParcelByIdQuery(parcelId, {
    skip: !parcelId,
  });

  const parcel = parcelDetails?.data;

  return (
    <Dialog open={!!parcelId} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2.5px] dark:bg-[#101828] border-none">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">
            Parcel Details
          </DialogTitle>
          <DialogDescription>
            Comprehensive info and status history of this parcel
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin h-6 w-6 text-primary" />
          </div>
        ) : parcel ? (
          <div className="space-y-6 py-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h2 className="text-lg font-semibold">
                  Tracking ID: {parcel.trackingId}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Created at {new Date(parcel.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-[2.5px] text-sm font-semibold ${
                  parcel.status === "DELIVERED"
                    ? "bg-green-100 text-green-700"
                    : parcel.status === "CANCELLED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {parcel.status}
              </span>
            </div>

            {/* Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Parcel Info</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <strong>Type:</strong> {parcel.type}
                  </li>
                  <li>
                    <strong>Weight:</strong> {parcel.weight} kg
                  </li>
                  <li>
                    <strong>Price:</strong> ৳{parcel.price}
                  </li>
                  <li>
                    <strong>Delivery Charge:</strong> ৳{parcel.deliveryCharge}
                  </li>
                  <li>
                    <strong>Total Amount:</strong> ৳{parcel.totalAmount}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Delivery Info</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <strong>Delivery Date:</strong>{" "}
                    {parcel.deliveryDate
                      ? new Date(parcel.deliveryDate).toLocaleDateString()
                      : "Not scheduled"}
                  </li>
                  {parcel.actualDeliveryDate && (
                    <li>
                      <strong>Delivered At:</strong>{" "}
                      {new Date(parcel.actualDeliveryDate).toLocaleString()}
                    </li>
                  )}
                  <li>
                    <strong>Payment:</strong>{" "}
                    {parcel.isPaid ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-red-500 font-medium">Unpaid</span>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {/* Sender & Receiver */}
            <div className="grid md:grid-cols-2 gap-4 border-t pt-3">
              <div>
                <h3 className="text-lg font-semibold mb-1">Sender Info</h3>
                <p className="text-sm">
                  <strong>Name:</strong> {parcel.sender?.name}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {parcel.sender?.email}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {parcel.sender?.phone}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {parcel.senderAddress}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Receiver Info</h3>
                <p className="text-sm">
                  <strong>Name:</strong> {parcel.receiver?.name}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {parcel.receiver?.email}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {parcel.receiver?.phone}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {parcel.receiverAddress}
                </p>
              </div>
            </div>

            {/* Status Logs */}
            {parcel.statusLogs?.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  Delivery Status History
                </h3>
                <ul className="space-y-3">
                  {parcel.statusLogs.map((log: any, i: number) => (
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
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">No details found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ParcelDetailsModal;
