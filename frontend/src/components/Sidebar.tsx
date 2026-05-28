import { useState, useRef } from 'react';
import { StrikeEvent } from '../types';
import { CATEGORY_CONFIG } from '../data/events';
import { ClaimsVsFacts } from './incident/ClaimsVsFacts';
import { VideoPanel } from './incident/VideoPanel';
import { CraterViz } from './incident/CraterViz';
import { MediaStatsPanel } from './incident/MediaStats';

interface Props { event: StrikeEvent | null; isOpen: boolean; onClose: () => void }

const SC: Record<string, string> = { verified: '#22c55e', disputed: '#f59e0b', debunked: '#ef4444' };
const SL: Record<string, string> = { verified: '✓ Verified', disputed: '⚠ Disputed', debunked: '✗ False Attribution' };

type Tab = 'timeline' | 'claims' | 'media' | 'videos' | 'evidence';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'var(--ff)', fontSize: 8, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--txt3)', margin: '18px 0 10px', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
      {children}
      <div style={{ flex: 1, height: 1, background: 'var(--b0)' }} />
    </div>
  );
}

export function Sidebar({ event, isOpen, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('timeline');
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => { startYRef.current = e.touches[0].clientY; };
  const onTouchEnd   = (e: React.TouchEvent) => {};

  if (!event) return <div className={`sidebar${isOpen ? ' open' : ''}`} />;

  const ev = event as StrikeEvent & { mediaStats?: any; blastRadius?: number };
  const cfg = CATEGORY_CONFIG[event.category] ?? { label: event.category, color: '#3b82f6', icon: '📍' };

  const TABS: { id: Tab; label: string; count?: number }[] = [
    { id: 'timeline', label: 'Timeline' },
    { id: 'claims',   label: 'Claims',   count: event.claimsVsFacts.length },
    { id: 'media',    label: 'Media',    count: ev.mediaStats?.totalReported },
    { id: 'videos',   label: 'Videos',   count: event.videos.length },
    ...(event.craterComparison ? [{ id: 'evidence' as Tab, label: 'Evidence' }] : []),
  ];

  return (
    <div
      className={`sidebar${isOpen ? ' open' : ''}`}
      ref={sheetRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className="sb-close" onClick={onClose} aria-label="Close">✕</button>
      <div className="sb-inner">

        {/* ── Header ── */}
        <div className="sb-head">
          <div className="sb-cat" style={{ color: cfg.color }}>{cfg.icon}&nbsp;{cfg.label}</div>
          <div className="sb-title">{event.title}</div>
          <div className="sb-sub">{event.subtitle}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
            {ev.blastRadius && ev.blastRadius > 0 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 3, background: 'rgba(239,68,68,.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,.2)', fontFamily: 'var(--ff)', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', border: '1.5px dashed #ef4444' }} />
                ~{ev.blastRadius}m radius
              </div>
            )}
          </div>
          <div className="sb-tags" style={{ marginTop: 10 }}>
            {event.tags.map(t => <span key={t} className="sb-tag">#{t}</span>)}
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div
          style={{ display: 'flex', borderBottom: '1px solid var(--b0)', padding: '0 12px', gap: 2, flexShrink: 0, overflowX: 'auto', scrollbarWidth: 'none' }}
        >
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '10px 10px 9px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--ff)', fontSize: 9, letterSpacing: '.06em', fontWeight: 600,
              color: tab === t.id ? 'var(--txt)' : 'var(--txt3)',
              borderBottom: `2px solid ${tab === t.id ? cfg.color : 'transparent'}`,
              whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5,
              transition: 'color .15s', WebkitTapHighlightColor: 'transparent', minWidth: 44,
            }}>
              {t.label.toUpperCase()}
              {t.count != null && t.count > 0 && (
                <span style={{ background: `${cfg.color}20`, color: cfg.color, borderRadius: 10, padding: '0 5px', fontSize: 8 }}>{t.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="tl-wrap" style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>

          {/* TIMELINE */}
          {tab === 'timeline' && (
            <>
              {event.timeline.map((section, si) => (
                <div key={si} className="tl-item">
                  <div className="tl-spine">
                    <div className="tl-num" style={{ background: `${section.phaseColor}15`, color: section.phaseColor }}>{si + 1}</div>
                    {si < event.timeline.length - 1 && <div className="tl-vline" />}
                  </div>
                  <div className="tl-body">
                    <div className="phase-tag" style={{ background: `${section.phaseColor}12`, color: section.phaseColor }}>{section.phase}</div>
                    {section.steps.map((step, ti) => (
                      <div key={ti} className="tl-card">
                        <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', marginBottom: 4 }}>{step.time}</div>
                        <div className="tl-ctitle">{step.title}</div>
                        {step.claim && <div className="tl-claim">"{step.claim}"</div>}
                        {step.text && <div className="tl-ctext" style={{ marginTop: step.claim ? 7 : 0 }}>{step.text}</div>}
                        {step.debunk && <div className="tl-debunk"><span className="tl-dlbl">✓ Proven / Debunked</span>{step.debunk}</div>}
                        {step.videoId && (
                          <div style={{ marginTop: 10 }}>
                            <VideoPanel videos={event.videos.filter(v => v.youtubeId === step.videoId)} />
                          </div>
                        )}
                        {step.sources && step.sources.length > 0 && (
                          <div className="srcs">{step.sources.map(s => <span key={s} className="src-tag">{s}</span>)}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <SectionLabel>Reported Casualties</SectionLabel>
              <div className="cas-row">
                <div className="cas-box">
                  <div className="cas-n" style={{ color: 'var(--red)' }}>{String(event.casualties.reported)}</div>
                  <div className="cas-l">Claimed</div>
                </div>
                <div className="cas-box">
                  <div className="cas-n" style={{ color: 'var(--green)' }}>{String(event.casualties.verified)}</div>
                  <div className="cas-l">Independently Verified</div>
                </div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--txt3)', lineHeight: 1.65, marginBottom: 14, fontFamily: 'var(--ff)' }}>{event.casualties.notes}</div>
              <div className="verdict">
                <div className="v-lbl">Verdict</div>
                <div className="v-txt">{event.targetJustification}</div>
                {event.warningGiven && event.warningDetails && <div className="v-warn">✓ Warning: {event.warningDetails}</div>}
              </div>
            </>
          )}

          {/* CLAIMS VS FACTS */}
          {tab === 'claims' && (
            <>
              <div style={{ fontFamily: 'var(--ffs)', fontSize: 12, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 14, padding: '4px 0' }}>
                Real-time claims vs what was independently proven.
              </div>
              <ClaimsVsFacts items={event.claimsVsFacts} />
            </>
          )}

          {/* MEDIA STATS */}
          {tab === 'media' && (
            <>
              <div style={{ fontFamily: 'var(--ffs)', fontSize: 12, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 14, padding: '4px 0' }}>
                How media outlets reported this incident — and how many never corrected the record.
              </div>
              {ev.mediaStats
                ? <MediaStatsPanel data={ev.mediaStats} />
                : <div style={{ fontFamily: 'var(--ff)', fontSize: 11, color: 'var(--txt3)', padding: '20px 0', textAlign: 'center' }}>No media data available for this incident.</div>
              }
            </>
          )}

          {/* VIDEOS */}
          {tab === 'videos' && (
            <>
              <div style={{ fontFamily: 'var(--ffs)', fontSize: 12, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 14, padding: '4px 0' }}>
                Primary source video evidence — CNN, IDF, satellite analysis.
              </div>
              <VideoPanel videos={event.videos} />
            </>
          )}

          {/* PHYSICAL EVIDENCE */}
          {tab === 'evidence' && event.craterComparison && (
            <>
              <div style={{ fontFamily: 'var(--ffs)', fontSize: 12, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 14, padding: '4px 0' }}>
                Physical forensic evidence that makes false attribution impossible.
              </div>
              <CraterViz data={event.craterComparison} />
            </>
          )}

          <div style={{ padding: '12px 0 20px', textAlign: 'center', fontSize: 8, color: 'var(--txt3)', letterSpacing: '.07em' }}>
            VERIFIED BY {event.verifiedBy.toUpperCase()} · {new Date(event.lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}