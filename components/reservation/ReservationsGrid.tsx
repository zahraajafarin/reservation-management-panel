"use client";
import { Badge, Grid } from "@/components/ui";
import { useReservations } from "@/hooks/useReservation";
import { STATUS_LABELS } from "@/lib/reservation/status";
import { useReservationStore } from "@/store/useReservationStore";
import { Column } from "@/types/common/grid";
import { Reservation, SortBy } from "@/types/reservation";
import { log } from "console";

function ReservationsGrid() {
  const reservations = useReservations();
  const sortBy = useReservationStore((s) => s.sortBy);
  const sortOrder = useReservationStore((s) => s.sortOrder);
  const setSort = useReservationStore((s) => s.setSort);

  const handleSort = (key: string) => {
    console.log({key});
    
    const k = key as SortBy;
    const nextOrder = sortBy === k && sortOrder === "asc" ? "desc" : "asc";
    setSort(k, nextOrder);
    console.log({sortBy, sortOrder});
    
  };

  const columns: Column<Reservation>[] = [
    {
      key: "id",
      value: "شناسه",
    },
    {
      key: "customerName",
      value: "نام مشتری",
    },
    {
      key: "customerPhone",
      value: "شماره تماس",
    },
    {
      key: "service",
      value: "خدمات",
    },
    {
      key: "date",
      value: "تاریخ رزرو",
      sortKey: "date",
    },
    {
      key: "time",
      value: "زمان رزرو",
      sortKey: "time",
    },
    {
      key: "status",
      value: "وضعیت",
      render: (params) => (
        <Badge title={STATUS_LABELS[params.status]} className={`status-${params.status}`} />
      )
    },
    {
      key: "description",
      value: "توضیحات",
    },
  ];

  return (
    <div className="w-full">
      <Grid
        columns={columns}
        data={reservations}
        sort={{ key: sortBy, order: sortOrder }}
        onSort={handleSort}
      />
    </div>
  );
}

export default ReservationsGrid;
