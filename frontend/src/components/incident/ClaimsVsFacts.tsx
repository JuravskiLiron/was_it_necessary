import { ClaimVsFact } from '../../types';

interface Props { items: ClaimVsFact[] }

const VERDICT_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  false:      { bg: 'rgba(239,68,68,.08)',  color: '#ef4444', label: '✗ PROVEN FALSE' },
  misleading: { bg: 'rgba(245,158,11,.08)', color: '#f59e0b', label: '⚠ MISLEADING' },
  unverified: { bg: 'rgba(100,116,139,.08)',color: '#64748b', label: '? UNVERIFIED' },
};

function SourceLink({ url, archive, label }: { url?: string; archive?: string; label: string }) {
  if (!url && !archive) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7, flexWrap: 'wrap' }}>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            fontFamily: 'var(--ff)', fontSize: 8, color: '#4299e1',
            textDecoration: 'none', letterSpacing: '.06em',
            borderBottom: '1px solid rgba(66,153,225,.3)', lineHeight: 1,
          }}
        >
          {label}
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>
      )}
      {archive && (
        <a
          href={archive}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            fontFamily: 'var(--ff)', fontSize: 8, color: '#94a3b8',
            textDecoration: 'none', letterSpacing: '.06em',
            borderBottom: '1px solid rgba(148,163,184,.3)', lineHeight: 1,
          }}
        >
          archive.org
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>
      )}
    </div>
  );
}

export function ClaimsVsFacts({ items }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {items.map((item, i) => {
        const vs = VERDICT_STYLE[item.verdict] ?? VERDICT_STYLE.unverified;
        return (
          <div key={i} style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,.06)' }}>

            {/* Verdict banner */}
            <div style={{
              background: vs.bg,
              borderBottom: `1px solid ${vs.color}25`,
              padding: '6px 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily: 'var(--ff)', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: vs.color }}>
                {vs.label}
              </span>
              <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)' }}>
                #{i + 1}
              </span>
            </div>

            {/* Two columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

              {/* CLAIM side */}
              <div style={{ padding: '12px', background: 'rgba(239,68,68,.04)', borderRight: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: 4 }}>
                  CLAIMED
                </div>
                <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', marginBottom: 7, lineHeight: 1.5 }}>
                  {item.claimTime}
                  <br />
                  {item.claimSource}
                </div>
                <div style={{ fontFamily: 'var(--ffs)', fontSize: 11, color: '#f87171', fontStyle: 'italic', lineHeight: 1.55 }}>
                  "{item.claim}"
                </div>
                <SourceLink
                  url={item.claimUrl}
                  archive={item.archiveUrl}
                  label="Source"
                />
              </div>

              {/* FACT side */}
              <div style={{ padding: '12px', background: 'rgba(34,197,94,.04)' }}>
                <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: 4 }}>
                  PROVEN
                </div>
                <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', marginBottom: 7, lineHeight: 1.5 }}>
                  {item.factTime}
                  <br />
                  {item.factSource}
                </div>
                <div style={{ fontFamily: 'var(--ffs)', fontSize: 11, color: '#4ade80', lineHeight: 1.55 }}>
                  {item.fact}
                </div>
                <SourceLink
                  url={item.factUrl}
                  label="Source"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}