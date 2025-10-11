/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [error, setError] = useState("");

  // Simulated tracking handler (replace with backend call later)
  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      setError("Please enter a valid tracking ID.");
      setTrackingData(null);
      return;
    }

    setError("");

    // Simulated tracking result
    if (trackingId === "PX123456") {
      setTrackingData({
        id: "PX123456",
        status: "Out for Delivery",
        location: "Dhaka, Bangladesh",
        expectedDate: "October 13, 2025",
        history: [
          { date: "Oct 10", event: "Parcel booked from sender" },
          { date: "Oct 11", event: "In transit to central hub" },
          { date: "Oct 12", event: "Arrived at Dhaka sorting center" },
          { date: "Oct 13", event: "Out for delivery" },
        ],
      });
    } else {
      setTrackingData(null);
      setError("No parcel found with this Tracking ID.");
    }
  };

  return (
    <div className="px-4 py-16 mx-auto w-11/12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Track Your Parcel
        </h2>
        <p className="text-gray-600 mt-3">
          Enter your tracking ID below to get the latest status of your
          delivery.
        </p>
      </div>

      {/* Tracking Form */}
      <form
        onSubmit={handleTrack}
        className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3"
      >
        <input
          type="text"
          placeholder="Enter Tracking ID (e.g., PX123456)"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#009CFE]"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-[#009CFE] hover:bg-[#005DB5] cursor-pointer text-white font-semibold px-6 py-3 transition duration-300 whitespace-nowrap"
        >
          <FaSearchLocation size={20} />
          <span>Track Parcel</span>
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 mt-4 font-medium">{error}</p>
      )}

      {/* Tracking Result */}
      {trackingData && (
        <div className="max-w-2xl mx-auto mt-10 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Tracking Details
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Tracking ID:</span>{" "}
              {trackingData.id}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className="text-[#009CFE] font-semibold">
                {trackingData.status}
              </span>
            </p>
            <p>
              <span className="font-medium">Current Location:</span>{" "}
              {trackingData.location}
            </p>
            <p>
              <span className="font-medium">Expected Delivery:</span>{" "}
              {trackingData.expectedDate}
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Delivery Progress
            </h4>
            <ul className="space-y-2">
              {trackingData.history.map((step: any, index: number) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-gray-700"
                >
                  <span className="w-2 h-2 bg-[#009CFE] rounded-full"></span>
                  <p>
                    <span className="font-medium">{step.date}:</span>{" "}
                    {step.event}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="text-center mt-12">
        <p className="text-gray-600">
          Need help with your delivery?{" "}
          <a
            href="/support"
            className="text-[#009CFE] hover:underline font-medium"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default TrackParcel;
