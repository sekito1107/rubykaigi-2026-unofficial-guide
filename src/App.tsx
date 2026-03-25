import { useState } from 'react';
import Header from './components/Header';

function App() {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0c1427] text-white">
      <Header 
        selectedDay={selectedDay} 
        onDayChange={setSelectedDay} 
      />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <p className="text-slate-400 max-w-md">
          現在は DAY {selectedDay} が選択されています。
        </p>
      </main>
    </div>
  )
}

export default App
