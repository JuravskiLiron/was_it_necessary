import { useState } from 'react';
import { VideoEmbed } from '../../types';

interface Props { videos: VideoEmbed[] }

function timestampToSeconds(ts: string): number {
  const parts = ts.split(':').map(Number);
  return parts.length === 2 ? parts[0] * 60 + parts[1] : parts[0];
}

function SourceCard({ video }: { video: VideoEmbed }) {
  return (
    <div style={{
      borderRadius: 7, border: '1px solid var(--b1)',
      background: 'var(--bg2)', padding: '16px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {/* Icon row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8,
          background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--ffs)', fontSize: 12, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.3, marginBottom: 3 }}>{video.title}</div>
          <div style={{ fontFamily: 'var(--ff)', fontSize: 9, color: 'var(--txt3)', letterSpacing: '.07em', textTransform: 'uppercase' }}>{video.source}</div>
        </div>
      </div>
      {/* Instructions 
      <div style={{ background: 'var(--bg3)', borderRadius: 5, padding: '10px 12px', border: '1px solid var(--b0)' }}>
        <div style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6, fontWeight: 700 }}>
          TO ADD THIS VIDEO
        </div>
        <div style={{ fontFamily: 'var(--ff)', fontSize: 10, color: 'var(--txt2)', lineHeight: 1.7 }}>
          1. Search <span style={{ color: 'var(--blue)' }}>"{video.title}"</span> on YouTube<br/>
          2. Copy the ID from the URL: youtube.com/watch?v=<span style={{ color: '#22c55e' }}>XXXXXXXXXXX</span><br/>
          3. Paste it into <span style={{ color: 'var(--blue)' }}>youtubeId</span> field in events.ts
        </div>
      </div>
      */}
    </div>
  );
}

export function VideoPanel({ videos }: Props) {
  const validVideos = videos.filter(v => v.youtubeId && v.youtubeId.length > 5);
  const placeholderVideos = videos.filter(v => !v.youtubeId || v.youtubeId.length <= 5);

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (validVideos.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {placeholderVideos.map((v, i) => <SourceCard key={i} video={v} />)}
      </div>
    );
  }

  const v = validVideos[active];

  return (
    <div>
      {/* Player */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: 7, overflow: 'hidden', border: '1px solid var(--b1)', marginBottom: 8, background: 'var(--bg3)' }}>
        {playing ? (
          <iframe
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1${v.timestamp ? `&start=${timestampToSeconds(v.timestamp)}` : ''}&rel=0&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            style={{ position: 'absolute', inset: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}
            onClick={() => setPlaying(true)}
          >
            <img
              src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
              alt={v.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .5 }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(239,68,68,.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(239,68,68,.5)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
              </div>
              <div style={{ fontFamily: 'var(--ff)', fontSize: 9, color: 'rgba(255,255,255,.8)', letterSpacing: '.06em', textAlign: 'center', maxWidth: 200 }}>{v.title}</div>
            </div>
          </div>
        )}
      </div>
      {/* Meta */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontFamily: 'var(--ffs)', fontSize: 11, color: 'var(--txt)', fontWeight: 500, marginBottom: 3 }}>{v.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{v.source}</span>
          {v.timestamp && <span style={{ fontFamily: 'var(--ff)', fontSize: 8, color: 'var(--blue)', padding: '1px 5px', border: '1px solid rgba(59,130,246,.25)', borderRadius: 3 }}>▶ {v.timestamp}</span>}
        </div>
      </div>
      {/* Source tabs */}
      {validVideos.length > 1 && (
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {validVideos.map((vid, i) => (
            <button key={i} onClick={() => { setActive(i); setPlaying(false); }} style={{
              padding: '4px 10px', borderRadius: 4, border: `1px solid ${i === active ? 'var(--blue)' : 'var(--b1)'}`,
              background: i === active ? 'rgba(59,130,246,.15)' : 'transparent',
              color: i === active ? 'var(--blue)' : 'var(--txt2)',
              fontFamily: 'var(--ff)', fontSize: 9, cursor: 'pointer', letterSpacing: '.05em',
            }}>{vid.source}</button>
          ))}
        </div>
      )}
      {/* Placeholders below if any */}
      {placeholderVideos.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {placeholderVideos.map((v, i) => <SourceCard key={i} video={v} />)}
        </div>
      )}
    </div>
  );
}