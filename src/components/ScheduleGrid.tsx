import sessionsData from '../data/sessions.json'
import type { Session } from '../types/Session'
import SessionCard from './SessionCard'

// 型定義（JSONから読み込んだ際に正確に扱うため）
const allSessions = sessionsData as Session[]

interface ScheduleGridProps {
  selectedDay: number
}

export default function ScheduleGrid({ selectedDay }: ScheduleGridProps) {
  const filteredSessions = allSessions.filter(s => s.day === selectedDay)

  const timeSlots = Array.from(new Set(filteredSessions.map(s => s.startTime))).sort()

  // 現在時刻のシミュレーション（デモ用）
  const currentTime = '10:15'

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-6 mb-8 sticky top-[148px] z-40 bg-[#0c1427]/95 backdrop-blur py-4 border-b border-white/5">
        <div className="flex items-end justify-center pb-2">
          <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">Time</span>
        </div>
        {[
          { name: 'Large Hall', tag: '#rubykaigiA' },
          { name: 'Sub Arena', tag: '#rubykaigiB' },
          { name: 'Small Hall', tag: '#rubykaigiC' }
        ].map(hall => (
          <div key={hall.name} className="bg-white/5 rounded-xl p-4 flex flex-col items-center gap-2 border border-white/5">
            <span className="text-sm font-bold text-slate-200">{hall.name}</span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-ruby-red/10 text-ruby-red font-mono ring-1 ring-ruby-red/20">
              {hall.tag}
            </span>
          </div>
        ))}
      </div>

      <div className="relative space-y-4">
        {timeSlots.map((time, index) => {
          const sessionsInSlot = filteredSessions.filter(s => s.startTime === time)

          const endTime = sessionsInSlot[0]?.endTime || ''
          const isLive = currentTime >= time && currentTime < endTime
          const isDone = currentTime >= endTime
          const isNext = !isLive && !isDone && (index === 0 || (timeSlots[index-1] < currentTime && time >= currentTime))

          return (
            <div key={time} className={`relative grid grid-cols-[100px_1fr_1fr_1fr] gap-6 p-4 rounded-xl transition-all duration-500 ${
              isLive ? 'bg-ruby-red/10 ring-1 ring-ruby-red/20 shadow-lg shadow-ruby-red/5' : 
              isNext ? 'bg-next-blue/5 ring-1 ring-next-blue/20' : 'bg-transparent'
            }`}>
              <div className="flex flex-col items-center justify-start pt-2 gap-2">
                <span className={`text-xl font-black font-mono tracking-tighter ${
                  isLive ? 'text-white' : isNext ? 'text-next-blue' : isDone ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {time}
                </span>
                
                {isLive && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-ruby-red text-white uppercase animate-pulse shadow-sm shadow-ruby-red/50">
                    Live
                  </span>
                )}
                {isNext && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-next-blue text-white uppercase shadow-sm shadow-next-blue/50">
                    Next
                  </span>
                )}
                {isDone && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-800 text-slate-500 uppercase">
                    Done
                  </span>
                )}
              </div>

              {['Large', 'Sub', 'Small'].map(room => {
                const session = sessionsInSlot.find(s => s.room === room)
                return session ? (
                  <div key={session.id} className={isDone ? 'opacity-40 grayscale-[0.5] transition-opacity' : ''}>
                    <SessionCard session={session} />
                  </div>
                ) : (
                  <div key={room} className="flex items-center justify-center rounded-lg bg-white/[0.01] border border-dashed border-white/5 min-h-[160px]">
                    <span className="text-slate-800 text-[10px] font-black uppercase tracking-widest">- No Session -</span>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
