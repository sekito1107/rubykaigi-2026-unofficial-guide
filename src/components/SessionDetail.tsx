import { useState, useEffect } from 'react'
import type { Session } from '../types/Session'
import glossaryData from '../data/technology_glossary.json'
import TechDetail from './TechDetail'

const glossary = glossaryData as Record<string, { name: string; description: string; detail?: string; url: string }>

interface SessionDetailProps {
  session: Session
  onClose: () => void
  languageMode: 'EN' | 'JA'
}

const SessionDetail = ({ session, onClose, languageMode }: SessionDetailProps) => {
  const [memo, setMemo] = useState('')
  const [showAbstract, setShowAbstract] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const displayTitle = (languageMode === 'JA' && session.title_ja) ? session.title_ja : session.title

  // メモの読み込み
  useEffect(() => {
    const savedMemo = localStorage.getItem(`memo_${session.id}`)
    if (savedMemo) setMemo(savedMemo)
  }, [session.id])

  // メモの保存
  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMemo = e.target.value
    setMemo(newMemo)
    localStorage.setItem(`memo_${session.id}`, newMemo)
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-[#131c33] w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="p-8 border-b border-white/5 relative bg-gradient-to-b from-white/5 to-transparent">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="flex flex-wrap gap-2 mb-4">
            {session.tags.map(tag => (
              <span key={tag} className="text-[10px] font-black tracking-widest px-2 py-1 rounded bg-white/10 text-slate-300 uppercase ring-1 ring-white/10 shadow-sm">
                {tag}
              </span>
            ))}
            <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded uppercase shadow-sm ${
              session.language === 'JA' ? 'bg-ruby-red/20 text-ruby-red ring-1 ring-ruby-red/20' : 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/20'
            }`}>
              {session.language}
            </span>
          </div>

          <h2 className="text-3xl font-black text-white mb-2 leading-tight font-outfit">
            {displayTitle}
          </h2>
          <p className="text-lg text-slate-400 font-medium">
            {session.speakerName}
          </p>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          
          {/* 概要 (Abstract) - Always visible at top */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-ruby-red">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <h3 className="font-black text-sm tracking-widest uppercase">セッション概要 (Abstract)</h3>
            </div>
            
            <div className="text-sm text-slate-200 leading-relaxed bg-white/[0.03] p-6 rounded-xl border border-white/5 shadow-inner">
              {(languageMode === 'JA' && session.abstract_ja) ? session.abstract_ja : session.abstract}
            </div>

            {/* JAモードで翻訳を表示している場合のみ、原文へ誘導するアコーディオン */}
            {languageMode === 'JA' && session.abstract_ja && (
              <div className="px-2">
                <button 
                  onClick={() => setShowAbstract(!showAbstract)}
                  className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest"
                >
                  <svg className={`transition-transform duration-300 ${showAbstract ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  原文を確認する (Read Original English)
                </button>
                {showAbstract && (
                  <div className="mt-3 p-4 bg-black/20 rounded-lg text-xs text-slate-500 leading-relaxed animate-in slide-in-from-top-1 duration-200">
                    {session.abstract}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* 技術キーワード解説 (Technical Glossary) - Placeholder */}
          <section className="bg-white/[0.02] border border-white/5 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <h3 className="font-black text-sm tracking-widest uppercase">技術のヒント (Key Technologies)</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-slate-500 italic leading-snug">セッションの理解を深めるための、主要なキーワードの解説です</p>
              </div>

              {/* 用語集データとの紐付け */}
              <div className="grid grid-cols-1 gap-3">
                {session.tags.filter(tag => glossary[tag]).map(tag => {
                  const item = glossary[tag];
                  return (
                    <button 
                      key={tag}
                      onClick={() => setSelectedTech(tag)}
                      className="block text-left w-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 p-4 rounded-lg transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors uppercase tracking-wider">{item.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="text-slate-600 group-hover:text-blue-400 transition-colors opacity-50"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{item.description}</p>
                    </button>
                  );
                })}

                {session.tags.filter(tag => glossary[tag]).length === 0 && (
                  <p className="text-[11px] text-slate-500 italic py-2">
                    ※このセッションに関連する技術解説は現在準備中です。
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* 自分用のメモ (Personal Memo) */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              <h3 className="font-black text-sm tracking-widest uppercase">自分用のメモ</h3>
            </div>
            
            <textarea 
              value={memo}
              onChange={handleMemoChange}
              placeholder="セッション中の気づきや、あとで調べることなどを自由に書いてください..."
              className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-ruby-red/50 transition-all resize-none"
            />
          </section>
        </div>

        {/* 技術詳細モーダル */}
        {selectedTech && glossary[selectedTech] && (
          <TechDetail 
            tech={glossary[selectedTech]} 
            onClose={() => setSelectedTech(null)} 
          />
        )}


        {/* Footer Actions */}
        <div className="p-8 border-t border-white/5 bg-slate-900/30 flex justify-between items-center">
          <span className="text-[10px] text-slate-600 uppercase font-black italic">
            用語をクリックすると詳細解説へ移動します
          </span>
          <a 
            href={session.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ruby-red hover:bg-ruby-dark text-white px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-ruby-red/20 active:scale-95"
          >
            公式サイトで詳細を見る
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SessionDetail
