import { CraterComparison } from '../../types';

interface Props { data: CraterComparison }

export function CraterViz({ data }: Props) {
  const scale = data.idfBombDiameterM / data.realDiameterM; // e.g. 6
  const maxPx = 120;
  const realPx = maxPx / scale;
  const idfPx = maxPx;

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--b0)', borderRadius: 8, padding: '16px' }}>
      <div style={{ fontFamily: 'var(--ff)', fontSize: 8, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--txt3)', marginBottom: 14, fontWeight: 700 }}>
        CRATER SIZE COMPARISON — PHYSICAL EVIDENCE
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', marginBottom: 16, minHeight: 140 }}>
        {/* Real crater */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: realPx, height: realPx, borderRadius: '50%', background: 'rgba(34,197,94,.15)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--ff)', fontSize: 9, color: '#22c55e', fontWeight: 700 }}>{data.realDiameterM}m</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: '#22c55e', fontWeight: 700, letterSpacing: '.06em' }}>ACTUAL CRATER</div>
            <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)' }}>Rocket motor impact</div>
          </div>
        </div>
        {/* VS */}
        <div style={{ fontFamily: 'var(--ff)', fontSize: 14, color: 'var(--txt3)', fontWeight: 700, paddingBottom: 40 }}>VS</div>
        {/* IDF crater */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: idfPx, height: idfPx, borderRadius: '50%', background: 'rgba(239,68,68,.12)', border: '2px dashed #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
            <span style={{ fontFamily: 'var(--ff)', fontSize: 9, color: '#ef4444', fontWeight: 700 }}>{data.idfBombDiameterM}m</span>
            <div style={{ position: 'absolute', top: -8, right: -8, fontFamily: 'var(--ff)', fontSize: 8, background: 'rgba(239,68,68,.15)', color: '#ef4444', padding: '2px 5px', borderRadius: 3, border: '1px solid rgba(239,68,68,.3)', whiteSpace: 'nowrap' }}>NEVER HAPPENED</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: '#ef4444', fontWeight: 700, letterSpacing: '.06em' }}>IF IT WAS IDF</div>
            <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)' }}>{data.weapon}</div>
          </div>
        </div>
      </div>
      {/* Conclusion */}
      <div style={{ background: 'rgba(34,197,94,.06)', border: '1px solid rgba(34,197,94,.2)', borderRadius: 6, padding: '10px 12px', fontFamily: 'var(--ffs)', fontSize: 11, color: '#4ade80', lineHeight: 1.6 }}>
        <strong style={{ fontFamily: 'var(--ff)', fontSize: 8, textTransform: 'uppercase', letterSpacing: '.1em', display: 'block', marginBottom: 4 }}>✓ Physical conclusion</strong>
        {data.conclusion}
      </div>
    </div>
  );
}
