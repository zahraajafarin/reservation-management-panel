export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type Reservation = {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  service: string;
  description?: string;
  status: ReservationStatus;
};

export type SortBy = "date" | "time";
export type SortOrder = "asc" | "desc";
export type StatusFilter = ReservationStatus | "all";

export type ReservationStore = {
  reservations: Reservation[];
  searchQuery: string;
  statusFilter: StatusFilter;
  sortBy: SortBy;
  sortOrder: SortOrder;

  addReservation: (data: Omit<Reservation, "id" | "status">) => void;
  getReservationById: (id: string) => Reservation | undefined;
  updateStatus: (id: string, status: ReservationStatus) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setSort: (sortBy: SortBy, sortOrder: SortOrder) => void;
};


export type ReservationFormValues = {
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  service: string;
  description?: string;
};