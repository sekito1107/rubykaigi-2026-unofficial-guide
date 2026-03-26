import { useState, useEffect } from 'react';
import Header from './components/Header';
import ScheduleGrid from './components/ScheduleGrid';
import SessionDetail from './components/SessionDetail.tsx';
import DisclaimerModal from './components/DisclaimerModal.tsx';
import sessionsData from './data/sessions.json';
import type { Session } from './types/Session';

function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageMode, setLanguageMode] = useState<'EN' | 'JA'>('EN');
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const allSessions = sessionsData as Session[];
  const selectedSession = allSessions.find(s => s.id === selectedSessionId) || null;

  // 初期読み込み: LocalStorage からお気に入りを復元
  useEffect(() => {
    const saved = localStorage.getItem('rubykaigi_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  // お気に入りが更新されたら LocalStorage に保存
  useEffect(() => {
    localStorage.setItem('rubykaigi_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#0c1427] text-white flex flex-col font-inter selection:bg-ruby-red/30">
      <Header 
        selectedDay={selectedDay} 
        onDayChange={setSelectedDay} 
        showOnlyFavorites={showOnlyFavorites}
        onToggleFavoritesView={() => setShowOnlyFavorites(prev => !prev)}
        favoritesCount={favorites.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        languageMode={languageMode}
        onLanguageChange={setLanguageMode}
      />
      
      <main className="flex-1 pb-20">
        <ScheduleGrid 
          selectedDay={selectedDay} 
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          showOnlyFavorites={showOnlyFavorites}
          onOpenDetail={setSelectedSessionId}
          searchQuery={searchQuery}
          languageMode={languageMode}
        />
      </main>

      {/* フッター */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 text-center py-2.5 px-4 bg-[#0c1427]/90 backdrop-blur-md border-t border-white/5">
        <p className="text-[11px] text-slate-600">
          非公式ファンガイド · セッション情報は{' '}
          <a
            href="https://rubykaigi.org/2026/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-300 transition-colors underline"
          >
            RubyKaigi 2026 公式サイト
          </a>
          {' '}より引用 ·{' '}
          <button
            onClick={() => setShowDisclaimer(true)}
            className="text-slate-500 hover:text-ruby-red transition-colors underline"
          >
            免責事項・お問い合わせ
          </button>
        </p>
      </footer>

      {/* セッション詳細モーダル */}
      {selectedSession && (
        <SessionDetail 
          session={selectedSession} 
          onClose={() => setSelectedSessionId(null)}
          languageMode={languageMode}
        />
      )}

      {/* 免責事項モーダル */}
      {showDisclaimer && (
        <DisclaimerModal onClose={() => setShowDisclaimer(false)} />
      )}
    </div>
  );
}

export default App;
