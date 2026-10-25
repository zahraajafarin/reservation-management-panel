# Reservation Management Panel

A Persian (RTL) admin panel for managing reservations and customers of a service business. This is a front-end only project: data is mocked and lives in browser memory.

## Tech Stack

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- Zustand for state management
- Yup for form validation

## Getting Started

```bash
git clone <repository-url>
cd reservation-management-panel
npm install
npm run dev
```

The app runs at `http://localhost:3000`. To create a production build:

```bash
npm run build
npm start
```

## Features

- [x] Stats cards: total, today's, confirmed and cancelled reservations
- [x] Reservations table showing customer name, phone, service, date, time and status (as a badge)
- [x] Sorting by date or time from the column headers
- [x] Customer search by name or phone number (debounced)
- [x] New reservation modal with validation and Persian error messages
- [x] Filter by reservation status
- [x] Reservation details view
- [x] Change reservation status
- [x] Success and error messages (toast)

## Project Structure

```
app/                    Pages and root layout
components/
  ui/                   Generic components (Button, Input, Textarea, Badge, Modal, Grid, StatsCard)
  reservation/          Reservation-specific components (stats, toolbar, search, form)
hooks/                  Reusable logic (useReservations, useStats, ...)
lib/                    Pure functions (selectors, date helpers, status labels and styles)
schema/                 Yup validation schema
store/                  Zustand store
types/                  TypeScript types
```

## Technical Decisions

**Source state is separate from derived data.** The store only holds the reservations plus the search, filter and sort settings. The visible list and the stats are computed from that state with pure functions in `lib/` and `useMemo`, so there is no duplicated data to keep in sync. These functions never mutate their input arrays.

**Statuses are a union type.** `ReservationStatus` is a union, and each status's label and style is defined with `Record<ReservationStatus, ...>`. If a new status is added and its label is forgotten, TypeScript reports an error.

**A generic Grid component.** `Grid<T extends { id: string }>` receives its columns as an array. Simple columns use a `key`, while custom ones (status, actions) use `render`. Rows are keyed by the reservation `id` rather than the array index, so they render correctly after filtering and sorting. Sortable headers are real buttons with `aria-sort`, so they work with a keyboard and screen readers.

**Date and time format.** Dates are stored as `YYYY-MM-DD` and times as `HH:mm`, so plain string comparison sorts them correctly.

**"Today" is read only in the browser.** Next.js prerenders pages at build time, and reading the current time during render would freeze the build date into the output. For that reason today's date is read after mount in the browser, and the mock data is generated with dates relative to the current day.

**RTL.** The page direction is set in the root layout, and styles use logical properties (`text-start`, `ms-*`, `ps-*`) so the layout does not depend on direction.

**Validation.** The Yup schema lives in its own file, and the form logic lives in the `useReservationForm` hook so the component only contains JSX. Phone numbers are normalized from Persian digits to English before validation, and past dates are rejected.

**No persistence.** Data resets to the initial mock set on refresh, since the task does not require a backend or database.