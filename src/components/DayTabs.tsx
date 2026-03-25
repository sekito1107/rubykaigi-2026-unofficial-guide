interface DayTabsProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

const DayTabs = ({ selectedDay, onDayChange }: DayTabsProps) => {
  return (
    <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
      {[1, 2, 3].map(d => (
        <button
          key={d}
          onClick={() => onDayChange(d)}
          className={`px-6 py-1.5 rounded-md text-xs font-bold transition-all ${
            d === selectedDay ? 'bg-ruby text-white shadow-lg' : 'text-slate-500 hover:text-slate-200'
          }`}
        >
          DAY {d}
        </button>
      ))}
    </div>
  );
};

export default DayTabs;
