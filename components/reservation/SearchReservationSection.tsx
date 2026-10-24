'use client'
import { useState } from "react";
import { Button } from "@/components/ui";
import ReservationSearch from "./ReservationSearch";
import ReservationModal from "./ReservationModal";

function SearchReservationSection() {

    const [showModal, setShowModal] = useState<boolean>(false)
 
  return (
    <>
        <div className="flex py-4 justify-between items-end">
            <ReservationSearch />
            <Button onClick={() => setShowModal(true)}>ثبت رزرو جدید</Button>
        </div>
        <ReservationModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default SearchReservationSection
