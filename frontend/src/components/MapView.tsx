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

type MapStyle = 'dark' | 'satellite' | 'hybrid';

const STYLES: { id: MapStyle; label: string; url: string }[] = [
  { id: 'dark',      label: '2D',  url: `https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=${MAPTILER_KEY}` },
  { id: 'satellite', label: 'SAT', url: `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}` },
  { id: 'hybrid',    label: 'HYB', url: `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}` },
];

function makeIcon(event: StrikeEvent, selected: boolean, isMobile: boolean): L.DivIcon {
  const cfg = CATEGORY_CONFIG[event.category] ?? { color: '#3b82f6' };
  const c = cfg.color;
  const sc = STATUS_COLOR[event.verificationStatus] ?? c;
  const s = isMobile ? (selected ? 18 : 14) : (selected ? 14 : 10);
  const ring = isMobile ? (selected ? 36 : 28) : (selected ? 28 : 22);
  return L.divIcon({
    className: '',
    iconSize: [ring, ring],
    iconAnchor: [ring / 2, ring / 2],
    popupAnchor: [0, -(ring / 2 + 8)],
    html: `
      <div style="position:relative;width:${ring}px;height:${ring}px;display:flex;align-items:center;justify-content:center">
        <div style="position:absolute;inset:0;border-radius:50%;border:1.5px solid ${c};opacity:.5;animation:mpulse 2.4s ease-out infinite;pointer-events:none"></div>
        <div style="width:${s}px;height:${s}px;border-radius:50%;background:${c};box-shadow:0 0 0 2px rgba(6,8,13,.9),0 0 8px ${c}80${selected ? ',0 0 0 3px #fff,0 0 14px '+c : ''};flex-shrink:0"></div>
        <div style="position:absolute;top:1px;right:1px;width:${isMobile ? 8 : 6}px;height:${isMobile ? 8 : 6}px;border-radius:50%;background:${sc};border:1.5px solid rgba(6,8,13,.9)"></div>
      </div>`,
  });
}

function syncMarkers(
  map: L.Map,
  events: StrikeEvent[],
  selectedEvent: StrikeEvent | null,
  markers: Map<string, L.Marker>,
  isMobile: boolean,
  isMobileRef: { current: boolean },
  onSelectRef: { current: (e: StrikeEvent) => void },
  drawBlastRef: { current: (e: StrikeEvent) => void },
) {
  markers.forEach((m, id) => {
    if (!events.find(e => e.id === id)) { m.remove(); markers.delete(id); }
  });

  events.forEach(event => {
    const isSel = selectedEvent?.id === event.id;
    const existing = markers.get(event.id);
    if (existing) {
      existing.setIcon(makeIcon(event, isSel, isMobile));
      existing.setZIndexOffset(isSel ? 2000 : 1000);
      return;
    }

    const cfg = CATEGORY_CONFIG[event.category] ?? { label: '', color: '#3b82f6' };
    const sc = STATUS_COLOR[event.verificationStatus] ?? '#3b82f6';
    const slabel = { verified: '✓ VERIFIED', disputed: '⚠ DISPUTED', debunked: '✗ FALSE ATTRIBUTION' }[event.verificationStatus] ?? '';

    const marker = L.marker(event.coordinates as L.LatLngExpression, { icon: makeIcon(event, false, isMobile), zIndexOffset: 1000 });

    marker.bindPopup(`
      <div style="padding:14px 15px;min-width:210px;font-family:'JetBrains Mono',monospace">
        <div style="font-size:8px;text-transform:uppercase;letter-spacing:.12em;color:#555;margin-bottom:5px">${cfg.label}</div>
        <div style="font-size:15px;font-weight:600;color:#e8e8e8;margin-bottom:3px;font-family:'Inter',sans-serif;line-height:1.2">${event.title}</div>
        <div style="font-size:9px;color:#444;margin-bottom:10px">${event.subtitle}</div>
        <div style="display:inline-flex;padding:3px 9px;border-radius:3px;margin-bottom:12px;background:${sc}18;color:${sc};border:1px solid ${sc}30;font-size:8px;text-transform:uppercase;letter-spacing:.09em;font-weight:600">${slabel}</div>
        <button onclick="window.__sel?.('${event.id}')" style="display:flex;align-items:center;justify-content:center;width:100%;padding:9px;background:${cfg.color};color:#fff;border:none;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:600;cursor:pointer;letter-spacing:.08em;text-transform:uppercase">
          VIEW FULL BREAKDOWN →
        </button>
      </div>`, { maxWidth: 260, minWidth: 220 });

    marker.on('click', () => {
      drawBlastRef.current(event);
      if (isMobileRef.current) {
        marker.openPopup();
      } else {
        marker.openPopup();
        onSelectRef.current(event);
      }
    });

    marker.addTo(map);
    markers.set(event.id, marker);
  });

  (window as any).__sel = (id: string) => {
    const e = events.find(x => x.id === id);
    if (e) onSelectRef.current(e);
  };
}

export function MapView({ events, selectedEvent, onSelect, arenaCenter, arenaZoom, isMobile = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const blastCircleRef = useRef<L.Circle | null>(null);
  const prevArenaRef = useRef('');
  const eventsRef = useRef(events);
  const onSelectRef = useRef(onSelect);
  const selectedRef = useRef(selectedEvent);
  const isMobileRef = useRef(isMobile);
  const drawBlastRef = useRef((_e: StrikeEvent) => {});
  const [mapStyle, setMapStyle] = useState<MapStyle>('dark');
  // Локальный state — обновляется сразу при клике, не ждёт sidebar
  const [activeRadius, setActiveRadius] = useState<number>(0);

  eventsRef.current = events;
  onSelectRef.current = onSelect;
  selectedRef.current = selectedEvent;
  isMobileRef.current = isMobile;

  drawBlastRef.current = (event: StrikeEvent) => {
    const map = mapRef.current;
    if (!map) return;

    if (blastCircleRef.current) { blastCircleRef.current.remove(); blastCircleRef.current = null; }

    const ev = event as StrikeEvent & { blastRadius?: number; streetZoom?: number };
    const [lat, lng] = ev.coordinates;
    const zoom = ev.streetZoom ?? (isMobile ? 15 : 16);

    map.flyTo([lat, isMobile ? lng : lng - 0.008], zoom, { duration: 1.2, easeLinearity: 0.2 });

    const container = map.getContainer();
    const flash = document.createElement('div');
    flash.style.cssText = `position:absolute;inset:0;z-index:800;pointer-events:none;background:radial-gradient(circle at 50% 50%,rgba(229,62,62,.25) 0%,transparent 65%);animation:mapflash .7s ease-out forwards;`;
    container.appendChild(flash);
    setTimeout(() => { if (flash.parentNode) flash.remove(); }, 750);

    const radius = ev.blastRadius ?? 0;
    // Обновляем локальный state сразу
    setActiveRadius(radius);

    if (radius > 0) {
      const circle = L.circle([lat, lng] as L.LatLngExpression, {
        radius, color: '#ff4444', fillColor: '#ff4444',
        fillOpacity: 0.15, weight: 2.5, dashArray: '6,3', opacity: 0,
      });
      circle.addTo(map);
      blastCircleRef.current = circle;
      let op = 0;
      const timer = setInterval(() => {
        op = Math.min(op + 0.04, 0.5);
        circle.setStyle({ opacity: op });
        if (op >= 0.5) clearInterval(timer);
      }, 16);
      circle.bindTooltip(
        `<div style="font-size:9px;color:#e53e3e;font-weight:600;letter-spacing:.08em">BLAST RADIUS · ~${radius}m</div>`,
        { sticky: true, opacity: 1, className: 'blast-tip' }
      );
    }
  };

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes mpulse{0%{transform:scale(.5);opacity:.8}100%{transform:scale(1.8);opacity:0}}
      @keyframes mapflash{0%{opacity:.5}100%{opacity:0}}
      .leaflet-control-zoom{border:1px solid rgba(255,255,255,.1)!important;border-radius:3px!important}
      .leaflet-control-zoom a{background:#181818!important;color:#666!important;border-color:#333!important;width:28px!important;height:28px!important;line-height:28px!important}
      .leaflet-control-zoom a:hover{background:#222!important;color:#e8e8e8!important}
      .leaflet-popup-content-wrapper{background:#181818!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:6px!important;box-shadow:0 8px 24px rgba(0,0,0,.7)!important}
      .leaflet-popup-tip{background:#181818!important}
      .leaflet-popup-content{margin:0!important}
      .leaflet-popup-close-button{color:#666!important;top:8px!important;right:8px!important;font-size:16px!important}
      .blast-tip{background:#111!important;border:1px solid rgba(229,62,62,.3)!important;border-radius:4px!important;padding:6px 10px!important;box-shadow:none!important;font-family:'JetBrains Mono',monospace}
      .blast-tip::before{display:none!important}
    `;
    document.head.appendChild(style);
    const map = L.map(containerRef.current, { center: arenaCenter, zoom: arenaZoom, zoomControl: false, attributionControl: false });
    const tileLayer = L.tileLayer(STYLES[0].url, { maxZoom: 20 });
    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;
    map.getContainer().classList.add('map-dark');
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    if (!isMobile) (map.getContainer() as HTMLElement).style.cursor = 'crosshair';
    mapRef.current = map;
    map.whenReady(() => {
      setTimeout(() => {
        syncMarkers(map, eventsRef.current, selectedRef.current, markersRef.current, isMobileRef.current, isMobileRef, onSelectRef, drawBlastRef);
      }, 100);
    });
    return () => { map.remove(); mapRef.current = null; markersRef.current.clear(); };
  }, []); // eslint-disable-line

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const styleObj = STYLES.find(s => s.id === mapStyle)!;
    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    const newLayer = L.tileLayer(styleObj.url, { maxZoom: 20 });
    newLayer.addTo(map);
    markersRef.current.forEach(m => m.addTo(map));
    tileLayerRef.current = newLayer;
    const container = map.getContainer();
    container.classList.remove('map-dark', 'map-satellite', 'map-hybrid');
    container.classList.add(`map-${mapStyle}`);
  }, [mapStyle]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const key = `${arenaCenter[0]},${arenaCenter[1]},${arenaZoom}`;
    if (key === prevArenaRef.current) return;
    prevArenaRef.current = key;
    map.flyTo(arenaCenter, arenaZoom, { duration: 1.4, easeLinearity: 0.25 });
  }, [arenaCenter, arenaZoom]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    syncMarkers(map, events, selectedEvent, markersRef.current, isMobile, isMobileRef, onSelectRef, drawBlastRef);
  }, [events, selectedEvent, onSelect, isMobile]);

  useEffect(() => {
    if (!isMobile && selectedEvent) {
      drawBlastRef.current(selectedEvent);
    }
    if (!selectedEvent) {
      if (blastCircleRef.current) { blastCircleRef.current.remove(); blastCircleRef.current = null; }
      setActiveRadius(0);
    }
  }, [selectedEvent, isMobile]);

  return (
    <div className="map-wrap" style={{ position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 500, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {STYLES.map(s => (
          <button key={s.id} onClick={() => setMapStyle(s.id)} style={{
            padding: '5px 10px', border: `1px solid ${mapStyle === s.id ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.08)'}`,
            borderRadius: 3, background: mapStyle === s.id ? 'rgba(30,30,30,.95)' : 'rgba(10,10,10,.85)',
            color: mapStyle === s.id ? '#e8e8e8' : '#555', fontFamily: "'JetBrains Mono',monospace",
            fontSize: 9, fontWeight: 600, letterSpacing: '.1em', cursor: 'pointer',
            backdropFilter: 'blur(8px)', transition: 'all .15s',
          }}>{s.label}</button>
        ))}
      </div>

      {!isMobile && (
        <div style={{ position: 'absolute', bottom: 14, left: 14, zIndex: 500, background: 'rgba(10,10,10,.85)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 4, padding: '10px 12px', fontFamily: "'JetBrains Mono',monospace", fontSize: 9, display: 'flex', flexDirection: 'column', gap: 7, backdropFilter: 'blur(8px)' }}>
          {[{ color: '#ff4444', label: 'Misattributed' }, { color: '#b388ff', label: 'Tunnel' }, { color: '#d69e2e', label: 'Weapons' }, { color: '#4299e1', label: 'Command' }].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ color: '#555', letterSpacing: '.07em' }}>{item.label}</span>
            </div>
          ))}
          {activeRadius > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 6, border: '1px dashed #ff4444', opacity: .7, borderRadius: 1, flexShrink: 0 }} />
              <span style={{ color: '#ff6b6b', letterSpacing: '.07em' }}>Blast ~{activeRadius}m</span>
            </div>
          )}
        </div>
      )}

      {isMobile && (
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
          {activeRadius > 0 && (
            <div style={{ background: 'rgba(229,62,62,.2)', border: '1px solid rgba(229,62,62,.5)', borderRadius: 20, padding: '5px 14px', fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#ff6b6b', letterSpacing: '.08em', whiteSpace: 'nowrap', fontWeight: 600 }}>
              ⚠ BLAST RADIUS · ~{activeRadius}m
            </div>
          )}
          <div style={{ background: 'rgba(10,10,10,.88)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: '6px 14px', fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#555', letterSpacing: '.08em', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}>
            TAP INCIDENT TO EXPLORE
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)', animation: 'scanline 8s linear infinite', pointerEvents: 'none', zIndex: 400 }} />
      <style>{`@keyframes scanline{0%{top:0;opacity:.3}100%{top:100%;opacity:0}}`}</style>
    </div>
  );
}