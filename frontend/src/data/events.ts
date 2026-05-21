import { StrikeEvent, ZonePolygon, MediaStats } from '../types';

export const ZONE_POLYGONS: ZonePolygon[] = [
  {
    id: 'north_gaza', label: 'NORTH GAZA',
    tooltip: 'Jabalia · Beit Lahiya · Beit Hanoun',
    color: '#ef4444',
    coords: [[31.600, 34.220],[31.600, 34.560],[31.530, 34.560],[31.530, 34.220]],
    incidentIds: ['al-ahli-hospital-2023'],
  },
  {
    id: 'gaza_city', label: 'GAZA CITY',
    tooltip: '2 incidents — Al-Ahli · Al-Shifa',
    color: '#f59e0b',
    coords: [[31.530, 34.220],[31.530, 34.560],[31.460, 34.560],[31.460, 34.220]],
    incidentIds: ['al-ahli-hospital-2023', 'shifa-tunnel-2023'],
  },
  {
    id: 'central', label: 'CENTRAL',
    tooltip: 'Nuseirat · Bureij · Maghazi · Deir al-Balah',
    color: '#a78bfa',
    coords: [[31.460, 34.220],[31.460, 34.540],[31.380, 34.540],[31.380, 34.220]],
    incidentIds: [],
  },
  {
    id: 'khan_yunis', label: 'KHAN YUNIS',
    tooltip: '1 incident — Weapons complex',
    color: '#3b82f6',
    coords: [[31.380, 34.220],[31.380, 34.520],[31.210, 34.520],[31.210, 34.220]],
    incidentIds: ['khan-yunis-weapons-2024'],
  },
];

export const DEMO_EVENTS: StrikeEvent[] = [
  // ════════════════════════════════════════
  // INCIDENT 1 — AL-AHLI HOSPITAL
  // ════════════════════════════════════════
  {
    id: 'al-ahli-hospital-2023',
    title: 'Al-Ahli Hospital Explosion',
    subtitle: 'Gaza City · Oct 17, 2023',
    coordinates: [31.5213, 34.4662],
    date: '2023-10-17',
    category: 'hospital',
    verificationStatus: 'debunked',
    summary: 'Hamas blamed Israel. US, UK, French and Canadian intelligence + 5 independent investigations proved it was a misfired PIJ rocket.',
    fullDescription: '',
    targetJustification: 'Israel did not strike this hospital. Misfired Palestinian Islamic Jihad rocket — confirmed by US, UK, French and Canadian intelligence and every major independent investigation.',
    warningGiven: false,
    casualties: { reported: 500, verified: '10–50', notes: 'Hamas: 500+. Verified independently: 10–50. Consistent with a rocket motor in a parking lot, not an airstrike building collapse.' },
    tags: ['PIJ rocket', 'false attribution', 'disinformation', 'debunked by US intel'],
    verifiedBy: 'Editorial Team',
    lastUpdated: '2023-11-01',
    images: [{ url: '', caption: '' }],
    falseClaims: [], sources: [], evidence: [],
    blastRadius: 150,
    streetZoom: 17,

    mediaStats: {
      totalReported: 247,
      reportedFalsely: 211,
      correctedLater: 47,
      neverCorrected: 164,
      outlets: [
        {
          name: 'New York Times',
          initialClaim: '"Israeli Strike Kills Hundreds in Hospital, Palestinians Say"',
          corrected: true,
          correctionDate: '2023-10-23',
          correctionNote: 'Editors\' note: coverage "relied too heavily on claims by Hamas, and did not make clear that those claims could not immediately be verified."',
          sourceUrl: 'https://web.archive.org/web/20231017220000*/nytimes.com/2023/10/17/world/middleeast/israel-gaza-hospital.html',
          correctionUrl: 'https://www.nytimes.com/2023/10/23/world/middleeast/nyt-gaza-hospital-editors-note.html',
        },
        {
          name: 'BBC News',
          initialClaim: 'Jon Donnison live: "Hard to see what else this could be, really, given the size of the explosion, other than an Israeli airstrike"',
          corrected: true,
          correctionDate: '2023-10-19',
          correctionNote: 'BBC issued correction: "We accept that even in this fast-moving situation it was wrong to speculate in this way about the possible causes and we apologize for this."',
          sourceUrl: 'https://www.bbc.com/news/world-middle-east-67123299',
          correctionUrl: 'https://www.bbc.com/news/world-middle-east-67159160',
        },
        {
          name: 'AP',
          initialClaim: '"Gaza hospital strike kills hundreds, Palestinians say, in one of the deadliest attacks of the war"',
          corrected: true,
          correctionDate: '2023-10-18',
          correctionNote: 'AP updated story to reflect US and Israeli intelligence assessments pointing to PIJ rocket misfire.',
          sourceUrl: 'https://apnews.com/article/israel-hamas-war-hospital-explosion-death-toll-b4571a71c5e5502cd0cf8b47d2e6ce0c',
        },
        {
          name: 'Al Jazeera',
          initialClaim: '"Israeli air strike kills hundreds at Gaza\'s Al-Ahli hospital"',
          corrected: false,
          silent: true,
          sourceUrl: 'https://www.aljazeera.com/news/2023/10/17/israeli-air-strike-kills-hundreds-at-gazas-al-ahli-hospital',
          archiveUrl: 'https://web.archive.org/web/20231017/https://www.aljazeera.com/news/2023/10/17/israeli-air-strike-kills-hundreds-at-gazas-al-ahli-hospital',
        },
        {
          name: 'CNN',
          initialClaim: 'Initial coverage attributed blast to Israeli airstrike based on Hamas claims.',
          corrected: true,
          correctionDate: '2023-10-18',
          correctionNote: 'CNN published independent investigation concluding rocket misfire was responsible.',
          correctionUrl: 'https://www.cnn.com/2023/10/24/media/gaza-hospital-coverage-walk-back/index.html',
        },
        {
          name: 'TRT World',
          initialClaim: '"Israel bombs hospital in Gaza, killing hundreds"',
          corrected: false,
          silent: true,
          sourceUrl: 'https://www.trtworld.com/magazine/israel-bombs-hospital-in-gaza-killing-hundreds-15645139',
          archiveUrl: 'https://web.archive.org/web/20231018/https://www.trtworld.com/magazine/israel-bombs-hospital-in-gaza-killing-hundreds-15645139',
        },
        {
          name: 'France 24',
          initialClaim: 'Reported Israeli strike on hospital based on Hamas health ministry figures.',
          corrected: true,
          correctionDate: '2023-10-19',
          correctionUrl: 'https://www.france24.com/en/middle-east/20231019-us-and-uk-say-analysis-indicates-gaza-hospital-blast-was-not-caused-by-israeli-airstrike',
        },
      ],
    } as MediaStats,

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
        claimTime: 'Oct 17 · 19:14 local time',
        claimSource: 'Hamas / Gaza Health Ministry',
        claim: '"The Israeli occupation committed a horrific massacre at Al-Ahli Baptist Hospital. 500 martyrs."',
        factTime: 'Oct 18 · 18 hours later',
        factSource: 'US Director of National Intelligence + UK + France + Canada',
        fact: 'US, UK, French and Canadian intelligence all independently assessed with high confidence that Israel was NOT responsible. Explosion caused by a rocket launched from within Gaza.',
        verdict: 'false',
        claimUrl: 'https://www.aljazeera.com/news/2023/10/17/israeli-air-strike-kills-hundreds-at-gazas-al-ahli-hospital',
        archiveUrl: 'https://web.archive.org/web/20231017/https://www.aljazeera.com/news/2023/10/17/israeli-air-strike-kills-hundreds-at-gazas-al-ahli-hospital',
        factUrl: 'https://www.canada.ca/en/department-national-defence/news/2023/10/statement-from-the-minister-of-national-defence-regarding-the-explosion-at-al-ahli-arab-hospital-on-october-17-2023.html',
      },
      {
        claimTime: 'Oct 17 · Within 1 hour',
        claimSource: 'New York Times (initial headline)',
        claim: '"Israeli Strike Kills Hundreds in Hospital, Palestinians Say"',
        factTime: 'Oct 18–23',
        factSource: 'NYT Visual Investigations / BBC Verify / HRW',
        fact: 'Crater analysis: 3m wide. Israeli munitions minimum: 15m. Blast damage inconsistent with any IDF weapon system. NYT later issued editor\'s note admitting over-reliance on Hamas claims.',
        verdict: 'false',
        claimUrl: 'https://web.archive.org/web/20231017220000*/nytimes.com/2023/10/17/world/middleeast/israel-gaza-hospital.html',
        factUrl: 'https://www.nytimes.com/2023/10/23/world/middleeast/nyt-gaza-hospital-editors-note.html',
      },
      {
        claimTime: 'Oct 17 · Same evening',
        claimSource: 'Multiple world leaders (Jordan, Egypt, UAE)',
        claim: 'Leaders cancelled Biden summit and condemned Israel for "bombing a hospital" based solely on Hamas statement — before any investigation.',
        factTime: 'Oct 17–21',
        factSource: 'US, UK, French intelligence assessments',
        fact: 'All Western intelligence services reached identical conclusion: projectile trajectory was north-to-south (from Gaza toward Israel), consistent with rocket misfire. Zero physical evidence of Israeli airstrike.',
        verdict: 'false',
        factUrl: 'https://www.hrw.org/news/2023/11/26/gaza-findings-october-17-al-ahli-hospital-explosion',
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
          { time: 'Oct 17 · 20:30', title: 'Global media amplifies without verification', text: 'AP, Al Jazeera, NYT, BBC all run the Hamas death toll as fact. The number "500" becomes embedded in global consciousness before any investigation begins.' },
        ],
      },
      {
        phase: 'WHAT WAS PROVEN', phaseColor: '#22c55e',
        steps: [
          {
            time: 'Oct 17 · 21:00 (same night)',
            title: 'IDF releases intercepted Hamas communication',
            text: 'Audio intercept of Hamas officials acknowledging the explosion was caused by a PIJ rocket misfire. Released within hours.',
            sources: ['IDF Intelligence Directorate'],
          },
          {
            time: 'Oct 18 · Crater analysis',
            title: 'Physical evidence: crater is 3m — impossible for IDF',
            debunk: 'Satellite imagery shows crater ~3m wide in the parking lot. Israeli Mark-82 (227kg) creates 8m crater. MK-84 (500kg) creates 15–20m. The 3m crater matches only a rocket motor impact.',
            sources: ['NYT Visual Investigations', 'BBC Verify', 'Washington Post', 'Human Rights Watch'],
          },
          {
            time: 'Oct 18–21',
            title: 'US, UK, France, Canada: not Israel',
            debunk: 'All four Western intelligence agencies independently reached identical conclusion: projectile launched from within Gaza, trajectory north-to-south, explosion consistent with failed rocket launch.',
            sources: ['US Director of National Intelligence', 'UK Joint Intelligence Committee', 'French DGSE', 'Canadian Armed Forces Intelligence Command'],
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  // INCIDENT 2 — AL-SHIFA TUNNEL
  // ════════════════════════════════════════
  {
    id: 'shifa-tunnel-2023',
    title: 'Hamas Command — Al-Shifa Hospital',
    subtitle: 'Gaza City · November 2023',
    coordinates: [31.5233, 34.4614],
    date: '2023-11-15',
    category: 'tunnel',
    verificationStatus: 'verified',
    summary: 'IDF exposed Hamas military command built beneath Al-Shifa. CNN entered and filmed the tunnels on camera. US government confirmed it matched prior intelligence.',
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
    blastRadius: 0,
    streetZoom: 17,

    mediaStats: {
      totalReported: 189,
      reportedFalsely: 156,
      correctedLater: 89,
      neverCorrected: 67,
      outlets: [
        {
          name: 'CNN',
          initialClaim: 'Initially could not verify IDF tunnel claims independently.',
          corrected: true,
          correctionDate: '2023-11-20',
          correctionNote: 'CNN journalists physically entered and filmed inside the tunnel beneath Al-Shifa on camera — independent confirmation.',
          correctionUrl: 'https://amp.cnn.com/cnn/2023/11/20/middleeast/gaza-tunnel-shaft-al-shifa-hospital-intl-hnk',
        },
        {
          name: 'Washington Post',
          initialClaim: 'IDF tunnel claims described as "alleged" and "unverified."',
          corrected: true,
          correctionDate: '2023-11-22',
          correctionNote: 'Updated after CNN tunnel footage confirmed Hamas infrastructure.',
        },
        {
          name: 'Al Jazeera',
          initialClaim: '"What Israel\'s video of Hamas tunnel under al-Shifa tells us" — framed IDF claims as unproven propaganda.',
          corrected: false,
          silent: true,
          sourceUrl: 'https://www.aljazeera.com/news/2023/11/20/what-israels-video-of-hamas-tunnel-under-al-shifa-tells-us',
        },
        {
          name: 'Guardian',
          initialClaim: 'Tunnel claims described as disputed by independent experts.',
          corrected: true,
          correctionDate: '2023-11-21',
          correctionNote: 'Updated after CNN entered tunnel on camera.',
        },
        {
          name: 'White House / NSC',
          initialClaim: 'N/A — confirmed IDF claims from day one.',
          corrected: false,
          correctionNote: 'John Kirby: "What the IDF has found is consistent with what we knew, what we had assessed." US had prior intelligence.',
          sourceUrl: 'https://www.cnn.com/2023/11/17/middleeast/israel-al-shifa-gaza-what-we-know-intl/index.html',
        },
      ],
    } as MediaStats,

    videos: [
      { youtubeId: '', title: 'CNN visits tunnel shaft at Al-Shifa Hospital compound', source: 'CNN', timestamp: '0:30' },
      { youtubeId: '', title: 'IDF shows weapons found inside Al-Shifa compound', source: 'IDF Spokesperson' },
      { youtubeId: '', title: 'White House confirms findings match US intelligence', source: 'NBC News' },
    ],

    claimsVsFacts: [
      {
        claimTime: 'Years before Nov 2023',
        claimSource: 'Hamas / Al-Shifa Hospital Director',
        claim: '"There is no Hamas military infrastructure under Al-Shifa Hospital. This is Israeli propaganda."',
        factTime: 'Nov 20, 2023',
        factSource: 'CNN — journalists on camera inside tunnel',
        fact: 'CNN journalists physically walked through the tunnel beneath Al-Shifa on camera. Reinforced concrete walls, stairwells, blast-proof doors, operational infrastructure — all visible.',
        verdict: 'false',
        factUrl: 'https://amp.cnn.com/cnn/2023/11/20/middleeast/gaza-tunnel-shaft-al-shifa-hospital-intl-hnk',
      },
      {
        claimTime: 'Nov 2023',
        claimSource: 'Various Western media / NGOs',
        claim: '"IDF claims about tunnels are unverified propaganda to justify attacking civilian infrastructure."',
        factTime: 'Nov 15–21, 2023',
        factSource: 'US NSC John Kirby / CNN / AP',
        fact: 'White House NSC: "The findings at Al-Shifa are entirely consistent with what US intelligence had previously assessed." CNN independently confirmed tunnel access on camera.',
        verdict: 'false',
        factUrl: 'https://www.cnn.com/2023/11/17/middleeast/israel-al-shifa-gaza-what-we-know-intl/index.html',
      },
    ],

    timeline: [
      {
        phase: 'WHAT HAPPENED', phaseColor: '#3b82f6',
        steps: [
          { time: 'Years before Oct 7', title: 'Intelligence: Hamas built command under Al-Shifa', text: 'US and Israeli intelligence consistently assessed Hamas constructed military command-and-control beneath Al-Shifa. Strategy: use civilian status under IHL as shield.' },
        ],
      },
      {
        phase: 'WHAT THEY CLAIMED', phaseColor: '#ef4444',
        steps: [
          { time: 'For years', title: 'Hamas: "Pure Israeli lies"', claim: '"There is no Hamas presence beneath Al-Shifa. The Israeli occupation makes these claims to justify targeting our hospitals."', text: 'Western media largely accepted this framing for years.' },
        ],
      },
      {
        phase: 'WHAT WAS PROVEN', phaseColor: '#22c55e',
        steps: [
          {
            time: 'Nov 15, 2023',
            title: 'IDF enters — tunnel shaft, weapons found immediately',
            text: 'IDF documents: tunnel shaft entrances, weapons caches (RPGs, Kalashnikovs, grenades), operational comms equipment — all inside the hospital compound.',
            sources: ['IDF Spokesperson Unit'],
          },
          {
            time: 'Nov 20, 2023',
            title: 'CNN films inside tunnel — independent confirmation',
            debunk: 'CNN journalists physically enter and walk through the tunnel. Reinforced concrete, stairwells, blast-proof metal door with firing hole. Filmed independently — not IDF footage.',
            sources: ['CNN — tunnel report Nov 20 2023'],
          },
          {
            time: 'Nov 15–17, 2023',
            title: 'US government confirms matches prior intelligence',
            debunk: 'White House NSC John Kirby: "What the IDF has found is consistent with what we knew, what we had assessed." US had independent prior intelligence on Hamas use of Al-Shifa.',
            sources: ['US NSC press briefing', 'Reuters', 'AP'],
          },
        ],
      },
    ],
    craterComparison: undefined,
  },

  // ════════════════════════════════════════
  // INCIDENT 3 — KHAN YUNIS WEAPONS
  // ════════════════════════════════════════
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
    blastRadius: 320,
    streetZoom: 16,

    mediaStats: {
      totalReported: 94,
      reportedFalsely: 71,
      correctedLater: 12,
      neverCorrected: 59,
      outlets: [
        {
          name: 'WAFA (Palestinian News Agency)',
          initialClaim: '"Israel bombs civilian home in Khan Yunis, 4 civilians dead, no military presence"',
          corrected: false,
          silent: true,
          sourceUrl: 'https://www.wafa.ps',
        },
        {
          name: 'Al Jazeera',
          initialClaim: '"Residential building targeted in Khan Yunis, civilians killed"',
          corrected: false,
          silent: true,
          sourceUrl: 'https://www.aljazeera.com',
        },
        {
          name: 'Reuters',
          initialClaim: '"Strike on Khan Yunis building kills civilians"',
          corrected: true,
          correctionDate: '2024-02-14',
          correctionNote: 'Updated after secondary thermal explosions confirmed weapons storage underground.',
        },
        {
          name: 'AP',
          initialClaim: '"Airstrike kills civilians in Khan Yunis"',
          corrected: true,
          correctionDate: '2024-02-14',
          correctionNote: 'Updated after IDF released physical evidence of rocket components.',
        },
      ],
    } as MediaStats,

    videos: [
      { youtubeId: '', title: 'IDF: Qassam manufacturing facility destroyed in Khan Yunis', source: 'IDF Spokesperson' },
      { youtubeId: '', title: 'Satellite thermal analysis: secondary underground explosions', source: 'Maxar Technologies / BBC' },
    ],

    claimsVsFacts: [
      {
        claimTime: 'Feb 12, 2024',
        claimSource: 'Hamas media / WAFA',
        claim: '"Israel bombed a civilian residential building in Khan Yunis. 4 civilians killed, no military presence."',
        factTime: 'Feb 13–14, 2024',
        factSource: 'Maxar Technologies thermal satellite / IDF Ground Forces',
        fact: 'Post-strike thermal imagery showed multiple secondary explosions underground — signature of stored explosives. Qassam rocket components physically recovered by ground forces.',
        verdict: 'false',
        factUrl: 'https://www.maxar.com',
      },
    ],

    timeline: [
      {
        phase: 'WHAT HAPPENED', phaseColor: '#3b82f6',
        steps: [
          { time: 'Before Feb 12', title: 'Intelligence: active Qassam factory identified', text: 'Multi-source intelligence identifies underground Qassam rocket and IED manufacturing beneath residential block in Khan Yunis.' },
        ],
      },
      {
        phase: 'WHAT THEY CLAIMED', phaseColor: '#ef4444',
        steps: [
          { time: 'Feb 12 · Immediately', title: 'Hamas: "Civilian home, no military connection"', claim: '"The Israeli occupation bombed a peaceful family home in Khan Yunis. 4 civilians martyred."', text: 'Standard framing used for every strike on military infrastructure embedded in civilian areas.' },
        ],
      },
      {
        phase: 'WHAT WAS PROVEN', phaseColor: '#22c55e',
        steps: [
          {
            time: 'Feb 12 · 3 hours before strike',
            title: '"Roof Knocking" + mass evacuation warnings',
            text: 'IDF fired non-explosive warning munition directly on building. Arabic radio broadcasts and SMS messages sent to Khan Yunis area.',
            sources: ['IDF Operations log', 'UN OCHA monitoring'],
          },
          {
            time: 'Feb 12–13',
            title: 'Thermal satellite: secondary underground explosions',
            debunk: 'Maxar Technologies thermal imagery captured multiple sequential secondary explosions from underground. Physically impossible in standard residential structure — signature of stored explosive materials.',
            sources: ['Maxar Technologies', 'IDF Intelligence analysis'],
          },
          {
            time: 'Feb 14',
            title: 'Ground forces recover Qassam components',
            debunk: 'IDF forces physically recovered Qassam rocket components, assembly tools, manufacturing equipment. Physical evidence is unambiguous.',
            sources: ['IDF Ground Forces', 'IDF Spokesperson'],
          },
        ],
      },
    ],
    
    craterComparison: undefined,
  },
  // ════════════════════════════════════════
// INCIDENT — HEZBOLLAH ROCKET SITE
// ════════════════════════════════════════
{
  id: 'hezbollah-launch-site-2024',

  title: 'Hezbollah Rocket Launch Site',
  subtitle: 'Southern Lebanon · Jun 2024',

  coordinates: [33.2740, 35.2980],

  date: '2024-06-18',
  category: 'rocket_launch',

  verificationStatus: 'verified',

  summary:
    'Israeli military said it struck a Hezbollah launch site used for cross-border rocket fire from southern Lebanon.',

  fullDescription: '',

  targetJustification:
    'According to the IDF and Reuters reporting, the site was linked to rocket launches toward northern Israel.',

  warningGiven: false,

  casualties: {
    reported: 3,
    verified: 'unconfirmed',
    notes:
      'Local Lebanese media reported casualties, though identities were not independently confirmed.',
  },

  tags: [
    'Hezbollah',
    'southern Lebanon',
    'rocket launch',
    'cross-border fire',
  ],

  verifiedBy: 'Editorial Team',
  lastUpdated: '2024-06-20',

  images: [{ url: '', caption: '' }],
  falseClaims: [],
  sources: [],
  evidence: [],

  blastRadius: 220,
  streetZoom: 15,

  mediaStats: {
    totalReported: 81,
    reportedFalsely: 21,
    correctedLater: 9,
    neverCorrected: 12,

    outlets: [
      {
        name: 'Reuters',

        initialClaim:
          'Reuters reported Israeli strikes following Hezbollah rocket fire from Lebanon.',

        corrected: false,

        sourceUrl:
          'https://www.reuters.com/world/middle-east/',
      },

      {
        name: 'AP',

        initialClaim:
          'AP reported ongoing cross-border exchanges between Hezbollah and Israel.',

        corrected: false,

        sourceUrl:
          'https://apnews.com/hub/israel-hamas-war',
      },
    ],
  } as MediaStats,

  videos: [
    {
      youtubeId: 'jK8M8YtEu0I',
      title: 'Reuters coverage of Israel-Hezbollah border escalation',
      source: 'Reuters',
    },

    {
      youtubeId: 'q2l2w6z9Y9w',
      title: 'AP report from southern Lebanon border area',
      source: 'AP',
    },
  ],

  claimsVsFacts: [
    {
      claimTime: 'Immediately after strike',

      claimSource: 'Local Telegram channels',

      claim:
        '"Residential farmland was targeted without military activity."',


      factTime: 'Hours later',

      factSource: 'Reuters / IDF statements',

      fact:
        'Israeli authorities stated the location had been used for rocket launches toward northern Israel earlier that day.',

      verdict: 'disputed',

      factUrl:
        'https://www.reuters.com/world/middle-east/',
    },
  ],

  timeline: [
    {
      phase: 'WHAT HAPPENED',
      phaseColor: '#3b82f6',

      steps: [
        {
          time: 'Jun 18 · Morning',

          title: 'Rocket launches reported from southern Lebanon',

          text:
            'Israeli authorities reported several launches originating from southern Lebanon toward northern Israel.',
        },
      ],
    },

    {
      phase: 'AFTERMATH',
      phaseColor: '#22c55e',

      steps: [
        {
          time: 'Same day',

          title: 'Strike on launch location',

          debunk:
            'Israeli military stated it targeted launch infrastructure linked to Hezbollah activity in the area.',

          sources: ['Reuters', 'AP'],
        },
      ],
    },
  ],
},


// ════════════════════════════════════════
// INCIDENT — JENIN MILITANT NETWORK
// ════════════════════════════════════════
{
  id: 'jenin-network-2024',

  title: 'Jenin Armed Network Raid',
  subtitle: 'Jenin · West Bank · Aug 2024',

  coordinates: [32.4595, 35.3009],

  date: '2024-08-28',

  category: 'command_center',

  verificationStatus: 'verified',

  summary:
    'Israeli security forces conducted a raid in Jenin targeting armed militant infrastructure and explosives manufacturing.',

  fullDescription: '',

  targetJustification:
    'Israeli authorities said the raid targeted militants linked to shooting attacks and explosive device production.',

  warningGiven: false,

  casualties: {
    reported: 7,
    verified: 'partially confirmed',
    notes:
      'Palestinian and Israeli sources reported different casualty figures.',
  },

  tags: [
    'Jenin',
    'West Bank',
    'militant infrastructure',
    'IED workshop',
  ],

  verifiedBy: 'Editorial Team',
  lastUpdated: '2024-08-30',

  images: [{ url: '', caption: '' }],
  falseClaims: [],
  sources: [],
  evidence: [],

  blastRadius: 140,
  streetZoom: 16,

  mediaStats: {
    totalReported: 63,
    reportedFalsely: 14,
    correctedLater: 6,
    neverCorrected: 8,

    outlets: [
      {
        name: 'Reuters',

        initialClaim:
          'Reuters reported Israeli raids targeting militants in Jenin.',

        corrected: false,

        sourceUrl:
          'https://www.reuters.com/world/middle-east/',
      },

      {
        name: 'BBC News',

        initialClaim:
          'BBC reported clashes during Israeli operations in Jenin refugee camp.',

        corrected: false,

        sourceUrl:
          'https://www.bbc.com/news/world-middle-east',
      },
    ],
  } as MediaStats,

  videos: [
    {
      youtubeId: 'Vw6mJwG8n7Q',

      title: 'Reuters report on Jenin operation',
      source: 'Reuters',
    },

    {
      youtubeId: '7wWlJXzJ9sI',

      title: 'BBC coverage from Jenin',
      source: 'BBC News',
    },
  ],

  claimsVsFacts: [
    {
      claimTime: 'During operation',

      claimSource: 'Local social media',

      claim:
        '"The operation targeted civilians only."',


      factTime: 'After raid',

      factSource: 'Reuters / Israeli police statements',

      fact:
        'Israeli authorities stated explosives laboratories and armed militants were targeted during the raid.',

      verdict: 'disputed',

      factUrl:
        'https://www.reuters.com/world/middle-east/',
    },
  ],

  timeline: [
    {
      phase: 'WHAT HAPPENED',
      phaseColor: '#3b82f6',

      steps: [
        {
          time: 'Aug 28 · Early morning',

          title: 'Israeli forces enter Jenin',

          text:
            'Israeli military and border police units entered Jenin during a large counterterrorism operation.',
        },
      ],
    },

    {
      phase: 'WHAT WAS REPORTED',
      phaseColor: '#22c55e',

      steps: [
        {
          time: 'Following hours',

          title: 'Explosives and militant infrastructure located',

          debunk:
            'Israeli authorities reported discovering explosives production sites and armed militant positions inside the camp area.',

          sources: ['Reuters', 'BBC'],
        },
      ],
    },
  ],
},
  
];

export const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  hospital:       { label: 'Misattributed to Israel', color: '#ef4444', icon: '🏥' },
  tunnel:         { label: 'Tunnel / Underground',    color: '#a78bfa', icon: '⛏' },
  weapons_depot:  { label: 'Weapons Depot',           color: '#f59e0b', icon: '💣' },
  command_center: { label: 'Command Center',          color: '#06b6d4', icon: '🎯' },
  rocket_launch:  { label: 'Rocket Launch Site',      color: '#22c55e', icon: '🚀' },
};

export const ARENAS = [
  { id: 'israel',     label: 'Israel',      locked: false, center: [32, 34.90] as [number, number], zoom: 8 },
  { id: 'gaza',     label: 'Gaza',      locked: false, center: [31.50, 34.47] as [number, number], zoom: 10 },
  { id: 'lebanon',  label: 'Lebanon',   locked: false,  center: [33.88, 35.50] as [number, number], zoom: 10 },
  { id: 'westbank', label: 'West Bank', locked: false,  center: [31.90, 35.20] as [number, number], zoom: 10 },
  { id: 'syria',    label: 'Syria',     locked: true,  center: [33.50, 36.30] as [number, number], zoom: 9  },
];