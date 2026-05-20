interface Props { search: string; onSearch: (s: string) => void; total: number; }

export function Header({ total }: Props) {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-mark">W?</div>
        <div>
          <div className="logo-text">WasItNecessary?</div>
          <div className="logo-sub">Conflict Transparency Platform</div>
        </div>
      </div>
      <div className="h-div" />
      <div className="h-status">
        <div className="h-status-dot" />
        <span>Live Documentation · Gaza Theatre</span>
      </div>
      <div className="h-right">
        <div className="h-stat">
          <div className="h-stat-n" style={{ color: 'var(--red)' }}>{total}</div>
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
        <div style={{ fontFamily: 'var(--ff)', fontSize: 10, color: 'var(--txt3)', letterSpacing: '.06em' }}>
          {time.toUTCString().substring(0, 25)} UTC
        </div>
      </div>
    </header>
  );
}

import React from 'react';
