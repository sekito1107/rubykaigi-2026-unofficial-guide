import { useState, useEffect, useRef } from 'react'
import sessionsData from '../data/sessions.json'
import type { Session } from '../types/Session'
import SessionCard from './SessionCard'

// 型定義（JSONから読み込んだ際に正確に扱うため）
const allSessions = sessionsData as Session[]

interface ScheduleGridProps {
  selectedDay: number
  favorites: string[]
  onToggleFavorite: (id: string) => void
  showOnlyFavorites: boolean
  onOpenDetail: (id: string) => void
  searchQuery: string
  languageMode: 'EN' | 'JA'
}

export default function ScheduleGrid({ 
  selectedDay, 
  favorites, 
  onToggleFavorite, 
  showOnlyFavorites, 
  onOpenDetail,
  searchQuery,
  languageMode
}: ScheduleGridProps) {
  const [visibleTime, setVisibleTime] = useState<string | null>(null)
  const timeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // 1. セッションの抽出とフィルタリング
  let filteredSessions = allSessions.filter(s => s.day === selectedDay)
  
  if (showOnlyFavorites) {
    filteredSessions = filteredSessions.filter(s => favorites.includes(s.id))
  }

  // 検索フィルタ（日、英、スピーカー名、キーワードを横断検索）
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredSessions = filteredSessions.filter(s => 
      s.title.toLowerCase().includes(query) ||
      s.abstract.toLowerCase().includes(query) ||
      (s.title_ja && s.title_ja.toLowerCase().includes(query)) ||
      (s.abstract_ja && s.abstract_ja.toLowerCase().includes(query)) ||
      s.speakerName.toLowerCase().includes(query) ||
      (s.tags.some(t => t.toLowerCase().includes(query))) ||
      (s.beginnerGuide?.keywords.some(k => k.term.toLowerCase().includes(query)))
    )
  }

  // 2. 開始時間（startTime）でグルーピング
  const timeSlots = Array.from(new Set(filteredSessions.map(s => s.startTime))).sort()

  // 3. 現在時刻のシミュレーション（デモ用）
  const currentTime = '10:15'

  useEffect(() => {
    // Only activate observer for small screens
    if (window.innerWidth >= 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const time = entry.target.getAttribute('data-time')
            if (time) setVisibleTime(time)
          }
        })
      },
      // Trigger when the time slot enters the middle area of the viewport
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    const refs = timeRefs.current
    Object.values(refs).forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [timeSlots])

  return (
    <div className="max-w-[1600px] mx-auto pl-28 pr-4 md:px-4 py-4 md:py-8 pt-6 relative">
      {/* 画面端のミニタイムライン (Mobile Only) */}
      <div className="md:hidden sticky top-[320px] -ml-28 h-0 w-24 z-40 flex flex-col gap-4 items-start bg-transparent pointer-events-none">
        <div className="relative flex flex-col gap-6 py-4 items-start">
          {/* 背景の縦線 (左から24pxの位置) */}
          <div className="absolute left-[24px] top-4 bottom-4 w-px bg-white/10 -z-10" />
          
          {timeSlots.map((t) => {
            const isActive = visibleTime === t;
            return (
              <div key={t} className="relative w-full flex items-center h-4">
                {/* ドット (左から21px、幅6pxなので中心が24px) */}
                <div className={`absolute left-[21px] w-1.5 h-1.5 rounded-full transition-all duration-300 origin-center ${
                  isActive 
                    ? 'bg-ruby-red shadow-[0_0_8px_rgba(251,113,133,1)] ring-2 ring-ruby-red/30 scale-150' 
                    : 'bg-white/20'
                }`} />
                {/* 時間 (ドットの右側、左から48px) */}
                <span className={`absolute left-[48px] text-[10px] font-black font-mono tracking-tighter transition-all duration-300 origin-left whitespace-nowrap ${
                  isActive ? 'text-ruby-red opacity-100 scale-110 drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]' : 'text-slate-600 opacity-40 scale-[0.85]'
                }`}>
                  {t}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 会場ヘッダー: モバイルでは非表示 */}
      <div className="hidden md:grid grid-cols-[100px_1fr_1fr_1fr] gap-6 mb-8 sticky top-[148px] z-40 bg-[#0c1427]/95 backdrop-blur py-4 border-b border-white/5">
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
          
          // LIVE / DONE / NEXT 判定ロジック
          const endTime = sessionsInSlot[0]?.endTime || ''
          const isLive = currentTime >= time && currentTime < endTime
          const isDone = currentTime >= endTime
          const isNext = !isLive && !isDone && (index === 0 || (timeSlots[index-1] < currentTime && time >= currentTime))

          return (
            <div 
              key={time} 
              data-time={time}
              ref={el => { timeRefs.current[time] = el; }}
              className={`relative flex flex-col md:grid md:grid-cols-[100px_1fr_1fr_1fr] gap-4 md:gap-6 p-4 rounded-xl transition-all duration-500 ${
              isLive ? 'bg-ruby-red/10 ring-1 ring-ruby-red/20 shadow-lg shadow-ruby-red/5' : 
              isNext ? 'bg-next-blue/5 ring-1 ring-next-blue/20' : 'bg-transparent'
            }`}>
              {/* 時間・ステータスカラム */}
              <div className="flex flex-row md:flex-col items-center justify-start md:pt-2 gap-3 md:gap-2 pb-2 md:pb-0 border-b border-white/5 md:border-b-0">
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

              {/* 会場セッション */}
              {['Large', 'Sub', 'Small'].map(room => {
                const session = sessionsInSlot.find(s => s.room === room)
                return session ? (
                  <div key={session.id} className={`flex flex-col gap-1.5 ${isDone ? 'opacity-40 grayscale-[0.5] transition-opacity' : ''}`}>
                    <span className="md:hidden text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      {room === 'Large' ? 'Large Hall' : room === 'Sub' ? 'Sub Arena' : 'Small Hall'}
                    </span>
                    <SessionCard 
                      session={session} 
                      isFavorite={favorites.includes(session.id)}
                      onToggleFavorite={onToggleFavorite}
                      onOpenDetail={onOpenDetail}
                      languageMode={languageMode}
                    />
                  </div>
                ) : (
                  <div key={room} className="hidden md:flex items-center justify-center rounded-lg bg-white/[0.01] border border-dashed border-white/5 min-h-[160px]">
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
