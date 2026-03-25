interface DayTabsProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

const DayTabs = ({ selectedDay, onDayChange }: DayTabsProps) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3].map(d => (
        <button
          key={d}
          onClick={() => onDayChange(d)}
          className={`px-6 py-2 rounded-lg text-xs font-black transition-all duration-200 uppercase tracking-widest ${
            d === selectedDay 
              ? 'bg-ruby-red text-white shadow-lg shadow-ruby-red/20' 
              : 'bg-white/5 text-slate-500 hover:text-slate-300'
          }`}
        >
          DAY {d}
        </button>
      ))}
    </div>
  );
};

export default DayTabs;
