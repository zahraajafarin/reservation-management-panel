import { ReactNode } from "react";

export type Column<T> = {
  key: keyof T;
  value: string;
  className?: string;
  sortKey?: string;
  render?: (item: T) => ReactNode;
};

export type Row = {
  values: ReactNode[];
};

export type SortState = {
  key: string;
  order: "asc" | "desc";
};

export type GridProps<T> = {
  columns: Column<T>[];
  data: T[];
  sort?: SortState;
  onSort?: (key: string) => void;
  className?: string;
};
