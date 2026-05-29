import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { StrikeEvent } from '../types';
import { CATEGORY_CONFIG } from '../data/events';

const MAPTILER_KEY = '3HmScKjTlYXhu3JhKT2J';

interface Props {
  events: StrikeEvent[];
  selectedEvent: StrikeEvent | null;
  onSelect: (e: StrikeEvent) => void;
  arenaCenter: [number, number];
  arenaZoom: number;
  isMobile?: boolean;
}

const STATUS_COLOR: Record<string, string> = {
  verified: '#22c55e',
  disputed: '#f59e0b',
  debunked: '#ef4444',
};

type MapStyle = '2d' | 'satellite' | 'hybrid';

const STYLES: { id: MapStyle; label: string; url: string }[] = [
  { id: '2d', label: '2D', url: `https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}` },
  { id: 'satellite', label: 'SAT', url: `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}` },
  { id: 'hybrid', label: 'HYB', url: `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}` },
];

const BUILDING_DATA: Record<string, {
  popupCoords: [number, number];
  target: { bounds: [[number,number],[number,number]]; label: string } ;
  context: { bounds: [[number,number],[number,number]]; label: string; icon: string }[];
}> = {
  'al-ahli-hospital-2023': {
    popupCoords: [31.505223, 34.461375],
    target: { bounds: [[31.505318, 34.461262],[31.505153, 34.461459]], label: 'IMPACT SITE' },
    context: [{ bounds: [[31.505534, 34.460646

],[31.504230, 34.462259

]], label: 'HOSPITAL COMPLEX AND NEIGHBORHOOD', icon: '' }],
  },
  'shifa-tunnel-2023': {
    popupCoords: [31.521393, 34.443954],
    target: { bounds: [[31.524210,34.443113],[31.523698,34.443789]], label: 'HAMAS UNDERGROUND COMPLEX' },
    context: [{ bounds: [[31.525597,34.441884],[31.522599,34.445165]], label: 'HOSPITAL AND RESIDENTIAL AREA', icon: '' }],
  },
  'khan-yunis-weapons-2024': {
    popupCoords: [31.346081, 34.303901],
    target: { bounds: [[31.345982,34.303772],[31.346173,34.304033]], label: 'WEAPONS STORAGE' },
    context: [{ bounds: [[31.34572,34.3035],[31.34642,34.30428]], label: 'RESIDENTIAL AREA', icon: '🏘' }],
  },
  'hezbollah-launch-site-2024': {
    popupCoords: [33.273882, 35.297624],
    target: { bounds: [[33.273792,35.297518],[33.273973,35.297742]], label: 'ROCKET POSITION' },
    context: [{ bounds: [[33.27342,35.29712],[33.27432,35.29802]], label: 'OPEN FIELD', icon: '🌾' }],
  },
  'jenin-network-2024': {
    popupCoords: [32.459196, 35.301482],
    target: { bounds: [[32.459108,35.30136],[32.459292,35.301606]], label: 'COMMAND NODE' },
    context: [{ bounds: [[32.45876,35.30102],[32.45962,35.30192]], label: 'URBAN BLOCK', icon: '🏘' }],
  },
  'israeliranonbatyam': {
    popupCoords: [32.026107, 34.749636],
    target: { bounds: [[32.027086, 34.748929],[32.024697, 34.751652]], label: '' },
    context: [{ bounds: [[32.027086, 34.748929],[32.024697, 34.751652]], label: 'NEIGHBORHOOD', icon: '🏘' }],
  },
};

function makeInvisibleIcon(): L.DivIcon {
  return L.divIcon({ className: '', iconSize: [1,1], iconAnchor: [0,0], html: '' });
}

export function MapView({ events, selectedEvent, onSelect, arenaCenter, arenaZoom, isMobile = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const buildingLayersRef = useRef<L.Layer[]>([]);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const onSelectRef = useRef(onSelect);
  useEffect(() => { onSelectRef.current = onSelect; }, [onSelect]);
  const [mapStyle, setMapStyle] = useState<MapStyle>('2d');
  const [legendOpen, setLegendOpen] = useState(true);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes mpulse{ 0%{transform:scale(.5);opacity:.8} 100%{transform:scale(1.8);opacity:0} }
      .leaflet-control-zoom{border:1px solid rgba(255,255,255,.1)!important;border-radius:3px!important}
      .leaflet-control-zoom a{background:#181818!important;color:#666!important;border-color:#333!important;width:28px!important;height:28px!important;line-height:28px!important}
      .leaflet-control-zoom a:hover{background:#222!important;color:#e8e8e8!important}
      .leaflet-popup-content-wrapper{background:#181818!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:8px!important;box-shadow:0 8px 24px rgba(0,0,0,.7)!important}
      .leaflet-popup-tip{background:#181818!important}
      .leaflet-popup-content{margin:0!important}
    `;
    document.head.appendChild(style);
    const map = L.map(containerRef.current, { center: arenaCenter, zoom: arenaZoom, zoomControl: false, attributionControl: false });
    const tileLayer = L.tileLayer(STYLES[0].url, { maxZoom: 20 });
    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 200);
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // ТОЛЬКО ЭТО ИСПРАВЛЕНО — зумend логика
    map.on('zoomend', () => {
      const z = map.getZoom();
      buildingLayersRef.current.forEach((l: any) => {
        const el = (l as L.Marker).getElement?.();
        if (!el) return;
        if (l._isLabel) el.style.display = z >= 15 ? '' : 'none';
        if (l._isDot)   el.style.display = z >= 15 ? 'none' : '';
      });
    });

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    const styleObj = STYLES.find(s => s.id === mapStyle)!;
    const layer = L.tileLayer(styleObj.url, { maxZoom: 20 });
    layer.addTo(map);
    tileLayerRef.current = layer;
  }, [mapStyle]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo(arenaCenter, arenaZoom, { duration: 1.2 });
  }, [arenaCenter, arenaZoom]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(m => m.remove());
    buildingLayersRef.current.forEach(l => l.remove());
    markersRef.current.clear();
    buildingLayersRef.current = [];

    events.forEach(event => {
      const cfg = CATEGORY_CONFIG[event.category] ?? { label: '', color: '#ff3333' };
      const data = BUILDING_DATA[event.id];
      if (!data) return;

      // ТОЧКА — твой оригинальный код, не тронут
      const dotIcon = L.divIcon({
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        html: `<div style="position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center;">
    <div style="position:absolute;inset:0;"></div>
    <div style="width:10px;height:10px;border-radius:50%;background:${cfg.color};box-shadow:0 0 0 2px rgba(0,0,0,.9),0 0 10px ${cfg.color};"></div>
  </div>`,
      });
      const dotCenter = L.latLngBounds(data.target.bounds).getCenter();
      const dot = L.marker(dotCenter, { icon: dotIcon, zIndexOffset: 500 });
      dot.addTo(map);
      (dot as any)._isDot = true;
dot.on('click', () => {
  map.flyTo(dotCenter, 16, { duration: 0.5, animate: true });
  
});      buildingLayersRef.current.push(dot);

      // Context rectangles
      data.context.forEach(ctx => {
        const rect = L.rectangle(ctx.bounds, {
          color: 'rgba(255,255,255,0.92)', fillColor: 'rgb(0 0 0 / 0.02)',
          fillOpacity: 1, weight: 1.5, interactive: false,
        });
        rect.addTo(map);
        buildingLayersRef.current.push(rect);

        if (!ctx.label) return;
        const topLeft = L.latLngBounds(ctx.bounds).getNorthWest();
        const label = L.divIcon({
          className: '', iconSize: [0,0], iconAnchor: [0,20],
          html: `<div style="color: #171b22;, padding:3px 7px;font-family:'JetBrains Mono',monospace;font-size:9px;white-space:nowrap;letter-spacing:.05em; font-weight: bold;
 display: inline;
\tbackground-color: rgba(0, 0, 0, 0.5);
\tbox-shadow: -10px 0 0 rgba(0, 0, 0, 0.5), 10px 0 0 rgba(0, 0, 0, 0.5);
\tpadding: 0 10px 0 0;
\tcolor: #FFFFFF;
\tline-height: 14px;
\tfont-size: 9px;">${ctx.label}</div>`,
        });
        const lm = L.marker(topLeft, { icon: label, interactive: false });
        lm.addTo(map);
        (lm as any)._isLabel = true;
        requestAnimationFrame(() => { const e = lm.getElement?.(); if (e) e.style.display = 'none'; });
        buildingLayersRef.current.push(lm);
      });

      // Target rectangle
      const targetRect = L.rectangle(data.target.bounds, {
        color: '#ff3b30', fillColor: '#ff3b30', fillOpacity: 0.22, weight: 1.8, opacity: 0.95,
      });
      targetRect.addTo(map);
      buildingLayersRef.current.push(targetRect);

      // Target label
      const targetTopLeft = L.latLngBounds(data.target.bounds).getNorthWest();
      const targetLabel = L.divIcon({
        className: '', iconSize: [0,0], iconAnchor: [0,20],
        html: `<div style="padding:3px 7px;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;color:#ff3b30;white-space:nowrap;letter-spacing:.08em;">${data.target.label}</div>`,
      });
      const tl = L.marker(targetTopLeft, { icon: targetLabel, interactive: false, zIndexOffset: 1000 });
      tl.addTo(map);
      (tl as any)._isLabel = true;
      requestAnimationFrame(() => { const e = tl.getElement?.(); if (e) e.style.display = 'none'; });
      buildingLayersRef.current.push(tl);

      // Invisible marker for popup
      const marker = L.marker(data.popupCoords, { icon: makeInvisibleIcon() });
      marker.bindPopup(`
        <div style="padding:16px;min-width:240px;background:#171b22;border:1px solid #2a313d;border-radius:12px;box-shadow:0 10px 35px rgba(0,0,0,.45);font-family:'Inter',sans-serif;">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:#7d8694;margin-bottom:8px;font-weight:600;">${cfg.label}</div>
          <div style="font-size:16px;font-weight:700;color:#f3f5f7;margin-bottom:6px;">${event.title}</div>
          <div style="font-size:12px;color:#9aa4b2;margin-bottom:14px;line-height:1.45;">${event.subtitle}</div>
          <button onclick="window.__sel?.('${event.id}')" style="width:100%;padding:11px;background:${cfg.color};color:white;border:none;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:.06em;">VIEW FULL BREAKDOWN</button>
        </div>
      `);
      marker.addTo(map);
      markersRef.current.set(event.id, marker);

      targetRect.on('click', () => { marker.openPopup(); });
    });

    (window as any).__sel = (id: string) => {
      const ev = events.find(x => x.id === id);
      if (ev) onSelectRef.current(ev);
    };
  }, [events, selectedEvent, isMobile]);

  return (
    <div className="map-wrap" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    
{/* ── LEGEND PANEL ── */}
    <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 500, fontFamily: "'JetBrains Mono', monospace", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
        <button onClick={() => setLegendOpen(o => !o)} style={{ background: 'rgba(10,12,10,.92)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 6, padding: '6px 10px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: legendOpen ? '#fff' : 'rgba(255,255,255,.45)', letterSpacing: '.1em', display: 'flex', alignItems: 'center', gap: 6, WebkitTapHighlightColor: 'transparent' }}>
          <span style={{ fontSize: 10 }}></span>  {legendOpen ? 'CLOSE' : 'OPEN'}
        </button>
        {legendOpen && (
          <div style={{ background: 'rgba(10,12,10,.92)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, padding: '12px 14px', backdropFilter: 'blur(8px)', minWidth: 172 }}>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,.3)', letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 10, fontWeight: 700 }}>MAP LEGEND</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff3b30', boxShadow: '0 0 6px #ff3b30', flexShrink: 0 }} /><span style={{ fontSize: 9, color: 'rgba(255,255,255,.55)' }}>Incident marker</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 14, height: 10, border: '2px solid #ff3b30', background: 'rgba(255,59,48,.15)', borderRadius: 2, flexShrink: 0 }} /><span style={{ fontSize: 9, color: 'rgba(255,255,255,.55)' }}>Strike zone</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 14, height: 10, border: '1.5px solid rgba(255,255,255,.7)', background: 'rgba(255,255,255,.05)', borderRadius: 2, flexShrink: 0 }} /><span style={{ fontSize: 9, color: 'rgba(255,255,255,.55)' }}>Surrounding area</span></div>
          
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,.3)', letterSpacing: '.14em', textTransform: 'uppercase' as const, marginBottom: 8, fontWeight: 700 }}>HOW TO NAVIGATE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[{ step: '1', text: 'Tap dot → camera flies in' }, { step: '2', text: 'Tap red zone → popup opens' }].map(s => (
                <div key={s.step} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: 'rgba(255,255,255,.4)', fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', lineHeight: 1.5 }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 500, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {STYLES.map(style => (
          <button key={style.id} onClick={() => setMapStyle(style.id)} style={{ padding: '6px 10px', background: mapStyle === style.id ? 'rgba(30,30,30,.96)' : 'rgba(10,10,10,.86)', border: '1px solid rgba(255,255,255,.08)', color: mapStyle === style.id ? '#fff' : '#666', borderRadius: 3, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '.08em', cursor: 'pointer' }}>{style.label}</button>
        ))}
      </div>
    </div>
  );
}