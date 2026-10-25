'use client'
import { useState } from "react";
import { Button } from "@/components/ui";
import ReservationSearch from "./ReservationSearch";
import ReservationModal from "./ReservationModal";

function SearchReservationSection() {

    const [showModal, setShowModal] = useState<boolean>(false)
 
  return (
    <>
        <div className="grid grid-cols sm:grid-cols-2 py-4 items-end">
            <ReservationSearch />
            <div className="grid gap-2 justify-end">

            <Button onClick={() => setShowModal(true)}>ثبت رزرو جدید</Button>
            </div>
        </div>
        <ReservationModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default SearchReservationSection
