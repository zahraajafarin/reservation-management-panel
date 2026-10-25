"use client";
import { useEffect, useState } from "react";
import { Input, Select } from "@/components/ui";
import { useReservationStore } from "@/store/useReservationStore";
import { statusFilterOptions } from "@/lib/constants/status";
import { StatusFilter } from "@/types/reservation";

function ReservationSearch() {
  const setSearchQuery = useReservationStore((s) => s.setSearchQuery);
  const setStatusFilter = useReservationStore((s) => s.setStatusFilter);
  const [searchInput, setSearchInput] = useState<string>('')
  const [filterStatusInput, setFilterStatusInput] = useState<StatusFilter>('all')

  useEffect(() => {
      const timeoutId = setTimeout(() => {
        setSearchQuery(searchInput);
      }, 500);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [searchInput, setSearchQuery]);

    useEffect(() => {
      setStatusFilter(filterStatusInput);
    }, [filterStatusInput, setStatusFilter]);

  return (
    <div className="grid grid-cols sm:grid-cols-2 gap-2 ">
      <Input label="جستجو" name="search" onChange={(e) => setSearchInput(e.target.value)} placeholder="نام یا شماره مشتری" />
      <Select 
        label="وضعیت"
        options={statusFilterOptions}
        value={filterStatusInput}
        onChange={(value)=>setFilterStatusInput(value)}
      />
    </div>
  );
}
export default ReservationSearch;