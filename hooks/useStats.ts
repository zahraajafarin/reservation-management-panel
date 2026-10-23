"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { useReservationStore } from "@/store/useReservationStore";
import { getDaysFromToday } from "@/lib/utils/date";
import type { ReservationStatus } from "@/types/reservation";

type Stats = {
  total: number;
  today: number;
  byStatus: Record<ReservationStatus, number>;
};

export function useStats() {
  const reservations = useReservationStore((s) => s.reservations);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      setToday(getDaysFromToday(0));
    });
  }, []);

  const groupedByStatus = useMemo(() => {
    return reservations.reduce<Stats>(
      (acc, reservation) => {
        acc.total++;
        if (reservation.date === today) acc.today++;
        acc.byStatus[reservation.status]++;
        return acc;
      },
      {
        total: 0,
        today: 0,
        byStatus: { pending: 0, confirmed: 0, cancelled: 0 },
      },
    );
  }, [reservations, today])

  return groupedByStatus;
}