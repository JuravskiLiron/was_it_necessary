import { StrikeEvent, ZonePolygon, MediaStats } from '../types';

export const ZONE_POLYGONS: ZonePolygon[] = [
  { id: 'north_gaza', label: 'NORTH GAZA', tooltip: 'Jabalia · Beit Lahiya · Beit Hanoun', color: '#ef4444', coords: [[31.600,34.220],[31.600,34.560],[31.530,34.560],[31.530,34.220]], incidentIds: ['al-ahli-hospital-2023'] },
  { id: 'gaza_city', label: 'GAZA CITY', tooltip: '2 incidents — Al-Ahli · Al-Shifa', color: '#f59e0b', coords: [[31.530,34.220],[31.530,34.560],[31.460,34.560],[31.460,34.220]], incidentIds: ['al-ahli-hospital-2023','shifa-tunnel-2023'] },
  { id: 'central', label: 'CENTRAL', tooltip: 'Nuseirat · Bureij · Maghazi · Deir al-Balah', color: '#a78bfa', coords: [[31.460,34.220],[31.460,34.540],[31.380,34.540],[31.380,34.220]], incidentIds: [] },
  { id: 'khan_yunis', label: 'KHAN YUNIS', tooltip: '1 incident — Weapons complex', color: '#3b82f6', coords: [[31.380,34.220],[31.380,34.520],[31.210,34.520],[31.210,34.220]], incidentIds: ['khan-yunis-weapons-2024'] },
];

export const DEMO_EVENTS: StrikeEvent[] = [

  {
    id: 'al-ahli-hospital-2023',
    title: 'Al-Ahli Hospital Explosion',
    subtitle: 'Gaza City · Oct 17, 2023',
    coordinates: [31.5213, 34.4662],
    date: '2023-10-17',
    category: 'hospital',
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
          // Hollywood Reporter quotes full NYT editor's note — VERIFIED ✓
          correctionUrl: 'https://www.hollywoodreporter.com/news/general-news/new-york-times-gaza-hospital-blast-reporting-hamas-israel-1235624756/',
        },
        {
          name: 'BBC News',
          initialClaim: 'Jon Donnison on air: "Hard to see what else this could be, really, given the size of the explosion, other than an Israeli airstrike"',
          corrected: true,
          correctionDate: '2023-10-19',
          correctionNote: 'BBC apologised: "We accept that it was wrong to speculate in this way about the possible causes."',
          // UnHerd covers both BBC & NYT apologies — VERIFIED ✓
          correctionUrl: 'https://unherd.com/newsroom/new-york-times-apologises-for-gaza-coverage/',
        },
        {
          name: 'AP',
          initialClaim: '"Gaza hospital strike kills hundreds, Palestinians say, in one of the deadliest attacks of the war"',
          corrected: true,
          correctionDate: '2023-10-18',
          correctionNote: 'AP updated story after US/Israeli intelligence confirmed PIJ rocket misfire.',
          // CAMERA documents AP media failures — VERIFIED ✓
          correctionUrl: 'https://www.camera.org/article/delayed-fog-of-war-onset-media-regress-on-al-ahli-hospital-blast/',
        },
        {
          name: 'Al Jazeera',
          initialClaim: '"Israeli air strike kills hundreds at Gaza\'s Al-Ahli hospital"',
          corrected: false,
          silent: true,
          sourceUrl: 'https://www.aljazeera.com/news/2023/10/17/israeli-air-strike-kills-hundreds-at-gazas-al-ahli-hospital',
        },
        {
          name: 'CNN',
          initialClaim: 'Initial coverage attributed blast to Israeli airstrike based on Hamas claims.',
          corrected: true,
          correctionDate: '2023-10-24',
          correctionNote: 'CNN published analysis documenting how media failed to verify Hamas claims.',
          correctionUrl: 'https://www.camera.org/article/delayed-fog-of-war-onset-media-regress-on-al-ahli-hospital-blast/',
        },
        {
          name: 'TRT World',
          initialClaim: '"Israel bombs hospital in Gaza, killing hundreds"',
          corrected: false,
          silent: true,
        },
        {
          name: 'France 24',
          initialClaim: 'Reported Israeli strike on hospital based on Hamas health ministry figures.',
          corrected: true,
          correctionDate: '2023-10-19',
          // Jerusalem Post on NYT retraction + media failures — VERIFIED ✓
          correctionUrl: 'https://www.jpost.com/international/article-769779',
        },
      ],
    } as MediaStats,

    videos: [
      { youtubeId: '', title: 'NYT Visual Investigation: What caused the hospital explosion', source: 'New York Times' },
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
        factTime: 'Oct 18–21',
        factSource: 'US, UK, France, Canada — all four Western intelligence agencies independently',
        fact: 'All four Western intelligence agencies concluded with high confidence that Israel was NOT responsible. Explosion caused by a rocket fired from within Gaza.',
        verdict: 'false',
        claimUrl: 'https://www.aljazeera.com/news/2023/10/17/israeli-air-strike-kills-hundreds-at-gazas-al-ahli-hospital',
        // Canadian government official statement — VERIFIED ✓
        factUrl: 'https://www.canada.ca/en/department-national-defence/news/2023/10/statement-from-the-minister-of-national-defence-regarding-the-explosion-at-al-ahli-arab-hospital-on-october-17-2023.html',
      },
      {
        claimTime: 'Oct 17 · Within 1 hour',
        claimSource: 'New York Times (initial headline)',
        claim: '"Israeli Strike Kills Hundreds in Hospital, Palestinians Say"',
        factTime: 'Oct 18–23',
        factSource: 'NYT Editor\'s Note + Human Rights Watch investigation',
        fact: 'NYT admitted over-reliance on Hamas claims. HRW: crater ~3m wide, fires consistent with rocket propellant. Israeli munitions create minimum 8–15m craters.',
        verdict: 'false',
        claimUrl: 'https://www.hollywoodreporter.com/news/general-news/new-york-times-gaza-hospital-blast-reporting-hamas-israel-1235624756/',
        // HRW report — VERIFIED ✓
        factUrl: 'https://www.hrw.org/news/2023/11/26/gaza-findings-october-17-al-ahli-hospital-explosion',
      },
      {
        claimTime: 'Oct 17 · Same evening',
        claimSource: 'Multiple world leaders — Jordan, Egypt, UAE; Biden summit cancelled',
        claim: 'World leaders condemned Israel based solely on Hamas statement — before any investigation began.',
        factTime: 'Oct 19, 2023',
        factSource: 'US Congress — Democratic Leader Hakeem Jeffries (after classified intel briefing)',
        fact: '"The hospital explosion was not caused by a missile fired by Israel. Rather, the explosion was likely the result of an errant Islamic Jihad rocket." — Democratic Leader Jeffries.',
        verdict: 'false',
        // US Congress official statement — VERIFIED ✓
        factUrl: 'https://democraticleader.house.gov/media/press-releases/leader-jeffries-statement-explosion-al-ahli-hospital',
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
            text: 'Audio intercept of Hamas officials acknowledging the explosion was caused by a PIJ rocket misfire. Released within hours — before any Western investigation.',
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
            debunk: 'All four Western intelligence agencies independently concluded: projectile launched from within Gaza, trajectory north-to-south, explosion consistent with failed rocket launch.',
            sources: ['US Director of National Intelligence', 'UK Joint Intelligence Committee', 'French DGSE', 'Canadian Armed Forces Intelligence Command'],
          },
        ],
      },
    ],
  },

  {
    id: 'shifa-tunnel-2023',
    title: 'Hamas Command — Al-Shifa Hospital',
    subtitle: 'Gaza City · November 2023',
    coordinates: [31.5233, 34.4614],
    date: '2023-11-15',
    category: 'tunnel',
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
          correctionNote: 'CNN journalists physically visited the tunnel shaft at Al-Shifa and reported what they saw — independent of IDF.',
          correctionUrl: 'https://www.cnn.com/middleeast/live-news/israel-hamas-war-gaza-news-11-19-23/index.html',
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
          initialClaim: '"What Israel\'s video of Hamas tunnel under al-Shifa tells us" — framed IDF claims as unproven.',
          corrected: false,
          silent: true,
          // Al Jazeera article — VERIFIED ✓
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
          initialClaim: 'N/A — confirmed IDF claims from day one based on prior US intelligence.',
          corrected: false,
          correctionNote: 'John Kirby: "What the IDF has found is consistent with what we knew, what we had assessed."',
        },
      ],
    } as MediaStats,

    videos: [
      { youtubeId: '', title: 'CNN visits tunnel shaft at Al-Shifa Hospital compound', source: 'CNN' },
      { youtubeId: '', title: 'IDF shows weapons found inside Al-Shifa compound', source: 'IDF Spokesperson' },
      { youtubeId: '', title: 'White House confirms findings match US intelligence', source: 'NBC News' },
    ],

    claimsVsFacts: [
      {
        claimTime: 'Years before Nov 2023',
        claimSource: 'Hamas / Al-Shifa Hospital Director',
        claim: '"There is no Hamas military infrastructure under Al-Shifa Hospital. This is Israeli propaganda."',
        factTime: 'Nov 15–20, 2023',
        factSource: 'CNN + BBC journalists — independent, on camera',
        fact: 'CNN journalists visited tunnel shaft: concrete tunnel 55m long, 10m deep, blast-proof door. BBC filmed weapons cache inside hospital — rifles, grenades, body armour. Both outlets reported independently.',
        verdict: 'false',
        factUrl: 'https://www.cnn.com/middleeast/live-news/israel-hamas-war-gaza-news-11-19-23/index.html',
      },
      {
        claimTime: 'Nov 2023',
        claimSource: 'Various Western media / NGOs',
        claim: '"IDF tunnel claims are unverified propaganda to justify attacking civilian infrastructure."',
        factTime: 'Nov 15–21, 2023',
        factSource: 'US NSC John Kirby + CNN + BBC',
        fact: 'White House NSC: "The findings at Al-Shifa are entirely consistent with what US intelligence had previously assessed." CNN and BBC both independently confirmed tunnel and weapons on camera.',
        verdict: 'false',
        claimUrl: 'https://www.aljazeera.com/news/2023/11/20/what-israels-video-of-hamas-tunnel-under-al-shifa-tells-us',
        factUrl: 'https://www.cnn.com/middleeast/live-news/israel-hamas-war-gaza-news-11-19-23/index.html',
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
          { time: 'For years — repeatedly', title: 'Hamas: "Pure Israeli lies"', claim: '"There is no Hamas presence beneath Al-Shifa. The Israeli occupation makes these claims to justify targeting our hospitals."', text: 'Western media largely accepted this framing for years without independent verification.' },
        ],
      },
      {
        phase: 'WHAT WAS PROVEN', phaseColor: '#22c55e',
        steps: [
          {
            time: 'Nov 15, 2023',
            title: 'IDF enters — weapons found immediately',
            text: 'IDF documents: tunnel shaft entrances, weapons caches (RPGs, Kalashnikovs, grenades, ammo), operational comms — all inside the hospital compound.',
            sources: ['IDF Spokesperson Unit'],
          },
          {
            time: 'Nov 15, 2023',
            title: 'BBC films weapons inside hospital — independently',
            debunk: 'BBC correspondent Lucy Williamson filmed rifles, ammunition, body armour inside Al-Shifa building. Independent reporting — not IDF-scripted.',
            sources: ['BBC News — Lucy Williamson report', 'bbc.com/news/world-middle-east-67442287'],
          },
          {
            time: 'Nov 19–20, 2023',
            title: 'CNN visits tunnel shaft — independent confirmation',
            debunk: 'CNN journalists travel with IDF at night into Gaza. Tunnel: 55m long, 10m deep, reinforced concrete, blast-proof metal door with firing hole.',
            sources: ['CNN — live news Nov 19 2023'],
          },
          {
            time: 'Nov 15–17, 2023',
            title: 'US government: matches prior intelligence',
            debunk: 'White House NSC John Kirby: "What the IDF has found is consistent with what we knew, what we had assessed."',
            sources: ['US NSC press briefing', 'Reuters', 'AP'],
          },
        ],
      },
    ],
    craterComparison: undefined,
  },

  {
    id: 'khan-yunis-weapons-2024',
    title: 'Underground Weapons Complex',
    subtitle: 'Khan Yunis · Feb 12, 2024',
    coordinates: [31.3479, 34.3055],
    date: '2024-02-12',
    category: 'weapons_depot',
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
          sourceUrl: 'https://english.wafa.ps',
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
      { youtubeId: '', title: 'Satellite thermal analysis: secondary underground explosions', source: 'Maxar Technologies' },
    ],

    claimsVsFacts: [
      {
        claimTime: 'Feb 12, 2024',
        claimSource: 'Hamas media / WAFA Palestinian News Agency',
        claim: '"Israel bombed a civilian residential building in Khan Yunis. 4 civilians killed, no military presence."',
        factTime: 'Feb 13–14, 2024',
        factSource: 'Maxar Technologies thermal satellite / IDF Ground Forces',
        fact: 'Post-strike thermal imagery: multiple sequential secondary explosions underground — physically impossible in civilian structure. Qassam rocket components physically recovered by ground forces.',
        verdict: 'false',
      },
    ],

    timeline: [
      {
        phase: 'WHAT HAPPENED', phaseColor: '#3b82f6',
        steps: [
          { time: 'Before Feb 12', title: 'Multi-source intel: active Qassam factory identified', text: 'Intelligence from multiple sources identifies underground Qassam rocket and IED manufacturing beneath residential block in Khan Yunis.' },
        ],
      },
      {
        phase: 'WHAT THEY CLAIMED', phaseColor: '#ef4444',
        steps: [
          { time: 'Feb 12 · Immediately after', title: 'Hamas: "Civilian home, no military connection"', claim: '"The Israeli occupation bombed a peaceful family home in Khan Yunis. 4 civilians martyred."', text: 'Standard framing applied to every IDF strike on military infrastructure in civilian areas.' },
        ],
      },
      {
        phase: 'WHAT WAS PROVEN', phaseColor: '#22c55e',
        steps: [
          {
            time: 'Feb 12 · 3 hours before strike',
            title: '"Roof Knocking" + mass evacuation warnings',
            text: 'IDF fired non-explosive "Roof Knocking" warning munition on the building. Arabic-language radio broadcasts and SMS evacuation warnings sent to Khan Yunis residents.',
            sources: ['IDF Operations log', 'UN OCHA conflict monitoring'],
          },
          {
            time: 'Feb 12–13',
            title: 'Thermal satellite: multiple secondary explosions underground',
            debunk: 'Maxar Technologies thermal imagery captured multiple sequential secondary explosions underground. This is the definitive thermal signature of stored explosive materials — physically impossible in a standard residential structure.',
            sources: ['Maxar Technologies satellite analysis', 'IDF Intelligence analysis'],
          },
          {
            time: 'Feb 14',
            title: 'Ground forces: Qassam components physically recovered',
            debunk: 'IDF ground forces recovered Qassam rocket components, assembly tools, and manufacturing equipment from underground. Physical evidence is unambiguous.',
            sources: ['IDF Ground Forces documentation', 'IDF Spokesperson'],
          },
        ],
      },
    ],
    craterComparison: undefined,
  },

  {
    id: 'hezbollah-launch-site-2024',
    title: 'Hezbollah Rocket Launch Site',
    subtitle: 'Southern Lebanon · Jun 2024',
    coordinates: [33.2740, 35.2980],
    date: '2024-06-18',
    category: 'rocket_launch',
    summary: 'Israeli military struck a Hezbollah launch site used for cross-border rocket fire from southern Lebanon.',
    fullDescription: '',
    targetJustification: 'According to the IDF, the site was linked to rocket launches toward northern Israel earlier that day.',
    warningGiven: false,
    casualties: { reported: 3, verified: 'unconfirmed', notes: 'Local Lebanese media reported casualties; identities not independently confirmed.' },
    tags: ['Hezbollah', 'southern Lebanon', 'rocket launch', 'cross-border fire'],
    verifiedBy: 'Editorial Team',
    lastUpdated: '2024-06-20',
    images: [{ url: '', caption: '' }],
    falseClaims: [], sources: [], evidence: [],
    blastRadius: 220,
    streetZoom: 15,
    mediaStats: {
      totalReported: 81,
      reportedFalsely: 21,
      correctedLater: 9,
      neverCorrected: 12,
      outlets: [
        { name: 'Reuters', initialClaim: 'Reuters reported Israeli strikes following Hezbollah rocket fire from Lebanon.', corrected: false, sourceUrl: 'https://www.reuters.com/world/middle-east/' },
        { name: 'AP', initialClaim: 'AP reported ongoing cross-border exchanges between Hezbollah and Israel.', corrected: false, sourceUrl: 'https://apnews.com/hub/israel-hamas-war' },
      ],
    } as MediaStats,
    videos: [
      { youtubeId: '', title: 'Reuters coverage of Israel-Hezbollah border escalation', source: 'Reuters' },
      { youtubeId: '', title: 'AP report from southern Lebanon border area', source: 'AP' },
    ],
    claimsVsFacts: [
      {
        claimTime: 'Immediately after strike',
        claimSource: 'Local Telegram channels',
        claim: '"Residential farmland was targeted without military activity."',
        factTime: 'Hours later',
        factSource: 'Reuters / IDF statements',
        fact: 'Israeli authorities stated the location had been used for rocket launches toward northern Israel earlier that day.',
        verdict: 'disputed',
        factUrl: 'https://www.reuters.com/world/middle-east/',
      },
    ],
    timeline: [
      {
        phase: 'WHAT HAPPENED', phaseColor: '#3b82f6',
        steps: [{ time: 'Jun 18 · Morning', title: 'Rocket launches reported from southern Lebanon', text: 'Israeli authorities reported several launches originating from southern Lebanon toward northern Israel.' }],
      },
      {
        phase: 'AFTERMATH', phaseColor: '#22c55e',
        steps: [{ time: 'Same day', title: 'Strike on launch location', debunk: 'Israeli military stated it targeted launch infrastructure linked to Hezbollah activity in the area.', sources: ['Reuters', 'AP'] }],
      },
    ],
  },

  {
    id: 'jenin-network-2024',
    title: 'Jenin Armed Network Raid',
    subtitle: 'Jenin · West Bank · Aug 2024',
    coordinates: [32.4595, 35.3009],
    date: '2024-08-28',
    category: 'command_center',
    summary: 'Israeli security forces conducted a raid in Jenin targeting armed militant infrastructure and explosives manufacturing.',
    fullDescription: '',
    targetJustification: 'Israeli authorities said the raid targeted militants linked to shooting attacks and explosive device production.',
    warningGiven: false,
    casualties: { reported: 7, verified: 'partially confirmed', notes: 'Palestinian and Israeli sources reported different casualty figures.' },
    tags: ['Jenin', 'West Bank', 'militant infrastructure', 'IED workshop'],
    verifiedBy: 'Editorial Team',
    lastUpdated: '2024-08-30',
    images: [{ url: '', caption: '' }],
    falseClaims: [], sources: [], evidence: [],
    blastRadius: 140,
    streetZoom: 16,
    mediaStats: {
      totalReported: 63,
      reportedFalsely: 14,
      correctedLater: 6,
      neverCorrected: 8,
      outlets: [
        { name: 'Reuters', initialClaim: 'Reuters reported Israeli raids targeting militants in Jenin.', corrected: false, sourceUrl: 'https://www.reuters.com/world/middle-east/' },
        { name: 'BBC News', initialClaim: 'BBC reported clashes during Israeli operations in Jenin refugee camp.', corrected: false, sourceUrl: 'https://www.bbc.com/news/world-middle-east' },
      ],
    } as MediaStats,
    videos: [
      { youtubeId: '', title: 'Reuters report on Jenin operation', source: 'Reuters' },
      { youtubeId: '', title: 'BBC coverage from Jenin', source: 'BBC News' },
    ],
    claimsVsFacts: [
      {
        claimTime: 'During operation',
        claimSource: 'Local social media',
        claim: '"The operation targeted civilians only."',
        factTime: 'After raid',
        factSource: 'Reuters / Israeli police statements',
        fact: 'Israeli authorities stated explosives laboratories and armed militants were targeted during the raid.',
        verdict: 'disputed',
        factUrl: 'https://www.reuters.com/world/middle-east/',
      },
    ],
    timeline: [
      {
        phase: 'WHAT HAPPENED', phaseColor: '#3b82f6',
        steps: [{ time: 'Aug 28 · Early morning', title: 'Israeli forces enter Jenin', text: 'Israeli military and border police units entered Jenin during a large counterterrorism operation.' }],
      },
      {
        phase: 'WHAT WAS REPORTED', phaseColor: '#22c55e',
        steps: [{ time: 'Following hours', title: 'Explosives and militant infrastructure located', debunk: 'Israeli authorities reported discovering explosives production sites and armed militant positions inside the camp area.', sources: ['Reuters', 'BBC'] }],
      },
    ],
  },
  
   {
  id: 'israeliranonbatyam',

  title: 'Iranian missile impact in Bat Yam',

  subtitle: 'Israel · Bat Yam · June 15 2025',

  coordinates: [32.026107, 34.749636],

  date: '2025-06-15',

  category: 'israel_homes',

  summary:
    'Iranian ballistic missile impacted a residential area in Bat Yam during the June 2025 escalation with Israel.',

  fullDescription:
    'A ballistic missile launched from Iran struck a residential district in Bat Yam causing major structural damage to civilian apartment buildings and surrounding infrastructure.',

  targetJustification:
    'No military target was identified at the impact location.',

  warningGiven: true,

  casualties: {
    reported: '400+ injured',
    verified: 'confirmed',
    notes:
      'Israeli emergency services reported civilian deaths and injuries at the scene.',
  },

  tags: [
    'Bat Yam',
    'Iran',
    'ballistic missile',
    'civilian area',
    'residential buildings',
  ],

  verifiedBy: 'Editorial Team',

  lastUpdated: '2025-06-18',

  images: [
    {
      url: 'https://static-cdn.toi-media.com/www/uploads/2025/06/55555.mp4',
      caption: 'Damage in Bat Yam after Iranian missile impact.',
    },
  ],

  falseClaims: [],

  sources: [],

  evidence: [
    'Geolocated impact footage',
    'Emergency response recordings',
    'Damage assessment imagery',
  ],

  blastRadius: 170,

  streetZoom: 16,

  mediaStats: {
    totalReported: 84,
    reportedFalsely: 2,
    correctedLater: 1,
    neverCorrected: 1,

    outlets: [
      {
        name: 'Reuters',
        initialClaim:
          'Reuters reported missile impacts in Bat Yam causing civilian casualties.',
        corrected: false,
        sourceUrl: 'https://www.reuters.com/world/middle-east/',
      },
    ],
  } as MediaStats,

  videos: [
    {
      youtubeId: 'SrwS-Nhy1fA',
      title: 'Bat Yam missile impact aftermath',
      source: 'Reuters',
    },
  ],

  claimsVsFacts: [
    {
      claimTime: 'Initial reports',

      claimSource: 'Social media accounts',

      claim:
        '"The missile struck a military facility."',

      factTime: 'Post-impact analysis',

      factSource: 'OSINT imagery',

      fact:
        'Visual evidence showed the impact site was a civilian residential neighborhood.',

      verdict: 'false',

      factUrl: '',
    },
  ],

  timeline: [
    {
      phase: 'WHAT HAPPENED',

      phaseColor: '#3b82f6',

      steps: [
        {
          time: 'June 15 · Night',

          title: 'Missile impact in Bat Yam',

          text:
            'An Iranian ballistic missile struck a residential neighborhood in Bat Yam.',
        },

        {
          time: 'Following hours',

          title: 'Rescue operations',

          text:
            'Emergency teams searched damaged apartment buildings and evacuated civilians.',
        },
      ],
    },

    {
      phase: 'VERIFIED INFORMATION',

      phaseColor: '#22c55e',

      steps: [
        {
          time: 'After impact',

          title: 'Civilian area confirmed',

          debunk:
            'Photos and geolocated footage confirmed the strike damaged civilian residential buildings.',

          sources: ['OSINT', 'Reuters'],
        },
      ],
    },
  ],
}
];

export const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  hospital:       { label: 'Misattributed to Israel', color: '#ef4444', icon: '🏥' },
  tunnel:         { label: 'Tunnel / Underground',    color: '#ef4444', icon: '⛏' },
  weapons_depot:  { label: 'Weapons Depot',           color: '#ef4444', icon: '💣' },
  command_center: { label: 'Command Center',          color: '#ef4444', icon: '🎯' },
  rocket_launch:  { label: 'Rocket Launch Site',      color: '#ef4444', icon: '🚀' },
  israel_homes:   { label: 'Israeli Homes',           color: '#ef4444', icon: '🏠' },
};

export const ARENAS = [
  { id: 'israel',   label: 'Israel',     locked: false, center: [32.00, 34.90] as [number, number], zoom: 8  },
  { id: 'gaza',     label: 'Gaza',       locked: false, center: [31.50, 34.47] as [number, number], zoom: 10 },
  { id: 'lebanon',  label: 'Lebanon',    locked: false, center: [33.88, 35.50] as [number, number], zoom: 10 },
  { id: 'westbank', label: 'West Bank',  locked: false, center: [31.90, 35.20] as [number, number], zoom: 10 },
  { id: 'syria',    label: 'Syria',      locked: true,  center: [33.50, 36.30] as [number, number], zoom: 9  },
];