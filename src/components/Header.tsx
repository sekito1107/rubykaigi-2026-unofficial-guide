import DayTabs from './DayTabs';

interface HeaderProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

const Header = ({ selectedDay, onDayChange }: HeaderProps) => {
  return (
    <header className="px-6 py-4 border-b border-white/5 flex flex-col gap-6 bg-[#0c1427] sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter font-outfit">
            Ruby<span className="text-white">Kaigi</span> 2026 <span className="text-ruby-red">Beginner Guide</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mt-1">
            Hakodate, Hokkaido · April 22-24
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search title, speaker, tags..."
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-ruby-red/50 transition-all pl-10 text-slate-300"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-black text-slate-300 hover:bg-white/10 transition-colors uppercase tracking-widest">
            <span>☆</span> Show All
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <DayTabs 
          selectedDay={selectedDay} 
          onDayChange={onDayChange} 
        />
        <div className="h-4 w-px bg-white/10" />
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
          {selectedDay === 1 ? 'April 22 (Wed)' : selectedDay === 2 ? 'April 23 (Thu)' : 'April 24 (Fri)'}
        </span>
      </div>
    </header>
  );
};

export default Header;
