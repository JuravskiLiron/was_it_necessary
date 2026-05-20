import { useState, useCallback, useEffect } from 'react';
import { MapView } from './components/MapView';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StrikeEvent } from './types';
import { DEMO_EVENTS, ARENAS } from './data/events';
import './styles/global.css';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<StrikeEvent | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeArena, setActiveArena] = useState('gaza');
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();

  const arenaEvents = DEMO_EVENTS.filter(e => {
    if (activeArena === 'gaza') return e.coordinates[0] < 32.5 && e.coordinates[0] > 31;
    if (activeArena === 'lebanon') return e.coordinates[0] > 33;
    return true;
  }).filter(e =>
    !search ||
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = useCallback((event: StrikeEvent) => {
    setSelectedEvent(event);
    setSidebarOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setSidebarOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  }, []);

  const currentArena = ARENAS.find(a => a.id === activeArena)!;

  return (
    <div className="app">
      <Header search={search} onSearch={setSearch} total={DEMO_EVENTS.length} />

      <div className="arena-bar">
        <span className="arena-label">Theatre</span>
        {ARENAS.map(a => (
          <button
            key={a.id}
            className={`arena-btn${a.id === activeArena ? ' active' : ''}${a.locked ? ' locked' : ''}`}
            onClick={() => {
              if (a.locked) return;
              setActiveArena(a.id);
              setSidebarOpen(false);
              setTimeout(() => setSelectedEvent(null), 300);
            }}
          >
            {a.locked && (
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            )}
            {a.label}
            {a.locked && <span style={{ fontSize: 7, opacity: .6 }}>SOON</span>}
          </button>
        ))}
      </div>

      <div className="main" style={{ position: 'relative' }}>
        <MapView
          events={arenaEvents}
          selectedEvent={selectedEvent}
          onSelect={handleSelect}
          arenaCenter={currentArena.center}
          arenaZoom={currentArena.zoom}
          isMobile={isMobile}
        />
        <Sidebar event={selectedEvent} isOpen={sidebarOpen} onClose={handleClose} />
      </div>
    </div>
  );
}