"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui";
import { useReservationStore } from "@/store/useReservationStore";

function ReservationSearch() {
  const setSearchQuery = useReservationStore((s) => s.setSearchQuery);
  const [searchInput, setSearchInput] = useState<string>('')

  useEffect(() => {
      const timeoutId = setTimeout(() => {
        setSearchQuery(searchInput);
      }, 500);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [searchInput, setSearchQuery]);

  return (
    <Input label="جستجو" name="search" onChange={(e) => setSearchInput(e.target.value)} placeholder="نام یا شماره مشتری" />
  );
}
export default ReservationSearch;