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

interface Props {
  parcelId: string;
  onClose: () => void;
}

const ParcelStatusLogsModal = ({ parcelId, onClose }: Props) => {
  const { data, isLoading } = useGetParcelByIdQuery(parcelId, {
    skip: !parcelId,
  });

  const logs = data?.data?.statusLogs || [];

  return (
    <Dialog open={!!parcelId} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-[2.5px] dark:bg-[#101828] border-none">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Parcel Status Logs
          </DialogTitle>
          <DialogDescription>
            Timeline of all delivery updates for this parcel.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        ) : logs.length > 0 ? (
          <ul className="space-y-3 max-h-[350px] overflow-y-auto px-2 mt-2">
            {logs.map((log: any, idx: number) => (
              <li
                key={idx}
                className="flex items-start gap-3 border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <span className="mt-1 w-2 h-2 bg-[#009CFE] rounded-full"></span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {log.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(log.timestamp || log.updatedAt).toLocaleString()}
                  </p>
                  {log.note && (
                    <p className="text-sm text-gray-400 mt-1 italic">
                      {log.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-6 text-gray-500">
            No status history found.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ParcelStatusLogsModal;
