export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type Reservation = {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  service: string;
  description?: string;
  status: ReservationStatus;
};

export type SortBy = "date" | "time";
export type SortOrder = "asc" | "desc";
export type StatusFilter = ReservationStatus | "all";

export type ReservationFormValues = {
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  service: string;
  description?: string;
  status: ReservationStatus;
};