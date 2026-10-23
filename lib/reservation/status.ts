import { ReservationStatus } from "@/types/reservation";

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: "در انتظار",
  confirmed: "تاییدشده",
  cancelled: "لغوشده",
};
