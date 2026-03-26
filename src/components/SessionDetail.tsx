import { useState, useEffect } from 'react'
import type { Session } from '../types/Session'

interface SessionDetailProps {
  session: Session
  onClose: () => void
  languageMode: 'EN' | 'JA'
}

const SessionDetail = ({ session, onClose, languageMode }: SessionDetailProps) => {
  const [memo, setMemo] = useState('')
  const [showAbstract, setShowAbstract] = useState(false)

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

          <div className="flex gap-3 mb-4">
            <span className="text-[10px] font-black text-ruby-red bg-ruby-red/10 px-2 py-1 rounded tracking-widest uppercase">
              Beginner's Deep Guide
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/5">
              HALL {session.room} Hall · {session.startTime}
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
          
          {/* 技術背景 (Technical Background) / 初心者ガイド */}
          <section className="bg-white/[0.02] border border-white/5 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-3 text-ruby-red">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              <h3 className="font-black text-sm tracking-widest uppercase">技術背景 (Background)</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-ruby-red/20 text-ruby-red px-2 py-0.5 rounded font-bold">初心者向け</span>
                <p className="text-[10px] text-slate-500 italic leading-snug">※この解説はアプリ製作者によるもので、実際の発表の意図、内容を保証するものではありません</p>
              </div>

              {session.beginnerGuide ? (
                <>
                  {/* 前提知識 */}
                  <div>
                    <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                      <div className="w-1 h-3 bg-ruby-red rounded-full" />
                      前提知識のヒント (Prerequisites)
                    </h4>
                    <ul className="list-disc list-inside text-slate-400 text-[11px] space-y-1 ml-1">
                      {session.beginnerGuide.prerequisites.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 用語集 */}
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <div className="w-1 h-3 bg-ruby-red rounded-full" />
                        ミニ用語集
                      </h4>
                      <span className="text-[10px] italic text-slate-500 underline underline-offset-2">用語をタップで詳細解説へ</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {session.beginnerGuide.keywords.map(item => (
                        <a 
                          key={item.term}
                          href={item.learnUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 p-3 rounded-lg transition-colors group"
                        >
                          <span className="text-xs font-bold text-ruby-red block mb-1 group-hover:underline underline-offset-4">{item.term}</span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{item.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center border border-dashed border-white/10 rounded-lg">
                  <p className="text-xs text-slate-500">
                    このセッションの初心者ガイドは現在準備中です。<br />
                    公式の概要をチェックしてみてください。
                  </p>
                </div>
              )}
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
              className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-ruby-red/50 transition-all resize-none"
            />
            <p className="text-[10px] text-slate-600 italic">
              ※入力内容はブラウザに自動保存されます
            </p>
          </section>

          {/* 公式の概要 (Accordion) */}
          <button 
            onClick={() => setShowAbstract(!showAbstract)}
            className="w-full flex items-center justify-between text-slate-500 hover:text-slate-300 transition-colors py-4 border-t border-white/5 group"
          >
            <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <svg className={`transition-transform duration-300 ${showAbstract ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              公式の概要を表示 (English Abstract)
            </span>
          </button>
          {showAbstract && (
            <div className="space-y-4 pb-6 animate-in slide-in-from-top-2 duration-300">
              {(languageMode === 'JA' && session.abstract_ja) && (
                <div className="text-sm text-slate-200 leading-relaxed bg-white/[0.03] p-4 rounded-lg border border-white/5">
                  <span className="block mb-2 text-[10px] text-ruby-red uppercase font-black tracking-widest">日本語訳 (Japanese Translation)</span>
                  {session.abstract_ja}
                </div>
              )}
              <div className="text-xs text-slate-500 leading-relaxed px-4 opacity-80">
                <span className="block mb-2 text-[10px] text-slate-600 uppercase font-black tracking-widest">原文 (Original English)</span>
                {session.abstract}
              </div>
            </div>
          )}
        </div>

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
