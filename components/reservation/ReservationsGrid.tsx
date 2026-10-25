"use client";
import { Badge, Button, Grid } from "@/components/ui";
import { useReservations } from "@/hooks/useReservation";
import { STATUS_LABELS } from "@/lib/reservation/status";
import { useReservationStore } from "@/store/useReservationStore";
import { Column } from "@/types/common/grid";
import { Reservation, SortBy } from "@/types/reservation";
import { useState } from "react";
import ReservationDetailsModal from "./ReservationDetailsModal";

function ReservationsGrid() {
  const reservations = useReservations();
  const sortBy = useReservationStore((s) => s.sortBy);
  const sortOrder = useReservationStore((s) => s.sortOrder);
  const setSort = useReservationStore((s) => s.setSort);

  const [selectedReservation, setSelectedReservation] = useState<string>('')
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

  const handleSort = (key: string) => {
    const validKey = key as SortBy;
    const nextOrder = sortBy === validKey && sortOrder === "asc" ? "desc" : "asc";
    setSort(validKey, nextOrder);
  };

  const openReservationDetailsModal = (id: string) => {
    setSelectedReservation(id)
    setShowDetailsModal(true)
  }

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
        <div className="flex gap-2">
          <Button type="button" onClick={()=> openReservationDetailsModal(params.id)}>جزئیات</Button>
        </div>
      )
    },
  ];

  return (
    <>
      <div className="w-full">
        <Grid
          columns={columns}
          data={reservations}
          sort={{ key: sortBy, order: sortOrder }}
          onSort={handleSort}
        />
      </div>
      <ReservationDetailsModal
        reservationId={selectedReservation} 
        setReservationId={setSelectedReservation} 
        showModal={showDetailsModal} 
        setShowModal={setShowDetailsModal}
      />
    </>
  );
}

export default ReservationsGrid;
