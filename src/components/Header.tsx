import DayTabs from './DayTabs';

interface HeaderProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
  showOnlyFavorites: boolean;
  onToggleFavoritesView: () => void;
  favoritesCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  languageMode: 'EN' | 'JA';
  onLanguageChange: (lang: 'EN' | 'JA') => void;
  onShowDisclaimer: () => void;
}

const Header = ({ 
  selectedDay, 
  onDayChange, 
  showOnlyFavorites, 
  onToggleFavoritesView, 
  favoritesCount,
  searchQuery,
  onSearchChange,
  languageMode,
  onLanguageChange,
  onShowDisclaimer
}: HeaderProps) => {
  return (
    <header className="px-4 md:px-6 py-4 border-b border-white/5 flex flex-col gap-4 md:gap-6 bg-[#0c1427]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter font-outfit">
            Ruby<span className="text-white">Kaigi</span> 2026 <span className="text-ruby-red">Unofficial Guide</span>
          </h1>
          <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mt-1">
            Hakodate, Hokkaido · April 22-24
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
          <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-6 items-center w-full">
            {/* Language Toggle */}
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => onLanguageChange('EN')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-black transition-all ${
                  languageMode === 'EN' ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                原文 (EN)
              </button>
              <button 
                onClick={() => onLanguageChange('JA')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-black transition-all ${
                  languageMode === 'JA' ? 'bg-ruby-red text-white shadow-lg shadow-ruby-red/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                日本語訳 (JA)
              </button>
            </div>

            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search title, speaker, tags..."
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-ruby-red/50 transition-all pl-10 text-slate-300 placeholder:text-slate-600"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            
            <button 
              onClick={onToggleFavoritesView}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-black transition-all uppercase tracking-widest ${
                showOnlyFavorites 
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' 
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <span className={showOnlyFavorites ? 'fill-amber-500' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={showOnlyFavorites ? "currentColor" : "none"} stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </span>
              {showOnlyFavorites ? `Favorites (${favoritesCount})` : 'Show All'}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mr-1">
            <p className="text-[9px] text-slate-500 font-medium tracking-tight">
              ※当アプリは非公式であり、運営団体とは一切関係ありません
            </p>
            <button 
              onClick={onShowDisclaimer}
              className="text-[9px] text-ruby-red hover:underline font-black uppercase tracking-widest"
            >
              免責事項・お問い合わせ
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 overflow-x-auto pb-2 sm:pb-0">
        <DayTabs 
          selectedDay={selectedDay} 
          onDayChange={onDayChange} 
        />
        <div className="h-4 w-px bg-white/10 hidden sm:block" />
        <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
          {selectedDay === 1 ? 'April 22 (Wed)' : selectedDay === 2 ? 'April 23 (Thu)' : 'April 24 (Fri)'}
        </span>
      </div>
    </header>
  );
};

export default Header;
