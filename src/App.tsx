import { useState } from 'react';
import Header from './components/Header';
import ScheduleGrid from './components/ScheduleGrid';

function App() {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="min-h-screen bg-[#0c1427] text-white flex flex-col font-inter selection:bg-ruby-red/30">
      <Header 
        selectedDay={selectedDay} 
        onDayChange={setSelectedDay} 
      />
      
      <main className="flex-1 pb-20">
        <ScheduleGrid selectedDay={selectedDay} />
      </main>
    </div>
  )
}

export default App
