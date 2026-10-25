'use client'
import { Badge, Button, Modal } from "@/components/ui";
import { STATUS_LABELS } from "@/lib/reservation/status";
import { useReservationStore } from "@/store/useReservationStore";

import type { Dispatch, SetStateAction } from "react";

export type ReservationModalProps = {
  reservationId: string,
  setReservationId: Dispatch<SetStateAction<string>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900">{children}</dd>
    </div>
  );
}


function ReservationDetailsModal({reservationId, setReservationId, showModal, setShowModal}:ReservationModalProps) {
    const reservation = useReservationStore((s) => s.getReservationById(reservationId));
    const updateStatus = useReservationStore((s) => s.updateStatus);
    const onClose = () => {
        setReservationId('')
        setShowModal(false)
    }
  return (
    <Modal title="جزئیات رزرو" isOpen={!!reservation} onClose={onClose}>
      {reservation && (
        <>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Item label="نام مشتری">{reservation.customerName}</Item>
            <Item label="شماره تماس">
              <span dir="ltr">{reservation.customerPhone}</span>
            </Item>
            <Item label="نوع خدمت">{reservation.service}</Item>
            <Item label="وضعیت">
              <Badge
                title={STATUS_LABELS[reservation.status]}
                className={`status-${reservation.status}`}
              />
            </Item>
            <Item label="تاریخ">{reservation.date}</Item>
            <Item label="ساعت">{reservation.time}</Item>
            <div className="sm:col-span-2">
              <Item label="توضیحات">{reservation.description || "—"}</Item>
            </div>
          </dl>

          {reservation.status === "pending" && (
            <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
              <Button color="red" onClick={() => updateStatus(reservationId, "cancelled")}>
                لغو رزرو
              </Button>
              <Button color="emerald" onClick={() => updateStatus(reservationId, "confirmed")}>
                تأیید رزرو
              </Button>
            </div>
          )}
        </>
      )}
    </Modal>
  )
}

export default ReservationDetailsModal
