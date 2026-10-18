import { ReservationStatus } from "@/types/reservation";


export const STATUS_STYLES: Record<ReservationStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  cancelled: "bg-red-50 text-red-700 ring-red-600/20",
};

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: "در انتظار",
  confirmed: "تأییدشده",
  cancelled: "لغوشده",
};
