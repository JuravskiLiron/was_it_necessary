import { MediaStats } from '../../types';

interface Props { data: MediaStats }

function ExternalLink({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 3,
        fontFamily: 'var(--ff)', fontSize: 8, color: '#4299e1',
        textDecoration: 'none', letterSpacing: '.06em',
        borderBottom: '1px solid rgba(66,153,225,.3)',
        lineHeight: 1,
      }}
    >
      {label}
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </a>
  );
}

function OutletStatusBadge({ outlet }: { outlet: MediaStats['outlets'][0] }) {
  if (outlet.deleted) {
    return (
      <span style={{
        fontFamily: 'var(--ff)', fontSize: 8, fontWeight: 700,
        padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '.07em',
        background: 'rgba(245,158,11,.1)', color: '#f59e0b',
        border: '1px solid rgba(245,158,11,.2)',
      }}>🗑 Article deleted</span>
    );
  }
  if (outlet.silent) {
    return (
      <span style={{
        fontFamily: 'var(--ff)', fontSize: 8, fontWeight: 700,
        padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '.07em',
        background: 'rgba(100,116,139,.1)', color: '#94a3b8',
        border: '1px solid rgba(100,116,139,.2)',
      }}>◌ Went silent</span>
    );
  }
  if (outlet.corrected) {
    return (
      <span style={{
        fontFamily: 'var(--ff)', fontSize: 8, fontWeight: 700,
        padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '.07em',
        background: 'rgba(34,197,94,.1)', color: 'var(--green)',
        border: '1px solid rgba(34,197,94,.2)',
      }}>✓ Corrected</span>
    );
  }
  return (
    <span style={{
      fontFamily: 'var(--ff)', fontSize: 8, fontWeight: 700,
      padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '.07em',
      background: 'rgba(239,68,68,.1)', color: 'var(--red)',
      border: '1px solid rgba(239,68,68,.2)',
    }}>✗ Never corrected</span>
  );
}

export function MediaStatsPanel({ data }: Props) {
  const falsePercent = Math.round((data.reportedFalsely / data.totalReported) * 100);
  const correctedPercent = Math.round((data.correctedLater / data.reportedFalsely) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Big numbers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { n: data.totalReported,   label: 'Total outlets\nreported',  color: 'var(--txt2)' },
          { n: data.reportedFalsely, label: 'Reported\nfalsely',        color: 'var(--red)' },
          { n: data.neverCorrected,  label: 'Never\ncorrected',         color: '#f97316' },
        ].map(({ n, label, color }) => (
          <div key={label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '12px 10px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--ff)', fontSize: 26, fontWeight: 600, color, lineHeight: 1, marginBottom: 5 }}>{n}</div>
            <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.08em', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* False reporting bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>False initial reporting</span>
          <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--red)', fontWeight: 700 }}>{falsePercent}%</span>
        </div>
        <div style={{ height: 5, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${falsePercent}%`, background: 'var(--red)', borderRadius: 3 }} />
        </div>
      </div>

      {/* Correction bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Of those — corrected later</span>
          <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--green)', fontWeight: 700 }}>{correctedPercent}%</span>
        </div>
        <div style={{ height: 5, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
          <div style={{ height: '100%', width: `${correctedPercent}%`, background: 'var(--green)', borderRadius: '3px 0 0 3px' }} />
          <div style={{ height: '100%', flex: 1, background: '#f97316', borderRadius: '0 3px 3px 0' }} />
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 5 }}>
          {[{ c: 'var(--green)', label: `Corrected (${data.correctedLater})` }, { c: '#f97316', label: `Never corrected (${data.neverCorrected})` }].map(x => (
            <div key={x.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: 1, background: x.c }} />
              <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)' }}>{x.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Outlets list */}
      <div>
        <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8, fontWeight: 600 }}>Outlet breakdown</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data.outlets.map((outlet, i) => {
            const borderColor = outlet.corrected
              ? 'rgba(34,197,94,.12)'
              : outlet.deleted || outlet.silent
                ? 'rgba(245,158,11,.12)'
                : 'rgba(239,68,68,.12)';

            return (
              <div key={i} style={{ background: 'var(--bg2)', border: `1px solid ${borderColor}`, borderRadius: 5, padding: '10px 12px' }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--ff)', fontSize: 10, fontWeight: 700, color: 'var(--txt)' }}>{outlet.name}</span>
                  <OutletStatusBadge outlet={outlet} />
                </div>

                {/* Original claim */}
                <div style={{ fontFamily: 'var(--ffs)', fontSize: 11, color: '#f87171', fontStyle: 'italic', lineHeight: 1.45, marginBottom: 6 }}>
                  "{outlet.initialClaim}"
                </div>

                {/* Source link */}
                {outlet.sourceUrl && (
                  <div style={{ marginBottom: 6 }}>
                    <ExternalLink url={outlet.sourceUrl} label="Original article" />
                    {outlet.deleted && (
                      <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: '#f59e0b', marginLeft: 8 }}>
                        (article deleted)
                      </span>
                    )}
                  </div>
                )}

                {/* Archive link if deleted */}
                {outlet.archiveUrl && (
                  <div style={{ marginBottom: 6 }}>
                    <ExternalLink url={outlet.archiveUrl} label="Archive.org copy" />
                  </div>
                )}

                {/* Silent note */}
                {outlet.silent && !outlet.corrected && (
                  <div style={{ fontFamily: 'var(--ffs)', fontSize: 10, color: '#94a3b8', lineHeight: 1.4, marginTop: 4, padding: '5px 8px', background: 'rgba(100,116,139,.06)', border: '1px solid rgba(100,116,139,.12)', borderRadius: 3 }}>
                    ◌ Outlet stopped covering this story without issuing a correction or retraction.
                  </div>
                )}

                {/* Correction note */}
                {outlet.correctionNote && (
                  <div style={{ fontFamily: 'var(--ffs)', fontSize: 10, color: '#4ade80', lineHeight: 1.4, marginTop: 4 }}>
                    ✓ {outlet.correctionNote}
                    {outlet.correctionDate && (
                      <span style={{ color: 'var(--txt3)', marginLeft: 6 }}>
                        · {new Date(outlet.correctionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                )}

                {/* Correction source link */}
                {outlet.correctionUrl && (
                  <div style={{ marginTop: 5 }}>
                    <ExternalLink url={outlet.correctionUrl} label="Correction / updated article" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}