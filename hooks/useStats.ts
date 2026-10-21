"use client";

import { useMemo } from "react";
import { useReservationStore } from "@/store/useReservationStore";

// export function getStats(reservations: Reservation[]) {
//   const today = getToday();

//   return reservations.reduce(
//     (acc, r) => {
//       acc.total++;
//       if (r.date === today) acc.today++;
//       if (r.status === "confirmed") acc.confirmed++;
//       if (r.status === "cancelled") acc.cancelled++;
//       return acc;
//     },
//     { total: 0, today: 0, confirmed: 0, cancelled: 0 },
//   );
// }

export function useStats() {
    const reservations = useReservationStore((s) => s.reservations);
    const stats = useMemo(() => {
        const grouped = Object.groupBy(reservations, (r) => r.status);
        console.log({grouped});
        return [{confirmed: 3, canceled: 2}]
      }, [reservations]);
    return stats;

  }
  
