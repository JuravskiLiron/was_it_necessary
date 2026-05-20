import { MediaStats } from '../../types';

interface Props { data: MediaStats }

export function MediaStatsPanel({ data }: Props) {
  const falsePercent = Math.round((data.reportedFalsely / data.totalReported) * 100);
  const correctedPercent = Math.round((data.correctedLater / data.reportedFalsely) * 100);
  const neverPercent = 100 - correctedPercent;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Big numbers row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { n: data.totalReported,   label: 'Total outlets\nreported',    color: 'var(--txt2)' },
          { n: data.reportedFalsely, label: 'Reported\nfalsely',          color: 'var(--red)' },
          { n: data.neverCorrected,  label: 'Never\ncorrected',           color: '#f97316' },
        ].map(({ n, label, color }) => (
          <div key={label} style={{ background: 'var(--bg2)', border: '1px solid var(--b0)', borderRadius: 7, padding: '12px 10px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--ff)', fontSize: 26, fontWeight: 700, color, lineHeight: 1, marginBottom: 5 }}>{n}</div>
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
        <div style={{ height: 6, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${falsePercent}%`, background: 'var(--red)', borderRadius: 3, transition: 'width 1s ease', boxShadow: '0 0 8px rgba(239,68,68,.4)' }} />
        </div>
      </div>

      {/* Correction bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Of those — corrected later</span>
          <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--green)', fontWeight: 700 }}>{correctedPercent}%</span>
        </div>
        <div style={{ height: 6, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
          <div style={{ height: '100%', width: `${correctedPercent}%`, background: 'var(--green)', borderRadius: '3px 0 0 3px', transition: 'width 1s ease', boxShadow: '0 0 8px rgba(34,197,94,.3)' }} />
          <div style={{ height: '100%', flex: 1, background: '#f97316', borderRadius: '0 3px 3px 0' }} />
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: 1, background: 'var(--green)' }} />
            <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)' }}>Corrected ({data.correctedLater})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: 1, background: '#f97316' }} />
            <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)' }}>Never corrected ({data.neverCorrected})</span>
          </div>
        </div>
      </div>

      {/* Outlets list */}
      <div>
        <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8, fontWeight: 700 }}>Outlet breakdown</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data.outlets.map((outlet, i) => (
            <div key={i} style={{ background: 'var(--bg2)', border: `1px solid ${outlet.corrected ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)'}`, borderRadius: 6, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontFamily: 'var(--ff)', fontSize: 10, fontWeight: 700, color: 'var(--txt)' }}>{outlet.name}</span>
                <span style={{
                  fontFamily: 'var(--ff)', fontSize: 8, fontWeight: 700,
                  padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '.07em',
                  background: outlet.corrected ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)',
                  color: outlet.corrected ? 'var(--green)' : 'var(--red)',
                  border: `1px solid ${outlet.corrected ? 'rgba(34,197,94,.2)' : 'rgba(239,68,68,.2)'}`,
                }}>
                  {outlet.corrected ? '✓ Corrected' : '✗ Never corrected'}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--ffs)', fontSize: 11, color: '#f87171', fontStyle: 'italic', lineHeight: 1.4, marginBottom: outlet.correctionNote ? 6 : 0 }}>
                "{outlet.initialClaim}"
              </div>
              {outlet.correctionNote && (
                <div style={{ fontFamily: 'var(--ffs)', fontSize: 10, color: '#4ade80', lineHeight: 1.4, marginTop: 4 }}>
                  ✓ {outlet.correctionNote}
                  {outlet.correctionDate && <span style={{ color: 'var(--txt3)', marginLeft: 6 }}>· {new Date(outlet.correctionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}