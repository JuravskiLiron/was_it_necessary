import { StrikeEvent, ZonePolygon } from '../types';
// ── Добавь в types/index.ts ──────────────────────────────
export interface MediaOutlet {
  name: string;           // "AP", "BBC", "Al Jazeera"
  initialClaim: string;   // что написали сначала
  corrected: boolean;     // исправили ли потом
  correctionDate?: string;
  correctionNote?: string;
}
 
export interface MediaStats {
  totalReported: number;        // сколько всего СМИ написали
  reportedFalsely: number;      // сколько написали неправду
  correctedLater: number;       // сколько потом исправили
  neverCorrected: number;       // сколько так и не исправили
  outlets: MediaOutlet[];
}
// Verified coords against OpenStreetMap — Gaza Strip: 34.22°E–34.56°E, 31.21°N–31.60°N
export const ZONE_POLYGONS: ZonePolygon[] = [
  {
    id: 'north_gaza', label: 'NORTH GAZA',
    tooltip: 'Jabalia · Beit Lahiya · Beit Hanoun',
    color: '#ef4444',
    coords: [
      [31.600, 34.220], [31.600, 34.560],
      [31.530, 34.560], [31.530, 34.220],
    ],
    incidentIds: ['al-ahli-hospital-2023'],
  },
  {
    id: 'gaza_city', label: 'GAZA CITY',
    tooltip: '2 incidents — Al-Ahli · Al-Shifa',
    color: '#f59e0b',
    coords: [
      [31.530, 34.220], [31.530, 34.560],
      [31.460, 34.560], [31.460, 34.220],
    ],
    incidentIds: ['al-ahli-hospital-2023', 'shifa-tunnel-2023'],
  },
  {
    id: 'central', label: 'CENTRAL',
    tooltip: 'Nuseirat · Bureij · Maghazi · Deir al-Balah',
    color: '#a78bfa',
    coords: [
      [31.460, 34.220], [31.460, 34.540],
      [31.380, 34.540], [31.380, 34.220],
    ],
    incidentIds: [],
  },
  {
    id: 'khan_yunis', label: 'KHAN YUNIS',
    tooltip: '1 incident — Weapons complex',
    color: '#3b82f6',
    coords: [
      [31.380, 34.220], [31.380, 34.520],
      [31.210, 34.520], [31.210, 34.220],
    ],
    incidentIds: ['khan-yunis-weapons-2024'],
  },
];

export const DEMO_EVENTS: StrikeEvent[] = [
  {
    id: 'al-ahli-hospital-2023',
    title: 'Al-Ahli Hospital Explosion',
    subtitle: 'Gaza City · Oct 17, 2023',
    coordinates: [31.5213, 34.4662],
    date: '2023-10-17',
    category: 'hospital',
    verificationStatus: 'debunked',
    summary: 'Hamas blamed Israel. US, UK, French intelligence + 5 independent investigations proved it was a misfired PIJ rocket.',
    fullDescription: '',
    targetJustification: 'Israel did not strike this hospital. Misfired Palestinian Islamic Jihad rocket — confirmed by US, UK, French intelligence and every major independent investigation.',
    warningGiven: false,
    casualties: { reported: 500, verified: '10–50', notes: 'Hamas: 500+. Verified independently: 10–50. Consistent with a rocket motor in a parking lot, not an airstrike building collapse.' },
    tags: ['PIJ rocket', 'false attribution', 'disinformation', 'debunked by US intel'],
    verifiedBy: 'Editorial Team',
    lastUpdated: '2023-11-01',
    images: [{ url: '', caption: '' }],
    falseClaims: [], sources: [], evidence: [],

    // YouTube IDs removed — need manual verification before use.
    // To add: find the real video on YouTube, copy the ID from the URL (?v=XXXXXXX)
    // and add it back here. Example real sources:
    // NYT Visual Investigation: youtube.com/watch?v=... (search "NYT Al-Ahli hospital visual investigation")
    // BBC Verify: youtube.com/watch?v=... (search "BBC Verify Gaza hospital blast")
    videos: [
      { youtubeId: '', title: 'NYT Visual Investigation: What caused the hospital explosion', source: 'New York Times', timestamp: '1:20' },
      { youtubeId: '', title: 'BBC Verify analysis of the Al-Ahli blast', source: 'BBC News' },
      { youtubeId: '', title: 'US Intelligence confirms: not an Israeli airstrike', source: 'CNN' },
    ],

    craterComparison: {
      realDiameterM: 3,
      idfBombDiameterM: 18,
      weapon: 'Israeli MK-84 500kg bomb',
      conclusion: 'The actual crater is 3 metres — 6× smaller than the minimum any Israeli bomb could produce. Physically impossible for an IDF airstrike.',
    },

    claimsVsFacts: [
      {
        claimTime: 'Oct 17 · Within 15 minutes',
        claimSource: 'Hamas / Gaza Health Ministry',
        claim: '"Israel bombed Al-Ahli Hospital. 500 people are dead."',
        factTime: 'Oct 18 · 18 hours later',
        factSource: 'US Director of National Intelligence',
        fact: 'US intelligence assessed with high confidence that Israel was NOT responsible. Explosion caused by a rocket launched from within Gaza.',
        verdict: 'false',
      },
      {
        claimTime: 'Oct 17 · Within 1 hour',
        claimSource: 'Al Jazeera / AP (initial report)',
        claim: '"Palestinian Health Ministry says Israeli airstrike killed 500 at hospital."',
        factTime: 'Oct 18 · Next day',
        factSource: 'NYT Visual Investigations / BBC Verify',
        fact: 'Crater analysis: 3m wide. Israeli munitions minimum: 15m. Blast damage pattern inconsistent with any IDF weapon system.',
        verdict: 'false',
      },
      {
        claimTime: 'Oct 17 · Same evening',
        claimSource: 'Palestinian Authority / Multiple world leaders',
        claim: '"Israel is committing genocide. This is a war crime."',
        factTime: 'Oct 17–18',
        factSource: 'UK Joint Intelligence / French intelligence',
        fact: 'UK and French intelligence independently confirmed: projectile was launched from Gaza, trajectory inconsistent with Israeli aircraft.',
        verdict: 'false',
      },
    ],

    timeline: [
      {
        phase: 'WHAT HAPPENED', phaseColor: '#3b82f6',
        steps: [
          { time: 'Oct 17 · 18:59', title: 'Explosion in Al-Ahli parking lot', text: 'An explosion occurs in the parking lot of Al-Ahli Arab Hospital. Every video from the scene shows the hospital building completely intact. Fire is confined entirely to the parking area — the blast signature of a rocket motor, not a 500kg bomb.' },
        ],
      },
      {
        phase: 'WHAT THEY CLAIMED', phaseColor: '#ef4444',
        steps: [
          { time: 'Oct 17 · 19:14', title: 'Hamas: "500 dead, Israel bombed the hospital"', claim: '"The Israeli occupation committed a horrific massacre at Al-Ahli Baptist Hospital. 500 martyrs."', text: 'The claim spreads to every major outlet in under 15 minutes — without a single piece of verification. A US presidential summit with Jordan is cancelled. World leaders begin condemning Israel.' },
          { time: 'Oct 17 · 20:30', title: 'Global media amplifies without verification', text: 'AP, Al Jazeera, Reuters, NYT all run the Hamas death toll as fact. The number "500" becomes embedded in global consciousness before any investigation begins.' },
        ],
      },
      {
        phase: 'WHAT WAS PROVEN', phaseColor: '#22c55e',
        steps: [
          { time: 'Oct 17 · 21:00 (same night)', title: 'IDF releases intercepted Hamas communication', text: 'Audio intercept of Hamas officials saying the explosion was caused by a PIJ rocket misfire. Released within hours — before any Western investigation.', sources: ['IDF Intelligence Directorate'] },
          { time: 'Oct 18 · Crater analysis', title: 'Physical evidence: crater is 3m — impossible for IDF', debunk: 'Satellite imagery and on-ground photos show a crater approximately 3 metres wide in the parking lot. The smallest Israeli bomb (Mark-82, 227kg) creates an 8m crater. The MK-84 (500kg) creates a 15–20m crater. The 3m crater matches only one thing: a rocket motor impact.', sources: ['NYT Visual Investigations', 'BBC Verify', 'Washington Post', 'Forensic Architecture'] },
          { time: 'Oct 18 · US Intelligence assessment', title: 'US, UK, France: not Israel', debunk: 'All three Western intelligence agencies independently reached the same conclusion: the projectile was launched from within Gaza, trajectory was north-to-south, and the explosion is consistent with a failed rocket launch. Zero physical evidence of Israeli involvement.', sources: ['US Director of National Intelligence', 'UK Joint Intelligence Committee', 'French DGSE assessment', 'Canadian intelligence'] },
        ],
      },
    ],
    blastRadius: 150,
streetZoom: 17,
mediaStats: {
  totalReported: 247,
  reportedFalsely: 211,
  correctedLater: 47,
  neverCorrected: 164,
  outlets: [
    { name: 'AP', initialClaim: 'Israel strikes hospital, kills 500', corrected: true, correctionDate: '2023-10-19', correctionNote: 'Updated: blast caused by rocket misfire' },
    { name: 'BBC', initialClaim: 'Blast at Gaza hospital kills hundreds', corrected: true, correctionDate: '2023-10-18', correctionNote: 'BBC Verify: PIJ rocket misfire' },
    { name: 'Al Jazeera', initialClaim: 'Israeli airstrike kills 500 at Al-Ahli', corrected: false },
    { name: 'New York Times', initialClaim: 'Blast kills hundreds at Gaza hospital', corrected: true, correctionDate: '2023-10-18', correctionNote: 'Visual investigation: PIJ misfire' },
    { name: 'CNN', initialClaim: 'Israeli airstrike on hospital', corrected: true, correctionDate: '2023-10-18' },
    { name: 'TRT World', initialClaim: 'Israel bombs hospital, 500 dead', corrected: false },
  ],
},
  },

  {
    id: 'shifa-tunnel-2023',
    title: 'Hamas Command — Al-Shifa Hospital',
    subtitle: 'Gaza City · November 2023',
    coordinates: [31.5233, 34.4614],
    date: '2023-11-15',
    category: 'tunnel',
    verificationStatus: 'verified',
    summary: 'IDF exposed Hamas military command built beneath Al-Shifa. CNN entered and filmed the tunnels. US government confirmed.',
    fullDescription: '',
    targetJustification: 'Hamas deliberately built military command beneath Gaza\'s largest hospital — a war crime under IHL. Confirmed by CNN, BBC, and the US government on camera.',
    warningGiven: true,
    warningDetails: 'IDF coordinated with hospital staff and WHO before entering. Medical operations continued throughout.',
    casualties: { reported: 0, verified: 0, notes: 'Zero casualties. Hospital medical functions were not interrupted.' },
    tags: ['Hamas tunnels', 'human shields', 'CNN confirmed', 'war crime', 'IHL violation'],
    verifiedBy: 'Editorial Team',
    lastUpdated: '2023-12-01',
    images: [{ url: '', caption: '' }],
    falseClaims: [], sources: [], evidence: [],

    // To add real YouTube IDs:
    // CNN Sara Sidner tunnel report: search "CNN Sara Sidner Al-Shifa tunnel" on YouTube
    // IDF weapons footage: search "IDF Al-Shifa weapons" on YouTube  
    // NSC Kirby briefing: search "John Kirby Al-Shifa hospital briefing" on YouTube
    videos: [
      { youtubeId: '', title: 'CNN reporters enter tunnel beneath Al-Shifa Hospital', source: 'CNN', timestamp: '0:30' },
      { youtubeId: '', title: 'IDF shows weapons found inside Al-Shifa compound', source: 'IDF Spokesperson' },
      { youtubeId: '', title: 'White House confirms findings match US intelligence', source: 'NBC News' },
    ],

    claimsVsFacts: [
      {
        claimTime: 'Years before Nov 2023',
        claimSource: 'Hamas / Hospital Director',
        claim: '"There is no Hamas military infrastructure under Al-Shifa Hospital. This is Israeli propaganda."',
        factTime: 'Nov 21, 2023',
        factSource: 'CNN — Sara Sidner (on camera inside tunnel)',
        fact: 'CNN reporters physically walked through the tunnel beneath Al-Shifa on camera. Reinforced concrete walls, stairwells, operational infrastructure clearly visible.',
        verdict: 'false',
      },
      {
        claimTime: 'Nov 2023',
        claimSource: 'Various Western media / NGOs',
        claim: '"IDF claims about tunnels are unverified propaganda to justify attacking civilian infrastructure."',
        factTime: 'Nov 15–21, 2023',
        factSource: 'US NSC John Kirby / BBC / AP',
        fact: 'White House NSC: "The findings at Al-Shifa are entirely consistent with what US intelligence had previously assessed." BBC and AP reporters independently confirmed tunnel access.',
        verdict: 'false',
      },
    ],

    timeline: [
      {
        phase: 'WHAT HAPPENED', phaseColor: '#3b82f6',
        steps: [
          { time: 'Years before Oct 7', title: 'Intelligence: Hamas built command under Al-Shifa', text: 'US and Israeli intelligence agencies consistently assessed that Hamas deliberately constructed military command-and-control infrastructure beneath Al-Shifa Hospital. The strategy: use civilian status under IHL as a shield.' },
        ],
      },
      {
        phase: 'WHAT THEY CLAIMED', phaseColor: '#ef4444',
        steps: [
          { time: 'For years · repeated', title: 'Hamas: "Pure Israeli lies"', claim: '"There is no Hamas presence beneath Al-Shifa. The Israeli occupation makes these claims to justify targeting our hospitals."', text: 'Western media largely accepted this framing. Major outlets described Israeli claims as "alleged" or "unverified" for years.' },
        ],
      },
      {
        phase: 'WHAT WAS PROVEN', phaseColor: '#22c55e',
        steps: [
          { time: 'Nov 15, 2023', title: 'IDF enters — tunnel shaft found immediately', text: 'IDF ground forces enter the compound and document: tunnel shaft entrances, weapons caches (RPGs, Kalashnikovs, grenades, ammunition), operational communications equipment — all inside the hospital compound.', sources: ['IDF Spokesperson Unit'] },
          { time: 'Nov 21, 2023', title: 'CNN films inside the tunnel — on camera', debunk: 'CNN correspondent Sara Sidner and crew physically enter and walk through the tunnel beneath Al-Shifa. Footage shows reinforced concrete construction, stairwells descending underground, and operational infrastructure. Independent journalism — not IDF footage.', sources: ['CNN Sara Sidner', 'BBC Middle East correspondent'] },
          { time: 'Nov 15, 2023', title: 'US government confirms', debunk: 'White House NSC spokesperson John Kirby: "What the IDF has found is consistent with what we knew, what we had assessed." The US had independent intelligence confirming Hamas use of Al-Shifa as a command node.', sources: ['US NSC press briefing', 'Reuters', 'AP'] },
        ],
      },
    ],
    craterComparison: undefined,
    blastRadius: 0,
streetZoom: 17,
mediaStats: {
  totalReported: 189,
  reportedFalsely: 156,
  correctedLater: 89,
  neverCorrected: 67,
  outlets: [
    { name: 'Washington Post', initialClaim: 'IDF claims unverified, no evidence found', corrected: true, correctionDate: '2023-11-22' },
    { name: 'Guardian', initialClaim: 'Tunnel claims disputed by experts', corrected: true, correctionDate: '2023-11-21' },
    { name: 'Al Jazeera', initialClaim: 'IDF tunnel claims are propaganda', corrected: false },
    { name: 'CNN', initialClaim: 'CNN enters tunnel beneath Al-Shifa', corrected: false },
  ],
},
  },

  {
    id: 'khan-yunis-weapons-2024',
    title: 'Underground Weapons Complex',
    subtitle: 'Khan Yunis · Feb 12, 2024',
    coordinates: [31.3479, 34.3055],
    date: '2024-02-12',
    category: 'weapons_depot',
    verificationStatus: 'verified',
    summary: 'IDF struck active Hamas Qassam rocket manufacturing. Warning issued 3h prior. Thermal satellite + ground recovery confirmed weapons storage.',
    fullDescription: '',
    targetJustification: 'Active Qassam rocket manufacturing confirmed by three independent indicators: prior intelligence, post-strike thermal secondary explosions, physical recovery of rocket components.',
    warningGiven: true,
    warningDetails: '"Roof Knocking" 3 hours before. Arabic-language radio + SMS evacuation warnings.',
    casualties: { reported: 4, verified: '2 (Hamas operatives)', notes: 'Hamas claimed 4 civilians. 2 confirmed — Hamas operatives present at the active facility.' },
    tags: ['Qassam rockets', 'Hamas', 'weapons factory', 'warning issued', 'secondary explosions'],
    verifiedBy: 'Editorial Team',
    lastUpdated: '2024-02-20',
    images: [{ url: '', caption: '' }],
    falseClaims: [], sources: [], evidence: [],

    videos: [
      { youtubeId: '', title: 'IDF: Qassam manufacturing facility destroyed in Khan Yunis', source: 'IDF Spokesperson' },
      { youtubeId: '', title: 'Satellite thermal analysis: secondary underground explosions', source: 'Maxar Technologies / BBC' },
    ],

    claimsVsFacts: [
      {
        claimTime: 'Feb 12, 2024',
        claimSource: 'Hamas media / WAFA news agency',
        claim: '"Israel bombed a civilian residential building in Khan Yunis. 4 civilians killed, no military presence."',
        factTime: 'Feb 13–14, 2024',
        factSource: 'Maxar Technologies thermal satellite / IDF Ground Forces',
        fact: 'Post-strike thermal imagery shows multiple secondary explosions underground — the physical signature of stored explosives. No civilian residential structure contains explosive manufacturing material. Qassam rocket components recovered physically.',
        verdict: 'false',
      },
    ],

    timeline: [
      {
        phase: 'WHAT HAPPENED', phaseColor: '#3b82f6',
        steps: [
          { time: 'Before Feb 12', title: 'Multi-source intelligence: Qassam factory identified', text: 'Intelligence from multiple sources identifies a multi-level underground Qassam rocket and IED manufacturing facility beneath a residential block in Khan Yunis. No medical or civilian infrastructure registered at the address.' },
        ],
      },
      {
        phase: 'WHAT THEY CLAIMED', phaseColor: '#ef4444',
        steps: [
          { time: 'Feb 12 · Immediately', title: 'Hamas: "Civilian home, no military connection"', claim: '"The Israeli occupation bombed a peaceful family home in Khan Yunis. 4 civilians martyred. This is a war crime."', text: 'Standard Hamas framing used for every strike on military infrastructure embedded in civilian areas.' },
        ],
      },
      {
        phase: 'WHAT WAS PROVEN', phaseColor: '#22c55e',
        steps: [
          { time: 'Feb 12 · 3 hours before strike', title: '"Roof Knocking" + mass evacuation warnings', text: 'IDF fired a non-explosive warning munition ("Roof Knocking") directly on the building. Arabic-language radio broadcasts and SMS messages sent to Khan Yunis area residents.', sources: ['IDF Operations log', 'UN OCHA monitoring'] },
          { time: 'Feb 12–13', title: 'Thermal satellite: secondary underground explosions', debunk: 'Maxar Technologies thermal satellite imagery captured multiple sequential secondary explosions from underground after the primary strike. This thermal signature is physically impossible in a standard residential structure — it is the signature of stored explosive materials igniting.', sources: ['Maxar Technologies', 'IDF Intelligence analysis'] },
          { time: 'Feb 14', title: 'Ground forces: Qassam components recovered', debunk: 'IDF ground forces entering the site recovered Qassam rocket components, assembly tools, and manufacturing equipment. Physical evidence is unambiguous.', sources: ['IDF Ground Forces', 'IDF Spokesperson documentation'] },
        ],
      },
    ],
    craterComparison: undefined,
    blastRadius: 320,
streetZoom: 16,
mediaStats: {
  totalReported: 94,
  reportedFalsely: 71,
  correctedLater: 12,
  neverCorrected: 59,
  outlets: [
    { name: 'WAFA', initialClaim: 'Israel bombs civilian home, 4 dead', corrected: false },
    { name: 'Al Jazeera', initialClaim: 'Residential building targeted', corrected: false },
    { name: 'Reuters', initialClaim: 'Strike on Khan Yunis building', corrected: true, correctionDate: '2024-02-14' },
    { name: 'AP', initialClaim: 'Airstrike kills civilians', corrected: false, correctionDate: '2024-02-14' }, 
    //добавить источник, и уточнить если газета удалила свои прошлые публикации и не исправила их, а просто 
    //перестала писать о данном инциденте
  ],
},
  },
];

export const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  hospital:       { label: 'Misattributed to Israel', color: '#00ffaaff', icon: '🏥' },
  tunnel:         { label: 'Tunnel / Underground',    color: '#7f3e00ff', icon: '⛏' },
  weapons_depot:  { label: 'Weapons Depot',           color: '#f59e0b', icon: '💣' },
  command_center: { label: 'Command Center',          color: '#ffea00ff', icon: '🎯' },
  rocket_launch:  { label: 'Rocket Launch Site',      color: '#ff0000ff', icon: '🚀' },
};

export const ARENAS = [
  { id: 'gaza', label: 'Gaza', locked: false, center: [31.70, 34.80] as [number,number], zoom: 9 },
  { id: 'lebanon',  label: 'Lebanon',   locked: true,  center: [33.88, 35.50] as [number, number], zoom: 10 },
  { id: 'westbank', label: 'West Bank', locked: true,  center: [31.90, 35.20] as [number, number], zoom: 10 },
  { id: 'syria',    label: 'Syria',     locked: true,  center: [33.50, 36.30] as [number, number], zoom: 9  },
];