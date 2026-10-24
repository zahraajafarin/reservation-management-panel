'use client'
import { SubmitEvent, useState } from "react";
import { Button, Input, Modal } from "@/components/ui";
import { useReservationStore } from "@/store/useReservationStore";
import { ReservationFormValues } from "@/types/reservation";
import {Textarea} from "@/components/ui";
import { reservationSchema } from "@/schema/addNewReservationForm";
import { ValidationError } from "yup";

import type { Dispatch, SetStateAction } from "react";

export type ReservationModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

function ReservationModal({showModal, setShowModal}: ReservationModalProps) {
    const addReservation = useReservationStore((s) => s.addReservation);

    const [newReservationInput, setNewReservationInput] = useState<ReservationFormValues>({
        customerName: '',
        customerPhone: '',
        date: '',
        time: '',
        service: '',
        description: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({});

     const hanndleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    const valid = await reservationSchema.validate(newReservationInput, {
      abortEarly: false,
    });
    setErrors({});
    onSubmit(valid);
  } catch (err) {
    if (err instanceof ValidationError) {
      const next: Record<string, string> = {};
      err.inner.forEach((issue) => {
        if (issue.path && !next[issue.path]) next[issue.path] = issue.message;
      });
      setErrors(next);
    }
  }
  }

   const onSubmit = (formData: ReservationFormValues) => {
    addReservation({
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      date: formData.date,
      time: formData.time,
      service: formData.service,
    })
  }

  return (
    <Modal title="افزودن رزرو جدید" isOpen={showModal} onClose={() => setShowModal(false)} >
            <div>
                <form onSubmit={hanndleSubmit} 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input label="نام و نام خانوادگی" name="customerName" error={errors.customerName} onChange={(e) => setNewReservationInput({...newReservationInput, customerName: e.target.value})} placeholder="نام و نام خانوادگی" />
                    <Input label="شماره تلفن" name="customerPhone" dir="ltr" error={errors.customerPhone} onChange={(e) => setNewReservationInput({...newReservationInput, customerPhone: e.target.value})} placeholder="09..." />
                    <Input label="تاریخ رزرو" name="date" type="date" error={errors.date} onChange={(e) => setNewReservationInput({...newReservationInput, date: e.target.value})} />
                    <Input label="زمان رزرو" name="time" type="time" error={errors.time} onChange={(e) => setNewReservationInput({...newReservationInput, time: e.target.value})} />
                    <Input label="نوع خدمات" name="service" error={errors.service} onChange={(e) => setNewReservationInput({...newReservationInput, service: e.target.value})} placeholder="نوع خدمات" />
                    <div className="col-span-full">
                        <Textarea label="توضیحات" name="description" onChange={(e) => setNewReservationInput({...newReservationInput, description: e.target.value})} placeholder="توضیحات (اختیاری)"/>
                    </div>
                    <div className="col-span-full flex justify-end gap-2 pt-2">
                        <Button type="submit">ثبت رزرو</Button>
                    </div>
                </form>
            </div>
        </Modal>
  )
}

export default ReservationModal