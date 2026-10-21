'use client'
import { StatsCard } from "@/components/ui";
import { useStats } from "@/hooks/useStats";

function StatsSection() {
  const stats = useStats()
  console.log({stats});
  
  return (
    <div>
        <StatsCard title={'canceled'} value={50}/>
    </div>
  )
}

export default StatsSection