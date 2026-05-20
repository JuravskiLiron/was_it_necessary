import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { StrikeEvent } from '../types';
import { CATEGORY_CONFIG } from '../data/events';

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
    const slabel = {
      verified: '✓ VERIFIED',
      disputed: '⚠ DISPUTED',
      debunked: '✗ FALSE ATTRIBUTION',
    }[event.verificationStatus] ?? '';

    const marker = L.marker(event.coordinates as L.LatLngExpression, {
      icon: makeIcon(event, false, isMobile),
      zIndexOffset: 1000,
    });

    marker.bindPopup(`
      <div style="padding:14px 15px;min-width:210px;font-family:'IBM Plex Mono',monospace">
        <div style="font-size:8px;text-transform:uppercase;letter-spacing:.12em;color:#2a4060;margin-bottom:5px">${cfg.label}</div>
        <div style="font-size:15px;font-weight:700;color:#cde0f5;margin-bottom:3px;font-family:'IBM Plex Sans',sans-serif;line-height:1.2">${event.title}</div>
        <div style="font-size:9px;color:#2a4060;margin-bottom:10px">${event.subtitle}</div>
        <div style="display:inline-flex;padding:3px 9px;border-radius:3px;margin-bottom:12px;background:${sc}15;color:${sc};border:1px solid ${sc}28;font-size:8px;text-transform:uppercase;letter-spacing:.09em;font-weight:700">${slabel}</div>
        <button onclick="window.__sel?.('${event.id}')" style="display:flex;align-items:center;justify-content:center;width:100%;padding:9px;background:${cfg.color};color:#fff;border:none;border-radius:6px;font-family:'IBM Plex Mono',monospace;font-size:9px;font-weight:700;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;box-shadow:0 0 12px ${cfg.color}40">
          VIEW FULL BREAKDOWN →
        </button>
      </div>`, { maxWidth: 260, minWidth: 220 });

    marker.on('click', () => marker.openPopup());

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
  const clusterRef = useRef<L.LayerGroup | null>(null);
  const blastCircleRef = useRef<L.Circle | null>(null);
  const prevArenaRef = useRef('');
  const eventsRef = useRef(events);
  const onSelectRef = useRef(onSelect);
  const selectedRef = useRef(selectedEvent);
  const isMobileRef = useRef(isMobile);
  eventsRef.current = events;
  onSelectRef.current = onSelect;
  selectedRef.current = selectedEvent;
  isMobileRef.current = isMobile;

  // ── Init map ──────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes mpulse{0%{transform:scale(.5);opacity:.8}100%{transform:scale(1.8);opacity:0}}
      @keyframes mapflash{0%{opacity:1}50%{opacity:.6}100%{opacity:0}}
      .leaflet-control-zoom{border:1px solid rgba(255,255,255,.07)!important;border-radius:4px!important}
      .leaflet-control-zoom a{background:#0b1019!important;color:#5a7a9a!important;border-color:#18263a!important;width:28px!important;height:28px!important;line-height:28px!important}
      .leaflet-control-zoom a:hover{background:#101622!important;color:#cde0f5!important}
      .leaflet-popup-content-wrapper{background:#101622!important;border:1px solid rgba(255,255,255,.14)!important;border-radius:10px!important;box-shadow:0 8px 32px rgba(0,0,0,.7)!important}
      .leaflet-popup-tip{background:#101622!important}
      .leaflet-popup-content{margin:0!important}
      .leaflet-popup-close-button{color:#5a7a9a!important;top:8px!important;right:8px!important;font-size:16px!important}
      .blast-tip{background:rgba(6,8,13,.95)!important;border:1px solid rgba(239,68,68,.3)!important;border-radius:6px!important;padding:7px 11px!important;box-shadow:none!important;font-family:'IBM Plex Mono',monospace}
      .blast-tip::before{display:none!important}
    `;
    document.head.appendChild(style);

    const map = L.map(containerRef.current, {
      center: arenaCenter,
      zoom: arenaZoom,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    if (!isMobile) (map.getContainer() as HTMLElement).style.cursor = 'crosshair';

    const group = L.layerGroup().addTo(map);
    clusterRef.current = group;
    mapRef.current = map;

    map.whenReady(() => {
      setTimeout(() => {
        syncMarkers(map, eventsRef.current, selectedRef.current, markersRef.current, isMobileRef.current, isMobileRef, onSelectRef);
      }, 100);
    });

    return () => { map.remove(); mapRef.current = null; markersRef.current.clear(); };
  }, []); // eslint-disable-line

  // ── Fly to arena ──────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const key = `${arenaCenter[0]},${arenaCenter[1]},${arenaZoom}`;
    if (key === prevArenaRef.current) return;
    prevArenaRef.current = key;
    map.flyTo(arenaCenter, arenaZoom, { duration: 1.4, easeLinearity: 0.25 });
  }, [arenaCenter, arenaZoom]);

  // ── Sync markers ──────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    syncMarkers(map, events, selectedEvent, markersRef.current, isMobile, isMobileRef, onSelectRef);
  }, [events, selectedEvent, onSelect, isMobile]);

  // ── Selected event: flash + blast radius + street zoom ─
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old blast circle
    if (blastCircleRef.current) {
      blastCircleRef.current.remove();
      blastCircleRef.current = null;
    }

    if (!selectedEvent) return;

    const ev = selectedEvent as StrikeEvent & { blastRadius?: number; streetZoom?: number };
    const [lat, lng] = ev.coordinates;

    // Fly to street level
    const zoom = ev.streetZoom ?? (isMobile ? 15 : 16);
    const lngOffset = isMobile ? 0 : -0.008;
    map.flyTo([lat, lng + lngOffset], zoom, { duration: 1.4, easeLinearity: 0.2 });

    // Flash effect
    const container = map.getContainer();
    const flash = document.createElement('div');
    flash.style.cssText = `
      position:absolute;inset:0;z-index:800;pointer-events:none;
      background:radial-gradient(circle at 50% 50%, rgba(239,68,68,.3) 0%, transparent 65%);
      animation:mapflash .7s ease-out forwards;
    `;
    container.style.position = 'relative';
    container.appendChild(flash);
    setTimeout(() => { if (flash.parentNode) flash.remove(); }, 750);

    // Blast radius circle
    const radius = ev.blastRadius;
    if (radius && radius > 0) {
      const circle = L.circle([lat, lng] as L.LatLngExpression, {
        radius,
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.07,
        weight: 1.5,
        dashArray: '5, 4',
        opacity: 0,
      });

      circle.addTo(map);
      blastCircleRef.current = circle;

      // Animate in
      let op = 0;
      const timer = setInterval(() => {
        op = Math.min(op + 0.04, 0.55);
        circle.setStyle({ opacity: op });
        if (op >= 0.55) clearInterval(timer);
      }, 16);

      circle.bindTooltip(
        `<div style="font-size:9px;color:#ef4444;font-weight:700;letter-spacing:.08em">BLAST RADIUS · ~${radius}m</div>`,
        { sticky: true, opacity: 1, className: 'blast-tip' }
      );
    }
  }, [selectedEvent, isMobile]);

  return (
    <div className="map-wrap" style={{ position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Compass */}
      <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 500, pointerEvents: 'none' }}>
        <svg width="36" height="36" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="rgba(6,8,13,.75)" stroke="rgba(255,255,255,.07)" strokeWidth=".8"/>
          <polygon points="18,4 21,18 18,15 15,18" fill="#ef4444"/>
          <polygon points="18,32 21,18 18,21 15,18" fill="rgba(255,255,255,.2)"/>
          <text x="18" y="10" textAnchor="middle" fill="#ef4444" fontSize="6" fontFamily="IBM Plex Mono" fontWeight="700">N</text>
        </svg>
      </div>

      {/* HUD */}
      {!isMobile && (
        <div style={{ position: 'absolute', bottom: 14, left: 14, zIndex: 500, fontFamily: "'IBM Plex Mono',monospace", fontSize: 8, color: '#1e3050', lineHeight: 2.1, letterSpacing: '.07em', pointerEvents: 'none' }}>
          <div>31°N 34°E · WGS84</div>
          <div style={{ color: '#3b82f6' }}>CLICK INCIDENT FOR BREAKDOWN</div>
        </div>
      )}

      {/* Mobile hint */}
      {isMobile && (
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 500, background: 'rgba(6,8,13,.85)', border: '1px solid rgba(59,130,246,.2)', borderRadius: 20, padding: '6px 14px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: '#3b82f6', letterSpacing: '.06em', pointerEvents: 'none', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}>
          TAP INCIDENT TO EXPLORE
        </div>
      )}

      {/* Legend — desktop only */}
      {!isMobile && (
        <div className="map-legend" style={{ position: 'absolute', top: 14, right: 14, zIndex: 500, background: 'rgba(6,8,13,.85)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 6, padding: '10px 12px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 8, display: 'flex', flexDirection: 'column', gap: 6, backdropFilter: 'blur(8px)' }}>
          {[
            { color: '#ef4444', label: 'Misattributed' },
            { color: '#a78bfa', label: 'Tunnel / Underground' },
            { color: '#f59e0b', label: 'Weapons Depot' },
            { color: '#06b6d4', label: 'Command Center' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, boxShadow: `0 0 5px ${item.color}60`, flexShrink: 0 }} />
              <span style={{ color: '#3a5570', letterSpacing: '.07em' }}>{item.label}</span>
            </div>
          ))}
          {/* Blast radius legend — show only when event selected */}
          <div style={{ borderTop: '1px solid var(--b0)', paddingTop: 6, display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 12, height: 8, borderRadius: 2, border: '1.5px dashed #ef4444', opacity: .7, flexShrink: 0 }} />
            <span style={{ color: '#3a5570', letterSpacing: '.07em' }}>Blast radius</span>
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(59,130,246,.1),transparent)', animation: 'scanline 7s linear infinite', pointerEvents: 'none', zIndex: 400 }} />
      <style>{`@keyframes scanline{0%{top:0;opacity:.4}100%{top:100%;opacity:0}}`}</style>
    </div>
  );
}