"use client";

import { useMemo } from "react";
import { useReservationStore } from "@/store/useReservationStore";
import {
  searchReservations,
  filterByStatus,
  sortReservations,
} from "@/lib/reservationSelectors";

export function useReservations() {
  const reservations = useReservationStore((s) => s.reservations);
  const searchQuery = useReservationStore((s) => s.searchQuery);
  const statusFilter = useReservationStore((s) => s.statusFilter);
  const sortBy = useReservationStore((s) => s.sortBy);
  const sortOrder = useReservationStore((s) => s.sortOrder);

  const visibleReservations = useMemo(() => {
    const searched = searchReservations(reservations, searchQuery);
    const filtered = filterByStatus(searched, statusFilter);
    return sortReservations(filtered, sortBy, sortOrder);
  }, [reservations, searchQuery, statusFilter, sortBy, sortOrder]);

  return visibleReservations;
}