"use client";
import { Badge, Button, Grid } from "@/components/ui";
import { useReservations } from "@/hooks/useReservation";
import { STATUS_LABELS } from "@/lib/reservation/status";
import { useReservationStore } from "@/store/useReservationStore";
import { Column } from "@/types/common/grid";
import { Reservation, SortBy } from "@/types/reservation";

function ReservationsGrid() {
  const reservations = useReservations();
  const sortBy = useReservationStore((s) => s.sortBy);
  const sortOrder = useReservationStore((s) => s.sortOrder);
  const setSort = useReservationStore((s) => s.setSort);
  const updateStatus = useReservationStore((s) => s.updateStatus);

  const handleSort = (key: string) => {
    const validKey = key as SortBy;
    const nextOrder = sortBy === validKey && sortOrder === "asc" ? "desc" : "asc";
    setSort(validKey, nextOrder);
  };

  const columns: Column<Reservation>[] = [
    {
      id: "customerName",
      key: "customerName",
      value: "نام مشتری",
    },
    {
      id: "customerPhone",
      key: "customerPhone",
      value: "شماره تماس",
    },
    {
      id: "service",
      key: "service",
      value: "خدمات",
    },
    {
      id: "date",
      key: "date",
      value: "تاریخ رزرو",
      sortKey: "date",
    },
    {
      id: "time",
      key: "time",
      value: "زمان رزرو",
      sortKey: "time",
    },
    {
      id: "status",
      key: "status",
      value: "وضعیت",
      render: (params) => (
        <Badge title={STATUS_LABELS[params.status]} className={`status-${params.status}`} />
      )
    },
    {
      id: "description",
      key: "description",
      value: "توضیحات",
    },
    {
      id: "actions",
      value: "عملیات",
      render: (params) => (
        params.status == 'pending' &&
        <div className="flex gap-2">
          <Button type="button" color="emerald" onClick={()=> updateStatus(params.id, 'confirmed')}>تایید</Button>
          <Button type="button" color="red" onClick={()=> updateStatus(params.id, 'cancelled')}>لغو</Button>
        </div>
      )
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
