'use client'
import { StatsCard } from "@/components/ui";
import { useStats } from "@/hooks/useStats";
import { STATUS_LABELS } from "@/lib/reservation/status";

function StatsSection() {
  const stats = useStats()

  const cards = [
    {
      key: 'total',
      title: "کل رزروها",
      value: stats.total,
    },
    {
      key: 'today',
      title: "رزروهای امروز",
      value: stats.today,
    },
    {
      key: 'confirmed',
      title: `رزروهای ${STATUS_LABELS.confirmed}`,
      value: stats.byStatus.confirmed,
      className: 'status-confirmed',
    },
    {
      key: 'cancelled',
      title: `رزروهای ${STATUS_LABELS.cancelled}`,
      value: stats.byStatus.cancelled,
      className: 'status-cancelled',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatsCard
          key={card.key}
          title={card.title}
          value={card.value}
          className={card.className}
        />
      ))}
    </div>
  )
}

export default StatsSection