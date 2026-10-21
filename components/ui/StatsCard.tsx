import { StatsCardProps } from "@/types/common/StatsCard"


function StatsCard({ title, value, className = "" }:StatsCardProps) {
    return (
      <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      </div>
    );
  }

export default StatsCard