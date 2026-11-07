// ========================================================
// COXHOE BRANCH SAFC - APP.JS (PART 1 OF 4)
// Supabase Client, Core Data Structures & State Engine
// ========================================================

// --- SUPABASE CLIENT INITIALIZATION ---
var SUPABASE_URL = "https://nitzzfwtcfzgjqmbxkwn.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_9GSFeMOaqVmW7p_t19eNEQ_uUMCMBSz"; // Replace with your anon key

var sbClient = null;
if (window.supabase && typeof window.supabase.createClient === "function") {
  try {
    sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn("Supabase initialization error:", err);
  }
}

// --- MASTER DIRECTORY & CONFIG DATA ---
var MASTER_MEMBERS = [
  { id: 1, name: "Dave Kelly", memberNo: "COX-012", category: "Adult", hasAppAccount: true, balance: 18.00, registeredDaysAgo: 120, messagingAllowed: true, membershipStatus: "active", membershipTier: "Adult", membershipSeason: "2026/27", validUntil: "2027-07-31" },
  { id: 2, name: "Sarah Taylor", memberNo: "COX-034", category: "Adult", hasAppAccount: true, balance: 22.00, registeredDaysAgo: 90, messagingAllowed: true, membershipStatus: "active", membershipTier: "Adult", membershipSeason: "2026/27", validUntil: "2027-07-31" },
  { id: 3, name: "Gary Miller", memberNo: "COX-084", category: "Adult", hasAppAccount: true, balance: 35.00, registeredDaysAgo: 45, messagingAllowed: true, membershipStatus: "active", membershipTier: "Adult", membershipSeason: "2026/27", validUntil: "2027-07-31" },
  { id: 4, name: "Graham (Secretary)", memberNo: "ADMIN-01", category: "Adult", hasAppAccount: true, balance: 50.00, registeredDaysAgo: 365, messagingAllowed: true, membershipStatus: "active", membershipTier: "Life", membershipSeason: "2026/27", validUntil: "Lifetime" },
  { id: 5, name: "Billy Thompson", memberNo: "COX-099", category: "Adult", hasAppAccount: true, balance: 25.00, registeredDaysAgo: 30, messagingAllowed: true, membershipStatus: "lapsed", membershipTier: "Adult", membershipSeason: "2025/26", validUntil: "2026-07-31" },
  { id: 6, name: "Phoebe Miller", memberNo: "COX-085", category: "Child", hasAppAccount: true, balance: 0.00, registeredDaysAgo: 4, messagingAllowed: false, membershipStatus: "active", membershipTier: "Junior", membershipSeason: "2026/27", validUntil: "2027-07-31" },
  { id: 7, name: "Tommy Robson", memberNo: "COX-104", category: "Child", hasAppAccount: true, balance: 0.00, registeredDaysAgo: 9, messagingAllowed: false, membershipStatus: "lapsed", membershipTier: "Junior", membershipSeason: "2025/26", validUntil: "2026-07-31" }
];

var DEFAULT_STOPS = [
  { id: 1, name: "Coxhoe Red Lion", time: "12:45" },
  { id: 2, name: "Blackgate / The Avenue", time: "12:50" },
  { id: 3, name: "Bowburn Cooperage", time: "13:00" },
  { id: 4, name: "Quarrington Hill", time: "13:10" }
];

// Season Home Matches with independent coach timetable stops
var SEASON_HOME_MATCHES = [
  {
    id: "H-01",
    opponent: "Coventry City",
    date: "Sat 21 Nov 2026",
    time: "15:00",
    status: "Open",
    buses: [
      {
        busId: 1,
        title: "Bus 1 (Main Village Route)",
        subtitle: "Official Branch Travel • Stadium of Light",
        capacity: 53,
        adultFare: 12.00,
        juniorFare: 8.00,
        isFreeBus: false,
        stops: [
          { id: 1, name: "Coxhoe Red Lion", time: "12:45" },
          { id: 2, name: "Blackgate / The Avenue", time: "12:50" },
          { id: 3, name: "Bowburn Cooperage", time: "13:00" },
          { id: 4, name: "Quarrington Hill", time: "13:10" }
        ]
      }
    ]
  },
  {
    id: "H-02",
    opponent: "Burnley",
    date: "Sat 5 Dec 2026",
    time: "15:00",
    status: "Upcoming",
    buses: [
      {
        busId: 1,
        title: "Bus 1 (Main Village Route)",
        subtitle: "Official Branch Travel • Stadium of Light",
        capacity: 53,
        adultFare: 12.00,
        juniorFare: 8.00,
        isFreeBus: false,
        stops: [
          { id: 1, name: "Coxhoe Red Lion", time: "12:45" },
          { id: 2, name: "Blackgate / The Avenue", time: "12:50" },
          { id: 3, name: "Bowburn Cooperage", time: "13:00" },
          { id: 4, name: "Quarrington Hill", time: "13:10" }
        ]
      }
    ]
  },
  {
    id: "H-03",
    opponent: "Leeds United",
    date: "Sat 26 Dec 2026",
    time: "12:30",
    status: "Upcoming",
    buses: [
      {
        busId: 1,
        title: "Bus 1 (Boxing Day Special)",
        subtitle: "Festive Derby Matchday Service",
        capacity: 53,
        adultFare: 12.00,
        juniorFare: 8.00,
        isFreeBus: false,
        stops: [
          { id: 1, name: "Coxhoe Red Lion", time: "10:15" },
          { id: 2, name: "Blackgate / The Avenue", time: "10:20" },
          { id: 3, name: "Bowburn Cooperage", time: "10:30" },
          { id: 4, name: "Quarrington Hill", time: "10:40" }
        ]
      }
    ]
  }
];

var SEASON_AWAY_FIXTURES = [
  { id: "A-01", opponent: "Leeds United", date: "Sat 28 Nov 2026", time: "15:00", allocation: 25, status: "Open" },
  { id: "A-02", opponent: "Sheffield United", date: "Tue 8 Dec 2026", time: "19:45", allocation: 20, status: "Open" },
  { id: "A-03", opponent: "Middlesbrough", date: "Sat 19 Dec 2026", time: "12:30", allocation: 35, status: "Open" },
  { id: "A-04", opponent: "Burnley", date: "Fri 1 Jan 2027", time: "15:00", allocation: 20, status: "Upcoming" },
  { id: "A-05", opponent: "West Brom", date: "Sat 16 Jan 2027", time: "15:00", allocation: 25, status: "Upcoming" },
  { id: "A-06", opponent: "Norwich City", date: "Sat 30 Jan 2027", time: "15:00", allocation: 15, status: "Upcoming" },
  { id: "A-07", opponent: "Watford", date: "Sat 13 Feb 2027", time: "15:00", allocation: 20, status: "Upcoming" }
];

var MASTER_CLUBS = [
  "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton", "Chelsea",
  "Crystal Palace", "Everton", "Fulham", "Ipswich Town", "Leicester City", "Liverpool",
  "Man City", "Man United", "Newcastle Utd", "Nottingham Forest", "Southampton", "Tottenham",
  "West Ham", "Wolves", "Sunderland", "Leeds United", "Burnley", "Sheffield Utd",
  "West Brom", "Middlesbrough", "Blackburn", "Norwich City", "Watford", "Coventry City",
  "Derby County", "Millwall", "Swansea City", "Bristol City", "QPR", "Stoke City",
  "Preston", "Sheff Wed", "Hull City", "Plymouth Argyle", "Portsmouth", "Oxford United",
  "Cardiff City", "Luton Town", "Bolton", "Wigan", "Blackpool", "Barnsley",
  "Reading", "Birmingham", "Huddersfield", "Charlton", "Wrexham", "Stockport",
  "Wycombe", "Lincoln City", "Peterborough", "Mansfield", "Bradford City", "Rotherham"
];

var BASE_PROFANITIES = [
  "fuck", "fucking", "fucked", "fucker", "fucks", "shit", "shite", "shitting", "shitter",
  "bastard", "bastards", "cunt", "cunts", "twat", "twats", "wanker", "wankers",
  "piss", "pissed", "bitch", "prick", "pricks", "cock", "dick", "arse", "arsehole",
  "asshole", "bollocks", "bellend", "knob", "slag", "minger", "tosser", "nonce",
  "spastic", "retard", "radge", "radgie", "divvy", "pillock", "plonker"
];

var AGGRESSIVE_PHRASES = [
  "shut up", "shut your mouth", "shut your face", "piss off", "fuck off", "shove it",
  "ill smash", "ill sort you out", "fight me", "dirty bastard", "daft cunt"
];

function normalizeText(str) {
  if (!str) return "";
  return str.toLowerCase()
    .replace(/[@4]/g, "a").replace(/[!1|]/g, "i").replace(/[0]/g, "o").replace(/[$5]/g, "s").replace(/[3]/g, "e")
    .replace(/[*#_+~-]/g, "").replace(/\s+/g, " ").trim();
}

function detectAbuseOrProfanity(rawText) {
  if (!rawText) return { flagged: false };
  var norm = normalizeText(rawText);
  var noSp = norm.replace(/\s+/g, "");
  var words = norm.split(/\s+/);
  for (var i = 0; i < words.length; i++) {
    if (BASE_PROFANITIES.indexOf(words[i]) !== -1) return { flagged: true, reason: "Prohibited term: '" + words[i] + "'" };
  }
  for (var j = 0; j < BASE_PROFANITIES.length; j++) {
    var t = BASE_PROFANITIES[j];
    if (t.length >= 4 && (norm.indexOf(t) !== -1 || noSp.indexOf(t) !== -1)) return { flagged: true, reason: "Obfuscated term: '" + t + "'" };
  }
  for (var k = 0; k < AGGRESSIVE_PHRASES.length; k++) {
    if (norm.indexOf(AGGRESSIVE_PHRASES[k]) !== -1) return { flagged: true, reason: "Hostile phrase: '" + AGGRESSIVE_PHRASES[k] + "'" };
  }
  return { flagged: false };
}

function shuffleArray(arr) {
  var cp = arr.slice();
  for (var i = cp.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = cp[i]; cp[i] = cp[j]; cp[j] = temp;
  }
  return cp;
}

function getInitialBonusRegistry() {
  var reg = {};
  var names = ["Dave Kelly", "Sarah Taylor", "Micky Gray", "John O'Shea", "Gary Miller", "Billy Thompson"];
  for (var i = 1; i <= 59; i++) {
    if (i === 10) reg[i] = { owner: "Gary Miller", status: "locked", applicants: [] };
    else if (i === 24) reg[i] = { owner: null, status: "ballot_open", applicants: ["Dave Kelly"] };
    else reg[i] = { owner: names[i % names.length], status: "locked", applicants: [] };
  }
  return reg;
}

// --- STATE MANAGEMENT ---
var appState = {
  currentUser: { name: "Gary Miller", role: "member", memberNo: "COX-084", category: "Adult" },
  users: JSON.parse(localStorage.getItem("coxhoe_users_v20")) || MASTER_MEMBERS,
  stops: JSON.parse(localStorage.getItem("coxhoe_stops_v20")) || DEFAULT_STOPS,
  homeMatches: JSON.parse(localStorage.getItem("coxhoe_home_matches_v20")) || SEASON_HOME_MATCHES,
  selectedHomeMatchId: "H-01",
  selectedBookingBusId: 1,

  bookings: JSON.parse(localStorage.getItem("coxhoe_bookings_v20")) || [
    { id: 101, matchId: "H-01", busId: 1, name: "Gary Miller", stop: "Coxhoe Red Lion", adults: 1, juniors: 0, total: 12.00, boarded: true },
    { id: 102, matchId: "H-01", busId: 1, name: "Dave Kelly", stop: "Coxhoe Red Lion", adults: 2, juniors: 0, total: 24.00, boarded: false }
  ],

  friendsAndFamily: JSON.parse(localStorage.getItem("coxhoe_friends_v20")) || [
    { id: 1, owner: "Gary Miller", targetName: "Phoebe Miller", type: "Child", memberNo: "COX-085", relation: "Daughter", status: "approved" },
    { id: 2, owner: "Phoebe Miller", targetName: "Gary Miller", type: "Adult", memberNo: "COX-084", relation: "Parent", status: "approved" }
  ],
  
  pendingLinkRequests: JSON.parse(localStorage.getItem("coxhoe_pending_links_v20")) || [],
  
  duesConfig: JSON.parse(localStorage.getItem("coxhoe_dues_config_v20")) || {
    activeSeason: "2026/27",
    adultFee: 15.00,
    juniorFee: 5.00,
    seniorFee: 10.00,
    enforceDuesGate: true
  },

  announcements: JSON.parse(localStorage.getItem("coxhoe_announcements_v20")) || [
    { id: 1, title: "Coventry City (H) Coach Departure Notice", date: "2026-10-31", isUrgent: true, content: "Due to roadworks on the A1(M) near Bowburn, the bus will depart all village pickup points 15 minutes earlier than scheduled. Please check the timetable.", reactions: 14, archived: false, readBy: [] },
    { id: 2, title: "Branch Christmas Social Night Announced", date: "2026-10-28", isUrgent: false, content: "Tickets are now on sale for the annual Christmas branch social at Coxhoe WMC on Friday 18th December. Buffet, guest speaker, and fundraising raffle included.", reactions: 29, archived: false, readBy: [] }
  ],

  matchdayChat: JSON.parse(localStorage.getItem("coxhoe_bus_chat_v20")) || [
    { id: 1, sender: "Dave Kelly", time: "11:30", text: "What time are we meeting at the Red Lion?" },
    { id: 2, sender: "Sarah Taylor", time: "11:35", text: "Departure is 12:30 sharp because of roadworks on A1." },
    { id: 3, sender: "Micky Gray", time: "11:38", text: "Has anyone got spare tickets for Leeds away?" },
    { id: 4, sender: "Dave Kelly", time: "11:42", text: "Registered my away interest in the app lads." },
    { id: 5, sender: "Sarah Taylor", time: "11:43", text: "Club shop was also sold out of matchday programmes." }
  ],

  moderation: JSON.parse(localStorage.getItem("coxhoe_moderation_v20")) || {
    strikes: {},
    mutedMembers: ["Billy Thompson"],
    revokedMembers: [],
    incidents: [
      {
        id: "INC-881",
        member: "Billy Thompson",
        timestamp: "2026-10-31 11:45",
        status: "active_ban",
        reason: "Hostile confrontation in Matchday Bus Chat",
        offendingText: "Shut your mouth you useless bastards",
        transcriptContext: [
          "Dave Kelly (11:30): What time are we meeting at the Red Lion?",
          "Sarah Taylor (11:35): Departure is 12:30 sharp because of roadworks on A1.",
          "Micky Gray (11:38): Has anyone got spare tickets for Leeds away?",
          "Dave Kelly (11:42): Registered my away interest in the app lads.",
          "Sarah Taylor (11:43): Club shop was also sold out of matchday programmes.",
          "Billy Thompson (11:45): Shut your mouth you useless bastards [FLAGGED - BAN TRIGGER]"
        ],
        internalDiscussion: [
          { author: "Graham (Secretary)", time: "11:50", text: "Spoke to Billy by phone. Claimed frustration over ticket allocations. Reinstatement requires 2 committee votes." }
        ],
        votes: {}
      }
    ]
  },

  committeeOnCall: JSON.parse(localStorage.getItem("coxhoe_comm_oncall_v20")) || {
    "Graham (Secretary)": true,
    "Dave Kelly": true,
    "Sarah Taylor": true
  },

  helpdeskTickets: JSON.parse(localStorage.getItem("coxhoe_helpdesk_v20")) || [
    {
      id: "TICK-401",
      member: "Dave Kelly",
      topic: "Travel",
      status: "open",
      escalatedToGraham: true,
      created: "2026-10-31 14:00",
      messages: [{ id: "m1", sender: "Dave Kelly", time: "14:00", text: "Can I pick up at Metal Bridge instead of Red Lion next week?" }],
      internalNotes: [{ id: "n1", author: "Sarah Taylor", time: "14:05", text: "Escalated to Graham: does the coach route go past Metal Bridge on 21st?" }]
    }
  ],

  readTracker: JSON.parse(localStorage.getItem("coxhoe_read_tracker_v20")) || {
    "Gary Miller": { busChatCount: 5, readMsgIds: ["m1"], readNoteIds: [] },
    "Graham (Secretary)": { busChatCount: 5, readMsgIds: ["m1"], readNoteIds: [] },
    "Dave Kelly": { busChatCount: 5, readMsgIds: ["m1"], readNoteIds: [] },
    "Sarah Taylor": { busChatCount: 5, readMsgIds: ["m1"], readNoteIds: ["n1"] }
  },

  cardConfig: JSON.parse(localStorage.getItem("coxhoe_card_config_v20")) || {
    size: 40,
    pricePerSquare: 2.00,
    prizeMode: "percentage",
    prizePct: 50,
    prizeFixed: 50.00,
    activeClubs: MASTER_CLUBS.slice(0, 40)
  },
  cardClaims: JSON.parse(localStorage.getItem("coxhoe_card_claims_v20")) || {
    "Blackburn": "Dave Kelly",
    "Leeds United": "Sarah Taylor"
  },
  bonusRegistry: JSON.parse(localStorage.getItem("coxhoe_bonus_reg_v20")) || getInitialBonusRegistry(),

  awayFixtures: JSON.parse(localStorage.getItem("coxhoe_away_fixtures_v20")) || SEASON_AWAY_FIXTURES,
  awayRegistrations: JSON.parse(localStorage.getItem("coxhoe_away_regs_v20")) || [
    { fixtureId: "A-01", memberName: "Gary Miller", party: ["Gary Miller (Adult)", "Phoebe Miller (Child)"], allocated: true },
    { fixtureId: "A-01", memberName: "Dave Kelly", party: ["Dave Kelly (Adult)"], allocated: false }
  ],

  masterAuditTrail: JSON.parse(localStorage.getItem("coxhoe_audit_v20")) || [
    { txnId: "TXN-1001", timestamp: "2026-10-25 10:00:00", actor: "Gary Miller", role: "Member", target: "Branch", category: "SUBS_DUES", desc: "Annual Membership Subs 2026/27 (Adult)", debit: 15.00, credit: 0, branchImpact: 15.00, balanceAfter: 35.00 }
  ]
};

function saveState() {
  localStorage.setItem("coxhoe_users_v20", JSON.stringify(appState.users));
  localStorage.setItem("coxhoe_stops_v20", JSON.stringify(appState.stops));
  localStorage.setItem("coxhoe_home_matches_v20", JSON.stringify(appState.homeMatches));
  localStorage.setItem("coxhoe_bookings_v20", JSON.stringify(appState.bookings));
  localStorage.setItem("coxhoe_friends_v20", JSON.stringify(appState.friendsAndFamily));
  localStorage.setItem("coxhoe_pending_links_v20", JSON.stringify(appState.pendingLinkRequests));
  localStorage.setItem("coxhoe_dues_config_v20", JSON.stringify(appState.duesConfig));
  localStorage.setItem("coxhoe_announcements_v20", JSON.stringify(appState.announcements));
  localStorage.setItem("coxhoe_bus_chat_v20", JSON.stringify(appState.matchdayChat));
  localStorage.setItem("coxhoe_moderation_v20", JSON.stringify(appState.moderation));
  localStorage.setItem("coxhoe_comm_oncall_v20", JSON.stringify(appState.committeeOnCall));
  localStorage.setItem("coxhoe_helpdesk_v20", JSON.stringify(appState.helpdeskTickets));
  localStorage.setItem("coxhoe_read_tracker_v20", JSON.stringify(appState.readTracker));
  localStorage.setItem("coxhoe_card_config_v20", JSON.stringify(appState.cardConfig));
  localStorage.setItem("coxhoe_card_claims_v20", JSON.stringify(appState.cardClaims));
  localStorage.setItem("coxhoe_bonus_reg_v20", JSON.stringify(appState.bonusRegistry));
  localStorage.setItem("coxhoe_away_fixtures_v20", JSON.stringify(appState.awayFixtures));
  localStorage.setItem("coxhoe_away_regs_v20", JSON.stringify(appState.awayRegistrations));
  localStorage.setItem("coxhoe_audit_v20", JSON.stringify(appState.masterAuditTrail));
}

// ==========================================
// END OF PART 1 OF 4
// ==========================================

// ========================================================
// COXHOE BRANCH SAFC - APP.JS (PART 2 OF 4)
// Cloud Sync, Safeguarding, Auth & Home HUD
// ========================================================

// --- UNIFIED SUPABASE CLOUD SYNC & REALTIME DISPATCHER ---
async function initSupabaseCloudSync() {
  if (!sbClient) return;

  try {
    // 1. Hydrate Members & Balances from Supabase
    var mRes = await sbClient.from("members").select("*");
    if (mRes.data && mRes.data.length > 0) {
      appState.users = mRes.data.map(function(row) {
        return {
          id: row.id,
          memberNo: row.member_no,
          name: row.name,
          nickname: row.nickname,
          dob: row.dob,
          category: row.category,
          balance: parseFloat(row.balance) || 0,
          registeredDaysAgo: row.registered_days_ago,
          messagingAllowed: row.messaging_allowed,
          membershipStatus: row.membership_status,
          membershipTier: row.membership_tier,
          membershipSeason: row.membership_season,
          validUntil: row.valid_until,
          hasAppAccount: true
        };
      });
    }

    // 2. Hydrate Bus Bookings
    var bRes = await sbClient.from("bus_bookings").select("*");
    if (bRes.data && bRes.data.length > 0) {
      appState.bookings = bRes.data.map(function(row) {
        return {
          id: row.id,
          matchId: row.match_id,
          busId: row.bus_id || 1,
          name: row.name,
          stop: row.stop,
          adults: row.adults,
          juniors: row.juniors,
          total: parseFloat(row.total) || 0,
          boarded: row.boarded
        };
      });
    }

    // 3. Hydrate Master Audit Ledger (Financial Statement)
    var lRes = await sbClient.from("audit_ledger").select("*").order("timestamp", { ascending: false }).limit(100);
    if (lRes.data && lRes.data.length > 0) {
      appState.masterAuditTrail = lRes.data.map(function(row) {
        return {
          txnId: row.txn_id,
          timestamp: row.timestamp,
          actor: row.actor,
          role: row.role,
          target: row.target,
          category: row.category,
          desc: row.description,
          debit: parseFloat(row.debit) || 0,
          credit: parseFloat(row.credit) || 0,
          branchImpact: parseFloat(row.branch_impact) || 0,
          balanceAfter: parseFloat(row.balance_after) || 0
        };
      });
    }

    // 4. Hydrate Announcements
    var aRes = await sbClient.from("announcements").select("*").order("id", { ascending: false });
    if (aRes.data && aRes.data.length > 0) {
      appState.announcements = aRes.data.map(function(row) {
        return {
          id: row.id,
          title: row.title,
          date: row.date,
          isUrgent: row.is_urgent,
          content: row.content,
          reactions: row.reactions || 0,
          archived: row.archived || false,
          readBy: Array.isArray(row.read_by) ? row.read_by : []
        };
      });
    }

    // 5. Hydrate Chat
    var cRes = await sbClient.from("matchday_chat").select("*").order("id", { ascending: true }).limit(50);
    if (cRes.data && cRes.data.length > 0) {
      appState.matchdayChat = cRes.data;
    }

    // 6. Hydrate Away Registrations
    var arRes = await sbClient.from("away_registrations").select("*");
    if (arRes.data && arRes.data.length > 0) {
      appState.awayRegistrations = arRes.data.map(function(row) {
        return {
          fixtureId: row.fixture_id,
          memberName: row.member_name,
          party: Array.isArray(row.party) ? row.party : [],
          allocated: row.allocated
        };
      });
    }

    saveState();
    window.refreshAllViews();

    // 7. REALTIME BROADCAST DISPATCHER
    sbClient
      .channel("branch-master-sync")
      // Bus Bookings Synced Live
      .on("postgres_changes", { event: "*", schema: "public", table: "bus_bookings" }, function(payload) {
        if (payload.eventType === "INSERT") {
          var exists = appState.bookings.some(function(b) { return b.id === payload.new.id; });
          if (!exists) {
            appState.bookings.push({
              id: payload.new.id,
              matchId: payload.new.match_id,
              busId: payload.new.bus_id || 1,
              name: payload.new.name,
              stop: payload.new.stop,
              adults: payload.new.adults,
              juniors: payload.new.juniors,
              total: parseFloat(payload.new.total) || 0,
              boarded: payload.new.boarded
            });
          }
        } else if (payload.eventType === "UPDATE") {
          var idx = appState.bookings.findIndex(function(b) { return b.id === payload.new.id; });
          if (idx !== -1) appState.bookings[idx].boarded = payload.new.boarded;
        } else if (payload.eventType === "DELETE") {
          appState.bookings = appState.bookings.filter(function(b) { return b.id !== payload.old.id; });
        }
        saveState();
        window.refreshAllViews();
      })
      // Members & Balances Synced Live
      .on("postgres_changes", { event: "*", schema: "public", table: "members" }, function(payload) {
        if (payload.new && payload.new.member_no) {
          var m = appState.users.find(function(u) { return u.memberNo === payload.new.member_no; });
          if (m) {
            m.balance = parseFloat(payload.new.balance) || 0;
            m.membershipStatus = payload.new.membership_status || m.membershipStatus;
            saveState();
            window.updateBalanceDisplay();
            if (typeof renderProfilePassView === "function") renderProfilePassView();
            if (typeof renderHUDView === "function") renderHUDView();
            if (typeof renderAdminSubs === "function") renderAdminSubs();
          }
        }
      })
      // Statement Ledger Synced Live
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "audit_ledger" }, function(payload) {
        var exists = appState.masterAuditTrail.some(function(t) { return t.txnId === payload.new.txn_id; });
        if (!exists) {
          appState.masterAuditTrail.unshift({
            txnId: payload.new.txn_id,
            timestamp: payload.new.timestamp,
            actor: payload.new.actor,
            role: payload.new.role,
            target: payload.new.target,
            category: payload.new.category,
            desc: payload.new.description,
            debit: parseFloat(payload.new.debit) || 0,
            credit: parseFloat(payload.new.credit) || 0,
            branchImpact: parseFloat(payload.new.branch_impact) || 0,
            balanceAfter: parseFloat(payload.new.balance_after) || 0
          });
          saveState();
          if (typeof renderWalletStatement === "function") renderWalletStatement();
          if (typeof renderAdminTreasury === "function") renderAdminTreasury();
        }
      })
      // Chat Messages Synced Live
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "matchday_chat" }, function(payload) {
        var exists = appState.matchdayChat.some(function(m) { return m.id === payload.new.id; });
        if (!exists) {
          appState.matchdayChat.push(payload.new);
          saveState();
          if (typeof renderMatchdayBusChat === "function") renderMatchdayBusChat();
          updateCommsBadge();
        }
      })
      // Away Registrations Synced Live
      .on("postgres_changes", { event: "*", schema: "public", table: "away_registrations" }, function(payload) {
        if (payload.eventType === "INSERT") {
          appState.awayRegistrations.push({
            fixtureId: payload.new.fixture_id,
            memberName: payload.new.member_name,
            party: Array.isArray(payload.new.party) ? payload.new.party : [],
            allocated: payload.new.allocated
          });
        } else if (payload.eventType === "UPDATE") {
          var reg = appState.awayRegistrations.find(function(r) {
            return r.fixtureId === payload.new.fixture_id && r.memberName === payload.new.member_name;
          });
          if (reg) reg.allocated = payload.new.allocated;
        }
        saveState();
        renderMemberAwayView();
        renderHUDView();
        if (typeof renderAdminAwayFixture === "function") renderAdminAwayFixture();
      })
      // Announcements Synced Live
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, function() {
        initSupabaseCloudSync();
      })
      .subscribe();

  } catch (syncErr) {
    console.warn("Supabase Realtime initial connection fallback:", syncErr);
  }
}

function getCurrentUserRecord() {
  var found = appState.users.find(function(u) { return u.name.toLowerCase() === appState.currentUser.name.toLowerCase(); });
  if (!found) {
    found = { id: Date.now(), name: appState.currentUser.name, memberNo: appState.currentUser.memberNo, category: "Adult", hasAppAccount: true, balance: 35.00, registeredDaysAgo: 1, messagingAllowed: true, membershipStatus: "active", membershipTier: "Adult", membershipSeason: "2026/27", validUntil: "2027-07-31" };
    appState.users.push(found);
  }
  return found;
}

window.updateBalanceDisplay = function() {
  var user = getCurrentUserRecord();
  var elem = document.getElementById("display-balance");
  if (elem && user) {
    elem.textContent = "£" + user.balance.toFixed(2);
  }
};

function logForensicTransaction(actor, role, target, category, desc, debit, credit, branchImpact) {
  var user = appState.users.find(function(u) { return u.name === (debit > 0 ? actor : target); });
  var balanceAfter = user ? user.balance : 0;
  var txn = {
    txnId: "TXN-" + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    actor: actor, role: role, target: target, category: category, desc: desc,
    debit: debit, credit: credit, branchImpact: branchImpact, balanceAfter: balanceAfter
  };

  appState.masterAuditTrail.unshift(txn);
  saveState();
  window.updateBalanceDisplay();
  if (typeof renderWalletStatement === "function") renderWalletStatement();

  // Broadcast to Supabase audit_ledger
  if (sbClient) {
    sbClient.from("audit_ledger").insert([{
      txn_id: txn.txnId,
      timestamp: txn.timestamp,
      actor: txn.actor,
      role: txn.role,
      target: txn.target,
      category: txn.category,
      description: txn.desc,
      debit: txn.debit,
      credit: txn.credit,
      branch_impact: txn.branchImpact,
      balance_after: txn.balanceAfter
    }]).then(function(res) {
      if (res.error) console.error("Ledger sync error:", res.error);
    });
  }
}

function checkChildCompliance(user) {
  if (user.category !== "Child") return { compliant: true };
  var hasParent = appState.friendsAndFamily.some(function(f) {
    return (f.owner === user.name && f.relation === "Parent" && f.status === "approved") ||
           (f.targetName === user.name && (f.relation === "Daughter" || f.relation === "Son" || f.relation === "Child") && f.status === "approved");
  });
  if (hasParent) return { compliant: true, linkedParent: true };
  var daysRemaining = 7 - user.registeredDaysAgo;
  if (daysRemaining <= 0) return { compliant: false, deactivated: true, daysPast: Math.abs(daysRemaining) };
  return { compliant: true, pendingWarning: true, daysRemaining: daysRemaining };
}

function verifyMembershipAccess(actionName) {
  if (!appState.duesConfig.enforceDuesGate) return true;
  var user = getCurrentUserRecord();
  if (user.membershipStatus === "lapsed") {
    alert("⛔ ACCESS RESTRICTED: Annual Membership Overdue\n\nUnder branch rules, your " + appState.duesConfig.activeSeason + " membership subs must be settled before you can " + actionName + ".\n\nPlease renew via the Home HUD or My Pass tab.");
    return false;
  }
  return true;
}

// --- DUAL-BADGE ENGINE ---
function computeUserBadges(userName, role) {
  if (!appState.readTracker[userName]) {
    appState.readTracker[userName] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  }
  var tracker = appState.readTracker[userName];
  if (!tracker.readMsgIds) tracker.readMsgIds = [];
  if (!tracker.readNoteIds) tracker.readNoteIds = [];

  var redCount = 0;
  var totalChat = appState.matchdayChat.length;
  if (totalChat > tracker.busChatCount) redCount += (totalChat - tracker.busChatCount);

  appState.helpdeskTickets.forEach(function(t) {
    t.messages.forEach(function(m) {
      if (m.sender !== userName && m.sender.indexOf(userName) === -1) {
        var isForMe = (role === "admin") ? true : (t.member.indexOf(userName) !== -1);
        if (isForMe && tracker.readMsgIds.indexOf(m.id) === -1) redCount++;
      }
    });
  });

  var goldCount = 0;
  if (role === "admin") {
    appState.helpdeskTickets.forEach(function(t) {
      (t.internalNotes || []).forEach(function(note) {
        if (note.author !== userName && tracker.readNoteIds.indexOf(note.id) === -1) goldCount++;
      });
    });
  }
  return { red: redCount, gold: goldCount };
}

function updateCommsBadge() {
  var user = appState.currentUser.name;
  var role = appState.currentUser.role;
  var badges = computeUserBadges(user, role);

  var badgeRed = document.getElementById("nav-comms-badge-red");
  var badgeGold = document.getElementById("nav-comms-badge-gold");

  if (badgeRed) {
    badgeRed.textContent = badges.red;
    badgeRed.style.display = badges.red > 0 ? "inline-block" : "none";
  }
  if (badgeGold) {
    badgeGold.textContent = badges.gold;
    badgeGold.style.display = badges.gold > 0 ? "inline-block" : "none";
  }

  var subBusBadge = document.getElementById("sub-bus-badge");
  var totalChat = appState.matchdayChat.length;
  var userReadChat = appState.readTracker[user] ? appState.readTracker[user].busChatCount : 0;
  if (subBusBadge) {
    var unreadChat = Math.max(0, totalChat - userReadChat);
    subBusBadge.textContent = unreadChat;
    subBusBadge.style.display = unreadChat > 0 ? "inline-block" : "none";
  }

  var subHelpdeskBadge = document.getElementById("sub-helpdesk-badge");
  if (subHelpdeskBadge) {
    if (badges.gold > 0 && badges.red > 0) {
      subHelpdeskBadge.textContent = "🔴" + badges.red + " 🟡" + badges.gold;
      subHelpdeskBadge.style.display = "inline-block";
    } else if (badges.gold > 0) {
      subHelpdeskBadge.textContent = "🟡 " + badges.gold;
      subHelpdeskBadge.style.display = "inline-block";
    } else if (badges.red > 0) {
      subHelpdeskBadge.textContent = "🔴 " + badges.red;
      subHelpdeskBadge.style.display = "inline-block";
    } else {
      subHelpdeskBadge.style.display = "none";
    }
  }
  updateAdminDrawerBadge();
}

function updateAdminDrawerBadge() {
  var adminReqs = appState.pendingLinkRequests.filter(function(r) { return r.status === "pending_admin"; });
  var pendingVotes = appState.moderation.incidents.filter(function(inc) {
    return inc.status === "active_ban" && (!inc.votes || !inc.votes[appState.currentUser.name]);
  });
  var totalAdminTasks = adminReqs.length + pendingVotes.length;
  var badge = document.getElementById("admin-panel-badge");
  if (badge) {
    badge.textContent = totalAdminTasks;
    badge.style.display = (totalAdminTasks > 0 && appState.currentUser.role === "admin") ? "inline-block" : "none";
  }
}

// --- NAVIGATION & AUTH ---
window.setUserSession = function(name, role, memberNo) {
  var matched = appState.users.find(function(u) { return u.name.toLowerCase() === name.toLowerCase(); });
  var category = matched ? matched.category : "Adult";
  appState.currentUser = { name: name, role: role, memberNo: memberNo || "COX-084", category: category };
  var userRecord = getCurrentUserRecord();

  var compliance = checkChildCompliance(userRecord);
  var deactBanner = document.getElementById("child-deactivated-guard");
  if (!compliance.compliant && compliance.deactivated) {
    deactBanner.style.display = "block";
    document.getElementById("deact-msg").textContent = "Account Locked: " + name + " has been registered for " + userRecord.registeredDaysAgo + " days without a verified parent linkage. Link a parent via Friends & Family to activate.";
  } else {
    deactBanner.style.display = "none";
  }

  document.getElementById("view-login").classList.remove("active");
  document.getElementById("view-hud").classList.add("active");
  document.getElementById("bottom-bar").style.display = "flex";
  document.getElementById("user-header-info").style.display = "block";
  document.getElementById("display-name").textContent = name;
  window.updateBalanceDisplay();

  var adminBar = document.getElementById("admin-bar");
  if (adminBar) {
    adminBar.style.display = (role === "admin") ? "flex" : "none";
  }

  window.refreshAllViews();
};

window.handleLogin = function() {
  var input = document.getElementById("login-username");
  var val = (input && input.value.trim()) ? input.value.trim() : "Gary Miller";
  var matched = appState.users.find(function(u) { return u.name.toLowerCase() === val.toLowerCase(); });
  var role = (val.toLowerCase().indexOf("admin") !== -1 || val.toLowerCase().indexOf("secretary") !== -1) ? "admin" : "member";
  var finalName = matched ? matched.name : val;
  var finalNo = matched ? matched.memberNo : (role === "admin" ? "ADMIN-01" : "COX-084");
  window.setUserSession(finalName, role, finalNo);
};

window.quickLogin = function(name, role, no) {
  window.setUserSession(name, role, no);
};

window.handleLogout = function() {
  var adminBar = document.getElementById("admin-bar");
  if (adminBar) adminBar.style.display = "none";
  document.getElementById("bottom-bar").style.display = "none";
  document.getElementById("user-header-info").style.display = "none";
  document.getElementById("child-deactivated-guard").style.display = "none";

  var views = document.querySelectorAll(".tab-view");
  for (var i = 0; i < views.length; i++) { views[i].classList.remove("active"); }
  document.getElementById("view-login").classList.add("active");
};

window.switchTab = function(viewId, btn) {
  var views = document.querySelectorAll(".tab-view");
  for (var i = 0; i < views.length; i++) { views[i].classList.remove("active"); }
  document.getElementById(viewId).classList.add("active");

  var items = document.querySelectorAll(".nav-item");
  for (var j = 0; j < items.length; j++) { items[j].classList.remove("active"); }
  if (btn) btn.classList.add("active");

  if (viewId === "view-comms") {
    var user = appState.currentUser.name;
    if (!appState.readTracker[user]) appState.readTracker[user] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
    appState.readTracker[user].busChatCount = appState.matchdayChat.length;
    saveState();
    updateCommsBadge();
  }
  window.refreshAllViews();
};

window.refreshAllViews = function() {
  window.updateBalanceDisplay();
  renderHUDView();
  if (typeof renderBusBookingView === "function") renderBusBookingView();
  if (typeof renderMemberAwayView === "function") renderMemberAwayView();
  if (typeof renderFootballCard === "function") renderFootballCard();
  if (typeof renderBonusRegistry === "function") renderBonusRegistry();
  if (typeof renderFriendsFamilyChecklist === "function") renderFriendsFamilyChecklist();
  if (typeof renderProfilePassView === "function") renderProfilePassView();
  if (typeof renderWalletStatement === "function") renderWalletStatement();
  if (typeof renderCommsTabs === "function") renderCommsTabs();
  if (typeof renderAdminDrawer === "function") renderAdminDrawer();
  updateCommsBadge();
};

// --- HOME HUD ---
// --- DYNAMIC TIMETABLE RESOLVER ---
// Automatically looks up the current scheduled departure time for a stop
function getDynamicStopDisplay(matchId, busId, rawStop) {
  if (!rawStop) return "Pickup TBA";
  // Extract village stop name if a time was previously baked in (e.g., "Coxhoe Red Lion (12:45)" -> "Coxhoe Red Lion")
  var cleanName = rawStop.split("(")[0].trim();
  var match = appState.homeMatches.find(function(m) { return m.id === matchId; });
  if (match && match.buses) {
    var bus = match.buses.find(function(b) { return b.busId === (busId || 1); }) || match.buses[0];
    if (bus && bus.stops) {
      var foundStop = bus.stops.find(function(s) {
        return s.name.trim().toLowerCase() === cleanName.toLowerCase();
      });
      if (foundStop) {
        return foundStop.name + " (" + foundStop.time + ")";
      }
    }
  }
  return rawStop;
}

// --- HOME HUD WITH DYNAMIC TIMETABLE & RICH ANNOUNCEMENTS ---
function renderHUDView() {
  var activeMatch = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; }) || appState.homeMatches[0];

  var urgentContainer = document.getElementById("hud-urgent-banner");
  var urgentPost = appState.announcements.find(function(a) { 
    var read = a.readBy && a.readBy.indexOf(appState.currentUser.name) !== -1;
    return a.isUrgent && !a.archived && !read; 
  });
  if (urgentContainer) {
    if (urgentPost) {
      urgentContainer.style.display = "block";
      urgentContainer.innerHTML = "<strong>🚨 URGENT BRANCH NOTICE:</strong> " + urgentPost.content;
    } else {
      urgentContainer.style.display = "none";
    }
  }

  var hudMatchTitle = document.getElementById("hud-next-match-title");
  var hudMatchDate = document.getElementById("hud-next-match-date");
  if (hudMatchTitle) hudMatchTitle.textContent = "Sunderland vs " + activeMatch.opponent;
  if (hudMatchDate) hudMatchDate.textContent = activeMatch.date + " • " + activeMatch.time;

  var myBooking = appState.bookings.find(function(b) { 
    return b.matchId === activeMatch.id && b.name.indexOf(appState.currentUser.name) !== -1; 
  });
  var travelStatusBox = document.getElementById("hud-travel-card-status");
  if (travelStatusBox) {
    if (myBooking) {
      // Dynamically resolves pickup time from active bus timetable
      var resolvedStop = getDynamicStopDisplay(activeMatch.id, myBooking.busId, myBooking.stop);
      travelStatusBox.innerHTML = 
        "<div style='color:var(--green); font-weight:800; font-size:12px; margin-bottom:4px;'>✓ SEAT CONFIRMED ON BRANCH COACH</div>" +
        "<div><strong>Pickup:</strong> " + resolvedStop + " (Bus #" + (myBooking.busId || 1) + ")</div>" +
        "<div style='font-size:11px; color:var(--text-muted);'>Pass: " + (myBooking.adults + myBooking.juniors) + " seat(s) • Status: " + (myBooking.boarded ? "<span style='color:var(--green); font-weight:700;'>Boarded</span>" : "Awaiting Coach") + "</div>";
    } else {
      var firstBus = activeMatch.buses[0] || { adultFare: 12.00, isFreeBus: false };
      var fareDisplay = firstBus.isFreeBus ? "FREE" : "£" + firstBus.adultFare.toFixed(2);
      travelStatusBox.innerHTML = 
        "<div style='color:var(--safc-gold); font-size:12px; margin-bottom:4px;'>No seat booked yet for " + activeMatch.opponent + " (H)</div>" +
        "<button class='btn btn-red btn-sm' style='width:auto; padding:4px 10px; margin-top:4px;' onclick='switchTab(\"view-travel\", document.getElementById(\"nav-travel\"))'>Book Coach Seat (" + fareDisplay + ")</button>";
    }
  }

  var actionsBox = document.getElementById("hud-actions-box");
  var actions = [];
  var userRecord = getCurrentUserRecord();

  if (userRecord.membershipStatus === "lapsed") {
    var dueFee = (userRecord.category === "Child" ? appState.duesConfig.juniorFee : appState.duesConfig.adultFee);
    actions.push(
      "<div style='background:#7f1d1d; border:1px solid #ef4444; padding:8px; border-radius:6px; margin-bottom:6px; color:#fff;'>" +
        "<strong>🔴 " + appState.duesConfig.activeSeason + " MEMBERSHIP OVERDUE:</strong> Your seasonal subs (£" + dueFee.toFixed(2) + ") are unpaid. Travel booking and ticket ballots are locked.<br>" +
        "<button class='btn btn-gold btn-sm' style='width:100%; margin-top:6px;' onclick='window.promptPayMembershipDues()'>Renew " + appState.duesConfig.activeSeason + " Pass (£" + dueFee.toFixed(2) + ")</button>" +
      "</div>"
    );
  }

  var myAllocations = appState.awayRegistrations.filter(function(r) {
    return r.memberName === appState.currentUser.name && r.allocated;
  });
  myAllocations.forEach(function(alloc) {
    var fix = appState.awayFixtures.find(function(f) { return f.id === alloc.fixtureId; });
    if (fix) {
      actions.push(
        "<div style='background:#064e3b; border:1px solid #10b981; padding:8px; border-radius:6px; margin-bottom:6px; color:#fff;'>" +
          "<strong>🎉 TICKET ALLOCATED: " + fix.opponent + " (A)</strong><br>" +
          "<span style='font-size:10px;'>Your branch ticket request for (" + alloc.party.join(", ") + ") has been approved by the committee!</span>" +
        "</div>"
      );
    }
  });

  var childComp = checkChildCompliance(userRecord);
  if (childComp.pendingWarning) {
    actions.push("<div style='color:#f87171;'>⚠️ <strong>Safeguarding Notice:</strong> Under-18 account must link a verified parent within <strong>" + childComp.daysRemaining + " days</strong> or account will be locked.</div>");
  }
  if (actionsBox) {
    if (actions.length > 0) {
      actionsBox.style.display = "block";
      document.getElementById("hud-actions-list").innerHTML = actions.join("");
    } else {
      actionsBox.style.display = "none";
    }
  }

  // Render Rich Announcements Feed with Optional Image & Social/Web Links
  var newsFeed = document.getElementById("hud-news-feed");
  if (!newsFeed) return;
  newsFeed.innerHTML = "";

  var activeNotices = appState.announcements.filter(function(post) {
    var read = post.readBy && post.readBy.indexOf(appState.currentUser.name) !== -1;
    return !post.archived && !read;
  });

  if (activeNotices.length === 0) {
    newsFeed.innerHTML = "<div class='text-xs text-muted' style='text-align:center; padding:12px 0;'>✓ You are all caught up on branch notices.</div>";
  } else {
    activeNotices.forEach(function(post) {
      var card = document.createElement("div");
      card.className = "card";
      card.style.marginBottom = "8px";

      var imageHtml = post.imageUrl ? "<img class='announcement-banner-img' src='" + post.imageUrl + "' alt='Notice photo' onerror='this.style.display=\"none\"' />" : "";
      var linkHtml = (post.linkUrl) ? "<div style='margin-top:6px;'><a class='announcement-link-btn' href='" + post.linkUrl + "' target='_blank' rel='noopener noreferrer'>🔗 " + (post.linkText || "View Full Details") + "</a></div>" : "";

      card.innerHTML = 
        "<div style='display:flex; justify-content:space-between; font-size:10px; color:var(--text-muted); margin-bottom:4px;'>" +
          "<span>" + post.date + "</span>" +
          (post.isUrgent ? "<span style='color:#ef4444; font-weight:800;'>URGENT</span>" : "<span>OFFICIAL</span>") +
        "</div>" +
        "<h4 style='font-size:13px; font-weight:800; margin-bottom:4px;'>" + post.title + "</h4>" +
        imageHtml +
        "<p style='font-size:11px; line-height:1.5; color:#cbd5e1; margin-bottom:8px;'>" + post.content + "</p>" +
        linkHtml +
        "<div style='display:flex; gap:6px; margin-top:8px;'>" +
          "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:10px;' onclick='window.reactAnnouncement(" + post.id + ")'>👍 " + post.reactions + " Reactions</button>" +
          "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:10px; color:var(--safc-gold);' onclick='window.dismissAnnouncement(" + post.id + ")'>✓ Mark as Read</button>" +
        "</div>";
      newsFeed.appendChild(card);
    });
  }
}

window.reactAnnouncement = function(postId) {
  var post = appState.announcements.find(function(a) { return a.id === postId; });
  if (post) {
    post.reactions++;
    saveState();
    renderHUDView();
    if (sbClient) {
      sbClient.from("announcements").update({ reactions: post.reactions }).eq("id", postId).then(function() {});
    }
  }
};

window.dismissAnnouncement = function(postId) {
  var post = appState.announcements.find(function(a) { return a.id === postId; });
  if (post) {
    if (!post.readBy) post.readBy = [];
    if (post.readBy.indexOf(appState.currentUser.name) === -1) {
      post.readBy.push(appState.currentUser.name);
    }
    saveState();
    renderHUDView();
    if (sbClient) {
      sbClient.from("announcements").update({ read_by: post.readBy }).eq("id", postId).then(function() {});
    }
  }
};

window.promptPayMembershipDues = function() {
  var user = getCurrentUserRecord();
  var fee = (user.category === "Child" ? appState.duesConfig.juniorFee : appState.duesConfig.adultFee);
  if (user.membershipTier === "Senior") fee = appState.duesConfig.seniorFee;
  if (user.membershipTier === "Life") fee = 0.00;

  if (user.balance < fee) {
    alert("Insufficient balance! You need £" + fee.toFixed(2) + " to settle your annual dues, but your balance is £" + user.balance.toFixed(2) + ".\nPlease top up your wallet.");
    return;
  }

  window.showConfirmDialog(
    "Renew Annual Membership Subs",
    "<strong>Season:</strong> " + appState.duesConfig.activeSeason + "<br><strong>Tier:</strong> " + user.membershipTier + "<br><strong>Total to Pay:</strong> £" + fee.toFixed(2) + "<br><br>Settle annual dues to restore travel and ticket privileges.",
    function() {
      user.balance -= fee;
      user.membershipStatus = "active";
      user.membershipSeason = appState.duesConfig.activeSeason;
      user.validUntil = "2027-07-31";
      logForensicTransaction(user.name, "Member", "Branch", "SUBS_DUES", "Paid " + appState.duesConfig.activeSeason + " Annual Dues (" + user.membershipTier + ")", fee, 0, fee);
      saveState();
      window.refreshAllViews();
      alert("🎉 Membership Renewed! Your " + appState.duesConfig.activeSeason + " Season Pass is now ACTIVE.");
    }
  );
};

// ==========================================
// END OF PART 2 OF 4
// ==========================================

// ========================================================
// COXHOE BRANCH SAFC - APP.JS (PART 3 OF 4)
// Travel Bookings, Away Tickets, Fundraiser, Pass & Comms
// ========================================================

// --- 1. TRAVEL & COACH BOOKINGS ---
// ========================================================
// MULTI-PASSENGER PARTY COACH BOOKING ENGINE
// ========================================================

// Transient booking party state for current booking session
var currentBookingParty = [];

function initBookingParty() {
  var user = getCurrentUserRecord();
  var activeMatch = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; }) || appState.homeMatches[0];

  // Check if lead user already has a seat booked for this match
  var leadAlreadyBooked = appState.bookings.some(function(b) {
    return b.matchId === activeMatch.id && b.name.indexOf(user.name) !== -1;
  });

  currentBookingParty = [
    {
      id: "lead-" + user.name,
      name: user.name,
      type: user.category || "Adult",
      isLead: true,
      alreadyBooked: leadAlreadyBooked,
      checked: !leadAlreadyBooked
    }
  ];

  // Add linked friends & family
  var myFriends = appState.friendsAndFamily.filter(function(f) {
    return f.owner === user.name && f.status === "approved";
  });

  myFriends.forEach(function(f) {
    var friendBooked = appState.bookings.some(function(b) {
      return b.matchId === activeMatch.id && b.name.indexOf(f.targetName) !== -1;
    });
    currentBookingParty.push({
      id: "fnf-" + f.targetName,
      name: f.targetName,
      type: f.type || "Adult",
      relation: f.relation,
      isLinked: true,
      alreadyBooked: friendBooked,
      checked: false
    });
  });
}

function renderBusBookingView() {
  var activeMatch = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; }) || appState.homeMatches[0];
  var buses = activeMatch.buses || [];

  var busSelectorGroup = document.getElementById("booking-bus-selector-group");
  var busSelectElem = document.getElementById("booking-bus-select");

  if (busSelectorGroup && busSelectElem) {
    if (buses.length > 1) {
      busSelectorGroup.style.display = "block";
      var currentBusVal = parseInt(busSelectElem.value) || appState.selectedBookingBusId;
      busSelectElem.innerHTML = "";
      buses.forEach(function(b) {
        var opt = document.createElement("option");
        opt.value = b.busId;
        opt.textContent = b.title + " (" + (b.capacity || 53) + " Seats)";
        if (b.busId === currentBusVal) opt.selected = true;
        busSelectElem.appendChild(opt);
      });
      appState.selectedBookingBusId = parseInt(busSelectElem.value) || buses[0].busId;
    } else {
      busSelectorGroup.style.display = "none";
      appState.selectedBookingBusId = buses[0] ? buses[0].busId : 1;
    }
  }

  initBookingParty();
  window.updateBookingCoachUI();
}

window.updateBookingCoachUI = function() {
  var activeMatch = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; }) || appState.homeMatches[0];
  var buses = activeMatch.buses || [];

  var busSelectElem = document.getElementById("booking-bus-select");
  if (busSelectElem && buses.length > 1) {
    appState.selectedBookingBusId = parseInt(busSelectElem.value) || 1;
  }

  var selectedBus = buses.find(function(b) { return b.busId === appState.selectedBookingBusId; }) || buses[0] || {
    busId: 1, title: "Bus 1", subtitle: "Official Branch Travel", adultFare: 12.00, juniorFare: 8.00, capacity: 53, stops: DEFAULT_STOPS
  };

  var titleElem = document.getElementById("travel-coach-title");
  var subElem = document.getElementById("travel-coach-subtitle");
  var pricePill = document.getElementById("travel-coach-price-pill");
  var busCountLabel = document.getElementById("travel-bus-count-label");

  if (titleElem) titleElem.textContent = "Sunderland vs " + activeMatch.opponent;
  if (subElem) subElem.textContent = selectedBus.subtitle || (selectedBus.title + " • Official Branch Travel");
  if (busCountLabel) busCountLabel.textContent = "Fleet: " + buses.length + " Coach" + (buses.length > 1 ? "es" : "");

  if (selectedBus.isFreeBus) {
    if (pricePill) pricePill.textContent = "FREE BUS (Branch Sponsored)";
  } else {
    if (pricePill) pricePill.textContent = "£" + selectedBus.adultFare.toFixed(2) + " Adult • £" + selectedBus.juniorFare.toFixed(2) + " Junior";
  }

  // Populate dynamic pickup stops for this specific coach
  var stopSelect = document.getElementById("booking-stop");
  if (stopSelect) {
    var prevVal = stopSelect.value;
    stopSelect.innerHTML = "";
    var coachStops = selectedBus.stops || DEFAULT_STOPS;
    coachStops.forEach(function(s) {
      var opt = document.createElement("option");
      opt.value = s.name;
      opt.textContent = s.name + " (" + s.time + ")";
      if (prevVal && prevVal === s.name) opt.selected = true;
      stopSelect.appendChild(opt);
    });
  }

  // Capacity calculation
  var busBookings = appState.bookings.filter(function(b) {
    return b.matchId === activeMatch.id && (b.busId || 1) === selectedBus.busId;
  });
  var totalBooked = 0;
  busBookings.forEach(function(b) { totalBooked += ((b.adults || 0) + (b.juniors || 0)); });

  var cap = selectedBus.capacity || 53;
  var rem = cap - totalBooked;
  var statusElem = document.getElementById("seats-status");
  var barElem = document.getElementById("seats-bar");
  if (statusElem) statusElem.textContent = rem > 0 ? rem + " / " + cap + " Seats on " + selectedBus.title : selectedBus.title + " FULL";
  if (barElem) barElem.style.width = Math.min(100, Math.round((totalBooked / (cap || 1)) * 100)) + "%";

  // Render Confirmed Bookings with Dynamic Timetable Resolution
  renderActiveBookingsSummary(activeMatch);

  // Render Passenger Checklist & Fare Calculation
  renderPartyPassengersList();
  window.updatePartyFareCalculation();
};

function renderActiveBookingsSummary(activeMatch) {
  var container = document.getElementById("my-active-bookings-summary");
  if (!container) return;

  var myBookings = appState.bookings.filter(function(b) {
    return b.matchId === activeMatch.id && b.name.indexOf(appState.currentUser.name) !== -1;
  });

  if (myBookings.length === 0) {
    container.innerHTML = "";
    return;
  }

  var html = "<div style='font-size:11px; font-weight:800; color:var(--green); margin-bottom:6px;'>✓ YOUR CONFIRMED SEATS FOR THIS MATCH:</div>";
  myBookings.forEach(function(b) {
    // Resolve dynamic pickup time from active bus stops
    var resolvedStop = getDynamicStopDisplay(activeMatch.id, b.busId, b.stop);
    var seats = (b.adults || 0) + (b.juniors || 0);

    html += 
      "<div style='background:#064e3b; border:1px solid #10b981; padding:8px 10px; border-radius:6px; margin-bottom:6px; font-size:11px; color:#fff;'>" +
        "<div style='display:flex; justify-content:space-between; align-items:center;'>" +
          "<strong>" + b.name + " (" + seats + " Seat" + (seats > 1 ? "s" : "") + ")</strong>" +
          "<span style='font-weight:700; color:var(--safc-gold);'>Bus #" + (b.busId || 1) + "</span>" +
        "</div>" +
        "<div style='margin-top:2px; font-size:10px;'>🚏 Pickup: <strong>" + resolvedStop + "</strong></div>" +
        "<div style='display:flex; justify-content:space-between; align-items:center; margin-top:6px;'>" +
          "<span style='font-size:10px; color:#a7f3d0;'>Status: " + (b.boarded ? "Boarded ✓" : "Seat Reserved") + "</span>" +
          "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:9px; color:#f87171; border-color:#f87171;' onclick='window.cancelMyBooking(" + b.id + ")'>Cancel & Refund (£" + b.total.toFixed(2) + ")</button>" +
        "</div>" +
      "</div>";
  });

  container.innerHTML = html;
}

function renderPartyPassengersList() {
  var listContainer = document.getElementById("party-passengers-list");
  if (!listContainer) return;
  listContainer.innerHTML = "";

  currentBookingParty.forEach(function(p, idx) {
    var row = document.createElement("div");
    var rowClass = "party-member-row";
    if (p.isLead) rowClass += " lead";
    else if (p.isGuest) rowClass += " guest";
    row.className = rowClass;

    var badgeText = p.isLead ? "Lead" : (p.relation ? p.relation : (p.isGuest ? "Guest" : "Member"));
    var disabledAttr = p.alreadyBooked ? "disabled" : "";
    var checkedAttr = p.checked ? "checked" : "";

    row.innerHTML = 
      "<div style='display:flex; align-items:center; gap:8px;'>" +
        "<input type='checkbox' " + checkedAttr + " " + disabledAttr + " onchange='window.togglePartyPassenger(" + idx + ", this.checked)' />" +
        "<div>" +
          "<strong>" + p.name + "</strong> " +
          "<span style='font-size:9px; color:var(--safc-gold);'>(" + p.type + " • " + badgeText + ")</span>" +
          (p.alreadyBooked ? "<span style='display:block; font-size:9px; color:var(--green); font-weight:700;'>✓ Seat Already Confirmed</span>" : "") +
        "</div>" +
      "</div>" +
      (!p.isLead && !p.isLinked ? "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444; border-color:#ef4444;' onclick='window.removePartyPassenger(" + idx + ")'>✕</button>" : "");

    listContainer.appendChild(row);
  });
}

window.togglePartyPassenger = function(idx, isChecked) {
  if (currentBookingParty[idx]) {
    currentBookingParty[idx].checked = isChecked;
    window.updatePartyFareCalculation();
  }
};

window.removePartyPassenger = function(idx) {
  currentBookingParty.splice(idx, 1);
  renderPartyPassengersList();
  window.updatePartyFareCalculation();
};

window.updatePartyStopSelection = function() {
  window.updatePartyFareCalculation();
};

window.updatePartyFareCalculation = function() {
  var activeMatch = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; }) || appState.homeMatches[0];
  var buses = activeMatch.buses || [];
  var selectedBus = buses.find(function(b) { return b.busId === appState.selectedBookingBusId; }) || buses[0] || {
    adultFare: 12.00, juniorFare: 8.00, isFreeBus: false
  };

  var adultCount = 0;
  var juniorCount = 0;

  currentBookingParty.forEach(function(p) {
    if (p.checked && !p.alreadyBooked) {
      if (p.type === "Junior" || p.type === "Child") juniorCount++;
      else adultCount++;
    }
  });

  var totalFare = selectedBus.isFreeBus ? 0.00 : ((adultCount * selectedBus.adultFare) + (juniorCount * selectedBus.juniorFare));

  var fareText = document.getElementById("party-total-fare-text");
  var bookBtn = document.getElementById("btn-book-seat");

  if (fareText) {
    fareText.innerHTML = selectedBus.isFreeBus ? 
      "<span style='color:var(--green);'>FREE (Branch Sponsored)</span>" : 
      "£" + totalFare.toFixed(2) + " <span style='font-size:10px; color:#94a3b8;'>(" + adultCount + " Adult" + (adultCount !== 1 ? "s" : "") + ", " + juniorCount + " Junior" + (juniorCount !== 1 ? "s" : "") + ")</span>";
  }

  if (bookBtn) {
    var totalSelected = adultCount + juniorCount;
    if (totalSelected === 0) {
      bookBtn.textContent = "Select At Least 1 Passenger";
      bookBtn.disabled = true;
    } else {
      bookBtn.textContent = "Book " + totalSelected + " Seat" + (totalSelected > 1 ? "s" : "") + " (" + (selectedBus.isFreeBus ? "FREE" : "£" + totalFare.toFixed(2)) + ")";
      bookBtn.disabled = false;
    }
  }
};

// Autocomplete Member Search for Party Booking
window.handlePartyMemberSearch = function(query) {
  var box = document.getElementById("party-member-autocomplete-box");
  if (!box) return;

  var q = (query || "").trim().toLowerCase();
  if (q.length < 2) {
    box.style.display = "none";
    return;
  }

  var existingNames = currentBookingParty.map(function(p) { return p.name.toLowerCase(); });
  var matches = appState.users.filter(function(u) {
    var matchName = u.name.toLowerCase().indexOf(q) !== -1;
    var matchNo = u.memberNo && u.memberNo.toLowerCase().indexOf(q) !== -1;
    var notInParty = existingNames.indexOf(u.name.toLowerCase()) === -1;
    return (matchName || matchNo) && notInParty;
  });

  if (matches.length === 0) {
    box.innerHTML = "<div style='padding:6px 10px; font-size:10px; color:#94a3b8;'>No members match '" + query + "'</div>";
    box.style.display = "block";
    return;
  }

  var html = "";
  matches.slice(0, 6).forEach(function(m) {
    html += 
      "<div class='autocomplete-item' onclick='window.selectPartyMember(\"" + m.name.replace(/'/g, "\\'") + "\", \"" + (m.category || "Adult") + "\")'>" +
        "<strong>" + m.name + "</strong> <span style='font-size:9px; color:var(--safc-gold);'>(" + m.memberNo + " • " + m.category + ")</span>" +
      "</div>";
  });

  box.innerHTML = html;
  box.style.display = "block";
};

window.selectPartyMember = function(memberName, category) {
  var activeMatch = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; }) || appState.homeMatches[0];
  var isBooked = appState.bookings.some(function(b) {
    return b.matchId === activeMatch.id && b.name.indexOf(memberName) !== -1;
  });

  currentBookingParty.push({
    id: "member-" + memberName,
    name: memberName,
    type: category || "Adult",
    isMember: true,
    alreadyBooked: isBooked,
    checked: !isBooked
  });

  var input = document.getElementById("party-search-member-input");
  var box = document.getElementById("party-member-autocomplete-box");
  if (input) input.value = "";
  if (box) box.style.display = "none";

  renderPartyPassengersList();
  window.updatePartyFareCalculation();
};

window.addPartyGuestPassenger = function() {
  var nameInput = document.getElementById("party-guest-name-input");
  var typeSelect = document.getElementById("party-guest-type-select");
  var guestName = nameInput ? nameInput.value.trim() : "";
  var guestType = typeSelect ? typeSelect.value : "Adult";

  if (!guestName) {
    alert("Please enter the guest passenger's name.");
    return;
  }

  currentBookingParty.push({
    id: "guest-" + Date.now(),
    name: guestName + " (Guest)",
    type: guestType,
    isGuest: true,
    alreadyBooked: false,
    checked: true
  });

  if (nameInput) nameInput.value = "";
  renderPartyPassengersList();
  window.updatePartyFareCalculation();
};

// Execute Confirmed Party Coach Booking
window.openBookingModal = function() {
  if (!verifyMembershipAccess("book matchday coach travel")) return;

  var activeMatch = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; }) || appState.homeMatches[0];
  var buses = activeMatch.buses || [];
  var selectedBus = buses.find(function(b) { return b.busId === appState.selectedBookingBusId; }) || buses[0] || {
    busId: 1, title: "Bus 1", adultFare: 12.00, juniorFare: 8.00, isFreeBus: false
  };

  var selectedPassengers = currentBookingParty.filter(function(p) { return p.checked && !p.alreadyBooked; });
  if (selectedPassengers.length === 0) {
    alert("Please select at least 1 passenger to book.");
    return;
  }

  var adultCount = 0;
  var juniorCount = 0;
  var passengerNames = [];

  selectedPassengers.forEach(function(p) {
    passengerNames.push(p.name + (p.type === "Junior" || p.type === "Child" ? " (Junior)" : ""));
    if (p.type === "Junior" || p.type === "Child") juniorCount++;
    else adultCount++;
  });

  var stop = document.getElementById("booking-stop").value;
  var total = selectedBus.isFreeBus ? 0.00 : ((adultCount * selectedBus.adultFare) + (juniorCount * selectedBus.juniorFare));

  var user = getCurrentUserRecord();
  if (user.balance < total) {
    alert("Insufficient funds! You have £" + user.balance.toFixed(2) + " but need £" + total.toFixed(2) + ".\nPlease top up your wallet.");
    return;
  }

  var resolvedStop = getDynamicStopDisplay(activeMatch.id, selectedBus.busId, stop);

  window.showConfirmDialog(
    "Confirm Coach Party Booking",
    "<strong>Fixture:</strong> Sunderland vs " + activeMatch.opponent + "<br>" +
    "<strong>Coach:</strong> " + selectedBus.title + "<br>" +
    "<strong>Pickup Point:</strong> " + resolvedStop + "<br>" +
    "<strong>Traveling Party (" + selectedPassengers.length + "):</strong> " + passengerNames.join(", ") + "<br>" +
    "<strong>Total Fare:</strong> " + (selectedBus.isFreeBus ? "<span style='color:var(--green); font-weight:800;'>FREE (Branch Sponsored)</span>" : "£" + total.toFixed(2)),
    function() {
      if (total > 0) user.balance -= total;
      logForensicTransaction(
        appState.currentUser.name,
        "Member",
        "Branch",
        "BUS_BOOKING",
        "Coach vs " + activeMatch.opponent + " (" + selectedBus.title + "): " + passengerNames.join(", ") + " [" + stop + "]",
        total,
        0,
        total
      );

      var newBooking = {
        id: Date.now(),
        matchId: activeMatch.id,
        busId: selectedBus.busId || 1,
        name: passengerNames.join(", "),
        stop: stop,
        adults: adultCount,
        juniors: juniorCount,
        total: total,
        boarded: false
      };

      appState.bookings.push(newBooking);
      saveState();
      window.refreshAllViews();

      // Write booking and balance to Supabase
      if (sbClient) {
        sbClient.from("bus_bookings").insert([{
          id: newBooking.id,
          match_id: newBooking.matchId,
          bus_id: newBooking.busId,
          name: newBooking.name,
          stop: newBooking.stop,
          adults: newBooking.adults,
          juniors: newBooking.juniors,
          total: newBooking.total,
          boarded: false
        }]).then(function(res) {
          if (res.error) console.error("Booking error:", res.error);
        });

        sbClient.from("members")
          .update({ balance: user.balance })
          .eq("member_no", user.memberNo)
          .then(function(res) {
            if (res.error) console.error("Balance update error:", res.error);
          });
      }

      alert("✓ Booking confirmed! " + selectedPassengers.length + " seat(s) reserved on " + selectedBus.title + ".");
    }
  );
};

// Cancel Coach Booking & Process Instant Wallet Refund
window.cancelMyBooking = function(bookingId) {
  var bIdx = appState.bookings.findIndex(function(b) { return b.id === bookingId; });
  if (bIdx === -1) return;
  var booking = appState.bookings[bIdx];

  window.showConfirmDialog(
    "Cancel Coach Booking",
    "Are you sure you want to cancel this booking for <strong>" + booking.name + "</strong>?<br><br>" +
    "A full refund of <strong>£" + booking.total.toFixed(2) + "</strong> will be credited directly to your branch wallet.",
    function() {
      var user = getCurrentUserRecord();
      if (booking.total > 0) {
        user.balance += booking.total;
        logForensicTransaction(
          "Branch",
          "System",
          user.name,
          "BUS_REFUND",
          "Refund: Cancelled coach booking #" + booking.id + " (" + booking.name + ")",
          0,
          booking.total,
          -booking.total
        );
      }

      appState.bookings.splice(bIdx, 1);
      saveState();
      window.refreshAllViews();

      if (sbClient) {
        sbClient.from("bus_bookings").delete().eq("id", bookingId).then(function(res) {
          if (res.error) console.error("Booking delete error:", res.error);
        });

        sbClient.from("members")
          .update({ balance: user.balance })
          .eq("member_no", user.memberNo)
          .then(function(res) {
            if (res.error) console.error("Balance refund error:", res.error);
          });
      }

      alert("✓ Coach booking cancelled. £" + booking.total.toFixed(2) + " refunded to your wallet.");
    }
  );
};

// --- 2. AWAY FIXTURE EXPRESSIONS OF INTEREST ---
function renderMemberAwayView() {
  var sel = document.getElementById("member-away-game-select");
  var card = document.getElementById("member-away-status-card");
  if (!sel || !card) return;

  var currentVal = sel.value;
  sel.innerHTML = "";
  appState.awayFixtures.forEach(function(f) {
    var opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.opponent + " (A) • " + f.date;
    if (currentVal && currentVal === f.id) opt.selected = true;
    sel.appendChild(opt);
  });
  if (!sel.value && appState.awayFixtures.length > 0) sel.value = appState.awayFixtures[0].id;

  var selectedId = sel.value;
  var fixture = appState.awayFixtures.find(function(f) { return f.id === selectedId; });
  if (!fixture) return;

  var myReg = appState.awayRegistrations.find(function(r) {
    return r.fixtureId === selectedId && r.memberName === appState.currentUser.name;
  });

  var html = 
    "<div class='flex-between'>" +
      "<strong>" + fixture.opponent + " (Away)</strong>" +
      "<span class='badge-gold'>" + fixture.date + " (" + fixture.time + ")</span>" +
    "</div>" +
    "<div class='text-xs text-muted mt-2'>Branch Ticket Quota: <strong>" + fixture.allocation + " Tickets</strong></div>";

  if (myReg) {
    var allocPill = myReg.allocated ? 
      "<span style='color:var(--green); font-weight:800;'>✓ TICKET ALLOCATED BY COMMITTEE</span>" : 
      "<span style='color:var(--safc-gold); font-weight:800;'>⏳ Interest Registered (Awaiting Club Allocation)</span>";

    html += 
      "<div style='background:#1e293b; padding:8px 10px; border-radius:6px; margin:10px 0; font-size:11px;'>" +
        "<div>Status: " + allocPill + "</div>" +
        "<div style='color:#cbd5e1; margin-top:4px;'>Party: " + myReg.party.join(", ") + "</div>" +
      "</div>" +
      "<button class='btn btn-outline btn-sm' style='width:100%; color:#ef4444; border-color:#ef4444;' onclick='window.withdrawAwayInterest(\"" + fixture.id + "\")'>Withdraw Expression of Interest</button>";
  } else {
    var lead = getCurrentUserRecord();
    var myFriends = appState.friendsAndFamily.filter(function(f) { return f.owner === appState.currentUser.name && f.status === "approved"; });

    html += 
      "<div style='margin-top:10px;'>" +
        "<label class='form-label'>Traveling Party (Friends & Family)</label>" +
        "<div style='background:#1e293b; padding:6px 8px; border-radius:6px; margin-bottom:6px; font-size:11px;'>" +
          "<input type='checkbox' checked disabled /> <strong>" + lead.name + "</strong> (" + lead.category + " - Lead)" +
        "</div>";

    myFriends.forEach(function(f) {
      html += 
        "<div style='background:#1e293b; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;'>" +
          "<input type='checkbox' class='away-party-member-cb' data-name='" + f.targetName + "' data-type='" + f.type + "' /> " +
          "<strong>" + f.targetName + "</strong> (" + f.type + " - " + f.relation + ")" +
        "</div>";
    });

    html += 
        "<button class='btn btn-red btn-sm mt-2' style='width:100%;' onclick='window.registerAwayInterest(\"" + fixture.id + "\")'>Register Expression of Interest</button>" +
      "</div>";
  }

  card.innerHTML = html;
}

window.registerAwayInterest = function(fixtureId) {
  if (!verifyMembershipAccess("apply for away match tickets")) return;

  var party = [appState.currentUser.name + " (Adult)"];
  document.querySelectorAll(".away-party-member-cb:checked").forEach(function(cb) {
    party.push(cb.getAttribute("data-name") + " (" + cb.getAttribute("data-type") + ")");
  });

  var newReg = {
    fixtureId: fixtureId,
    memberName: appState.currentUser.name,
    party: party,
    allocated: false
  };

  appState.awayRegistrations.push(newReg);
  saveState();
  renderMemberAwayView();

  if (sbClient) {
    sbClient.from("away_registrations").insert([{
      fixture_id: newReg.fixtureId,
      member_name: newReg.memberName,
      party: newReg.party,
      allocated: false
    }]).then(function() {});
  }

  alert("✓ Expression of Interest registered for party of " + party.length + ".");
};

window.withdrawAwayInterest = function(fixtureId) {
  var idx = appState.awayRegistrations.findIndex(function(r) {
    return r.fixtureId === fixtureId && r.memberName === appState.currentUser.name;
  });
  if (idx !== -1) {
    var memberName = appState.currentUser.name;
    appState.awayRegistrations.splice(idx, 1);
    saveState();
    renderMemberAwayView();

    if (sbClient) {
      sbClient.from("away_registrations")
        .delete()
        .eq("fixture_id", fixtureId)
        .eq("member_name", memberName)
        .then(function() {});
    }

    alert("✓ Expression of Interest withdrawn.");
  }
};

// --- 3. FUNDRAISER (FOOTBALL CARD & BONUS BALL) ---
function calculateCardFinancials() {
  var activeClubs = appState.cardConfig.activeClubs || [];
  var totalSquares = activeClubs.length;
  var soldCount = 0;
  activeClubs.forEach(function(c) { if (appState.cardClaims[c]) soldCount++; });

  var grossPot = soldCount * appState.cardConfig.pricePerSquare;
  var winnerPrize = 0;

  if (appState.cardConfig.prizeMode === "percentage") {
    winnerPrize = grossPot * (appState.cardConfig.prizePct / 100);
  } else {
    winnerPrize = soldCount < totalSquares ? appState.cardConfig.prizeFixed * (soldCount / totalSquares) : appState.cardConfig.prizeFixed;
  }
  var branchProfit = grossPot - winnerPrize;
  return { totalSquares: totalSquares, soldCount: soldCount, grossPot: grossPot, winnerPrize: winnerPrize, branchProfit: branchProfit };
}

function renderFootballCard() {
  var grid = document.getElementById("football-grid");
  if (!grid) return;
  grid.innerHTML = "";

  var activeClubs = appState.cardConfig.activeClubs || [];
  var fin = calculateCardFinancials();

  activeClubs.forEach(function(team) {
    var cell = document.createElement("div");
    cell.className = "grid-cell";
    var owner = appState.cardClaims[team];
    if (owner) {
      cell.className += " claimed";
      cell.innerHTML = "<div>" + team + "</div><div class='cell-owner'>" + owner + "</div>";
    } else {
      cell.innerHTML = "<div>" + team + "</div><div style='font-size:9px; color:#94A3B8;'>£" + appState.cardConfig.pricePerSquare.toFixed(2) + "</div>";
      cell.onclick = function() { window.promptCardClaim(team); };
    }
    grid.appendChild(cell);
  });

  var teamsCountLabel = document.getElementById("card-teams-count-label");
  var priceLabel = document.getElementById("card-price-label");
  var prizeLabel = document.getElementById("card-prize-label");
  var soldSummary = document.getElementById("card-sold-summary");

  if (teamsCountLabel) teamsCountLabel.textContent = "⚽ " + fin.totalSquares + "-Team Football Card";
  if (priceLabel) priceLabel.textContent = "£" + appState.cardConfig.pricePerSquare.toFixed(2) + "/sq";
  if (prizeLabel) prizeLabel.textContent = "£" + fin.winnerPrize.toFixed(2) + " Prize";
  if (soldSummary) soldSummary.textContent = fin.soldCount + " of " + fin.totalSquares + " Sold";
}

window.promptCardClaim = function(team) {
  var user = getCurrentUserRecord();
  if (user.category === "Child") {
    alert("🛡️ JUNIOR ACCOUNT RESTRICTION:\n\nMembers under 18 cannot purchase football card entries directly.\n\nAll fundraiser entries must be bought by your linked adult guardian.");
    return;
  }

  if (!verifyMembershipAccess("play the football card")) return;

  var fee = appState.cardConfig.pricePerSquare;
  if (user.balance < fee) {
    alert("Insufficient balance! You need £" + fee.toFixed(2) + " to buy a square, but your balance is £" + user.balance.toFixed(2) + ".\nPlease top up your wallet.");
    return;
  }

  var fin = calculateCardFinancials();
  window.showConfirmDialog(
    "Claim Football Card Square",
    "<strong>Team:</strong> " + team + "<br><strong>Entry Fee:</strong> £" + fee.toFixed(2) + "<br><strong>Potential Prize:</strong> £" + fin.winnerPrize.toFixed(2) + " Cash Pot<br><br>Confirm purchase from your branch wallet balance?",
    function() {
      user.balance -= fee;
      logForensicTransaction(appState.currentUser.name, "Member", "Branch", "CARD", "Football Card: " + team, fee, 0, fee);
      appState.cardClaims[team] = appState.currentUser.name;
      saveState();
      window.refreshAllViews();
      alert("Square claimed! " + team + " is now registered to " + appState.currentUser.name + ".");
    }
  );
};

function renderBonusRegistry() {
  var grid = document.getElementById("bonus-grid");
  if (!grid) return;
  grid.innerHTML = "";
  for (var i = 1; i <= 59; i++) {
    var num = i.toString();
    var item = appState.bonusRegistry[num] || { owner: null, status: "locked" };
    var cell = document.createElement("div");
    cell.className = "bonus-cell";
    if (item.status === "ballot_open") {
      cell.innerHTML = "<div style='font-weight:800; color:#facc15;'>#" + num + "</div><div style='font-size:7px; color:#facc15;'>OPEN</div>";
    } else if (item.owner === appState.currentUser.name) {
      cell.style.background = "#15803d";
      cell.innerHTML = "<div style='font-weight:800; color:#fff;'>#" + num + "</div><div style='font-size:8px; color:#fff;'>YOU</div>";
    } else {
      cell.innerHTML = "<div style='font-weight:800;'>#" + num + "</div><div style='font-size:8px; color:var(--safc-gold); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:100%;'>" + (item.owner || "Available") + "</div>";
    }
    grid.appendChild(cell);
  }
}

// --- MEMBER PROFILE & IDENTITY PASS ---
function renderProfilePassView() {
  var user = getCurrentUserRecord();
  var cardNameElem = document.getElementById("card-name");
  var cardNoElem = document.getElementById("card-no");
  var avatarImg = document.getElementById("profile-avatar-preview");

  var displayNameText = user.nickname ? user.name + ' ("' + user.nickname + '")' : user.name;
  if (cardNameElem) cardNameElem.textContent = displayNameText;
  if (cardNoElem) cardNoElem.textContent = "Member #" + user.memberNo + " • " + (user.category || "Adult");

  // Populate avatar photo
  if (avatarImg) {
    if (user.photoUrl) {
      avatarImg.src = user.photoUrl;
    } else {
      avatarImg.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";
    }
  }

  // Populate profile input fields
  var nickInput = document.getElementById("profile-edit-nickname");
  var phoneInput = document.getElementById("profile-edit-phone");
  var emNameInput = document.getElementById("profile-edit-emergency-name");
  var emPhoneInput = document.getElementById("profile-edit-emergency-phone");

  if (nickInput) nickInput.value = user.nickname || "";
  if (phoneInput) phoneInput.value = user.phone || "";
  if (emNameInput) emNameInput.value = user.emergencyName || "";
  if (emPhoneInput) emPhoneInput.value = user.emergencyPhone || "";
}

// Handle Photo Upload (Converts image to responsive DataURL)
window.handleProfilePhotoUpload = function(event) {
  var file = event.target.files && event.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert("Please select a photo smaller than 2MB.");
    return;
  }

  var reader = new FileReader();
  reader.onload = function(e) {
    var dataUrl = e.target.result;
    var user = getCurrentUserRecord();
    user.photoUrl = dataUrl;

    var preview = document.getElementById("profile-avatar-preview");
    if (preview) preview.src = dataUrl;

    saveState();
    alert("✓ Profile photo updated!");

    if (sbClient) {
      sbClient.from("members")
        .update({ photo_url: dataUrl })
        .eq("member_no", user.memberNo)
        .then(function(res) {
          if (res.error) console.warn("Cloud photo sync notice:", res.error.message);
        });
    }
  };
  reader.readAsDataURL(file);
};

// Save Profile Details
window.saveMemberProfile = function() {
  var user = getCurrentUserRecord();
  var nickInput = document.getElementById("profile-edit-nickname");
  var phoneInput = document.getElementById("profile-edit-phone");
  var emNameInput = document.getElementById("profile-edit-emergency-name");
  var emPhoneInput = document.getElementById("profile-edit-emergency-phone");

  user.nickname = nickInput ? nickInput.value.trim() : "";
  user.phone = phoneInput ? phoneInput.value.trim() : "";
  user.emergencyName = emNameInput ? emNameInput.value.trim() : "";
  user.emergencyPhone = emPhoneInput ? emPhoneInput.value.trim() : "";

  saveState();
  renderProfilePassView();

  var displayName = document.getElementById("display-name");
  if (displayName) {
    displayName.textContent = user.nickname ? user.name + ' ("' + user.nickname + '")' : user.name;
  }

  if (sbClient) {
    sbClient.from("members")
      .update({
        nickname: user.nickname,
        phone: user.phone,
        emergency_name: user.emergencyName,
        emergency_phone: user.emergencyPhone
      })
      .eq("member_no", user.memberNo)
      .then(function(res) {
        if (res.error) console.warn("Cloud profile sync notice:", res.error.message);
      });
  }

  alert("✓ Member profile details saved successfully.");
};

function renderFriendsFamilyChecklist() {
  var container = document.getElementById("fnf-manager-list");
  if (!container) return;
  container.innerHTML = "";
  
  var myFriends = appState.friendsAndFamily.filter(function(f) { 
    return f.owner === appState.currentUser.name; 
  });

  if (myFriends.length === 0) {
    container.innerHTML = "<div class='text-xs text-muted' style='padding:6px 0;'>No linked friends or family yet. Use the form below to connect family members.</div>";
    return;
  }

  myFriends.forEach(function(f) {
    var row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;";
    row.innerHTML = 
      "<div>" +
        "<strong>" + f.targetName + "</strong> (" + f.relation + ")<br>" +
        "<span style='color:var(--safc-gold); font-size:10px;'>" + f.type + " • " + (f.memberNo || "Member") + "</span>" +
      "</div>" +
      "<div style='display:flex; align-items:center; gap:6px;'>" +
        "<span style='color:var(--green); font-size:10px; font-weight:700;'>✓ Active</span>" +
        "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444; border-color:#ef4444;' onclick='window.unlinkFriendFamily(" + f.id + ")'>Unlink</button>" +
      "</div>";
    container.appendChild(row);
  });
}

window.unlinkFriendFamily = function(linkId) {
  var link = appState.friendsAndFamily.find(function(f) { return f.id === linkId; });
  if (!link) return;

  window.showConfirmDialog(
    "Unlink Connection",
    "Are you sure you want to disconnect from <strong>" + link.targetName + "</strong> (" + link.relation + ")?<br><br>You will no longer be able to book travel or away tickets on their behalf.",
    function() {
      appState.friendsAndFamily = appState.friendsAndFamily.filter(function(f) {
        var isDirect = (f.owner === link.owner && f.targetName === link.targetName);
        var isReciprocal = (f.owner === link.targetName && f.targetName === link.owner);
        return !isDirect && !isReciprocal;
      });
      saveState();
      window.refreshAllViews();
      alert("✓ Connection removed.");
    }
  );
};

window.requestMemberLink = function() {
  var searchInput = document.getElementById("fnf-search-input");
  var relSelect = document.getElementById("fnf-relation-select");
  var targetName = searchInput ? searchInput.value.trim() : "";
  var relation = relSelect ? relSelect.value : "Friend";

  if (!targetName) {
    alert("Please enter a member name or number.");
    return;
  }

  var found = appState.users.find(function(u) {
    return u.name.toLowerCase() === targetName.toLowerCase() || u.memberNo.toLowerCase() === targetName.toLowerCase();
  });

  var finalName = found ? found.name : targetName;
  var finalType = (found && found.category === "Child") || relation === "Child" ? "Child" : "Adult";
  var finalNo = found ? found.memberNo : "COX-" + Math.floor(100 + Math.random() * 900);

  if (finalType === "Child") {
    appState.pendingLinkRequests.push({
      id: Date.now(),
      requester: appState.currentUser.name,
      targetName: finalName,
      relation: relation,
      type: finalType,
      status: "pending_admin"
    });
    alert("🛡️ Safeguarding Verification Submitted:\n\nUnder branch rules, links involving members under 18 must be approved by the Branch Secretary before bookings can be made.");
  } else {
    appState.friendsAndFamily.push({
      id: Date.now(),
      owner: appState.currentUser.name,
      targetName: finalName,
      relation: relation,
      type: finalType,
      memberNo: finalNo,
      status: "approved"
    });
    appState.friendsAndFamily.push({
      id: Date.now() + 1,
      owner: finalName,
      targetName: appState.currentUser.name,
      relation: relation === "Child" ? "Parent" : "Friend",
      type: "Adult",
      memberNo: appState.currentUser.memberNo,
      status: "approved"
    });
    alert("✓ Link established with " + finalName + ".");
  }

  if (searchInput) searchInput.value = "";
  saveState();
  window.refreshAllViews();
};

// --- 5. WALLET STATEMENT & EXPORT ---
window.handleStatementTimeframeChange = function(val) {
  var customBox = document.getElementById("statement-custom-date-box");
  if (customBox) {
    customBox.style.display = (val === "CUSTOM") ? "grid" : "none";
  }
  renderWalletStatement();
};

function renderWalletStatement() {
  var container = document.getElementById("wallet-statement-list");
  var title = document.getElementById("wallet-statement-title");
  if (!container) return;
  container.innerHTML = "";

  var current = appState.currentUser.name;
  if (title) title.textContent = "💳 " + current + "'s Statement";

  var categoryFilter = document.getElementById("filter-statement-category") ? document.getElementById("filter-statement-category").value : "ALL";
  var directionFilter = document.getElementById("filter-statement-direction") ? document.getElementById("filter-statement-direction").value : "ALL";
  var timeFilter = document.getElementById("filter-statement-time") ? document.getElementById("filter-statement-time").value : "ALL";
  var searchKeyword = document.getElementById("filter-statement-search") ? document.getElementById("filter-statement-search").value.toLowerCase().trim() : "";

  var customStartDate = document.getElementById("filter-statement-start-date") ? document.getElementById("filter-statement-start-date").value : "";
  var customEndDate = document.getElementById("filter-statement-end-date") ? document.getElementById("filter-statement-end-date").value : "";

  var now = new Date();
  var myTxns = appState.masterAuditTrail.filter(function(t) {
    var isMyDebit = (t.actor === current && t.debit > 0);
    var isMyCredit = (t.target === current && t.credit > 0);
    if (!isMyDebit && !isMyCredit) return false;

    if (categoryFilter !== "ALL") {
      if (categoryFilter === "BUS" && t.category !== "BUS_BOOKING" && t.category !== "BUS_REFUND") return false;
      if (categoryFilter === "CARD" && t.category !== "CARD" && t.category !== "FOOTBALL_CARD" && t.category !== "CARD_WINNER_PAYOUT") return false;
      if (categoryFilter === "AWAY" && t.category.indexOf("AWAY") === -1) return false;
      if (categoryFilter === "BONUS" && t.category.indexOf("BONUS") === -1) return false;
      if (categoryFilter === "TOPUP" && t.category !== "TOPUP" && t.category !== "MEMBER_TOPUP") return false;
      if (categoryFilter === "SUBS" && t.category !== "SUBS_DUES") return false;
      if (categoryFilter === "WITHDRAWAL") {
        var isWd = (t.category === "CARD_WINNER_PAYOUT" || t.category === "WITHDRAWAL" || t.desc.toLowerCase().indexOf("withdrawal") !== -1 || t.desc.toLowerCase().indexOf("payout") !== -1);
        if (!isWd) return false;
      }
      if (categoryFilter === "PRIZE" && t.category !== "CARD_WINNER_PAYOUT") return false;
    }

    if (directionFilter === "IN" && !isMyCredit) return false;
    if (directionFilter === "OUT" && !isMyDebit) return false;

    if (timeFilter !== "ALL") {
      var txnDate = new Date(t.timestamp.replace(" ", "T"));
      var diffDays = (now - txnDate) / (1000 * 60 * 60 * 24);
      if (timeFilter === "7D" && diffDays > 7) return false;
      if (timeFilter === "30D" && diffDays > 30) return false;
      if (timeFilter === "YEAR" && diffDays > 365) return false;
      if (timeFilter === "CUSTOM") {
        var txnYMD = t.timestamp.substring(0, 10);
        if (customStartDate && txnYMD < customStartDate) return false;
        if (customEndDate && txnYMD > customEndDate) return false;
      }
    }

    if (searchKeyword) {
      var matchText = (t.desc + " " + t.category + " " + t.txnId).toLowerCase();
      if (matchText.indexOf(searchKeyword) === -1) return false;
    }
    return true;
  });

  var filteredIn = 0;
  var filteredOut = 0;
  myTxns.forEach(function(t) {
    if (t.target === current && t.credit > 0) filteredIn += t.credit;
    if (t.actor === current && t.debit > 0) filteredOut += t.debit;
  });
  var netFlow = filteredIn - filteredOut;

  var summaryBox = document.getElementById("statement-filtered-summary");
  if (summaryBox) {
    summaryBox.innerHTML = 
      "<span>In: <strong style='color:var(--green);'>+£" + filteredIn.toFixed(2) + "</strong></span>" +
      "<span>Out: <strong style='color:#ef4444;'>-£" + filteredOut.toFixed(2) + "</strong></span>" +
      "<span>Net: <strong style='color:" + (netFlow >= 0 ? "var(--green)" : "#ef4444") + ";'>" + (netFlow >= 0 ? "+£" : "-£") + Math.abs(netFlow).toFixed(2) + "</strong></span>";
  }

  if (myTxns.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px; padding:10px 0; text-align:center;'>No transactions match your active filter criteria.</div>";
    return;
  }

  myTxns.slice(0, 25).forEach(function(item) {
    var row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding:8px 0; font-size:12px;";
    var isCredit = (item.target === current && item.credit > 0);
    var color = isCredit ? "var(--green)" : "#ef4444";
    var prefix = isCredit ? "+£" : "-£";
    var amt = isCredit ? item.credit : item.debit;
    row.innerHTML = 
      "<div><strong>" + item.desc + "</strong><br><span style='font-size:10px; color:#94a3b8;'>" + item.timestamp.substring(0, 16) + " • " + item.txnId + "</span></div>" +
      "<div style='font-weight:700; color:" + color + ";'>" + prefix + amt.toFixed(2) + "</div>";
    container.appendChild(row);
  });
}

window.exportMyStatementCSV = function() {
  var current = appState.currentUser.name;
  var myTxns = appState.masterAuditTrail.filter(function(t) {
    return t.actor === current || t.target === current;
  });

  var csv = "Txn ID,Timestamp,Category,Description,Debit (Out),Credit (In),Balance After\n";
  myTxns.forEach(function(t) {
    var debitStr = (t.actor === current && t.debit > 0) ? "£" + t.debit.toFixed(2) : "£0.00";
    var creditStr = (t.target === current && t.credit > 0) ? "£" + t.credit.toFixed(2) : "£0.00";
    csv += '"' + t.txnId + '","' + t.timestamp + '","' + t.category + '","' + t.desc.replace(/"/g, '""') + '","' + debitStr + '","' + creditStr + '","£' + (t.balanceAfter || 0).toFixed(2) + '"\n';
  });

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", current.replace(/\s+/g, "_") + "_Branch_Statement.csv");
  a.click();
};

// --- 6. COMMS & CHAT HUB ---
window.switchCommsSubTab = function(subId) {
  document.getElementById("comms-sub-bus").style.display = (subId === "bus") ? "block" : "none";
  document.getElementById("comms-sub-dm").style.display = (subId === "dm") ? "block" : "none";
  document.getElementById("comms-sub-desk").style.display = (subId === "desk") ? "block" : "none";

  document.getElementById("btn-sub-bus").className = (subId === "bus") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
  document.getElementById("btn-sub-dm").className = (subId === "dm") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
  document.getElementById("btn-sub-desk").className = (subId === "desk") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
};

function renderCommsTabs() {
  renderMatchdayBusChat();
  renderDirectMessagesView();
  renderCommitteeDeskView();
}

function renderMatchdayBusChat() {
  var container = document.getElementById("bus-chat-messages");
  if (!container) return;
  container.innerHTML = "";
  
  appState.matchdayChat.forEach(function(msg) {
    var isMe = msg.sender === appState.currentUser.name;
    var bubble = document.createElement("div");
    bubble.style.cssText = "margin-bottom:8px; display:flex; flex-direction:column; align-items:" + (isMe ? "flex-end" : "flex-start") + ";";
    bubble.innerHTML = 
      "<div style='font-size:9px; color:#94a3b8; margin-bottom:2px;'>" + msg.sender + " • " + msg.time + "</div>" +
      "<div style='background:" + (isMe ? "var(--safc-red)" : "#1e293b") + "; color:#fff; padding:6px 10px; border-radius:10px; font-size:12px; max-width:80%; line-height:1.4;'>" + msg.text + "</div>";
    container.appendChild(bubble);
  });
  container.scrollTop = container.scrollHeight;

  var current = appState.currentUser.name;
  var isMuted = appState.moderation.mutedMembers.indexOf(current) !== -1;
  var isRevoked = appState.moderation.revokedMembers.indexOf(current) !== -1;

  var input = document.getElementById("bus-chat-input");
  var sendBtn = document.getElementById("bus-chat-send-btn");
  var statusNotice = document.getElementById("bus-chat-status-notice");

  if (isRevoked) {
    if (input) input.disabled = true; 
    if (sendBtn) sendBtn.disabled = true;
    if (statusNotice) statusNotice.innerHTML = "<span style='color:#ef4444; font-weight:800;'>⛔ Messaging privileges revoked across branch. Subject to Committee Quorum Vote.</span>";
  } else if (isMuted) {
    if (input) input.disabled = true; 
    if (sendBtn) sendBtn.disabled = true;
    if (statusNotice) statusNotice.innerHTML = "<span style='color:#facc15; font-weight:800;'>🚫 Chat Muted for language/aggression. Incident forwarded for Committee Review.</span>";
  } else {
    if (input) input.disabled = false; 
    if (sendBtn) sendBtn.disabled = false;
    if (statusNotice) statusNotice.innerHTML = "<span style='color:#94a3b8; font-size:10px;'>Active Safeguarding Engine: Profanity, northern slang & aggression moderated.</span>";
  }
}

window.sendMatchdayBusMessage = function() {
  var input = document.getElementById("bus-chat-input");
  var text = input ? input.value.trim() : "";
  if (!text) return;
  var current = appState.currentUser.name;

  var analysis = detectAbuseOrProfanity(text);

  if (analysis.flagged) {
    if (!appState.moderation.strikes[current]) appState.moderation.strikes[current] = 0;
    appState.moderation.strikes[current]++;
    var strikeCount = appState.moderation.strikes[current];

    var fullHistory = appState.matchdayChat.map(function(m) {
      return m.sender + " (" + m.time + "): " + m.text;
    });
    fullHistory.push(current + " (" + new Date().toTimeString().substring(0, 5) + "): " + text + " [FLAGGED - BAN TRIGGER]");
    input.value = "";

    if (strikeCount === 1) {
      alert("⚠️ SAFEGUARDING WARNING (STRIKE 1):\n" + analysis.reason + "\n\nProfanity and aggressive talk are strictly prohibited around juniors on branch travel.\n\nNext infraction will immediately mute your account.");
      return;
    } else if (strikeCount === 2) {
      appState.moderation.mutedMembers.push(current);
      appState.moderation.incidents.unshift({
        id: "INC-" + Date.now(),
        member: current,
        timestamp: new Date().toISOString().substring(0, 16),
        status: "active_ban",
        reason: "Repeat infraction (Strike 2): " + analysis.reason,
        offendingText: text,
        transcriptContext: fullHistory,
        internalDiscussion: [],
        votes: {}
      });
      saveState();
      renderMatchdayBusChat();
      updateAdminDrawerBadge();
      alert("🚫 CHAT MUTED (STRIKE 2):\n" + analysis.reason + "\n\nYou have been muted from Matchday Chat. The transcript has been forwarded to the Committee Review Board.");
      return;
    } else {
      appState.moderation.revokedMembers.push(current);
      appState.moderation.incidents.unshift({
        id: "INC-" + Date.now(),
        member: current,
        timestamp: new Date().toISOString().substring(0, 16),
        status: "active_ban",
        reason: "Severe Infraction (Strike 3): " + analysis.reason,
        offendingText: text,
        transcriptContext: fullHistory,
        internalDiscussion: [],
        votes: {}
      });
      saveState();
      renderMatchdayBusChat();
      updateAdminDrawerBadge();
      alert("⛔ PRIVILEGES REVOKED (STRIKE 3):\nAll messaging privileges revoked. Subject to formal Committee Board Deliberation.");
      return;
    }
  }

  var newMsg = {
    id: Date.now(),
    sender: current,
    time: new Date().toTimeString().substring(0, 5),
    text: text
  };

  appState.matchdayChat.push(newMsg);
  input.value = "";
  saveState();
  renderMatchdayBusChat();
  updateCommsBadge();

  if (sbClient) {
    sbClient.from("matchday_chat").insert([newMsg]).then(function() {});
  }
};

function renderDirectMessagesView() {
  var container = document.getElementById("dm-threads-container");
  if (!container) return;
  container.innerHTML = "";
  var current = appState.currentUser.name;
  var curRecord = getCurrentUserRecord();

  if (curRecord.category === "Child") {
    container.innerHTML = "<div style='color:#ef4444; background:#1e0508; padding:12px; border-radius:8px; font-size:12px;'>🛡️ <strong>Safeguarding Rule:</strong> Direct messaging is strictly disabled for members under 18. All queries must go through your verified parent.</div>";
    return;
  }

  container.innerHTML = 
    "<p style='font-size:11px; color:#94a3b8; margin-bottom:10px;'>Private member messaging. Direct contact with minors is locked.</p>" +
    "<div style='display:flex; gap:6px; margin-bottom:12px;'>" +
      "<select id='dm-recipient-select' class='form-select' style='flex:1; padding:6px; font-size:11px;'></select>" +
      "<button class='btn btn-red btn-sm' onclick='window.startDirectMessage()'>Start DM</button>" +
    "</div>" +
    "<div id='active-dm-feed' style='background:#0f172a; padding:10px; border-radius:8px; min-height:60px; font-size:11px; color:#94a3b8;'>No active DM selected.</div>";

  var sel = document.getElementById("dm-recipient-select");
  appState.users.forEach(function(u) {
    if (u.name !== current && u.hasAppAccount) {
      var opt = document.createElement("option");
      opt.value = u.name;
      opt.textContent = u.name + (u.category === "Child" ? " (Minor - BLOCKED)" : " (Adult)");
      sel.appendChild(opt);
    }
  });
}

window.startDirectMessage = function() {
  var recipient = document.getElementById("dm-recipient-select").value;
  var targetUser = appState.users.find(function(u) { return u.name === recipient; });
  if (targetUser && targetUser.category === "Child") {
    alert("🛡️ SAFEGUARDING VIOLATION BLOCKED:\nDirect messaging with members under 18 is prohibited.\n\nAll contact regarding " + recipient + " must be conducted via their linked parent.");
    return;
  }
  document.getElementById("active-dm-feed").innerHTML = "<strong>Chat with " + recipient + ":</strong><br><span style='color:var(--green);'>Private connection open.</span>";
};

function renderCommitteeDeskView() {
  var container = document.getElementById("helpdesk-threads-list");
  if (!container) return;
  container.innerHTML = "";
  var current = appState.currentUser.name;
  var isAdmin = appState.currentUser.role === "admin";

  var myTickets = appState.helpdeskTickets.filter(function(t) {
    return isAdmin ? true : t.member.indexOf(current) !== -1;
  });

  if (myTickets.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px;'>No tickets in mailbox.</div>";
    return;
  }

  var tracker = appState.readTracker[current] || { readMsgIds: [], readNoteIds: [] };

  myTickets.forEach(function(t) {
    var unreadNotes = (t.internalNotes || []).filter(function(n) {
      return n.author !== current && (tracker.readNoteIds || []).indexOf(n.id) === -1;
    }).length;

    var unreadMsgs = t.messages.filter(function(m) {
      return m.sender !== current && m.sender.indexOf(current) === -1 && (tracker.readMsgIds || []).indexOf(m.id) === -1;
    }).length;

    var card = document.createElement("div");
    card.style.cssText = "background:#0f172a; border:1px solid #334155; padding:10px; border-radius:8px; margin-bottom:8px; font-size:11px; border-left:3px solid " + (t.escalatedToGraham ? "var(--safc-gold)" : "var(--green)") + ";";
    
    var badgeHtml = "";
    if (isAdmin && unreadNotes > 0) badgeHtml += "<span class='badge-gold' style='margin-left:4px;'>🟡 " + unreadNotes + " Internal</span>";
    if (unreadMsgs > 0) badgeHtml += "<span class='badge-red' style='margin-left:4px;'>🔴 " + unreadMsgs + " New</span>";

    card.innerHTML = 
      "<div style='display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;'>" +
        "<div><strong>#" + t.id + " • " + t.topic + " (" + t.member + ")</strong>" + badgeHtml + "</div>" +
        "<span style='color:" + (t.escalatedToGraham ? "var(--safc-gold)" : "var(--green)") + "; font-size:10px; font-weight:700;'>" + (t.escalatedToGraham ? "Escalated" : "Open") + "</span>" +
      "</div>" +
      "<div style='color:#94a3b8; font-size:10px; margin-bottom:6px;'>History: " + t.messages.length + " message(s)" + (isAdmin ? " • " + (t.internalNotes || []).length + " internal note(s)" : "") + "</div>" +
      "<button class='btn btn-outline btn-sm' style='padding:4px 8px; font-size:10px; width:100%;' onclick='window.openMailboxThreadModal(\"" + t.id + "\")'>📬 Open Full Mailbox Thread & History</button>";
    container.appendChild(card);
  });
}

window.openMailboxThreadModal = function(ticketId) {
  var ticket = appState.helpdeskTickets.find(function(t) { return t.id === ticketId; });
  if (!ticket) return;

  var current = appState.currentUser.name;
  var isAdmin = appState.currentUser.role === "admin";

  if (!appState.readTracker[current]) appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  var tracker = appState.readTracker[current];
  if (!tracker.readMsgIds) tracker.readMsgIds = [];
  if (!tracker.readNoteIds) tracker.readNoteIds = [];

  ticket.messages.forEach(function(m) {
    if (tracker.readMsgIds.indexOf(m.id) === -1) tracker.readMsgIds.push(m.id);
  });
  if (isAdmin && ticket.internalNotes) {
    ticket.internalNotes.forEach(function(n) {
      if (tracker.readNoteIds.indexOf(n.id) === -1) tracker.readNoteIds.push(n.id);
    });
  }

  saveState();
  updateCommsBadge();

  var modal = document.getElementById("modal-ticket-thread");
  var title = document.getElementById("mailbox-thread-title");
  var body = document.getElementById("mailbox-thread-body");

  title.innerHTML = "Mailbox: #" + ticket.id + " • " + ticket.topic + " <span style='font-size:11px; color:var(--text-muted);'>(" + ticket.member + ")</span>";

  var html = "<div style='font-size:11px; font-weight:800; color:var(--safc-gold); margin-bottom:6px;'>💬 Public Conversation History:</div>";
  html += "<div style='background:#0f172a; padding:8px; border-radius:8px; margin-bottom:12px; max-height:160px; overflow-y:auto;'>";
  ticket.messages.forEach(function(m) {
    var isCommittee = m.sender.indexOf("Committee") !== -1 || m.sender.indexOf("Graham") !== -1;
    html += 
      "<div style='margin-bottom:8px; background:" + (isCommittee ? "#1e293b" : "#172554") + "; padding:6px 10px; border-radius:6px; font-size:11px; border-left:3px solid " + (isCommittee ? "var(--safc-gold)" : "#3b82f6") + ";'>" +
        "<div style='display:flex; justify-content:space-between; font-size:9px; color:#94a3b8; margin-bottom:2px;'>" +
          "<strong>" + m.sender + "</strong><span>" + m.time + "</span>" +
        "</div>" +
        "<div>" + m.text + "</div>" +
      "</div>";
  });
  html += "</div>";

  if (isAdmin) {
    html += "<div style='font-size:11px; font-weight:800; color:var(--safc-gold); margin-bottom:6px;'>🔒 Internal Committee Deliberation (Private):</div>";
    html += "<div style='background:#1e1b4b; border:1px solid #4338ca; padding:8px; border-radius:8px; margin-bottom:12px; max-height:160px; overflow-y:auto;'>";
    if (!ticket.internalNotes || ticket.internalNotes.length === 0) {
      html += "<div style='color:#94a3b8; font-size:10px;'>No internal committee notes recorded yet.</div>";
    } else {
      ticket.internalNotes.forEach(function(n) {
        html += 
          "<div style='margin-bottom:6px; background:#0f172a; padding:6px 8px; border-radius:6px; font-size:10px; border-left:3px solid var(--safc-gold);'>" +
            "<div style='display:flex; justify-content:space-between; font-weight:800; color:var(--safc-gold); margin-bottom:2px;'>" +
              "<span>" + n.author + "</span><span>" + n.time + "</span>" +
            "</div>" +
            "<div style='color:#f8fafc;'>" + n.text + "</div>" +
          "</div>";
      });
    }
    html += "</div>";

    html += 
      "<div style='background:#0f172a; border:1px dashed var(--safc-gold); padding:8px; border-radius:8px; margin-bottom:12px;'>" +
        "<label style='display:block; font-size:10px; font-weight:700; color:var(--safc-gold); margin-bottom:4px;'>Post Internal Committee Note (Alerts Colleagues in Gold):</label>" +
        "<div style='display:flex; gap:4px;'>" +
          "<input type='text' id='internal-note-input' class='form-input' placeholder='Reply internally to Graham/Dave/Sarah...' style='padding:6px; font-size:11px;' />" +
          "<button class='btn btn-gold btn-sm' style='padding:4px 10px;' onclick='window.submitInternalNote(\"" + ticket.id + "\")'>Add Note</button>" +
        "</div>" +
      "</div>";
  }

  html += 
    "<div style='background:#0f172a; padding:8px; border-radius:8px;'>" +
      "<label style='display:block; font-size:10px; font-weight:700; color:var(--text-muted); margin-bottom:4px;'>" + (isAdmin ? "Reply to Member (Public):" : "Send Follow-up:") + "</label>" +
      "<div style='display:flex; gap:4px;'>" +
        "<input type='text' id='public-reply-input' class='form-input' placeholder='Type response...' style='padding:6px; font-size:11px;' />" +
        "<button class='btn btn-red btn-sm' style='padding:4px 10px;' onclick='window.submitPublicReply(\"" + ticket.id + "\")'>Send</button>" +
      "</div>" +
    "</div>";

  body.innerHTML = html;
  modal.style.display = "flex";
};

window.closeMailboxThreadModal = function() {
  document.getElementById("modal-ticket-thread").style.display = "none";
  renderCommitteeDeskView();
  updateCommsBadge();
};

window.submitInternalNote = function(ticketId) {
  var input = document.getElementById("internal-note-input");
  var text = input ? input.value.trim() : "";
  if (!text) return;

  var ticket = appState.helpdeskTickets.find(function(t) { return t.id === ticketId; });
  if (!ticket) return;
  if (!ticket.internalNotes) ticket.internalNotes = [];

  var current = appState.currentUser.name;
  var newNoteId = "n-" + Date.now();

  ticket.internalNotes.push({ id: newNoteId, author: current, time: new Date().toTimeString().substring(0, 5), text: text });

  if (!appState.readTracker[current]) appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  appState.readTracker[current].readNoteIds.push(newNoteId);

  saveState();
  window.openMailboxThreadModal(ticketId);
  updateCommsBadge();
  alert("Internal note added. Gold notification sent to other committee members.");
};

window.submitPublicReply = function(ticketId) {
  var input = document.getElementById("public-reply-input");
  var text = input ? input.value.trim() : "";
  if (!text) return;

  var ticket = appState.helpdeskTickets.find(function(t) { return t.id === ticketId; });
  if (!ticket) return;

  var current = appState.currentUser.name;
  var isAdmin = appState.currentUser.role === "admin";
  var newMsgId = "m-" + Date.now();
  var senderName = isAdmin ? "Coxhoe Committee (Signed: " + current + ")" : current;

  ticket.messages.push({ id: newMsgId, sender: senderName, time: new Date().toTimeString().substring(0, 5), text: text });

  if (!appState.readTracker[current]) appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  appState.readTracker[current].readMsgIds.push(newMsgId);

  saveState();
  window.openMailboxThreadModal(ticketId);
  updateCommsBadge();
  alert("Message posted to conversation thread.");
};

window.submitMemberHelpdeskTicket = function() {
  var topic = document.getElementById("helpdesk-topic").value;
  var text = document.getElementById("helpdesk-query").value.trim();
  if (!text) return;
  var current = appState.currentUser.name;
  var curRecord = getCurrentUserRecord();

  var effectiveMember = current;
  if (curRecord.category === "Child") {
    var parentLink = appState.friendsAndFamily.find(function(f) { return f.owner === current && f.relation === "Parent"; });
    var parentName = parentLink ? parentLink.targetName : "Parent of " + current;
    effectiveMember = current + " (Via Parent: " + parentName + ")";
  }

  var newId = "TICK-" + Math.floor(100 + Math.random() * 900);
  var newMsgId = "m-" + Date.now();

  appState.helpdeskTickets.unshift({
    id: newId,
    member: effectiveMember,
    topic: topic,
    status: "open",
    escalatedToGraham: false,
    created: new Date().toISOString().substring(0, 16),
    messages: [{ id: newMsgId, sender: current, time: new Date().toTimeString().substring(0, 5), text: text }],
    internalNotes: []
  });

  if (!appState.readTracker[current]) appState.readTracker[current] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  appState.readTracker[current].readMsgIds.push(newMsgId);

  document.getElementById("helpdesk-query").value = "";
  saveState();
  renderCommitteeDeskView();
  updateCommsBadge();
  alert("Ticket #" + newId + " submitted to Shared Committee Desk.");
};

// ==========================================
// END OF PART 3 OF 4
// ==========================================

// ========================================================
// COXHOE BRANCH SAFC - APP.JS (PART 4 OF 4)
// Committee Secretary HUD (All Panes), Modals & Bootloader
// ========================================================

// --- COMPLETE DROPDOWN ADMIN ENGINE ---
var activeAdminTool = "buses";

window.openAdminDrawer = function() {
  var drawer = document.getElementById("admin-drawer");
  if (drawer) {
    drawer.style.display = "block";
    drawer.classList.remove("hidden");
  }
  window.switchAdminTool(activeAdminTool);
};

window.closeAdminDrawer = function() {
  var drawer = document.getElementById("admin-drawer");
  if (drawer) {
    drawer.style.display = "none";
    drawer.classList.add("hidden");
  }
};

window.switchAdminTool = function(toolId) {
  activeAdminTool = toolId;

  var panes = document.querySelectorAll(".admin-pane");
  panes.forEach(function(pane) {
    pane.style.display = "none";
    pane.classList.add("hidden");
  });

  var selected = document.getElementById("admin-pane-" + toolId);
  if (selected) {
    selected.style.display = "block";
    selected.classList.remove("hidden");
  }

  var selectElem = document.getElementById("admin-tool-select");
  if (selectElem && selectElem.value !== toolId) {
    selectElem.value = toolId;
  }

  renderAdminActivePane(toolId);
};

function renderAdminActivePane(toolId) {
  switch (toolId) {
    case "buses": window.renderAdminBusesTool(); break;
    case "subs": renderAdminSubs(); break;
    case "approvals": renderAdminApprovals(); break;
    case "treasury": renderAdminTreasury(); break;
    case "awaytickets": renderAdminAwayFixture(); break;
    case "news": renderAdminNews(); break;
    case "footballcard": renderAdminFootballCard(); break;
    case "disciplinary": renderAdminDisciplinary(); break;
  }
}

function renderAdminDrawer() {
  window.switchAdminTool(activeAdminTool);
  updateAdminDrawerBadge();
}

// --------------------------------------------------------
// PANE 1: CONSOLIDATED BUSES SUITE
// --------------------------------------------------------
window.renderAdminBusesTool = function() {
  var matchSelect = document.getElementById("admin-bus-match-select");
  var busesContainer = document.getElementById("admin-match-buses-container");
  if (!matchSelect || !busesContainer) return;

  var currentVal = matchSelect.value || appState.selectedHomeMatchId;
  matchSelect.innerHTML = "";
  appState.homeMatches.forEach(function(m) {
    var opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = "Sunderland vs " + m.opponent + " (" + m.date + ")";
    if (m.id === currentVal) opt.selected = true;
    matchSelect.appendChild(opt);
  });
  if (!matchSelect.value && appState.homeMatches.length > 0) {
    matchSelect.value = appState.homeMatches[0].id;
  }

  appState.selectedHomeMatchId = matchSelect.value;
  var selectedMatch = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; }) || appState.homeMatches[0];

  busesContainer.innerHTML = "";
  if (!selectedMatch.buses || selectedMatch.buses.length === 0) {
    selectedMatch.buses = [{
      busId: 1,
      title: "Bus 1 (Main Village Route)",
      subtitle: "Official Branch Travel • Stadium of Light",
      capacity: 53,
      adultFare: 12.00,
      juniorFare: 8.00,
      isFreeBus: false,
      stops: JSON.parse(JSON.stringify(DEFAULT_STOPS))
    }];
  }

  selectedMatch.buses.forEach(function(bus, idx) {
    var card = document.createElement("div");
    card.className = "admin-card mt-2";
    
    var stopsHtml = "";
    var currentStops = bus.stops || DEFAULT_STOPS;
    currentStops.forEach(function(s, sIdx) {
      stopsHtml += 
        "<div style='display:flex; gap:6px; margin-bottom:6px;'>" +
          "<input type='text' class='form-input' style='flex:2; padding:4px 6px; font-size:11px;' value='" + s.name + "' onchange='window.updateBusStopField(\"" + selectedMatch.id + "\", " + idx + ", " + sIdx + ", \"name\", this.value)'>" +
          "<input type='text' class='form-input' style='flex:1; padding:4px 6px; font-size:11px;' value='" + s.time + "' onchange='window.updateBusStopField(\"" + selectedMatch.id + "\", " + idx + ", " + sIdx + ", \"time\", this.value)'>" +
          "<button class='btn btn-outline btn-sm' style='padding:2px 8px; color:#ef4444; border-color:#ef4444;' onclick='window.deleteStopFromBus(\"" + selectedMatch.id + "\", " + idx + ", " + sIdx + ")'>✕</button>" +
        "</div>";
    });

    card.innerHTML = 
      "<div class='flex-between'>" +
        "<strong style='color:var(--safc-gold); font-size:12px;'>🚌 Coach #" + (idx + 1) + ": " + bus.title + "</strong>" +
        (selectedMatch.buses.length > 1 ? 
          "<button class='btn btn-outline btn-sm' style='padding:2px 6px; font-size:9px; color:#ef4444; border-color:#ef4444;' onclick='window.adminRemoveBus(\"" + selectedMatch.id + "\", " + idx + ")'>Remove Bus</button>" : "") +
      "</div>" +
      "<div class='form-group mt-2'>" +
        "<label class='form-label'>Bus Name (Title)</label>" +
        "<input type='text' class='form-input' value='" + bus.title + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"title\", this.value)' />" +
      "</div>" +
      "<div class='form-group'>" +
        "<label class='form-label'>Subtitle / Route Note</label>" +
        "<input type='text' class='form-input' value='" + bus.subtitle + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"subtitle\", this.value)' />" +
      "</div>" +
      "<div style='display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:8px;'>" +
        "<div>" +
          "<label class='form-label'>Capacity</label>" +
          "<input type='number' class='form-input' min='10' max='85' value='" + bus.capacity + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"capacity\", parseInt(this.value)||53)' />" +
        "</div>" +
        "<div>" +
          "<label class='form-label'>Adult Fare (£)</label>" +
          "<input type='number' class='form-input' step='0.50' value='" + bus.adultFare + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"adultFare\", parseFloat(this.value)||12)' />" +
        "</div>" +
        "<div>" +
          "<label class='form-label'>Junior Fare (£)</label>" +
          "<input type='number' class='form-input' step='0.50' value='" + bus.juniorFare + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"juniorFare\", parseFloat(this.value)||8)' />" +
        "</div>" +
      "</div>" +
      "<div style='background:#1e293b; padding:6px 8px; border-radius:6px; font-size:11px; margin-bottom:10px;'>" +
        "<label style='display:flex; align-items:center; gap:6px; font-weight:700; color:var(--safc-gold); cursor:pointer;'>" +
          "<input type='checkbox' " + (bus.isFreeBus ? "checked" : "") + " onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"isFreeBus\", this.checked)' /> " +
          "Enable Free Bus (Branch Sponsored)" +
        "</label>" +
      "</div>" +
      "<div style='border-top:1px solid #334155; padding-top:8px;'>" +
        "<div class='flex-between mb-2'>" +
          "<label class='form-label' style='margin-bottom:0;'>Timetable Stops for " + bus.title + "</label>" +
          "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:9px;' onclick='window.addStopToBus(\"" + selectedMatch.id + "\", " + idx + ")'>+ Add Stop</button>" +
        "</div>" +
        "<div>" + stopsHtml + "</div>" +
      "</div>";

    busesContainer.appendChild(card);
  });

  renderAdminAllocationPreviewForMatch(selectedMatch);
  renderAdminManifestForMatch(selectedMatch);
};

window.updateBusField = function(matchId, busIdx, field, val) {
  var match = appState.homeMatches.find(function(m) { return m.id === matchId; });
  if (match && match.buses && match.buses[busIdx]) {
    match.buses[busIdx][field] = val;
    saveState();
    renderBusBookingView();
    renderHUDView();
  }
};

window.updateBusStopField = function(matchId, busIdx, stopIdx, field, val) {
  var match = appState.homeMatches.find(function(m) { return m.id === matchId; });
  if (match && match.buses && match.buses[busIdx] && match.buses[busIdx].stops) {
    match.buses[busIdx].stops[stopIdx][field] = val;
    saveState();
    renderBusBookingView();
  }
};

window.addStopToBus = function(matchId, busIdx) {
  var match = appState.homeMatches.find(function(m) { return m.id === matchId; });
  if (match && match.buses && match.buses[busIdx]) {
    if (!match.buses[busIdx].stops) match.buses[busIdx].stops = JSON.parse(JSON.stringify(DEFAULT_STOPS));
    match.buses[busIdx].stops.push({ id: Date.now(), name: "New Village Pickup", time: "12:30" });
    saveState();
    window.renderAdminBusesTool();
    renderBusBookingView();
  }
};

window.deleteStopFromBus = function(matchId, busIdx, stopIdx) {
  var match = appState.homeMatches.find(function(m) { return m.id === matchId; });
  if (match && match.buses && match.buses[busIdx] && match.buses[busIdx].stops) {
    match.buses[busIdx].stops.splice(stopIdx, 1);
    saveState();
    window.renderAdminBusesTool();
    renderBusBookingView();
  }
};

window.adminAddBusToSelectedMatch = function() {
  var match = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; });
  if (!match) return;
  if (!match.buses) match.buses = [];

  var newIndex = match.buses.length + 1;
  match.buses.push({
    busId: newIndex,
    title: "Bus " + newIndex + " (Auxiliary Route)",
    subtitle: "Official Branch Travel • Stadium of Light",
    capacity: 53,
    adultFare: 12.00,
    juniorFare: 8.00,
    isFreeBus: false,
    stops: JSON.parse(JSON.stringify(DEFAULT_STOPS))
  });

  saveState();
  window.renderAdminBusesTool();
  renderBusBookingView();
  alert("✓ Bus " + newIndex + " added to Sunderland vs " + match.opponent + " with independent timetable.");
};

window.adminRemoveBus = function(matchId, busIdx) {
  var match = appState.homeMatches.find(function(m) { return m.id === matchId; });
  if (!match || !match.buses || match.buses.length <= 1) return;

  if (confirm("Remove this bus from Sunderland vs " + match.opponent + "?")) {
    match.buses.splice(busIdx, 1);
    saveState();
    window.renderAdminBusesTool();
    renderBusBookingView();
    alert("✓ Bus removed from match fleet.");
  }
};

function renderAdminAllocationPreviewForMatch(match) {
  var summaryBox = document.getElementById("admin-allocation-status-summary");
  if (!summaryBox) return;

  var matchBookings = appState.bookings.filter(function(b) { return b.matchId === match.id; });
  var totalBooked = 0;
  matchBookings.forEach(function(b) { totalBooked += ((b.adults || 0) + (b.juniors || 0)); });

  var totalCap = 0;
  match.buses.forEach(function(b) { totalCap += (b.capacity || 53); });

  var bus1 = match.buses[0] || { capacity: 53 };
  var bus1Count = Math.min(totalBooked, bus1.capacity - 2);
  var cushion = 2;
  var overflow = Math.max(0, totalBooked - (bus1.capacity - 2));

  summaryBox.innerHTML = 
    "<div class='flex-between'>" +
      "<strong>Match: Sunderland vs " + match.opponent + "</strong>" +
      "<span style='color:var(--green); font-weight:800; font-size:10px;'>🟢 Auto-Scheduled T-24h</span>" +
    "</div>" +
    "<div class='text-xs text-muted mt-2'>Allocation automatically distributes seats 24 hours prior to kick-off (" + match.date + " at " + match.time + ").</div>" +
    "<div style='background:#1e293b; padding:8px; border-radius:6px; margin-top:8px; font-size:10px; line-height:1.6;'>" +
      "• Total Bookings Registered: <strong>" + totalBooked + " Seats</strong> (Total Capacity: " + totalCap + ")<br>" +
      "• Bus 1 Allocation: <strong>" + bus1Count + " Seats</strong><br>" +
      "• Priority Village Stops: <strong>Outer Village Stops Protected</strong><br>" +
      "• Safety Cushion: <strong>" + cushion + " Seats Reserved for Committee</strong><br>" +
      "• Overflow: <strong>" + (overflow > 0 ? overflow + " Passengers to Auxiliary Coach" : "0 (General Sale Open)") + "</strong>" +
    "</div>";
}

window.adminRunAllocationBackup = function() {
  var match = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; }) || appState.homeMatches[0];
  var matchBookings = appState.bookings.filter(function(b) { return b.matchId === match.id; });
  var totalBooked = 0;
  matchBookings.forEach(function(b) { totalBooked += ((b.adults || 0) + (b.juniors || 0)); });

  alert(
    "⚡ EARLY CUTOFF OVERRIDE EXECUTED:\n\n" +
    "• Match: Sunderland vs " + match.opponent + "\n" +
    "• Total Bookings Processed: " + totalBooked + "\n" +
    "• Bus 1 Priority: Outer village stops locked\n" +
    "• Committee Buffer: 2 seats reserved\n\n" +
    "Override logged to Master Audit Trail."
  );
  logForensicTransaction("Graham (Secretary)", "Admin", "All Passengers", "ALLOCATION_24H_OVERRIDE", "Manual early cutoff allocation for vs " + match.opponent, 0, 0, 0);
};

function renderAdminManifestForMatch(match) {
  var container = document.getElementById("admin-manifest-summary");
  if (!container) return;

  var matchBookings = appState.bookings.filter(function(b) { return b.matchId === match.id; });
  var totalPassengers = 0;
  var boardedCount = 0;
  matchBookings.forEach(function(b) {
    var count = (b.adults || 0) + (b.juniors || 0);
    totalPassengers += count;
    if (b.boarded) boardedCount += count;
  });

  var totalCap = 0;
  match.buses.forEach(function(b) { totalCap += (b.capacity || 53); });

  var html = 
    "<div class='flex-between' style='font-size:11px; margin-bottom:8px;'>" +
      "<span>Total: <strong>" + totalPassengers + " / " + totalCap + " Booked</strong></span>" +
      "<span style='color:var(--safc-gold); font-weight:800;'>" + boardedCount + " Boarded</span>" +
    "</div>";

  if (matchBookings.length === 0) {
    html += "<div class='text-xs text-muted' style='text-align:center; padding:10px;'>No bookings registered for this match.</div>";
  } else {
    matchBookings.forEach(function(b) {
      var seats = (b.adults || 0) + (b.juniors || 0);
      var realIdx = appState.bookings.indexOf(b);
      html += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:10px;'>" +
          "<div>" +
            "<strong>" + b.name + "</strong> (" + seats + " seat" + (seats > 1 ? "s" : "") + ")<br>" +
            "<span style='color:var(--safc-gold);'>" + b.stop + " • Bus #" + (b.busId || 1) + "</span>" +
          "</div>" +
          "<button class='btn btn-sm " + (b.boarded ? "btn-outline" : "btn-red") + "' style='padding:2px 6px; font-size:9px;' onclick='window.toggleBoarded(" + realIdx + ")'>" +
            (b.boarded ? "✓ Boarded" : "Check In") +
          "</button>" +
        "</div>";
    });
  }

  container.innerHTML = html;
}

window.toggleBoarded = function(idx) {
  if (appState.bookings[idx]) {
    appState.bookings[idx].boarded = !appState.bookings[idx].boarded;
    saveState();
    window.renderAdminBusesTool();
    renderHUDView();

    if (sbClient) {
      sbClient.from("bus_bookings")
        .update({ boarded: appState.bookings[idx].boarded })
        .eq("id", appState.bookings[idx].id)
        .then(function() {});
    }
  }
};

window.exportManifestCSV = function() {
  var match = appState.homeMatches.find(function(m) { return m.id === appState.selectedHomeMatchId; }) || appState.homeMatches[0];
  var matchBookings = appState.bookings.filter(function(b) { return b.matchId === match.id; });

  var csv = "Match,Passenger Name,Bus Assigned,Pickup Stop,Adults,Juniors,Total Paid,Boarded\n";
  matchBookings.forEach(function(b) {
    csv += '"Sunderland vs ' + match.opponent + '","' + b.name + '","Bus ' + (b.busId || 1) + '","' + b.stop + '",' + b.adults + ',' + b.juniors + ',£' + b.total.toFixed(2) + ',"' + (b.boarded ? "YES" : "NO") + '"\n';
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "Coxhoe_Coach_Manifest_" + match.opponent + ".csv");
  a.click();
};

// --------------------------------------------------------
// PANE 2: MEMBERSHIP SUBS ROSTER
// --------------------------------------------------------
function renderAdminSubs() {
  var container = document.getElementById("admin-subs-roster");
  if (!container) return;

  var activeCount = 0;
  var lapsedCount = 0;
  var totalRevenue = 0;

  appState.users.forEach(function(u) {
    if (u.membershipStatus === "active") {
      activeCount++;
      var fee = (u.category === "Child" ? appState.duesConfig.juniorFee : appState.duesConfig.adultFee);
      if (u.membershipTier === "Life") fee = 0;
      totalRevenue += fee;
    } else {
      lapsedCount++;
    }
  });

  var html = 
    "<div class='treasury-grid mb-2'>" +
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px;'>Active: <strong style='color:var(--green);'>" + activeCount + "</strong></div>" +
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px;'>Lapsed: <strong style='color:#ef4444;'>" + lapsedCount + "</strong></div>" +
    "</div>" +
    "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px; margin-bottom:10px;'>" +
      "Subs Collected (" + appState.duesConfig.activeSeason + "): <strong style='color:var(--safc-gold);'>£" + totalRevenue.toFixed(2) + "</strong>" +
    "</div>" +
    "<button class='btn btn-outline btn-sm' style='width:100%; margin-bottom:12px;' onclick='window.exportDuesCSV()'>📥 Export Membership Subs CSV</button>" +
    "<div style='max-height:260px; overflow-y:auto;'>";

  appState.users.forEach(function(u, idx) {
    var isPaid = u.membershipStatus === "active";
    html += 
      "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:8px 10px; border-radius:6px; margin-bottom:6px; font-size:11px;'>" +
        "<div>" +
          "<strong>" + u.name + "</strong> (" + (u.membershipTier || u.category) + ")<br>" +
          "<span style='color:" + (isPaid ? "var(--green)" : "#ef4444") + "; font-weight:700;'>" +
            (isPaid ? "✓ Active (" + (u.membershipSeason || "2026/27") + ")" : "🔴 Lapsed / Overdue") +
          "</span>" +
        "</div>" +
        "<div>" +
          (isPaid ? 
            "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:10px; color:#ef4444;' onclick='window.adminToggleMemberDues(" + idx + ", false)'>Revoke</button>" : 
            "<button class='btn btn-gold btn-sm' style='padding:2px 8px; font-size:10px;' onclick='window.adminToggleMemberDues(" + idx + ", true)'>Mark Paid</button>") +
        "</div>" +
      "</div>";
  });

  html += "</div>";
  container.innerHTML = html;
}

window.adminToggleMemberDues = function(idx, setPaid) {
  var user = appState.users[idx];
  if (setPaid) {
    user.membershipStatus = "active";
    user.membershipSeason = appState.duesConfig.activeSeason;
    user.validUntil = "2027-07-31";
    logForensicTransaction("Graham (Secretary)", "Admin", user.name, "SUBS_WAIVE", "Manually verified dues for " + user.name, 0, 0, 0);
  } else {
    user.membershipStatus = "lapsed";
    logForensicTransaction("Graham (Secretary)", "Admin", user.name, "SUBS_REVOKE", "Revoked dues for " + user.name, 0, 0, 0);
  }
  saveState();
  renderAdminSubs();
  renderHUDView();
};

window.exportDuesCSV = function() {
  var csv = "Member Name,Member Number,Category,Tier,Status,Season,Valid Until\n";
  appState.users.forEach(function(u) {
    csv += '"' + u.name + '","' + u.memberNo + '","' + u.category + '","' + (u.membershipTier || "Adult") + '","' + u.membershipStatus.toUpperCase() + '","' + (u.membershipSeason || "2026/27") + '","' + (u.validUntil || "2027-07-31") + '"\n';
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "Coxhoe_Branch_Membership_Subs_Roster.csv");
  a.click();
};

// --------------------------------------------------------
// PANE 3: CHILD & GUARDIAN APPROVAL QUEUE WITH REVOCATION
// --------------------------------------------------------
function renderAdminApprovals() {
  var container = document.getElementById("admin-approvals-queue");
  if (!container) return;

  var pending = appState.pendingLinkRequests.filter(function(r) { return r.status === "pending_admin"; });

  var html = "<div class='admin-card'><strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:8px;'>Pending Requests (Approve / Decline)</strong>";
  if (pending.length === 0) {
    html += "<p class='text-xs text-muted'>✓ No pending link requests.</p>";
  } else {
    pending.forEach(function(req) {
      html += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:8px; border-radius:6px; margin-bottom:6px; font-size:11px;'>" +
          "<div><strong>" + req.requester + "</strong> ➔ <strong>" + req.targetName + "</strong> (" + req.relation + ")</div>" +
          "<div style='display:flex; gap:4px;'>" +
            "<button class='btn btn-gold btn-sm' style='padding:2px 8px; font-size:10px;' onclick='window.adminApproveLink(" + req.id + ")'>Approve</button>" +
            "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:10px; color:#ef4444; border-color:#ef4444;' onclick='window.adminRejectLink(" + req.id + ")'>Decline</button>" +
          "</div>" +
        "</div>";
    });
  }
  html += "</div>";

  html += 
    "<div class='admin-card'>" +
      "<strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:8px;'>Active Network Connections (Revoke Links)</strong>" +
      "<div style='max-height:220px; overflow-y:auto;'>";

  if (appState.friendsAndFamily.length === 0) {
    html += "<p class='text-xs text-muted'>No active member links found.</p>";
  } else {
    appState.friendsAndFamily.forEach(function(link) {
      html += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:10px;'>" +
          "<div><strong>" + link.owner + "</strong> ➔ <strong>" + link.targetName + "</strong> (" + link.relation + " • " + link.type + ")</div>" +
          "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444; border-color:#ef4444;' onclick='window.adminRevokeLink(" + link.id + ")'>Revoke</button>" +
        "</div>";
    });
  }

  html += "</div></div>";
  container.innerHTML = html;
}

window.adminApproveLink = function(reqId) {
  var req = appState.pendingLinkRequests.find(function(r) { return r.id === reqId; });
  if (!req) return;

  appState.friendsAndFamily.push({
    id: Date.now(),
    owner: req.requester,
    targetName: req.targetName,
    relation: req.relation,
    type: req.type,
    status: "approved"
  });
  appState.friendsAndFamily.push({
    id: Date.now() + 1,
    owner: req.targetName,
    targetName: req.requester,
    relation: req.relation === "Child" ? "Parent" : "Friend",
    type: "Adult",
    status: "approved"
  });

  appState.pendingLinkRequests = appState.pendingLinkRequests.filter(function(r) { return r.id !== reqId; });
  saveState();
  renderAdminApprovals();
  updateAdminDrawerBadge();
  alert("✓ Link approved and verified for junior travel booking.");
};

window.adminRejectLink = function(reqId) {
  appState.pendingLinkRequests = appState.pendingLinkRequests.filter(function(r) { return r.id !== reqId; });
  saveState();
  renderAdminApprovals();
  updateAdminDrawerBadge();
  alert("✓ Link request declined.");
};

window.adminRevokeLink = function(linkId) {
  var link = appState.friendsAndFamily.find(function(l) { return l.id === linkId; });
  if (!link) return;

  if (confirm("Revoke relationship between " + link.owner + " and " + link.targetName + "?")) {
    appState.friendsAndFamily = appState.friendsAndFamily.filter(function(f) {
      var isDirect = (f.owner === link.owner && f.targetName === link.targetName);
      var isReciprocal = (f.owner === link.targetName && f.targetName === link.owner);
      return !isDirect && !isReciprocal;
    });
    saveState();
    renderAdminApprovals();
    alert("✓ Relationship link revoked.");
  }
};

// --------------------------------------------------------
// PANE 4: TREASURY & FINANCIAL LEDGER
// --------------------------------------------------------
window.renderAdminTreasury = function() {
  var statsContainer = document.getElementById("admin-treasury-stats");
  var ledgerContainer = document.getElementById("admin-financial-ledger");
  var catFilter = document.getElementById("treasury-filter-category") ? document.getElementById("treasury-filter-category").value : "all";
  var timeFilter = document.getElementById("treasury-filter-time") ? document.getElementById("treasury-filter-time").value : "all";

  var totalInflow = 0;
  var totalOutflow = 0;
  var branchRetained = 0;

  appState.masterAuditTrail.forEach(function(t) {
    if (t.debit > 0) totalInflow += t.debit;
    if (t.credit > 0) totalOutflow += t.credit;
    branchRetained += (t.branchImpact || 0);
  });

  if (statsContainer) {
    statsContainer.innerHTML = 
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px;'>Gross Inflow: <strong style='color:var(--green);'>+£" + totalInflow.toFixed(2) + "</strong></div>" +
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px;'>Payouts: <strong style='color:#ef4444;'>-£" + totalOutflow.toFixed(2) + "</strong></div>" +
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px; grid-column:span 2;'>Branch Net Funds: <strong style='color:var(--safc-gold);'>£" + branchRetained.toFixed(2) + "</strong></div>";
  }

  if (ledgerContainer) {
    var now = new Date();
    var filtered = appState.masterAuditTrail.filter(function(t) {
      if (catFilter !== "all") {
        if (catFilter === "subs" && t.category !== "SUBS_DUES") return false;
        if (catFilter === "bus" && t.category !== "BUS_BOOKING" && t.category !== "BUS_REFUND") return false;
        if (catFilter === "away" && t.category.indexOf("AWAY") === -1) return false;
        if (catFilter === "card" && t.category.indexOf("CARD") === -1) return false;
        if (catFilter === "topup" && t.category !== "TOPUP") return false;
        if (catFilter === "payout" && t.category !== "CARD_WINNER_PAYOUT") return false;
      }
      if (timeFilter !== "all") {
        var txnDate = new Date(t.timestamp.replace(" ", "T"));
        var diffDays = (now - txnDate) / (1000 * 60 * 60 * 24);
        if (timeFilter === "7d" && diffDays > 7) return false;
        if (timeFilter === "30d" && diffDays > 30) return false;
        if (timeFilter === "season" && diffDays > 365) return false;
      }
      return true;
    });

    var html = "<div style='max-height:240px; overflow-y:auto;'>";
    if (filtered.length === 0) {
      html += "<div class='text-xs text-muted' style='padding:8px 0;'>No transactions match your active filter.</div>";
    } else {
      filtered.slice(0, 40).forEach(function(t) {
        html += 
          "<div style='background:#1e293b; border-bottom:1px solid #334155; padding:6px 8px; border-radius:4px; margin-bottom:4px; font-size:10px;'>" +
            "<div style='display:flex; justify-content:space-between;'>" +
              "<strong>" + t.txnId + " • " + t.category + "</strong>" +
              "<span style='color:var(--safc-gold);'>" + t.timestamp.substring(0, 16) + "</span>" +
            "</div>" +
            "<div style='color:#cbd5e1;'>" + t.desc + " (" + t.actor + ")</div>" +
          "</div>";
      });
    }
    html += "</div>";
    ledgerContainer.innerHTML = html;
  }
};

window.exportMasterAuditCSV = function() {
  var csv = "Txn ID,Timestamp,Actor,Role,Target,Category,Description,Debit,Credit,Branch Impact,Balance After\n";
  appState.masterAuditTrail.forEach(function(t) {
    csv += '"' + t.txnId + '","' + t.timestamp + '","' + t.actor + '","' + t.role + '","' + t.target + '","' + t.category + '","' + t.desc.replace(/"/g, '""') + '",£' + t.debit.toFixed(2) + ',£' + t.credit.toFixed(2) + ',£' + t.branchImpact.toFixed(2) + ',£' + t.balanceAfter.toFixed(2) + "\n";
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "Coxhoe_Branch_Master_Audit.csv");
  a.click();
};

// --------------------------------------------------------
// PANE 5: AWAY MATCH TICKET ALLOCATION SUITE
// --------------------------------------------------------
function renderAdminAwayFixture() {
  var sel = document.getElementById("admin-away-game-select");
  var container = document.getElementById("admin-away-fixture-manager");
  if (!sel || !container) return;

  var currentVal = sel.value;
  sel.innerHTML = "";
  appState.awayFixtures.forEach(function(f) {
    var opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.opponent + " (A) • " + f.date + " [Quota: " + f.allocation + "]";
    if (currentVal && currentVal === f.id) opt.selected = true;
    sel.appendChild(opt);
  });
  if (!sel.value && appState.awayFixtures.length > 0) sel.value = appState.awayFixtures[0].id;

  var selectedId = sel.value;
  var fixture = appState.awayFixtures.find(function(f) { return f.id === selectedId; });
  if (!fixture) return;

  var regs = appState.awayRegistrations.filter(function(r) { return r.fixtureId === selectedId; });
  var allocatedCount = 0;
  regs.forEach(function(r) { if (r.allocated) allocatedCount += (r.party ? r.party.length : 1); });

  var html = 
    "<div class='admin-card'>" +
      "<div class='flex-between'>" +
        "<strong>" + fixture.opponent + " (Away)</strong>" +
        "<span class='badge-gold'>" + fixture.date + "</span>" +
      "</div>" +
      "<div style='display:flex; gap:6px; align-items:center; margin-top:8px;'>" +
        "<label class='text-xs text-muted' style='flex:1;'>Branch Quota:</label>" +
        "<input type='number' id='admin-away-quota-input' class='form-input' style='flex:1; padding:4px;' value='" + fixture.allocation + "' />" +
        "<button class='btn btn-outline btn-sm' style='padding:4px 10px; font-size:10px;' onclick='window.confirmAwayQuota(\"" + fixture.id + "\")'>Confirm Quota</button>" +
      "</div>" +
      "<div id='admin-away-counter-label' class='text-xs mt-2' style='color:var(--safc-gold);'>Allocated so far: <strong>" + allocatedCount + " / " + fixture.allocation + " Tickets</strong></div>" +
    "</div>" +
    "<div class='admin-card'>" +
      "<strong style='font-size:11px; display:block; margin-bottom:8px;'>Member Expressions of Interest:</strong>";

  if (regs.length === 0) {
    html += "<p class='text-xs text-muted'>No members have registered interest for this match yet.</p>";
  } else {
    regs.forEach(function(r) {
      var seats = r.party ? r.party.length : 1;
      html += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:6px 8px; border-radius:6px; margin-bottom:6px; font-size:10px; border-left:3px solid " + (r.allocated ? "var(--green)" : "var(--safc-gold)") + ";'>" +
          "<div>" +
            "<strong>" + r.memberName + "</strong> (" + seats + " ticket" + (seats > 1 ? "s" : "") + ")<br>" +
            "<span style='color:#cbd5e1; font-size:9px;'>" + (r.party ? r.party.join(", ") : "Single") + "</span>" +
          "</div>" +
          "<button class='btn btn-sm " + (r.allocated ? "btn-outline" : "btn-gold") + "' style='padding:2px 8px; font-size:9px;' onclick='window.toggleAwayAllocation(\"" + r.fixtureId + "\", \"" + r.memberName + "\")'>" +
            (r.allocated ? "✓ Allocated" : "Allocate Ticket") +
          "</button>" +
        "</div>";
    });
  }

  html += "</div>";
  container.innerHTML = html;
}

window.confirmAwayQuota = function(fixtureId) {
  var input = document.getElementById("admin-away-quota-input");
  var val = input ? parseInt(input.value) : 20;
  var fix = appState.awayFixtures.find(function(f) { return f.id === fixtureId; });
  if (fix) {
    fix.allocation = val || 20;
    saveState();
    renderAdminAwayFixture();
    renderMemberAwayView();
    alert("✓ Branch ticket quota confirmed & updated to " + fix.allocation + " tickets.");
  }
};

window.toggleAwayAllocation = function(fixtureId, memberName) {
  var reg = appState.awayRegistrations.find(function(r) {
    return r.fixtureId === fixtureId && r.memberName === memberName;
  });
  if (reg) {
    reg.allocated = !reg.allocated;
    saveState();
    renderAdminAwayFixture();
    renderMemberAwayView();
    renderHUDView();

    if (sbClient) {
      sbClient.from("away_registrations")
        .update({ allocated: reg.allocated })
        .eq("fixture_id", fixtureId)
        .eq("member_name", memberName)
        .then(function() {});
    }

    alert("✓ Ticket allocation status updated for " + memberName + ". Member notification badge updated.");
  }
};

// --------------------------------------------------------
// PANE 6: BROADCAST NOTICE / BRANCH NEWS (DELETE & ARCHIVE)
// --------------------------------------------------------
function renderAdminNews() {
  var manageList = document.getElementById("admin-news-manage-list");
  if (!manageList) return;

  if (appState.announcements.length === 0) {
    manageList.innerHTML = "<div class='text-xs text-muted'>No announcements created yet.</div>";
    return;
  }

  var html = "";
  appState.announcements.forEach(function(post) {
    html += 
      "<div style='background:#1e293b; padding:8px 10px; border-radius:6px; margin-bottom:6px; font-size:11px; border-left:3px solid " + (post.isUrgent ? "#ef4444" : "var(--safc-gold)") + ";'>" +
        "<div class='flex-between'>" +
          "<strong>" + post.title + "</strong>" +
          "<span style='font-size:9px; color:" + (post.archived ? "#94a3b8" : "var(--green)") + "; font-weight:800;'>" + (post.archived ? "📁 ARCHIVED" : "🟢 ACTIVE") + "</span>" +
        "</div>" +
        "<div style='color:#cbd5e1; font-size:10px; margin:4px 0;'>" + post.content + "</div>" +
        "<div style='display:flex; justify-content:space-between; align-items:center; margin-top:6px; font-size:9px; color:var(--text-muted);'>" +
          "<span>" + post.date + " • Read by " + (post.readBy ? post.readBy.length : 0) + "</span>" +
          "<div style='display:flex; gap:4px;'>" +
            "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px;' onclick='window.toggleArchiveAnnouncement(" + post.id + ")'>" + (post.archived ? "Unarchive" : "Archive") + "</button>" +
            "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444; border-color:#ef4444;' onclick='window.deleteAnnouncement(" + post.id + ")'>Delete</button>" +
          "</div>" +
        "</div>" +
      "</div>";
  });

  manageList.innerHTML = html;
}

window.adminPostAnnouncement = function() {
  var titleInput = document.getElementById("admin-news-title");
  var bodyInput = document.getElementById("admin-news-body");
  var imageInput = document.getElementById("admin-news-image-url");
  var linkUrlInput = document.getElementById("admin-news-link-url");
  var linkTextInput = document.getElementById("admin-news-link-text");

  var title = titleInput ? titleInput.value.trim() : "";
  var body = bodyInput ? bodyInput.value.trim() : "";
  var imageUrl = imageInput ? imageInput.value.trim() : "";
  var linkUrl = linkUrlInput ? linkUrlInput.value.trim() : "";
  var linkText = linkTextInput ? linkTextInput.value.trim() : "";

  if (!title || !body) {
    alert("Please enter both a headline and announcement details.");
    return;
  }

  var newPost = {
    id: Date.now(),
    title: title,
    date: new Date().toISOString().substring(0, 10),
    is_urgent: false,
    content: body,
    imageUrl: imageUrl,
    linkUrl: linkUrl,
    linkText: linkText || "View Details",
    reactions: 0,
    archived: false,
    read_by: []
  };

  appState.announcements.unshift({
    id: newPost.id,
    title: newPost.title,
    date: newPost.date,
    isUrgent: newPost.is_urgent,
    content: newPost.content,
    imageUrl: newPost.imageUrl,
    linkUrl: newPost.linkUrl,
    linkText: newPost.linkText,
    reactions: newPost.reactions,
    archived: newPost.archived,
    readBy: newPost.read_by
  });

  logForensicTransaction("Graham (Secretary)", "Admin", "All Members", "BROADCAST", "Notice: " + title, 0, 0, 0);

  if (titleInput) titleInput.value = "";
  if (bodyInput) bodyInput.value = "";
  if (imageInput) imageInput.value = "";
  if (linkUrlInput) linkUrlInput.value = "";
  if (linkTextInput) linkTextInput.value = "";

  saveState();
  renderHUDView();
  if (typeof renderAdminNews === "function") renderAdminNews();

  if (sbClient) {
    sbClient.from("announcements").insert([{
      id: newPost.id,
      title: newPost.title,
      date: newPost.date,
      is_urgent: newPost.is_urgent,
      content: newPost.content,
      reactions: 0,
      archived: false,
      read_by: []
    }]).then(function() {});
  }

  alert("✓ Rich broadcast notice published to branch home feeds.");
};

window.toggleArchiveAnnouncement = function(postId) {
  var post = appState.announcements.find(function(a) { return a.id === postId; });
  if (post) {
    post.archived = !post.archived;
    saveState();
    renderHUDView();
    renderAdminNews();

    if (sbClient) {
      sbClient.from("announcements").update({ archived: post.archived }).eq("id", postId).then(function() {});
    }

    alert("✓ Notice status updated (" + (post.archived ? "Archived" : "Active") + ").");
  }
};

window.deleteAnnouncement = function(postId) {
  if (confirm("Permanently delete this announcement?")) {
    appState.announcements = appState.announcements.filter(function(a) { return a.id !== postId; });
    saveState();
    renderHUDView();
    renderAdminNews();

    if (sbClient) {
      sbClient.from("announcements").delete().eq("id", postId).then(function() {});
    }

    alert("✓ Announcement deleted.");
  }
};

// --------------------------------------------------------
// PANE 7: FOOTBALL CARD FUNDRAISER SUITE
// --------------------------------------------------------
function renderAdminFootballCard() {
  var configContainer = document.getElementById("admin-footballcard-config-card");
  var summaryContainer = document.getElementById("admin-footballcard-summary");
  var cfg = appState.cardConfig;
  var fin = calculateCardFinancials();

  if (configContainer) {
    configContainer.innerHTML = 
      "<strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:8px;'>Launch & Configure Football Card</strong>" +
      "<div style='display:flex; gap:6px; margin-bottom:6px;'>" +
        "<div style='flex:1;'>" +
          "<label class='form-label'>Card Size (Teams)</label>" +
          "<input type='number' id='admin-card-size' class='form-input' min='20' max='100' value='" + cfg.size + "' />" +
        "</div>" +
        "<div style='flex:1;'>" +
          "<label class='form-label'>Price Per Square (£)</label>" +
          "<input type='number' id='admin-card-price' class='form-input' step='0.50' value='" + cfg.pricePerSquare + "' />" +
        "</div>" +
      "</div>" +
      "<div style='display:flex; gap:6px; margin-bottom:8px;'>" +
        "<div style='flex:1;'>" +
          "<label class='form-label'>Prize Split Mode</label>" +
          "<select id='admin-prize-mode' class='form-select'>" +
            "<option value='percentage' " + (cfg.prizeMode === "percentage" ? "selected" : "") + ">Percentage Split (50/50)</option>" +
            "<option value='fixed' " + (cfg.prizeMode === "fixed" ? "selected" : "") + ">Fixed Cash Prize (£)</option>" +
          "</select>" +
        "</div>" +
        "<div style='flex:1;'>" +
          "<label class='form-label'>Winner Prize (£ or %)</label>" +
          "<input type='number' id='admin-prize-val' class='form-input' value='" + (cfg.prizeMode === "percentage" ? cfg.prizePct : cfg.prizeFixed) + "' />" +
        "</div>" +
      "</div>" +
      "<button class='btn btn-outline btn-sm' style='width:100%;' onclick='window.launchNewFootballCard()'>🚀 Launch Fresh Football Card</button>";
  }

  if (summaryContainer) {
    summaryContainer.innerHTML = 
      "<div class='admin-card'>" +
        "<div class='flex-between'>" +
          "<strong>Active Matchday Card: Coventry City (H)</strong>" +
          "<span style='color:var(--safc-gold); font-weight:800; font-size:11px;'>" + fin.soldCount + " / " + fin.totalSquares + " Sold</span>" +
        "</div>" +
        "<div class='treasury-grid mt-2'>" +
          "<div style='background:#1e293b; padding:6px; border-radius:4px; font-size:10px;'>Total Pot: <strong>£" + fin.grossPot.toFixed(2) + "</strong></div>" +
          "<div style='background:#1e293b; padding:6px; border-radius:4px; font-size:10px;'>Winner Share: <strong style='color:var(--safc-gold);'>£" + fin.winnerPrize.toFixed(2) + "</strong></div>" +
          "<div style='background:#1e293b; padding:6px; border-radius:4px; font-size:10px; grid-column:span 2;'>Branch Profit: <strong style='color:var(--green);'>£" + fin.branchProfit.toFixed(2) + "</strong></div>" +
        "</div>" +
        "<button class='btn btn-gold btn-sm btn-block mt-2' onclick='window.drawCardWinner()'>🏆 Draw Winning Team Now</button>" +
      "</div>";
  }
}

window.launchNewFootballCard = function() {
  var size = Math.min(100, Math.max(20, parseInt(document.getElementById("admin-card-size").value) || 40));
  var price = parseFloat(document.getElementById("admin-card-price").value) || 2.00;
  var mode = document.getElementById("admin-prize-mode").value;
  var prizeVal = parseFloat(document.getElementById("admin-prize-val").value) || 50;

  if (confirm("Launch new " + size + "-team football card? Any unclaimed squares on the active card will be reset.")) {
    appState.cardConfig = {
      size: size,
      pricePerSquare: price,
      prizeMode: mode,
      prizePct: mode === "percentage" ? prizeVal : 50,
      prizeFixed: mode === "fixed" ? prizeVal : 50.00,
      activeClubs: shuffleArray(MASTER_CLUBS).slice(0, size)
    };
    appState.cardClaims = {};
    saveState();
    renderFootballCard();
    renderAdminFootballCard();
    alert("✓ New " + size + "-team Football Card launched!");
  }
};

window.drawCardWinner = function() {
  var claimed = Object.keys(appState.cardClaims);
  if (claimed.length === 0) { alert("No squares sold on this card yet!"); return; }
  var winning = claimed[Math.floor(Math.random() * claimed.length)];
  var winner = appState.cardClaims[winning];
  
  var fin = calculateCardFinancials();
  var prize = fin.winnerPrize;

  var winnerUser = appState.users.find(function(u) { return u.name === winner; });
  if (winnerUser) winnerUser.balance += prize;

  logForensicTransaction("Graham (Secretary)", "Admin", winner, "CARD_WINNER_PAYOUT", "Awarded Football Card prize (" + winning + ")", 0, prize, fin.branchProfit);
  alert("🏆 WINNING TEAM: " + winning.toUpperCase() + "!\nWinner: " + winner + " wins £" + prize.toFixed(2) + " deposited directly to wallet.");
  
  appState.cardClaims = {};
  appState.cardConfig.activeClubs = shuffleArray(MASTER_CLUBS).slice(0, appState.cardConfig.size);
  saveState();
  window.refreshAllViews();
};

// --------------------------------------------------------
// PANE 8: SAFEGUARDING & DISCIPLINARY BOARD
// --------------------------------------------------------
function renderAdminDisciplinary() {
  var juniorLog = document.getElementById("admin-disciplinary-junior-log");
  var boardContainer = document.getElementById("admin-disciplinary-board");

  if (juniorLog) {
    var children = appState.users.filter(function(u) { return u.category === "Child"; });
    var htmlJ = "";
    if (children.length === 0) {
      htmlJ = "<p class='text-xs text-muted'>No junior accounts registered.</p>";
    } else {
      children.forEach(function(ch) {
        var comp = checkChildCompliance(ch);
        var parentLink = appState.friendsAndFamily.find(function(f) {
          return (f.owner === ch.name && f.relation === "Parent") || (f.targetName === ch.name && (f.relation === "Daughter" || f.relation === "Son" || f.relation === "Child"));
        });

        htmlJ += 
          "<div style='background:#1e293b; padding:6px 8px; border-radius:4px; margin-bottom:4px; font-size:10px; display:flex; justify-content:space-between; align-items:center;'>" +
            "<div>" +
              "<strong>" + ch.name + "</strong> (" + ch.memberNo + ")<br>" +
              "<span style='color:" + (comp.compliant ? "var(--green)" : "#ef4444") + "; font-weight:700;'>" +
                (comp.compliant ? "✓ Linked to " + (parentLink ? (parentLink.owner === ch.name ? parentLink.targetName : parentLink.owner) : "Parent") : "🔴 Account Locked (No Guardian)") +
              "</span>" +
            "</div>" +
            (!comp.compliant ? "<button class='btn btn-gold btn-sm' style='padding:2px 6px; font-size:9px;' onclick='window.adminForceLinkParent(\"" + ch.name + "\")'>Link Guardian</button>" : "") +
          "</div>";
      });
    }
    juniorLog.innerHTML = htmlJ;
  }

  if (boardContainer) {
    boardContainer.innerHTML = "";
    if (appState.moderation.incidents.length === 0) {
      boardContainer.innerHTML = "<div class='text-xs text-muted'>No disciplinary infractions on record.</div>";
      return;
    }

    var activeAdmin = appState.currentUser.name;

    appState.moderation.incidents.forEach(function(inc) {
      if (!inc.internalDiscussion) inc.internalDiscussion = [];
      if (!inc.votes) inc.votes = {};

      var reinstateVotes = 0;
      var upholdVotes = 0;
      var voters = Object.keys(inc.votes);
      voters.forEach(function(v) {
        if (inc.votes[v] === "reinstate") reinstateVotes++;
        if (inc.votes[v] === "uphold") upholdVotes++;
      });

      var myVote = inc.votes[activeAdmin] || null;
      var isResolved = inc.status !== "active_ban";

      var card = document.createElement("div");
      card.className = "admin-card";
      card.innerHTML = 
        "<div class='flex-between' style='margin-bottom:4px;'>" +
          "<strong>Case #" + inc.id + " • " + inc.member + "</strong>" +
          "<span style='color:" + (inc.status === "active_ban" ? "#ef4444" : "var(--green)") + "; font-weight:800; font-size:10px;'>" + inc.status.toUpperCase() + "</span>" +
        "</div>" +
        "<div style='color:var(--safc-gold); font-size:10px; margin-bottom:4px;'>Charge: " + inc.reason + " (" + inc.timestamp + ")</div>" +
        "<div style='background:#1e293b; padding:6px; border-radius:4px; margin-bottom:6px; font-family:monospace; font-size:10px;'>\"" + inc.offendingText + "\"</div>" +
        "<button class='btn btn-outline btn-sm' style='padding:3px 6px; font-size:9px; margin-bottom:6px;' onclick='window.toggleTranscriptModal(\"" + inc.id + "\")'>📜 Inspect Full Conversation Transcript</button>" +
        "<div style='background:#141d2e; padding:6px 8px; border-radius:6px; margin-bottom:6px; font-size:10px; border-left:2px solid var(--safc-gold);'>" +
          "<strong>Committee Quorum (2 Votes to Reinstate):</strong><br>" +
          "• Votes to Reinstate: <strong style='color:var(--green);'>" + reinstateVotes + " / 2</strong><br>" +
          "• Votes to Uphold Ban: <strong style='color:#ef4444;'>" + upholdVotes + "</strong><br>" +
          (voters.length > 0 ? "<span style='color:#94a3b8;'>Votes cast: " + voters.map(function(v){ return v + " (" + inc.votes[v] + ")"; }).join(", ") + "</span>" : "<span style='color:#94a3b8;'>No committee votes recorded yet.</span>") +
        "</div>" +
        (!isResolved ? 
          "<div style='display:flex; gap:4px; margin-bottom:6px;'>" +
            "<button class='btn btn-gold btn-sm' style='flex:1; padding:4px;' onclick='window.castCommitteeVote(\"" + inc.id + "\", \"reinstate\")'>" + (myVote === "reinstate" ? "✓ Voted Reinstate" : "Vote to Reinstate") + "</button>" +
            "<button class='btn btn-outline btn-sm' style='flex:1; padding:4px; color:#ef4444; border-color:#ef4444;' onclick='window.castCommitteeVote(\"" + inc.id + "\", \"uphold\")'>" + (myVote === "uphold" ? "✓ Voted Uphold" : "Vote to Uphold Ban") + "</button>" +
          "</div>" : "<div style='color:var(--green); font-weight:800; font-size:10px; margin-bottom:6px;'>CASE RESOLVED BY COMMITTEE QUORUM</div>");

      boardContainer.appendChild(card);
    });
  }
}

window.adminForceLinkParent = function(childName) {
  var parentName = prompt("Enter parent full name to link with " + childName + ":", "Gary Miller");
  if (!parentName) return;
  appState.friendsAndFamily.push({
    id: Date.now(), owner: parentName, targetName: childName, type: "Child", memberNo: "COX-085", relation: "Child", status: "approved"
  });
  appState.friendsAndFamily.push({
    id: Date.now() + 1, owner: childName, targetName: parentName, type: "Adult", memberNo: "COX-084", relation: "Parent", status: "approved"
  });
  saveState();
  renderAdminDisciplinary();
  alert("Verified parent linkage established. " + childName + "'s account is now active.");
};

window.castCommitteeVote = function(incId, voteType) {
  var inc = appState.moderation.incidents.find(function(i) { return String(i.id) === String(incId); });
  if (!inc) return;
  var activeAdmin = appState.currentUser.name;

  if (!inc.votes) inc.votes = {};
  inc.votes[activeAdmin] = voteType;

  var reinstateCount = 0;
  Object.keys(inc.votes).forEach(function(v) { if (inc.votes[v] === "reinstate") reinstateCount++; });

  if (reinstateCount >= 2) {
    inc.status = "reinstated";
    appState.moderation.mutedMembers = appState.moderation.mutedMembers.filter(function(m) { return m !== inc.member; });
    appState.moderation.revokedMembers = appState.moderation.revokedMembers.filter(function(m) { return m !== inc.member; });
    appState.moderation.strikes[inc.member] = 0;
    alert("🎉 COMMITTEE QUORUM REACHED (2+ Votes):\n\nCommittee has formally voted to reinstate messaging for " + inc.member + ".");
  } else {
    alert("Your vote (" + voteType.toUpperCase() + ") has been recorded.\nCurrent tally: " + reinstateCount + " / 2 required.");
  }

  saveState();
  renderAdminDisciplinary();
  renderMatchdayBusChat();
  updateCommsBadge();
};

window.toggleTranscriptModal = function(incId) {
  var inc = appState.moderation.incidents.find(function(i) { return String(i.id) === String(incId); });
  if (!inc) return;
  var modal = document.getElementById("modal-transcript");
  var body = document.getElementById("transcript-body");
  
  body.innerHTML = 
    "<div style='font-size:11px; margin-bottom:8px; color:var(--safc-gold);'><strong>Complete Conversation Transcript:</strong></div>" +
    "<div id='transcript-scroll-area' style='max-height:300px; overflow-y:auto; padding-right:4px;'>" +
    inc.transcriptContext.map(function(line){
      var isFlag = line.indexOf("[FLAGGED") !== -1;
      return "<div style='background:" + (isFlag ? "#7f1d1d" : "#0f172a") + "; padding:6px 8px; border-radius:4px; margin-bottom:4px; font-family:monospace; font-size:10px; border-left:3px solid " + (isFlag ? "#ef4444" : "transparent") + ";'>" + line + "</div>";
    }).join("") +
    "</div>";

  modal.style.display = "flex";
  setTimeout(function() {
    var scrollArea = document.getElementById("transcript-scroll-area");
    if (scrollArea) scrollArea.scrollTop = scrollArea.scrollHeight;
  }, 50);
};

window.closeTranscriptModal = function() {
  document.getElementById("modal-transcript").style.display = "none";
};

// --------------------------------------------------------
// CONFIRMATION MODALS & APP BOOTLOADER
// --------------------------------------------------------
var pendingConfirmAction = null;
window.showConfirmDialog = function(title, html, onConfirm) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-details").innerHTML = html;
  pendingConfirmAction = onConfirm;
  document.getElementById("modal-confirm").style.display = "flex";
};

window.closeConfirmModal = function() {
  document.getElementById("modal-confirm").style.display = "none";
  pendingConfirmAction = null;
};

window.executeConfirmModal = function() {
  if (pendingConfirmAction) pendingConfirmAction();
  window.closeConfirmModal();
};

// Bootloader: Syncs with Supabase Cloud and mounts the initial UI
window.onload = function() {
  window.refreshAllViews();
  if (typeof initSupabaseCloudSync === "function") {
    initSupabaseCloudSync();
  }
};