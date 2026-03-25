import DayTabs from './DayTabs';

interface HeaderProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

const Header = ({ selectedDay, onDayChange }: HeaderProps) => {
  return (
    <header className="px-6 py-4 border-b border-white/10 flex flex-col gap-4 bg-black/30 backdrop-blur-xl">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight">
            RubyKaigi 2026 <span className="text-ruby">Beginner Guide</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
            Hakodate, Hokkaido · April 22-24
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs w-48 focus:outline-none focus:border-ruby/50 transition-all pl-9"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <DayTabs 
          selectedDay={selectedDay} 
          onDayChange={onDayChange} 
        />
      </div>
    </header>
  );
};

export default Header;
