import { Reservation } from "@/types/reservation";
import { ReservationStatus } from "@/types/status";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SortBy = "date" | "time";
type SortOrder = "asc" | "desc";
type StatusFilter = ReservationStatus | "all";

type ReservationStore = {
  reservations: Reservation[];
  searchQuery: string;
  statusFilter: StatusFilter;
  sortBy: SortBy;
  sortOrder: SortOrder;

  //crud operations
  addReservation: (reservation: Reservation) => void;
  updateReservation: (reservation: Reservation) => void;
  deleteReservation: (id: string) => void;
  getReservationById: (id: string) => Reservation | undefined;
  //search operations
  getReservationsByCustomerName: (customerName: string) => Reservation[];
  getReservationsByCustomerPhone: (customerPhone: string) => Reservation[];
  getReservationsByService: (service: string) => Reservation[];
  getReservationsByStatus: (status: ReservationStatus) => Reservation[];
  getReservationsByDate: (date: string) => Reservation[];
  getReservationsByTime: (time: string) => Reservation[];
  //sorting operations

  updateStatus: (id: string, status: ReservationStatus) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setSort: (sortBy: SortBy, sortOrder: SortOrder) => void;
};

export const useReservationStore = create<ReservationStore>()(
  persist(
    (set, get) => ({
      reservations: [],
      searchQuery: "",
      statusFilter: "all",
      sortBy: "date",
      sortOrder: "asc",
      addReservation: (reservation: Reservation) =>
        set((state) => ({
          reservations: [...state.reservations, reservation],
        })),
      updateReservation: (reservation: Reservation) =>
        set((state) => ({
          reservations: state.reservations.map((r) =>
            r.id === reservation.id ? reservation : r,
          ),
        })),
      deleteReservation: (id: string) =>
        set((state) => ({
          reservations: state.reservations.filter((r) => r.id !== id),
        })),
      getReservationById: (id: string) =>
        get().reservations.find((r) => r.id === id),
      getReservationsByCustomerName: (customerName: string) =>
        get().reservations.filter((r) => r.customerName === customerName),
      getReservationsByCustomerPhone: (customerPhone: string) =>
        get().reservations.filter((r) => r.customerPhone === customerPhone),
      getReservationsByService: (service: string) =>
        get().reservations.filter((r) => r.service === service),
      getReservationsByStatus: (status: ReservationStatus) =>
        get().reservations.filter((r) => r.status === status),
      getReservationsByDate: (date: string) =>
        get().reservations.filter((r) => r.date === date),
      getReservationsByTime: (time: string) =>
        get().reservations.filter((r) => r.time === time),
      updateStatus: (id: string, status: ReservationStatus) =>
        set((state) => ({
          reservations: state.reservations.map((r) =>
            r.id === id ? { ...r, status } : r,
          ),
        })),
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

interface ReservationState {
  // state
  reservations: Reservation[];
  searchQuery: string;
  statusFilter: StatusFilter;
  sortBy: SortBy;
  sortOrder: SortOrder;

  // actions
  addReservation: (data: Omit<Reservation, "id" | "status">) => void;
  updateStatus: (id: string, status: ReservationStatus) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setSort: (sortBy: SortBy, sortOrder: SortOrder) => void;
}
