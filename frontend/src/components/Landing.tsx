import { useState, useEffect, useRef } from 'react';

interface Props { onEnter: () => void; }

const STEP_IMGS = [
  'https://i.pinimg.com/736x/13/63/e5/1363e56b9435afa387ee8302f4c8b72d.jpg',
  './src/uploads/Screenshot 2026-05-23 at 20.14.59.png',
  './src/uploads/Screenshot 2026-05-23 at 20.15.54.png',
  './src/uploads/Screenshot 2026-05-23 at 20.16.26.png',
];

export function Landing({ onEnter }: Props) {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const fn = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', fn, { passive: true });
    return () => el.removeEventListener('scroll', fn);
  }, []);

  const handleEnter = () => { setLeaving(true); setTimeout(onEnter, 520); };
  const heroOpacity = Math.max(0, 1 - scrollY / 280);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      opacity: leaving ? 0 : mounted ? 1 : 0,
      transform: leaving ? 'scale(1.04)' : 'scale(1)',
      transition: 'opacity .5s ease, transform .5s ease',
      fontFamily: '-apple-system,"SF Pro Display","Helvetica Neue",sans-serif',
    }}>
      <div ref={containerRef} style={{
        width: '100%', height: '100%',
        overflowY: 'auto', overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch' as any,
      }}>

        {/* ══ HERO ══ */}
        <section style={{
          position: 'relative', height: '100dvh', minHeight: 620,
          display: 'flex', flexDirection: 'column', background: '#0a0d08',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: '-8% 0', transform: `translateY(${scrollY * .28}px)` }}>
            <img src="https://i.pinimg.com/736x/a5/5b/49/a55b495e9af81f04954de6277f2b3569.jpg" alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.42) grayscale(15%)' }} />
          </div>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,13,8,.25) 0%, rgba(10,13,8,.55) 45%, rgba(10,13,8,.97) 100%)',
          }} />
          {/* warm glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 25% 70%, rgba(200,184,154,.1) 0%, transparent 60%)',
          }} />

          <nav style={{
            position: 'relative', zIndex: 5, padding: '22px 26px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            opacity: mounted ? 1 : 0, transition: 'opacity .6s ease .1s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28, border: '1.5px solid rgba(200,184,154,.45)',
                borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, fontWeight: 700, color: '#c8b89a', letterSpacing: '.04em',
              }}>W?</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.8)', letterSpacing: '-.3px' }}>
                WasItNecessary?
              </span>
            </div>
            <button onClick={handleEnter} style={{
              background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 20, padding: '7px 14px', fontSize: 10,
              color: 'rgba(255,255,255,.5)', letterSpacing: '.1em',
              cursor: 'pointer', fontFamily: 'inherit', WebkitTapHighlightColor: 'transparent',
            }}>SKIP</button>
          </nav>

          <div style={{
            position: 'relative', zIndex: 5, flex: 1,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '0 26px 40px', opacity: heroOpacity,
          }}>
            <div style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'none' : 'translateY(22px)',
              transition: 'opacity .7s ease .2s, transform .7s ease .2s',
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'rgba(200,184,154,.1)', border: '1px solid rgba(200,184,154,.18)',
                borderRadius: 20, padding: '6px 13px', marginBottom: 22,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8b89a' }} />
                <span style={{ fontSize: 9, color: '#c8b89a', letterSpacing: '.15em', fontWeight: 600 }}>
                  CONFLICT DOCUMENTATION PLATFORM
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(38px, 11vw, 60px)',
                fontWeight: 800, lineHeight: 1.03, letterSpacing: '-2px',
                color: '#fff', margin: '0 0 18px',
              }}>
                The record<br/>
                <span style={{ color: '#c8b89a' }}>they</span> didn't<br/>
                want kept.
              </h1>

              <p style={{
                fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,.48)',
                margin: '0 0 30px', maxWidth: 310,
              }}>
                Military incidents in Gaza, Lebanon and the West Bank —
                verified with satellite data, intelligence assessments
                and media accountability records.
              </p>

              {/* DUAL CTA */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
                <button onClick={handleEnter} style={{
                  flex: 1, height: 52, borderRadius: 13,
                  background: '#c8b89a', border: 'none',
                  color: '#0a0d08', fontSize: 12, fontWeight: 700,
                  letterSpacing: '.08em', cursor: 'pointer', fontFamily: 'inherit',
                  WebkitTapHighlightColor: 'transparent',
                }}>OPEN MAP →</button>
                <button
                  onClick={() => containerRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  style={{
                    flex: 1, height: 52, borderRadius: 13,
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.14)',
                    color: 'rgba(255,255,255,.75)', fontSize: 12, fontWeight: 600,
                    letterSpacing: '.06em', cursor: 'pointer', fontFamily: 'inherit',
                    WebkitTapHighlightColor: 'transparent',
                  }}>LEARN MORE ↓</button>
              </div>

              <p style={{ fontSize: 9, color: 'rgba(255,255,255,.2)', letterSpacing: '.08em' }}>
                No account · No ads · Open source
              </p>
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section style={{
          background: '#0e1108', padding: '56px 26px 52px',
          borderTop: '1px solid rgba(255,255,255,.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* subtle bg pattern */}
          <div style={{
            position: 'absolute', inset: 0, opacity: .03,
            backgroundImage: 'radial-gradient(circle, #c8b89a 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontSize: 10, color: '#c8b89a', letterSpacing: '.18em',
              textTransform: 'uppercase', marginBottom: 36,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 18, height: 1, background: '#c8b89a', display: 'inline-block' }} />
              By the numbers
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { n: '247', l: 'outlets reported Al-Ahli as an Israeli strike', c: '#c8b89a' },
                { n: '164', l: 'never issued a correction — still live today', c: '#d4a0a0' },
                { n: '4', l: 'Western intel agencies confirmed: not Israel', c: '#8fb8d4' },
                { n: '3m', l: 'actual crater — 6× too small for any IDF munition', c: '#a8c5a0' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '24px 18px 22px',
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid rgba(255,255,255,.07)',
                  borderRadius: 12,
                }}>
                  <div style={{
                    fontSize: 38, fontWeight: 800, color: item.c,
                    lineHeight: 1, marginBottom: 10, letterSpacing: '-1px',
                  }}>{item.n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.38)', lineHeight: 1.55 }}>{item.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY THIS EXISTS ══ */}
        <section style={{
          background: '#0a0d08', padding: '60px 0 0',
          borderTop: '1px solid rgba(255,255,255,.06)',
        }}>
          <div style={{ padding: '0 26px', marginBottom: 52 }}>
            <p style={{
              fontSize: 10, color: '#8fb8d4', letterSpacing: '.18em',
              textTransform: 'uppercase', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 18, height: 1, background: '#8fb8d4', display: 'inline-block' }} />
              Why this exists
            </p>
            <h2 style={{
              fontSize: 'clamp(26px, 8vw, 38px)', fontWeight: 800,
              letterSpacing: '-1px', color: '#fff', lineHeight: 1.1,
              margin: '0 0 16px',
            }}>
              The press got it wrong.<br/>
              <span style={{ color: '#8fb8d4' }}>We have the proof.</span>
            </h2>
            <p style={{
              fontSize: 14, color: 'rgba(255,255,255,.45)',
              lineHeight: 1.75, margin: 0, maxWidth: 320,
            }}>
              When Hamas claimed Israel bombed Al-Ahli Hospital, 247 outlets
              ran it as fact. Four Western intelligence agencies confirmed
              it was a misfired PIJ rocket. 164 outlets never corrected the record.
              This platform documents exactly what happened — with primary sources.
            </p>
          </div>

          {[
            {
              n: '01', color: '#c8b89a', tag: 'THEATRE SELECTION',
              title: 'Pick a conflict zone',
              body: 'Gaza. Lebanon. West Bank. Every theatre has documented incidents — verified independently, not from a single source.',
              detail: 'Switch between arenas instantly. Each loads only the incidents relevant to that region.',
              img: STEP_IMGS[0],
            },
            {
              n: '02', color: '#8fb8d4', tag: 'SATELLITE VIEW',
              title: 'See exactly what was hit',
              body: 'Each incident shows satellite-accurate boundaries: the strike zone in red, surrounding civilian structures in white — the same format military analysts use.',
              detail: 'Zoom in on the map to reveal strike zones, building labels, and blast radius data.',
              img: STEP_IMGS[1],
            },
            {
              n: '03', color: '#a8c5a0', tag: 'EVIDENCE BREAKDOWN',
              title: 'Claims vs what was proven',
              body: 'Every incident has a full breakdown: the initial claim, the physical evidence, and what intelligence agencies independently confirmed.',
              detail: 'Crater analysis. Weapon signatures. Intercepted communications. All sourced.',
              img: STEP_IMGS[2],
            },
            {
              n: '04', color: '#d4a0a0', tag: 'MEDIA RECORD',
              title: 'The accountability record',
              body: 'Which outlets ran false claims. Which issued corrections. Which went silent. The record is permanent, sourced, and publicly accessible.',
              detail: "NYT issued an editor's note. BBC apologised. 164 outlets never corrected anything.",
              img: STEP_IMGS[3],
            },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
              <div style={{ width: '100%', height: 220, overflow: 'hidden', position: 'relative' }}>
                <img src={item.img} alt="" style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: 'brightness(.52) grayscale(12%)',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,13,8,.92) 0%, rgba(10,13,8,.15) 60%, transparent 100%)',
                }} />
                <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6, background: item.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 800, color: '#0a0d08', letterSpacing: '.04em',
                  }}>{item.n}</div>
                  <span style={{
                    fontSize: 8, color: item.color, letterSpacing: '.14em', fontWeight: 600,
                    background: 'rgba(10,13,8,.65)', padding: '4px 9px', borderRadius: 4,
                  }}>{item.tag}</span>
                </div>
              </div>
              <div style={{ padding: '24px 26px 32px' }}>
                <h3 style={{
                  fontSize: 21, fontWeight: 800, letterSpacing: '-.5px',
                  color: '#fff', margin: '0 0 12px', lineHeight: 1.15,
                }}>{item.title}</h3>
                <p style={{
                  fontSize: 14, color: 'rgba(255,255,255,.48)',
                  lineHeight: 1.75, margin: '0 0 16px',
                }}>{item.body}</p>
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '12px 14px',
                  background: `${item.color}0e`,
                  border: `1px solid ${item.color}1e`,
                  borderRadius: 10,
                }}>
                  <div style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: item.color, flexShrink: 0, marginTop: 6,
                  }} />
                  <p style={{ fontSize: 12, color: `${item.color}bb`, lineHeight: 1.6, margin: 0 }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ══ INCIDENT PREVIEW ══ */}
        <section style={{
          background: '#0e1108', padding: '56px 26px 52px',
          borderTop: '1px solid rgba(255,255,255,.06)',
        }}>
          <p style={{
            fontSize: 10, color: '#a8c5a0', letterSpacing: '.18em',
            textTransform: 'uppercase', marginBottom: 36,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 18, height: 1, background: '#a8c5a0', display: 'inline-block' }} />
            Documented incidents
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40 }}>
            {[
              { id: 'Al-Ahli Hospital', loc: 'Gaza City · Oct 17, 2023', verdict: 'FALSE ATTRIBUTION', vcolor: '#d4a0a0', tag: 'PIJ Rocket', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&q=70&fit=crop&crop=center' },
              { id: 'Al-Shifa Hospital', loc: 'Gaza City · Nov 2023', verdict: 'VERIFIED', vcolor: '#a8c5a0', tag: 'Hamas Command', img: 'https://images.unsplash.com/photo-1578496480157-697fc14d2e55?w=200&q=70&fit=crop&crop=center' },
              { id: 'Khan Yunis Complex', loc: 'Khan Yunis · Feb 2024', verdict: 'VERIFIED', vcolor: '#a8c5a0', tag: 'Weapons Depot', img: 'https://images.unsplash.com/photo-1533659828870-95ee305cee3e?w=200&q=70&fit=crop&crop=center' },
              { id: 'Jenin Raid', loc: 'West Bank · Aug 2024', verdict: 'VERIFIED', vcolor: '#8fb8d4', tag: 'IED Network', img: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=200&q=70&fit=crop&crop=center' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px',
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(255,255,255,.07)',
                borderRadius: 12,
              }}>
                {/* thumbnail */}
                <div style={{
                  width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
                  border: '1px solid rgba(255,255,255,.08)',
                }}>
                  <img src={item.img} alt="" style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: 'brightness(.6) grayscale(20%)',
                  }} />
                </div>
                {/* info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '-.1px', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.id}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,.28)', letterSpacing: '.02em' }}>{item.loc}</div>
                </div>
                {/* verdict */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '.1em', color: item.vcolor, marginBottom: 4 }}>{item.verdict}</div>
                  <div style={{
                    fontSize: 8, color: 'rgba(255,255,255,.25)',
                    background: 'rgba(255,255,255,.06)', borderRadius: 4,
                    padding: '2px 7px', display: 'inline-block',
                  }}>{item.tag}</div>
                </div>
              </div>
            ))}
          </div>

          {/* DUAL CTA bottom */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <button onClick={handleEnter} style={{
              flex: 2, height: 54, borderRadius: 13,
              background: '#c8b89a', border: 'none',
              color: '#0a0d08', fontSize: 13, fontWeight: 700,
              letterSpacing: '.08em', cursor: 'pointer', fontFamily: 'inherit',
              WebkitTapHighlightColor: 'transparent',
            }}>OPEN MAP →</button>
            <button
              onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                flex: 1, height: 54, borderRadius: 13,
                background: 'rgba(255,255,255,.07)',
                border: '1px solid rgba(255,255,255,.12)',
                color: 'rgba(255,255,255,.55)', fontSize: 11, fontWeight: 600,
                letterSpacing: '.06em', cursor: 'pointer', fontFamily: 'inherit',
                WebkitTapHighlightColor: 'transparent',
              }}>↑ TOP</button>
          </div>

          <p style={{
            textAlign: 'center', fontSize: 9,
            color: 'rgba(255,255,255,.18)', letterSpacing: '.08em',
            paddingBottom: 'env(safe-area-inset-bottom, 16px)',
          }}>No account · No ads · Open source</p>
        </section>

      </div>
    </div>
  );
}