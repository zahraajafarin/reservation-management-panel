import ReservationsGrid from "@/components/reservation/ReservationsGrid";
import SearchReservationSection from "@/components/reservation/SearchReservationSection";
import StatsSection from "@/components/reservation/StatsSection";

export default function Home() {
  return (
      <main className="container py-8 sm:py-12">
        <StatsSection />
        <h2 className="my-5">لیست رزروها</h2>
        <SearchReservationSection />
        <ReservationsGrid />
      </main>
  );
}
