import { ClaimVsFact } from '../../types';

interface Props { items: ClaimVsFact[] }

const VERDICT_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  false:       { bg: 'rgba(239,68,68,.08)',   color: '#ef4444', label: '✗ PROVEN FALSE' },
  misleading:  { bg: 'rgba(245,158,11,.08)',  color: '#f59e0b', label: '⚠ MISLEADING' },
  unverified:  { bg: 'rgba(100,116,139,.08)', color: '#64748b', label: '? UNVERIFIED' },
};

export function ClaimsVsFacts({ items }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item, i) => {
        const vs = VERDICT_STYLE[item.verdict];
        return (
          <div key={i} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,.06)' }}>
            {/* Verdict banner */}
            <div style={{ background: vs.bg, borderBottom: `1px solid ${vs.color}25`, padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--ff)', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: vs.color }}>{vs.label}</span>
            </div>
            {/* Two columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {/* Claim */}
              <div style={{ padding: '12px', background: 'rgba(239,68,68,.04)', borderRight: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: 4 }}>CLAIMED</div>
                <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', marginBottom: 8 }}>{item.claimTime} · {item.claimSource}</div>
                <div style={{ fontFamily: 'var(--ffs)', fontSize: 11, color: '#f87171', fontStyle: 'italic', lineHeight: 1.55 }}>"{item.claim}"</div>
              </div>
              {/* Fact */}
              <div style={{ padding: '12px', background: 'rgba(34,197,94,.04)' }}>
                <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: 4 }}>PROVEN</div>
                <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', marginBottom: 8 }}>{item.factTime} · {item.factSource}</div>
                <div style={{ fontFamily: 'var(--ffs)', fontSize: 11, color: '#4ade80', lineHeight: 1.55 }}>{item.fact}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
