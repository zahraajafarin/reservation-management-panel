import { SelectOption } from "@/components/ui/Select";
import { StatusFilter } from "@/types/reservation";
import { STATUS_LABELS } from "../reservation/status";
import type { ReservationStatus } from "@/types/reservation"; 

const STATUS_OPTIONS: SelectOption<ReservationStatus>[] = (
  Object.keys(STATUS_LABELS) as ReservationStatus[]
).map((status) => ({
  value: status,
  label: STATUS_LABELS[status],
}));

export const statusFilterOptions: SelectOption<StatusFilter>[] = [
  { value: "all", label: "همه" },
  ...STATUS_OPTIONS,
];