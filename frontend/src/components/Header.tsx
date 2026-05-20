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

      <div className="h-status">
        <div className="h-status-dot" />
        <span>Live · Gaza</span>
      </div>

      <div className="h-right">
        <div className="h-stat">
          <div className="h-stat-n" style={{ color: 'var(--txt2)' }}>{total}</div>
          <div className="h-stat-l">Incidents</div>
        </div>
        <div className="h-stat">
          <div className="h-stat-n" style={{ color: 'var(--green)' }}>3</div>
          <div className="h-stat-l">Verified</div>
        </div>
        <div className="h-stat">
          <div className="h-stat-n" style={{ color: 'var(--red)' }}>1</div>
          <div className="h-stat-l">Debunked</div>
        </div>
        <div className="h-div" />
        <div className="h-time">
          <div>{datePart}</div>
          <div>{timePart}</div>
        </div>
      </div>
    </header>
  );
}