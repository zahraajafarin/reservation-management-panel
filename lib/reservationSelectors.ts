import {
  Reservation,
  SortBy,
  SortOrder,
  StatusFilter,
} from "@/types/reservation";

export const filterByStatus = (
  reservations: Reservation[],
  status: StatusFilter,
): Reservation[] => {
    if (status === "all") return reservations;
    return reservations.filter((reservation) => reservation.status === status)
};

export const sortReservations = (
  reservations: Reservation[],
  sortBy: SortBy,
  sortOrder: SortOrder,
): Reservation[] => {
  const direction = sortOrder === "asc" ? 1 : -1;
  return reservations.sort((a, b) => {
    const dateCmp = a.date.localeCompare(b.date);
    const timeCmp = a.time.localeCompare(b.time);
    const result = sortBy === "date" ? dateCmp || timeCmp : timeCmp || dateCmp;

    return result * direction
  });
};
