import { ReservationStatus } from "./status";

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