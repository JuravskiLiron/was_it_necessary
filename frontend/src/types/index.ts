export type EventCategory = 'hospital' | 'tunnel' | 'weapons_depot' | 'command_center' | 'rocket_launch';
export type VerificationStatus = 'verified' | 'disputed' | 'debunked';

export interface VideoEmbed {
  youtubeId: string;
  title: string;
  source: string;
  timestamp?: string;
}

export interface ClaimVsFact {
  claimTime: string;
  claimSource: string;
  claim: string;
  factTime: string;
  factSource: string;
  fact: string;
  verdict: string;
  claimUrl?: string;    
  factUrl?: string;     
  archiveUrl?: string;   
}

export interface CraterComparison {
  realDiameterM: number;
  idfBombDiameterM: number;
  weapon: string;
  conclusion: string;
}

export interface TimelineStep {
  time: string;
  title: string;
  text?: string;
  claim?: string;
  debunk?: string;
  sources?: string[];
  videoId?: string;
}

export interface TimelineSection {
  phase: string;
  phaseColor: string;
  steps: TimelineStep[];
}

export interface DamageImage {
  url: string;
  caption: string;
}

export interface StrikeEvent {
  id: string;
  title: string;
  subtitle: string;
  coordinates: [number, number];
  date: string;
  category: EventCategory;
  verificationStatus: VerificationStatus;
  summary: string;
  fullDescription: string;
  targetJustification: string;
  warningGiven: boolean;
  warningDetails?: string;
  casualties: { reported: number | string; verified: number | string; notes: string };
  timeline: TimelineSection[];
  claimsVsFacts: ClaimVsFact[];
  videos: VideoEmbed[];
  craterComparison?: CraterComparison;
  images: DamageImage[];
  tags: string[];
  verifiedBy: string;
  lastUpdated: string;
  falseClaims: unknown[];
  sources: unknown[];
  evidence: unknown[];
  mediaStats?: MediaStats;
blastRadius?: number;
streetZoom?: number;
}

export interface ZonePolygon {
  id: string;
  label: string;
  tooltip: string;
  color: string;
  coords: [number, number][];
  incidentIds: string[];
}
export interface MediaOutlet {
  name: string;
  initialClaim: string;
  corrected: boolean;
  correctionDate?: string;
  correctionNote?: string;
  sourceUrl?: string;        // ← ссылка на оригинальную статью
  correctionUrl?: string;    // ← ссылка на исправление
  deleted?: boolean;         // ← удалили статью без исправления
  silent?: boolean;     
  archiveUrl?: string;      // archive.org если удалили
       // ← перестали писать без исправления
}

export interface MediaStats {
  totalReported: number;
  reportedFalsely: number;
  correctedLater: number;
  neverCorrected: number;
  outlets: MediaOutlet[];
}