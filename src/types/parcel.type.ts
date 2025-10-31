export type ParcelStatus =
  | "REQUESTED" // User just created the parcel
  | "APPROVED" // Admin approved the request
  | "DISPATCHED" // Parcel handed to courier
  | "IN_TRANSIT" // Currently moving between hubs
  | "OUT_FOR_DELIVERY" // Courier is out to deliver
  | "DELIVERED" // Successfully delivered to receiver
  | "CANCELLED" // Cancelled by user or admin
  | "RETURNED" // Returned to sender
  | "BLOCKED"; // Blocked due to admin restriction
