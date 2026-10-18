import { Reservation, ReservationStatus, SortBy, SortOrder, StatusFilter } from "@/types/reservation";

import { create } from "zustand";
import { MOCK_RESERVATIONS } from "@/lib/mock-data";

type ReservationStore = {
  reservations: Reservation[];
  searchQuery: string;
  statusFilter: StatusFilter;
  sortBy: SortBy;
  sortOrder: SortOrder;

  addReservation: (data: Omit<Reservation, "id" | "status">) => void;
  getReservationById: (id: string) => Reservation | undefined;
  updateStatus: (id: string, status: ReservationStatus) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setSort: (sortBy: SortBy, sortOrder: SortOrder) => void;
};

export const useReservationStore = create<ReservationStore>(
  (set, get) => ({
      reservations: MOCK_RESERVATIONS,
      searchQuery: "",
      statusFilter: "all",
      sortBy: "date",
      sortOrder: "asc",
      addReservation: (data) =>
        set((state) => ({
          reservations: [
            { ...data, id: crypto.randomUUID(), status: "pending" },
            ...state.reservations,
          ],
        })),
      getReservationById: (id: string) =>
        get().reservations.find((r) => r.id === id),
      updateStatus: (id: string, status: ReservationStatus) =>
        set((state) => ({
          reservations: state.reservations.map((r) =>
            r.id === id ? { ...r, status } : r,
          ),
        })),
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setStatusFilter: (filter: StatusFilter) => set({ statusFilter: filter }),
      setSort: (sortBy: SortBy, sortOrder: SortOrder) =>
        set({ sortBy, sortOrder }),
    })
);
