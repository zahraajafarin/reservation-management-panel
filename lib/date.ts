export const daysFromToday = (offset: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d;
};

export const dateFormatter = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
