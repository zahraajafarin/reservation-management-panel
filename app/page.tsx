import ReservationsGrid from "@/components/reservation/ReservationsGrid";
import StatsSection from "@/components/reservation/StatsSection";

export default function Home() {
  return (
    <div className="flex ">
      <main className="flex w-full flex-col container items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="bg-red-100 w-full">hi</div>
        <StatsSection />
        <h2 className="my-5">لیست رزروها</h2>
        <div>
        </div>
        <ReservationsGrid />
      </main>
    </div>
  );
}
