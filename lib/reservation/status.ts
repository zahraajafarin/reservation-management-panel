import { ReservationStatus } from "@/types/reservation";

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: "درانتظار",
  confirmed: "تاییدشده",
  cancelled: "لغوشده",
};
