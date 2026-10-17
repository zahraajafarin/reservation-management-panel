import { Reservation } from "@/types/reservation";
import { ReservationStatus } from "@/types/status";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MOCK_RESERVATIONS } from "@/lib/mock-data";

type SortBy = "date" | "time";
type SortOrder = "asc" | "desc";
type StatusFilter = ReservationStatus | "all";

type ReservationStore = {
  reservations: Reservation[];
  searchQuery: string;
  statusFilter: StatusFilter;
  sortBy: SortBy;
  sortOrder: SortOrder;

  addReservation: (data: Omit<Reservation, "id" | "status">) => void;
  updateStatus: (id: string, status: ReservationStatus) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setSort: (sortBy: SortBy, sortOrder: SortOrder) => void;
};

export const useReservationStore = create<ReservationStore>()(
  persist(
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
      getReservationsByCustomerName: (customerName: string) =>
        get().reservations.filter((r) => r.customerName === customerName),
      getReservationsByCustomerPhone: (customerPhone: string) =>
        get().reservations.filter((r) => r.customerPhone === customerPhone),
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setStatusFilter: (filter: StatusFilter) => set({ statusFilter: filter }),
      setSort: (sortBy: SortBy, sortOrder: SortOrder) => set({ sortBy, sortOrder }),
    }),
    {
      name: "reservation-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
