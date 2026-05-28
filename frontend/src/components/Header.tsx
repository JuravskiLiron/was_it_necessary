import { useEffect, useState } from 'react';

interface Props { search: string; onSearch: (s: string) => void; total: number; }

export function Header({ total }: Props) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const d = time.toUTCString();
  const datePart = d.substring(0, 16);
  const timePart = d.substring(17, 25) + ' UTC';

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-mark">W?</div>
        <div>
          <div className="logo-text">WasItNecessary?</div>
          <div className="logo-sub">Conflict Documentation</div>
        </div>
      </div>

      <div className="h-div" />

     
      <div className="h-right logo-text" >
        DEMO VERSION
       
      </div>
    </header>
  );
}