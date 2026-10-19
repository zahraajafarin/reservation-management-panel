"use client";
import { Grid } from "@/components/ui";
import { useReservationStore } from "@/store/useReservationStore";
import { Column } from "@/types/common/grid";
import { Reservation, SortBy } from "@/types/reservation";
import { log } from "console";

function ReservationsGrid() {
  const reservations = useReservationStore((s) => s.reservations);
  const sortBy = useReservationStore((s) => s.sortBy);
  const sortOrder = useReservationStore((s) => s.sortOrder);
  const setSort = useReservationStore((s) => s.setSort);

  const handleSort = (key: string) => {
    const k = key as SortBy;
    const nextOrder = sortBy === k && sortOrder === "asc" ? "desc" : "asc";
    setSort(k, nextOrder);
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
