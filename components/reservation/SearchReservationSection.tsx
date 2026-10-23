'use client'
import { useEffect, useState } from "react";
import { Button, Input, Modal } from "@/components/ui";
import { useReservationStore } from "@/store/useReservationStore";
import { ReservationFormValues } from "@/types/reservation";
import Textarea from "../ui/Teaxtarea";

function SearchReservationSection() {
const setSearchQuery = useReservationStore((s) => s.setSearchQuery);
const [searchInput, setSearchInput] = useState<string>('')
const [showModal, setShowModal] = useState<boolean>(false)
const [newReservationInput, setNewReservationInput] = useState<ReservationFormValues>({
    customerName: '',
    customerPhone: '',
    date: '',
    time: '',
    service: '',
    status: 'pending',
    description: '',
})

useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput, setSearchQuery]);

  const onSubmit = (formData: ReservationFormValues) => {
    console.log({formData});
    
  }
  return (
    <>
        <div className="flex py-4 justify-between items-end">
            <Input label="جستجو" name="search" onChange={(e) => setSearchInput(e.target.value)} placeholder="نام یا شماره مشتری" />
            <Button onClick={() => setShowModal(true)}>ثبت رزرو جدید</Button>
        </div>
        <Modal title="افزودن رزرو جدید" isOpen={showModal} onClose={() => setShowModal(false)} >
            <div>
                <form onSubmit={()=> onSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input label="نام و نام خانوادگی" name="customerName" onChange={(e) => setNewReservationInput({...newReservationInput, customerName: e.target.value})} placeholder="نام و نام خانوادگی" />
                    <Input label="شماره تلفن" name="customerPhone" dir="ltr" onChange={(e) => setNewReservationInput({...newReservationInput, customerPhone: e.target.value})} placeholder="09..." />
                    <Input label="تاریخ رزرو" name="date" type="date" onChange={(e) => setNewReservationInput({...newReservationInput, date: e.target.value})} />
                    <Input label="زمان رزرو" name="time" type="time" onChange={(e) => setNewReservationInput({...newReservationInput, time: e.target.value})} />
                    <Input label="نوع خدمات" name="service" onChange={(e) => setNewReservationInput({...newReservationInput, service: e.target.value})} placeholder="نوع خدمات" />
                    <div className="col-span-full">
                        <Textarea label="توضیحات" name="description" onChange={(e) => setNewReservationInput({...newReservationInput, description: e.target.value})} placeholder="توضیحات (اختیاری)"/>
                    </div>
                    <div className="col-span-full flex justify-end gap-2 pt-2">
                        <Button type="submit">ثبت رزرو</Button>
                    </div>
                </form>
            </div>
        </Modal>
    </>
  )
}

export default SearchReservationSection
