import { Reservation } from "@/types/reservation";
import { ReservationStatus } from "@/types/status";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ReservationStore = {
    reservations: Reservation[];
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
}

export const useReservationStore = create<ReservationStore>()(
    persist((set, get) => ({
        reservations: [],
        addReservation: (reservation: Reservation) => set((state) => ({ reservations: [...state.reservations, reservation] })),
        updateReservation: (reservation: Reservation) => set((state) => ({ reservations: state.reservations.map((r) => r.id === reservation.id ? reservation : r) })),
        deleteReservation: (id: string) => set((state) => ({ reservations: state.reservations.filter((r) => r.id !== id) })),
        getReservationById: (id: string) => get().reservations.find((r) => r.id === id),
        getReservationsByCustomerName: (customerName: string) => get().reservations.filter((r) => r.customerName === customerName),
        getReservationsByCustomerPhone: (customerPhone: string) => get().reservations.filter((r) => r.customerPhone === customerPhone),
        getReservationsByService: (service: string) => get().reservations.filter((r) => r.service === service),
        getReservationsByStatus: (status: ReservationStatus) => get().reservations.filter((r) => r.status === status),
        getReservationsByDate: (date: string) => get().reservations.filter((r) => r.date === date),
        getReservationsByTime: (time: string) => get().reservations.filter((r) => r.time === time),
    }), {
    name: "reservation-store",
    storage: createJSONStorage(() => localStorage),
}))