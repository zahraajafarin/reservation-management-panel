export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export const STATUS_LABELS: Record<ReservationStatus, string> = {
    pending: "در انتظار",
    confirmed: "تأییدشده",
    cancelled: "لغوشده",
  };