import type { Session } from '../types/Session'

interface SessionCardProps {
  session: Session
}

export default function SessionCard({ session }: SessionCardProps) {
  const isEvent = session.type === 'event'
  
  return (
    <div className={`relative p-5 rounded-lg border border-white/5 transition-all duration-300 group h-full min-h-[220px] flex flex-col ${
      isEvent ? 'bg-transparent border-dashed border-white/10' : 'bg-white/5 hover:bg-white/10'
    }`}>
      {/* お気に入りボタン (ダミー) */}
      {!isEvent && (
        <button className="absolute top-4 right-4 text-white/20 hover:text-amber-400 transition-colors z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </button>
      )}

      <div className="flex flex-col h-full gap-3 flex-1">
        {!isEvent && (
          <div className="flex gap-2">
            <span className="text-[10px] font-black tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-slate-400 uppercase">
              GENERAL
            </span>
            {session.language === 'EN' && (
              <span className="text-[10px] font-black tracking-widest px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 uppercase">
                EN
              </span>
            )}
          </div>
        )}

        <div className="space-y-1">
          <h3 className={`font-bold text-lg leading-tight line-clamp-2 ${isEvent ? 'text-slate-500 text-center' : 'text-slate-100'}`}>
            {session.title}
          </h3>
          {!isEvent && (
            <p className="text-sm font-medium text-ruby-red line-clamp-3 leading-relaxed">
              {session.abstract || 'RubyKaigi 2026 函館 セッション解説'}
            </p>
          )}
        </div>

        {!isEvent && (
          <div className="mt-auto pt-2 border-t border-white/5">
            <span className="text-sm text-slate-400">
              by <span className="text-slate-200 font-medium">{session.speakerName}</span>
            </span>
          </div>
        )}
        
        {isEvent && (
          <div className="flex items-center justify-center flex-1">
             <span className="text-slate-600 text-xs font-mono">- No Session -</span>
          </div>
        )}
      </div>
    </div>
  )
}
