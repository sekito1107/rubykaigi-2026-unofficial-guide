import { useState, useEffect } from 'react';
import Header from './components/Header';
import ScheduleGrid from './components/ScheduleGrid';

function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

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
      />
      
      <main className="flex-1 pb-20">
        <ScheduleGrid 
          selectedDay={selectedDay} 
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          showOnlyFavorites={showOnlyFavorites}
        />
      </main>
    </div>
  );
}

export default App;
