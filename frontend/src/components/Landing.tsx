import { useState, useEffect, useRef } from 'react';

interface Props { onEnter: () => void; }

const CASES = [
  {
    location: 'Beit Hanoun, North Gaza',
    population: '52,000 residents',
    before_date: 'May 2023',
    after_date: 'Dec 2023',
    before: 'https://interactives.ap.org/before-after/beit-hanoun1/images/before.jpg',
    after:  'https://interactives.ap.org/before-after/beit-hanoun1/images/after.jpg',
    why: 'IDF ground intelligence identified Hamas\'s Beit Hanoun Battalion command HQ, weapons cache, and tunnel network operating from beneath residential blocks. Evacuation orders were issued 72 hours before ground operations began.',
    sources: [<a href="https://bit.ly/40G94y8">IDF Intelligence Directorate</a>, 'US Defense Intelligence Agency', 'COGAT evacuation records'],
  },
  {
    location: 'Rimal District, Gaza City',
    population: '40,000+ residents',
    before_date: 'Jun 2023',
    after_date: 'Nov 2023',
    before: 'https://dims.apnews.com/dims4/default/57a28ad/2147483647/strip/true/crop/7659x5894+0+0/resize/2880x2216!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F5e%2F3f%2F4b6f44a43c6f62b94d8d89a895a6%2Fa432a1c76c214dd68bdf2c07af50f0ce',
    after:  'https://dims.apnews.com/dims4/default/2349364/2147483647/strip/true/crop/7659x5894+0+0/resize/2880x2216!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fc0%2F27%2F92686635c3a81bce0ab89a03f2bf%2Fddeaf014525e4edb83ace2423e056b18',
    why: 'Hamas thought IDF would not suspect Gaza’s skyscrapers. Quietly, hostile Hamas terrorist operatives have transformed the neighborhood into a terrorist stronghold, crawling with terrorist command centers from which Hamas senior operatives are planning, directing, and carrying out terrorist attacks against Israel.',
    sources: ['IDF Intelligence Directorate', 'Maxar satellite analysis', 'Post-operation IDF documentation'],
  },
];

function Slider({ before, after, dateB, dateA }: { before: string; after: string; dateB: string; dateA: string }) {
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const calc = (cx: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((cx - r.left) / r.width) * 100)));
  };

  return (
    <div ref={ref}
      onMouseDown={e => { setDrag(true); calc(e.clientX); }}
      onMouseMove={e => drag && calc(e.clientX)}
      onMouseUp={() => setDrag(false)} onMouseLeave={() => setDrag(false)}
      onTouchStart={e => { setDrag(true); calc(e.touches[0].clientX); }}
      onTouchMove={e => { e.preventDefault(); drag && calc(e.touches[0].clientX); }}
      onTouchEnd={() => setDrag(false)}
      style={{ position: 'relative', width: '100%', height: '100%', cursor: 'col-resize',
        userSelect: 'none', WebkitUserSelect: 'none' as any, touchAction: 'none' }}
    >
      <img src={after} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.6) saturate(.8)' }} />
      <div style={{ position: 'absolute', top: 10, right: 12, zIndex: 3, fontSize: 8, fontWeight: 800, letterSpacing: '.14em', color: '#d4a0a0', background: 'rgba(8,10,6,.85)', padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(212,160,160,.25)' }}>AFTER · {dateA}</div>
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.7) saturate(.9)' }} />
        <div style={{ position: 'absolute', top: 10, left: 12, zIndex: 3, fontSize: 8, fontWeight: 800, letterSpacing: '.14em', color: '#a8c5a0', background: 'rgba(8,10,6,.85)', padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(168,197,160,.25)' }}>BEFORE · {dateB}</div>
      </div>
      <div style={{ position: 'absolute', inset: '0 auto', left: `${pos}%`, transform: 'translateX(-50%)', width: 2, background: 'rgba(255,255,255,.9)', zIndex: 4, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: `${pos}%`, transform: 'translate(-50%,-50%)', width: 40, height: 40, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,.7)', zIndex: 5, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
          <path d="M1 5h16M1 5L5 1M1 5L5 9M17 5L13 1M17 5L13 9" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', fontSize: 8, color: 'rgba(255,255,255,.5)', letterSpacing: '.1em', background: 'rgba(0,0,0,.6)', padding: '3px 10px', borderRadius: 10, pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        ← DRAG TO COMPARE →
      </div>
    </div>
  );
}

const STEP_IMGS = [
  'https://i.pinimg.com/736x/13/63/e5/1363e56b9435afa387ee8302f4c8b72d.jpg',
  'https://i.pinimg.com/736x/b5/5a/97/b55a97f822deb510f51addeb7fe1f29b.jpg',
  'https://i.pinimg.com/736x/c0/41/8f/c0418f1039e0f7b4c7fd592c9eb9e100.jpg',
  'https://i.pinimg.com/736x/fb/7e/ff/fb7effcd97cc6e302057dd404ca08567.jpg',
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
  const [activeCase, setActiveCase] = useState(0);
  const c = CASES[activeCase];

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
        {/* ════════════════════════════════════════
   HERO / INTRO SECTION
   INSERT THIS BEFORE:
   {/* ══ BEFORE/AFTER ══ */}

{/* ══ MINIMAL HERO ══ */}

<section
  style={{
    background: '#060805',
    padding: '24px 24px 24px',
    borderBottom: '1px solid rgba(255,255,255,.06)',
  }}
>
  <div style={{ maxWidth: 620 }}>
    
  

    <h1
      style={{
        fontSize: 'clamp(42px, 11vw, 82px)',
        lineHeight: .95,
        fontWeight: 900,
    
        color: '#ffffffff',
        margin: '0 0 20px',
      }}
    >
      Interactive
      <br />
      Conflict Archive
    </h1>

    <p
      style={{
        maxWidth: 460,
        fontSize: 17,
        color: 'rgba(255, 255, 255, 0.67)',
        margin: '0 0 34px',
      }}
    >
  Explore the conflict through verified evidence, documented strikes, satellite imagery, videos, eyewitness reports, and forensic investigations mapped across Gaza, Israel, Lebanon, and the West Bank. Understand what happened, where it happened, and who verified it through interactive maps, timelines, geolocation analysis, and cross-checked reporting.
    </p>

    

<div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        marginBottom: 24,
      }}
    >
      <button
        onClick={handleEnter}
        style={{
          height: 56,
          padding: '0 26px',
          borderRadius: 14,
          border: 'none',
          background: '#c8b89a',
          color: '#0a0d08',
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: '.08em',
          cursor: 'pointer',
          fontFamily: 'inherit',
          WebkitTapHighlightColor: 'transparent',
          transition: 'transform .2s ease',
        }}
      >
        OPEN MAP →
      </button>

      <button
        onClick={() =>
          containerRef.current?.scrollTo({
            top: scrollY + 400,
            behavior: 'smooth',
          })
        }
        style={{
          height: 56,
          padding: '0 26px',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,.1)',
          background: 'rgba(255,255,255,.03)',
          color: 'rgba(255,255,255,.56)',
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: '.08em',
          cursor: 'pointer',
          fontFamily: 'inherit',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        LEARN MORE
      </button>
    </div>
  </div>
</section>


        {/* ══ BEFORE/AFTER ══ */}
        <section style={{ background: '#080b06', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ padding: '52px 24px 28px' }}>
            <p style={{ fontSize: 10, color: '#d4a0a0', letterSpacing: '.18em', textTransform: 'uppercase' as const, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
EXAMPLE            </p>
            <h2 style={{ fontSize: 'clamp(30px, 9vw, 46px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.04, margin: '0 0 12px' }}>
              <span style={{ color: '#fff' }}>Was it </span>
              <span style={{ fontSize: 65, color: 'rgba(212,160,160,.75)', fontFamily: 'inherit' }}>necessary?</span>
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.7, margin: 0, maxWidth: 310 }}>
              Drag to compare, the same neighbourhood, before and after. Then read what intelligence found underneath.
            </p>
          </div>
          <div style={{ padding: '0 24px 16px', display: 'flex', gap: 8 }}>
            {CASES.map((cs, i) => (
              <button key={i} onClick={() => setActiveCase(i)} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: `1px solid ${i === activeCase ? 'rgba(212,160,160,.35)' : 'rgba(255,255,255,.07)'}`, background: i === activeCase ? 'rgba(212,160,160,.08)' : 'transparent', color: i === activeCase ? '#d4a0a0' : 'rgba(255,255,255,.28)', fontSize: 9, fontWeight: 700, letterSpacing: '.06em', cursor: 'pointer', fontFamily: 'inherit', WebkitTapHighlightColor: 'transparent', transition: 'all .2s', textAlign: 'center' as const }}>
                {cs.location.split(',')[0]}
              </button>
            ))}
          </div>
          <div style={{ width: '100%', height: 280 }}>
            <Slider before={c.before} after={c.after} dateB={c.before_date} dateA={c.after_date} />
          </div>
          <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.02)' }}>
            <div >
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.65)', marginBottom: 2 }}>{c.location}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '.04em' }}>Pop. {c.population}</div>
            </div>
          </div>
          <div style={{ padding: '24px 24px 48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: '#a8c5a0', letterSpacing: '.08em' }}>YES. IT WAS.</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.75, margin: '0 0 18px' }}>{c.why}</p>
            <div style={{ padding: '14px 16px', background: 'rgba(168,197,160,.05)', border: '1px solid rgba(168,197,160,.1)', borderRadius: 10 }}>
              <div style={{ fontSize: 8, color: '#a8c5a0', letterSpacing: '.14em', fontWeight: 800, marginBottom: 8 }}>SOURCES</div>
              {c.sources.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: i < c.sources.length - 1 ? 6 : 0 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#a8c5a0', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,.35)' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY THIS EXISTS ══ */}
        <section style={{ background: '#0a0d08', padding: '60px 0 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ padding: '0 26px', marginBottom: 52 }}>
           
            <h2 style={{ fontSize: 'clamp(26px, 8vw, 38px)', fontWeight: 800, letterSpacing: '-1px', color: '#fff', lineHeight: 1.1, margin: '0 0 16px' }}>
             HOW IT <br/>
              <span style={{ color: '#8fb8d4', fontSize: 'clamp(52px, 16vw, 76px)'}}>WORKS?</span>
            </h2>
         { /*  <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.75, margin: 0, maxWidth: 320 }}>
              When Hamas claimed Israel bombed Al-Ahli Hospital, 247 outlets ran it as fact. Four Western intelligence agencies confirmed it was a misfired PIJ rocket. 164 outlets never corrected the record. This platform documents exactly what happened — with primary sources.
            </p>*/}
          </div>

          {[
            { n: '01', color: '#c8b89a', tag: 'THEATRE SELECTION', title: 'Pick a conflict zone', body: 'Gaza. Lebanon. West Bank. Every theatre has documented incidents — verified independently, not from a single source.', detail: 'Switch between arenas instantly. Each loads only the incidents relevant to that region.', img: STEP_IMGS[0] },
            { n: '02', color: '#8fb8d4', tag: 'SATELLITE VIEW', title: 'See exactly what was hit', body: 'Each incident shows satellite-accurate boundaries: the strike zone in red, surrounding civilian structures in white — the same format military analysts use.', detail: 'Zoom in on the map to reveal strike zones, building labels, and blast radius data.', img: STEP_IMGS[1] },
            { n: '03', color: '#a8c5a0', tag: 'EVIDENCE BREAKDOWN', title: 'Claims vs what was proven', body: 'Every incident has a full breakdown: the initial claim, the physical evidence, and what intelligence agencies independently confirmed.', detail: 'Crater analysis. Weapon signatures. Intercepted communications. All sourced.', img: STEP_IMGS[2] },
            { n: '04', color: '#d4a0a0', tag: 'MEDIA RECORD', title: 'The accountability record', body: 'Which outlets ran false claims. Which issued corrections. Which went silent. The record is permanent, sourced, and publicly accessible.', detail: "NYT issued an editor's note. BBC apologised. 164 outlets never corrected anything.", img: STEP_IMGS[3] },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
              <div style={{ width: '100%', height: 220, overflow: 'hidden', position: 'relative' }}>
                <img src={item.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.52) grayscale(12%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,13,8,.92) 0%, rgba(10,13,8,.15) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#0a0d08', letterSpacing: '.04em' }}>{item.n}</div>
                  <span style={{ fontSize: 8, color: item.color, letterSpacing: '.14em', fontWeight: 600, background: 'rgba(10,13,8,.65)', padding: '4px 9px', borderRadius: 4 }}>{item.tag}</span>
                </div>
              </div>
              <div style={{ padding: '24px 26px 32px' }}>
                <h3 style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-.5px', color: '#fff', margin: '0 0 12px', lineHeight: 1.15 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.48)', lineHeight: 1.75, margin: '0 0 16px' }}>{item.body}</p>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: `${item.color}0e`, border: `1px solid ${item.color}1e`, borderRadius: 10 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 6 }} />
                  <p style={{ fontSize: 12, color: `${item.color}bb`, lineHeight: 1.6, margin: 0 }}>{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section style={{ background: '#0e1108', padding: '56px 26px 52px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        {/* 
          <p style={{ fontSize: 10, color: '#a8c5a0', letterSpacing: '.18em', textTransform: 'uppercase' as const, marginBottom: 36, display: 'flex', alignItems: 'center', gap: 10 }}>
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
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,.08)' }}>
                  <img src={item.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.6) grayscale(20%)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '-.1px', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.id}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,.28)', letterSpacing: '.02em' }}>{item.loc}</div>
                </div>
                <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '.1em', color: item.vcolor, marginBottom: 4 }}>{item.verdict}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,.25)', background: 'rgba(255,255,255,.06)', borderRadius: 4, padding: '2px 7px', display: 'inline-block' }}>{item.tag}</div>
                </div>
              </div>
            ))}
          </div>
          */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <button onClick={handleEnter} style={{ flex: 2, height: 54, borderRadius: 13, background: '#c8b89a', border: 'none', color: '#0a0d08', fontSize: 13, fontWeight: 700, letterSpacing: '.08em', cursor: 'pointer', fontFamily: 'inherit', WebkitTapHighlightColor: 'transparent' }}>OPEN MAP →</button>
            <button onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} style={{ flex: 1, height: 54, borderRadius: 13, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.55)', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', cursor: 'pointer', fontFamily: 'inherit', WebkitTapHighlightColor: 'transparent' }}>↑ TOP</button>
          </div>
          <p style={{ textAlign: 'center' as const, fontSize: 9, color: 'rgba(255,255,255,.18)', letterSpacing: '.08em', paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>No account · No ads · Open source</p>
        </section>

      </div>
    </div>
  );
}