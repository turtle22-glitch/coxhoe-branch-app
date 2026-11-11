// ========================================================
// COXHOE BRANCH SAFC - MASTER APPLICATION CORE
// Supabase Sync, Modular State, White-Label & Branch Ops
// ========================================================

// --- SUPABASE CLIENT INITIALIZATION ---
var SUPABASE_URL = "https://nitzzfwtcfzgjqmbxkwn.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_9GSFeMOaqVmW7p_t19eNEQ_uUMCMBSz";

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

var SEASON_HOME_MATCHES = [
  {
    id: "H-01",
    opponent: "Coventry City",
    date: "Sat 21 Nov 2026",
    time: "15:00",
    bookingStatus: "open",
    buses: [
      {
        busId: 1,
        title: "Bus 1 (Main Village Route)",
        subtitle: "Official Branch Travel • Stadium of Light",
        capacity: 53,
        adultFare: 12.00,
        juniorFare: 8.00,
        isFreeBus: false,
        stops: JSON.parse(JSON.stringify(DEFAULT_STOPS))
      }
    ]
  },
  {
    id: "H-02",
    opponent: "Burnley",
    date: "Sat 5 Dec 2026",
    time: "15:00",
    bookingStatus: "draft",
    buses: [
      {
        busId: 1,
        title: "Bus 1 (Main Village Route)",
        subtitle: "Official Branch Travel • Stadium of Light",
        capacity: 53,
        adultFare: 12.00,
        juniorFare: 8.00,
        isFreeBus: false,
        stops: JSON.parse(JSON.stringify(DEFAULT_STOPS))
      }
    ]
  },
  {
    id: "H-03",
    opponent: "Leeds United",
    date: "Sat 26 Dec 2026",
    time: "12:30",
    bookingStatus: "draft",
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

var DEFAULT_40_TEAMS = [
  "Sunderland", "Newcastle", "Middlesbrough", "Leeds United",
  "Coventry City", "Burnley", "Sheffield United", "Hull City",
  "Blackburn Rovers", "Preston North End", "Stoke City", "Derby County",
  "West Brom", "Bristol City", "Swansea City", "Cardiff City",
  "Watford", "Luton Town", "Norwich City", "Millwall",
  "QPR", "Plymouth Argyle", "Portsmouth", "Oxford United",
  "Arsenal", "Aston Villa", "Chelsea", "Everton",
  "Fulham", "Liverpool", "Man City", "Man United",
  "Brighton", "Brentford", "Tottenham", "West Ham",
  "Celtic", "Rangers", "Aberdeen", "Hearts"
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

// --- MASTER STATE CONTAINER ---
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
    dueDate: "2026-08-31",
    adultFee: 10.00,
    juniorFee: 5.00,
    seniorFee: 5.00,
    enforceDuesGate: true
  },

  announcements: JSON.parse(localStorage.getItem("coxhoe_announcements_v20")) || [
    { id: 1, title: "Coventry City (H) Coach Departure Notice", date: "2026-10-31", isUrgent: true, content: "Due to roadworks on the A1(M) near Bowburn, the bus will depart all village pickup points 15 minutes earlier than scheduled.", reactions: 14, archived: false, readBy: [] },
    { id: 2, title: "Branch Christmas Social Night Announced", date: "2026-10-28", isUrgent: false, content: "Tickets are now on sale for the annual Christmas branch social at Coxhoe WMC on Friday 18th December.", reactions: 29, archived: false, readBy: [] }
  ],

  matchdayChat: JSON.parse(localStorage.getItem("coxhoe_bus_chat_v20")) || [],

  directMessages: JSON.parse(localStorage.getItem("coxhoe_dms_v20")) || [],

  moderation: JSON.parse(localStorage.getItem("coxhoe_moderation_v20")) || {
    strikes: {},
    mutedMembers: ["Billy Thompson"],
    revokedMembers: [],
    incidents: []
  },

  helpdeskTickets: JSON.parse(localStorage.getItem("coxhoe_helpdesk_v20")) || [
    {
      id: "TICK-401",
      member: "Dave Kelly",
      topic: "Travel",
      status: "open",
      escalatedToGraham: true,
      created: "2026-10-31 14:00",
      messages: [{ id: "m1", sender: "Dave Kelly", time: "14:00", text: "Can I pick up at Bowburn instead of Red Lion next week?" }],
      internalNotes: [{ id: "n1", author: "Sarah Taylor", time: "14:05", text: "Escalated to Graham: can we add Bowburn stop for Dave?" }]
    }
  ],

  readTracker: JSON.parse(localStorage.getItem("coxhoe_read_tracker_v20")) || {
    "Gary Miller": { busChatCount: 0, readMsgIds: ["m1"], readNoteIds: [] },
    "Graham (Secretary)": { busChatCount: 0, readMsgIds: ["m1"], readNoteIds: [] }
  },

  awayFixtures: JSON.parse(localStorage.getItem("coxhoe_away_fixtures_v20")) || SEASON_AWAY_FIXTURES,
  awayRegistrations: JSON.parse(localStorage.getItem("coxhoe_away_regs_v20")) || [
    { fixtureId: "A-01", memberName: "Gary Miller", party: ["Gary Miller (Adult)", "Phoebe Miller (Child)"], allocated: true }
  ],

  masterAuditTrail: JSON.parse(localStorage.getItem("coxhoe_audit_v20")) || [
    { txnId: "TXN-1001", timestamp: "2026-10-25 10:00:00", actor: "Gary Miller", role: "Member", target: "Branch", category: "SUBS_DUES", desc: "Annual Membership Subs 2026/27 (Adult)", debit: 10.00, credit: 0, branchImpact: 10.00, balanceAfter: 35.00 }
  ],

  // 40-Team Scratch Card State
  footballCard: JSON.parse(localStorage.getItem("coxhoe_football_card_v20")) || DEFAULT_40_TEAMS.map(function(t, idx) {
    return { id: idx + 1, team: t, price: 2.00, claimedBy: (idx === 0 ? "Gary Miller" : (idx === 6 ? "Graham Croft" : null)) };
  }),

  activeCardMeta: JSON.parse(localStorage.getItem("coxhoe_card_meta_v20")) || {
    cardId: 1,
    title: "Matchday 40-Team Scratch Card #1",
    status: "active",
    pricePerTeam: 2.00,
    winnerPrize: 40.00,
    branchPrize: 40.00,
    winnerTeam: null,
    winnerMember: null
  },

  // White-Label Club Identity
  clubIdentity: JSON.parse(localStorage.getItem("coxhoe_club_identity_v20")) || {
    clubName: "Coxhoe Branch",
    subTitle: "Supporters Club",
    badgeInitials: "SAFC",
    crestLogoUrl: null
  },

  // Sectional Feature Toggles
  modules: JSON.parse(localStorage.getItem("coxhoe_modules_v20")) || {
    travel: true,
    awayTickets: true,
    fundraiser: true,
    commsBusChat: false,
    commsHelpdesk: true,
    duesAndPass: true
  }
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
  localStorage.setItem("coxhoe_dms_v20", JSON.stringify(appState.directMessages));
  localStorage.setItem("coxhoe_moderation_v20", JSON.stringify(appState.moderation));
  localStorage.setItem("coxhoe_helpdesk_v20", JSON.stringify(appState.helpdeskTickets));
  localStorage.setItem("coxhoe_read_tracker_v20", JSON.stringify(appState.readTracker));
  localStorage.setItem("coxhoe_away_fixtures_v20", JSON.stringify(appState.awayFixtures));
  localStorage.setItem("coxhoe_away_regs_v20", JSON.stringify(appState.awayRegistrations));
  localStorage.setItem("coxhoe_audit_v20", JSON.stringify(appState.masterAuditTrail));
  localStorage.setItem("coxhoe_football_card_v20", JSON.stringify(appState.footballCard));
  localStorage.setItem("coxhoe_card_meta_v20", JSON.stringify(appState.activeCardMeta));
  localStorage.setItem("coxhoe_club_identity_v20", JSON.stringify(appState.clubIdentity));
  localStorage.setItem("coxhoe_modules_v20", JSON.stringify(appState.modules));
}

// --- SUPABASE CLOUD HYDRATION & REALTIME DISPATCHER ---
async function initSupabaseCloudSync() {
  if (!sbClient) return;

  try {
    var mRes = await sbClient.from("members").select("*");
    if (mRes.data && mRes.data.length > 0) {
      appState.users = mRes.data.map(function(row) {
        return {
          id: row.id,
          memberNo: row.member_no,
          name: row.name,
          nickname: row.nickname,
          category: row.category,
          balance: parseFloat(row.balance) || 0,
          registeredDaysAgo: row.registered_days_ago || 30,
          messagingAllowed: row.messaging_allowed !== false,
          membershipStatus: row.membership_status || "active",
          membershipTier: row.membership_tier || "Adult",
          membershipSeason: row.membership_season || "2026/27",
          validUntil: row.valid_until || "2027-07-31",
          hasAppAccount: true
        };
      });
    }

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

    saveState();
    window.refreshAllViews();

    sbClient
      .channel("branch-master-sync")
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
      .on("postgres_changes", { event: "*", schema: "public", table: "members" }, function(payload) {
        if (payload.new && payload.new.member_no) {
          var m = appState.users.find(function(u) { return u.memberNo === payload.new.member_no; });
          if (m) {
            m.balance = parseFloat(payload.new.balance) || 0;
            m.membershipStatus = payload.new.membership_status || m.membershipStatus;
            saveState();
            window.updateBalanceDisplay();
            window.refreshAllViews();
          }
        }
      })
      .subscribe();
  } catch (syncErr) {
    console.warn("Supabase Realtime initial connection fallback:", syncErr);
  }
}

// --- USER & AUTH UTILITIES ---
function getCurrentUserRecord() {
  var curName = (typeof appState.currentUser === "string") ? appState.currentUser : (appState.currentUser ? appState.currentUser.name : "Gary Miller");
  var found = appState.users.find(function(u) { return u.name.toLowerCase() === curName.toLowerCase(); });
  if (!found) {
    found = { id: Date.now(), name: curName, memberNo: "COX-084", category: "Adult", hasAppAccount: true, balance: 35.00, registeredDaysAgo: 1, messagingAllowed: true, membershipStatus: "active", membershipTier: "Adult", membershipSeason: "2026/27", validUntil: "2027-07-31" };
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
  var hudBal = document.getElementById("hud-wallet-balance");
  if (hudBal && user) {
    hudBal.textContent = "£" + user.balance.toFixed(2);
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
    }]).then(function() {});
  }
}

function checkChildCompliance(user) {
  if (user.category !== "Child") return { compliant: true };
  var hasParent = appState.friendsAndFamily.some(function(f) {
    return (f.owner === user.name && f.relation === "Parent" && f.status === "approved") ||
           (f.targetName === user.name && (f.relation === "Daughter" || f.relation === "Son" || f.relation === "Child") && f.status === "approved");
  });
  if (hasParent) return { compliant: true, linkedParent: true };
  var daysRemaining = 7 - (user.registeredDaysAgo || 0);
  if (daysRemaining <= 0) return { compliant: false, deactivated: true, daysPast: Math.abs(daysRemaining) };
  return { compliant: true, pendingWarning: true, daysRemaining: daysRemaining };
}

function verifyMembershipAccess(actionName) {
  if (!appState.duesConfig.enforceDuesGate) return true;
  var user = getCurrentUserRecord();
  if (user.membershipStatus === "lapsed") {
    alert("⛔ ACCESS RESTRICTED: Annual Membership Overdue\n\nYour " + appState.duesConfig.activeSeason + " membership subs must be settled before you can " + actionName + ".\n\nPlease renew via the Home HUD or My Pass tab.");
    return false;
  }
  return true;
}

// --- COMMS DUAL-BADGE ENGINE ---
function computeUserBadges(userName, role) {
  if (!appState.readTracker[userName]) {
    appState.readTracker[userName] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
  }
  var tracker = appState.readTracker[userName];
  if (!tracker.readMsgIds) tracker.readMsgIds = [];
  if (!tracker.readNoteIds) tracker.readNoteIds = [];

  var redCount = 0;
  if (appState.modules && appState.modules.commsBusChat) {
    var totalChat = (appState.matchdayChat || []).length;
    if (totalChat > tracker.busChatCount) {
      redCount += (totalChat - tracker.busChatCount);
    }
  }

  if (appState.modules && appState.modules.commsHelpdesk && appState.helpdeskTickets) {
    appState.helpdeskTickets.forEach(function(t) {
      (t.messages || []).forEach(function(m) {
        if (m.sender !== userName && m.sender.indexOf(userName) === -1) {
          var isForMe = (role === "admin") ? true : (t.member && t.member.indexOf(userName) !== -1);
          if (isForMe && tracker.readMsgIds.indexOf(m.id) === -1) {
            redCount++;
          }
        }
      });
    });
  }

  var goldCount = 0;
  if (role === "admin" && appState.modules && appState.modules.commsHelpdesk && appState.helpdeskTickets) {
    appState.helpdeskTickets.forEach(function(t) {
      (t.internalNotes || []).forEach(function(note) {
        if (note.author !== userName && tracker.readNoteIds.indexOf(note.id) === -1) {
          goldCount++;
        }
      });
    });
  }

  return { red: redCount, gold: goldCount };
}

function updateCommsBadge() {
  var user = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var role = appState.currentUser ? appState.currentUser.role : "member";
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
  if (subBusBadge) {
    var totalChat = (appState.matchdayChat || []).length;
    var userReadChat = appState.readTracker[user] ? appState.readTracker[user].busChatCount : 0;
    var unreadChat = Math.max(0, totalChat - userReadChat);
    subBusBadge.textContent = unreadChat;
    subBusBadge.style.display = (unreadChat > 0 && appState.modules && appState.modules.commsBusChat) ? "inline-block" : "none";
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
  var adminReqs = (appState.pendingLinkRequests || []).filter(function(r) { return r.status === "pending_admin"; });
  var pendingVotes = (appState.moderation && appState.moderation.incidents || []).filter(function(inc) {
    return inc.status === "active_ban" && (!inc.votes || !inc.votes[appState.currentUser.name]);
  });
  var totalAdminTasks = adminReqs.length + pendingVotes.length;
  var badge = document.getElementById("admin-panel-badge");
  if (badge) {
    badge.textContent = totalAdminTasks;
    badge.style.display = (totalAdminTasks > 0 && appState.currentUser && appState.currentUser.role === "admin") ? "inline-block" : "none";
  }
}

// --- AUTH & NAVIGATION ---
window.setUserSession = function(name, role, memberNo) {
  var matched = appState.users.find(function(u) { return u.name.toLowerCase() === name.toLowerCase(); });
  var category = matched ? matched.category : "Adult";
  appState.currentUser = { name: name, role: role, memberNo: memberNo || "COX-084", category: category };
  var userRecord = getCurrentUserRecord();

  var compliance = checkChildCompliance(userRecord);
  var deactBanner = document.getElementById("child-deactivated-guard");
  if (!compliance.compliant && compliance.deactivated) {
    deactBanner.style.display = "block";
    document.getElementById("deact-msg").textContent = "Account Locked: " + name + " requires a verified parent linkage. Link a parent via Friends & Family to activate.";
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

  window.applyAppModules();
  window.applyClubIdentity();
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
  views.forEach(function(v) { v.classList.remove("active"); });
  document.getElementById("view-login").classList.add("active");
};

window.switchTab = function(viewId, btn) {
  var views = document.querySelectorAll(".tab-view");
  views.forEach(function(v) { v.classList.remove("active"); });
  var target = document.getElementById(viewId);
  if (target) target.classList.add("active");

  var items = document.querySelectorAll(".nav-item");
  items.forEach(function(item) { item.classList.remove("active"); });
  if (btn) btn.classList.add("active");

  if (viewId === "view-comms") {
    var user = appState.currentUser ? appState.currentUser.name : "Gary Miller";
    if (!appState.readTracker[user]) appState.readTracker[user] = { busChatCount: 0, readMsgIds: [], readNoteIds: [] };
    appState.readTracker[user].busChatCount = (appState.matchdayChat || []).length;
    saveState();
    updateCommsBadge();
  }
  window.refreshAllViews();
};

window.refreshAllViews = function() {
  window.updateBalanceDisplay();
  if (typeof renderHUDView === "function") renderHUDView();
  if (typeof renderBusBookingView === "function") renderBusBookingView();
  if (typeof renderMemberAwayView === "function") renderMemberAwayView();
  if (typeof renderFootballGrid === "function") renderFootballGrid();
  if (typeof renderFriendsFamilyChecklist === "function") renderFriendsFamilyChecklist();
  if (typeof renderProfilePassView === "function") renderProfilePassView();
  if (typeof renderWalletStatement === "function") renderWalletStatement();
  if (typeof renderCommsTabs === "function") renderCommsTabs();
  if (typeof applyClubIdentity === "function") applyClubIdentity();
  if (typeof applyAppModules === "function") applyAppModules();
  updateCommsBadge();
};

// --- WHITE-LABEL BRANDING & SECTIONAL MODULES ---
window.applyClubIdentity = function() {
  if (!appState || !appState.clubIdentity) return;
  var id = appState.clubIdentity;

  var crestElem = document.getElementById("header-crest-badge");
  var titleElem = document.getElementById("header-brand-title");
  var subElem = document.getElementById("header-brand-sub");

  if (crestElem) {
    if (id.crestLogoUrl) {
      crestElem.innerHTML = "<img src='" + id.crestLogoUrl + "' style='width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;' alt='Club Crest' />";
      crestElem.style.padding = "0";
      crestElem.style.overflow = "hidden";
      crestElem.style.background = "#0f172a";
      crestElem.style.border = "2px solid var(--safc-gold, #facc15)";
    } else {
      crestElem.innerHTML = id.badgeInitials || "SAFC";
      crestElem.style.padding = "";
      crestElem.style.overflow = "";
      crestElem.style.background = "";
      crestElem.style.border = "2px solid var(--safc-gold, #facc15)";
    }
  }

  if (titleElem && id.clubName) titleElem.textContent = id.clubName;
  if (subElem && id.subTitle) subElem.textContent = id.subTitle;
  document.title = (id.clubName || "Club Portal") + " - " + (id.badgeInitials || "Branch");
};

window.applyAppModules = function() {
  if (!appState || !appState.modules) return;
  var mods = appState.modules;

  var navTravel = document.getElementById("nav-travel");
  var navFundraiser = document.getElementById("nav-fundraiser");
  var navComms = document.getElementById("nav-comms");
  var navProfile = document.getElementById("nav-profile");

  if (navTravel) navTravel.style.display = mods.travel ? "flex" : "none";
  if (navFundraiser) navFundraiser.style.display = mods.fundraiser ? "flex" : "none";
  if (navProfile) navProfile.style.display = mods.duesAndPass ? "flex" : "none";

  var commsAny = mods.commsBusChat || mods.commsHelpdesk;
  if (navComms) navComms.style.display = commsAny ? "flex" : "none";

  var navItems = document.querySelectorAll(".bottom-nav .nav-item");
  navItems.forEach(function(item) {
    item.style.flex = "1";
    item.style.width = "auto";
  });

  var hudFundraiserCard = document.getElementById("hud-card-fundraiser-pulse");
  if (hudFundraiserCard) hudFundraiserCard.style.display = mods.fundraiser ? "block" : "none";

  var hudTravelCard = document.getElementById("hud-travel-card-status");
  if (hudTravelCard && !mods.travel) hudTravelCard.style.display = "none";

  var awayCard = document.getElementById("member-away-status-card");
  if (awayCard && awayCard.parentElement) awayCard.parentElement.style.display = mods.awayTickets ? "block" : "none";

  var btnBus = document.getElementById("btn-sub-bus");
  var btnDesk = document.getElementById("btn-sub-desk");

  if (btnBus) btnBus.style.display = mods.commsBusChat ? "block" : "none";
  if (btnDesk) btnDesk.style.display = mods.commsHelpdesk ? "block" : "none";

  if (!mods.commsBusChat && mods.commsHelpdesk) {
    if (typeof switchCommsSubTab === "function") switchCommsSubTab("desk");
  } else if (mods.commsBusChat && !mods.commsHelpdesk) {
    if (typeof switchCommsSubTab === "function") switchCommsSubTab("bus");
  }
};

window.renderAdminModulesManager = function() {
  var container = document.getElementById("admin-modules-switches-container");
  if (!container || !appState) return;

  var mods = appState.modules || {};
  var id = appState.clubIdentity || { clubName: "Coxhoe Branch", subTitle: "Supporters Club", badgeInitials: "SAFC", crestLogoUrl: null };
  var currentLogo = id.crestLogoUrl;

  var html = 
    "<div class='admin-card' style='background:#0f172a; border:1px solid #334155; border-radius:8px; padding:12px; margin-bottom:12px;'>" +
      "<strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:4px;'>🏢 Club & Branch Identity (White-Label)</strong>" +
      "<p class='text-xs text-muted mb-2'>Re-skin header branding and upload official club crest logo.</p>" +

      "<div style='background:#1e293b; padding:10px; border-radius:6px; margin-bottom:10px; border:1px solid #334155;'>" +
        "<label class='form-label' style='font-size:10px; color:var(--safc-gold); margin-bottom:6px;'>Club Crest Photo</label>" +
        "<div style='display:flex; align-items:center; gap:12px;'>" +
          "<div id='admin-crest-preview-box' style='width:52px; height:52px; border-radius:50%; border:2px solid var(--safc-gold); background:#0f172a; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0;'>" +
            (currentLogo 
              ? "<img id='admin-crest-preview-img' src='" + currentLogo + "' style='width:100%; height:100%; object-fit:cover;' alt='Crest Preview' />"
              : "<span style='font-weight:900; font-size:12px; color:var(--safc-gold);'>SAFC</span>") +
          "</div>" +
          "<div style='flex:1;'>" +
            "<input type='file' id='admin-crest-file-input' accept='image/*' style='display:none;' onchange='window.handleClubCrestUpload(event)' />" +
            "<div style='display:flex; gap:6px;'>" +
              "<button type='button' class='btn btn-outline btn-sm' style='font-size:10px; padding:4px 8px;' onclick='document.getElementById(\"admin-crest-file-input\").click()'>📷 Upload Photo</button>" +
              (currentLogo ? "<button type='button' class='btn btn-outline btn-sm' style='font-size:10px; padding:4px 8px; color:#ef4444; border-color:#ef4444;' onclick='window.removeClubCrestPhoto()'>Remove</button>" : "") +
            "</div>" +
            "<span style='font-size:9px; color:#94a3b8; display:block; margin-top:4px;'>PNG, JPG or SVG (Max 2MB). Fits circular crest.</span>" +
          "</div>" +
        "</div>" +
      "</div>" +

      "<div class='form-group' style='margin-bottom:6px;'>" +
        "<label class='form-label' style='font-size:9px;'>Club / Branch Name</label>" +
        "<input type='text' id='admin-branding-name' class='form-input' value='" + (id.clubName || "") + "' style='padding:6px; font-size:11px;' />" +
      "</div>" +

      "<div class='form-group' style='margin-bottom:8px;'>" +
        "<label class='form-label' style='font-size:9px;'>Sub-Heading / Tagline</label>" +
        "<input type='text' id='admin-branding-sub' class='form-input' value='" + (id.subTitle || "") + "' style='padding:6px; font-size:11px;' />" +
      "</div>" +

      "<button class='btn btn-gold btn-sm' style='width:100%; font-size:10px;' onclick='window.saveClubBranding()'>💾 Save Club Identity</button>" +
    "</div>" +

    "<strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:6px;'>🧩 Functional Feature Toggles</strong>";

  var moduleDefs = [
    { key: "travel", icon: "🚌", title: "Coach Travel & Bus Fleet", desc: "Manages matchday coach booking, parties, stops, and manifest door check-in." },
    { key: "awayTickets", icon: "🎟️", title: "Away Match Tickets", desc: "Allows members to submit expressions of interest for club away ticket ballots." },
    { key: "fundraiser", icon: "⚽", title: "Matchday Scratch Card (Fundraiser)", desc: "40-team multi-selection card with 50/50 prize splitting and winner reveals." },
    { key: "commsBusChat", icon: "💬", title: "Matchday Bus Chat", desc: "Passenger chatter tethered to active fixture with 24h auto-expiry." },
    { key: "commsHelpdesk", icon: "🛡️", title: "Committee Helpdesk & Mailbox", desc: "Member query routing with dual red/gold notification badges." },
    { key: "duesAndPass", icon: "🪪", title: "Membership Passes & Wallet Ledger", desc: "Digital cards, annual dues renewal gates, and audit trail statements." }
  ];

  moduleDefs.forEach(function(mod) {
    var isEnabled = !!mods[mod.key];
    html += 
      "<div class='admin-card' style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:10px 12px; margin-bottom:8px; border-left:3px solid " + (isEnabled ? "var(--green)" : "#475569") + ";'>" +
        "<div style='flex:1; padding-right:12px;'>" +
          "<div style='display:flex; align-items:center; gap:6px;'><span style='font-size:14px;'>" + mod.icon + "</span><strong style='font-size:12px; color:#fff;'>" + mod.title + "</strong></div>" +
          "<p style='font-size:10px; color:#94a3b8; margin:3px 0 0 0; line-height:1.4;'>" + mod.desc + "</p>" +
        "</div>" +
        "<div><button class='btn btn-sm " + (isEnabled ? "btn-gold" : "btn-outline") + "' style='min-width:70px; font-weight:800; font-size:10px; padding:6px 8px; border-color:" + (isEnabled ? "var(--safc-gold)" : "#64748b") + "; color:" + (isEnabled ? "#000" : "#94a3b8") + ";' onclick='window.toggleAppModule(\"" + mod.key + "\")'>" + (isEnabled ? "✓ ACTIVE" : "OFF") + "</button></div>" +
      "</div>";
  });

  container.innerHTML = html;
};

window.handleClubCrestUpload = function(event) {
  var file = event.target.files && event.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) { alert("Please select a crest image smaller than 2MB."); return; }

  var reader = new FileReader();
  reader.onload = function(e) {
    appState.clubIdentity.crestLogoUrl = e.target.result;
    saveState();
    window.applyClubIdentity();
    window.renderAdminModulesManager();
  };
  reader.readAsDataURL(file);
};

window.removeClubCrestPhoto = function() {
  appState.clubIdentity.crestLogoUrl = null;
  saveState();
  window.applyClubIdentity();
  window.renderAdminModulesManager();
};

window.saveClubBranding = function() {
  var nameInput = document.getElementById("admin-branding-name");
  var subInput = document.getElementById("admin-branding-sub");

  if (!appState.clubIdentity) appState.clubIdentity = {};
  appState.clubIdentity.clubName = nameInput ? nameInput.value.trim() : "Coxhoe Branch";
  appState.clubIdentity.subTitle = subInput ? subInput.value.trim() : "Supporters Club";

  saveState();
  window.applyClubIdentity();
  window.renderAdminModulesManager();
  alert("✓ Club branding saved! Header and badge updated.");
};

window.toggleAppModule = function(moduleKey) {
  if (!appState || !appState.modules) return;
  appState.modules[moduleKey] = !appState.modules[moduleKey];
  saveState();
  window.applyAppModules();
  window.renderAdminModulesManager();
  updateCommsBadge();
};

// --- MASTER ADMIN ROUTER ---
var activeAdminTool = "modules";

window.openAdminDrawer = function() {
  var drawer = document.getElementById("admin-drawer");
  if (drawer) {
    drawer.style.display = "block";
    drawer.classList.remove("hidden");
  }
  var sel = document.getElementById("admin-tool-select");
  var currentTool = (sel && sel.value) ? sel.value : "modules";
  window.switchAdminTool(currentTool);
};

window.closeAdminDrawer = function() {
  var drawer = document.getElementById("admin-drawer");
  if (drawer) {
    drawer.style.display = "none";
    drawer.classList.add("hidden");
  }
};

window.switchAdminTool = function(toolId) {
  if (!toolId) toolId = "modules";
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
    case "modules":
      window.renderAdminModulesManager();
      break;
    case "buses":
      window.renderAdminBusesTool();
      break;
    case "subs":
      window.renderAdminSubs();
      break;
    case "approvals":
      window.renderAdminApprovals();
      break;
    case "treasury":
      window.renderAdminTreasury();
      break;
    case "awaytickets":
      window.renderAdminAwayFixture();
      break;
    case "news":
      window.renderAdminNews();
      break;
    case "footballcard":
      window.renderAdminFootballCardManager();
      break;
    case "disciplinary":
      window.renderAdminDisciplinary();
      break;
  }
}

// --- PANE 1: BUSES, ROUTES & DOOR MANIFEST ---
function healOrphanedPassengerBookings() {
  if (!appState || !appState.homeMatches || !appState.bookings) return;
  var fixedCount = 0;

  appState.homeMatches.forEach(function(match) {
    if (!match.buses) return;
    match.buses.forEach(function(bus) {
      var validStops = (bus.stops && bus.stops.length > 0) ? bus.stops.map(function(s) { return s.name.trim().toLowerCase(); }) : [];
      if (validStops.length === 0) return;

      var matchBookings = appState.bookings.filter(function(b) {
        return String(b.matchId) === String(match.id) && (b.busId || 1) === (bus.busId || 1);
      });

      matchBookings.forEach(function(b) {
        var cleanBookingStop = b.stop ? b.stop.split("(")[0].trim().toLowerCase() : "";
        if (validStops.indexOf(cleanBookingStop) === -1) {
          b.stop = bus.stops[0].name;
          fixedCount++;
        }
      });
    });
  });

  if (fixedCount > 0) saveState();
}

window.renderAdminBusesTool = function() {
  healOrphanedPassengerBookings();

  var matchSelect = document.getElementById("admin-bus-match-select");
  var busesContainer = document.getElementById("admin-match-buses-container");
  if (!matchSelect || !busesContainer) return;

  var currentVal = matchSelect.value || appState.selectedHomeMatchId;
  matchSelect.innerHTML = "";
  appState.homeMatches.forEach(function(m) {
    var opt = document.createElement("option");
    opt.value = m.id;
    var statusTag = (m.bookingStatus === "open") ? "🟢 Open" : "⚪ Draft";
    opt.textContent = m.opponent + " (H) • " + m.date + " [" + statusTag + "]";
    if (String(m.id) === String(currentVal)) opt.selected = true;
    matchSelect.appendChild(opt);
  });

  if (!matchSelect.value && appState.homeMatches.length > 0) matchSelect.value = appState.homeMatches[0].id;
  var selectedMatch = appState.homeMatches.find(function(m) { return String(m.id) === String(matchSelect.value); }) || appState.homeMatches[0];

  busesContainer.innerHTML = "";
  if (!selectedMatch.buses || selectedMatch.buses.length === 0) {
    selectedMatch.buses = [{
      busId: 1, title: "Bus 1 (Main Village Route)", subtitle: "Official Branch Travel • Stadium of Light",
      capacity: 53, adultFare: 12.00, juniorFare: 8.00, isFreeBus: false, stops: JSON.parse(JSON.stringify(DEFAULT_STOPS))
    }];
  }

  var isOpen = (selectedMatch.bookingStatus === "open");
  var statusCard = 
    "<div id='admin-staging-status-box' style='background:#0f172a; border:1px solid #334155; border-left:3px solid " + (isOpen ? "var(--green)" : "var(--safc-gold)") + "; padding:10px; border-radius:6px; margin-bottom:10px;'>" +
      "<div style='display:flex; justify-content:space-between; align-items:center;'>" +
        "<div><strong style='font-size:11px;'>Booking Status:</strong> <span style='display:inline-block; padding:2px 8px; border-radius:999px; font-size:10px; font-weight:700; background:" + (isOpen ? "#065f46; color:#34d399;" : "#334155; color:#94a3b8;") + "'>" + (isOpen ? "🟢 OPEN FOR BOOKING" : "⚪ DRAFT (Closed)") + "</span></div>" +
        "<button class='btn btn-outline btn-sm' style='font-size:10px; padding:3px 8px;' onclick='window.adminToggleBookingStatus(\"" + selectedMatch.id + "\")'>" + (isOpen ? "Switch to Draft ⚪" : "Open for Booking 🟢") + "</button>" +
      "</div>" +
      "<div style='font-size:10px; color:#94a3b8; margin-top:4px;'>" + (isOpen ? "✓ Members can view and book coach seats for this fixture." : "Members cannot book travel while set to Draft.") + "</div>" +
    "</div>";
  busesContainer.insertAdjacentHTML("beforeend", statusCard);

  selectedMatch.buses.forEach(function(bus, idx) {
    var card = document.createElement("div");
    card.className = "admin-card mt-2";
    
    var stopsHtml = "";
    (bus.stops || DEFAULT_STOPS).forEach(function(s, sIdx) {
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
        (selectedMatch.buses.length > 1 ? "<button class='btn btn-outline btn-sm' style='padding:2px 6px; font-size:9px; color:#ef4444; border-color:#ef4444;' onclick='window.adminRemoveBus(\"" + selectedMatch.id + "\", " + idx + ")'>Remove Bus</button>" : "") +
      "</div>" +
      "<div class='form-group mt-2'><label class='form-label'>Bus Name (Title)</label><input type='text' class='form-input' value='" + bus.title + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"title\", this.value)' /></div>" +
      "<div class='form-group'><label class='form-label'>Subtitle / Route Note</label><input type='text' class='form-input' value='" + bus.subtitle + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"subtitle\", this.value)' /></div>" +
      "<div style='display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:8px;'>" +
        "<div><label class='form-label'>Capacity</label><input type='number' class='form-input' min='10' max='85' value='" + bus.capacity + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"capacity\", parseInt(this.value)||53)' /></div>" +
        "<div><label class='form-label'>Adult Fare (£)</label><input type='number' class='form-input' step='0.50' value='" + bus.adultFare + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"adultFare\", parseFloat(this.value)||12)' /></div>" +
        "<div><label class='form-label'>Junior Fare (£)</label><input type='number' class='form-input' step='0.50' value='" + bus.juniorFare + "' onchange='window.updateBusField(\"" + selectedMatch.id + "\", " + idx + ", \"juniorFare\", parseFloat(this.value)||8)' /></div>" +
      "</div>" +
      "<div style='border-top:1px solid #334155; padding-top:8px;'>" +
        "<div class='flex-between mb-2'><label class='form-label' style='margin-bottom:0;'>Timetable Stops for " + bus.title + "</label><button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:9px;' onclick='window.addStopToBus(\"" + selectedMatch.id + "\", " + idx + ")'>+ Add Stop</button></div>" +
        "<div>" + stopsHtml + "</div>" +
      "</div>";

    busesContainer.appendChild(card);
  });

  renderAdminAllocationPreviewForMatch(selectedMatch);
  renderAdminManifestForMatch(selectedMatch);
};

window.adminToggleBookingStatus = function(matchId) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (!match) return;
  match.bookingStatus = (match.bookingStatus === "open") ? "draft" : "open";
  saveState();
  window.renderAdminBusesTool();
  window.renderBusBookingView();
};

window.updateBusField = function(matchId, busIdx, field, val) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (match && match.buses && match.buses[busIdx]) {
    match.buses[busIdx][field] = val;
    saveState();
    renderBusBookingView();
    renderHUDView();
  }
};

window.updateBusStopField = function(matchId, busIdx, stopIdx, field, val) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (match && match.buses && match.buses[busIdx] && match.buses[busIdx].stops && match.buses[busIdx].stops[stopIdx]) {
    var oldVal = match.buses[busIdx].stops[stopIdx][field];
    match.buses[busIdx].stops[stopIdx][field] = val;

    if (field === "name" && oldVal && oldVal.trim() !== val.trim()) {
      var oldClean = oldVal.split("(")[0].trim().toLowerCase();
      var targetBusId = match.buses[busIdx].busId || (busIdx + 1);

      appState.bookings.forEach(function(b) {
        if (String(b.matchId) === String(matchId) && (b.busId || 1) === targetBusId && b.stop) {
          var bookingClean = b.stop.split("(")[0].trim().toLowerCase();
          if (bookingClean === oldClean) b.stop = val.trim();
        }
      });
    }

    saveState();
    renderBusBookingView();
    renderAdminManifestForMatch(match);
  }
};

window.addStopToBus = function(matchId, busIdx) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (match && match.buses && match.buses[busIdx]) {
    if (!match.buses[busIdx].stops) match.buses[busIdx].stops = JSON.parse(JSON.stringify(DEFAULT_STOPS));
    match.buses[busIdx].stops.push({ id: Date.now(), name: "New Village Stop", time: "12:30" });
    saveState();
    window.renderAdminBusesTool();
    renderBusBookingView();
  }
};

window.deleteStopFromBus = function(matchId, busIdx, stopIdx) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (!match || !match.buses || !match.buses[busIdx] || !match.buses[busIdx].stops) return;

  var stops = match.buses[busIdx].stops;
  if (stops.length <= 1) {
    alert("⚠️ A bus must have at least one pickup stop.");
    return;
  }

  var deletedStop = stops[stopIdx];
  var deletedStopName = deletedStop.name.split("(")[0].trim().toLowerCase();
  stops.splice(stopIdx, 1);

  var replacementStop = stops[0].name;
  var targetBusId = match.buses[busIdx].busId || (busIdx + 1);
  var count = 0;

  appState.bookings.forEach(function(b) {
    if (String(b.matchId) === String(matchId) && (b.busId || 1) === targetBusId && b.stop) {
      if (b.stop.split("(")[0].trim().toLowerCase() === deletedStopName) {
        b.stop = replacementStop;
        count++;
      }
    }
  });

  saveState();
  window.renderAdminBusesTool();
  renderBusBookingView();
  if (count > 0) alert("✓ Stop removed. " + count + " passenger(s) reassigned to '" + replacementStop + "'.");
};

window.adminAddBusToSelectedMatch = function() {
  var matchSelect = document.getElementById("admin-bus-match-select");
  var matchId = matchSelect ? matchSelect.value : appState.selectedHomeMatchId;
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (!match) return;

  var newIndex = (match.buses || []).length + 1;
  match.buses.push({
    busId: newIndex, title: "Bus " + newIndex + " (Auxiliary Route)", subtitle: "Official Branch Travel • Stadium of Light",
    capacity: 53, adultFare: 12.00, juniorFare: 8.00, isFreeBus: false, stops: JSON.parse(JSON.stringify(DEFAULT_STOPS))
  });

  saveState();
  window.renderAdminBusesTool();
  renderBusBookingView();
  alert("✓ Bus " + newIndex + " added to fleet.");
};

window.adminRemoveBus = function(matchId, busIdx) {
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(matchId); });
  if (!match || !match.buses || match.buses.length <= 1) return;

  if (confirm("Remove this bus from Sunderland vs " + match.opponent + "?")) {
    match.buses.splice(busIdx, 1);
    saveState();
    window.renderAdminBusesTool();
    renderBusBookingView();
  }
};

function renderAdminAllocationPreviewForMatch(match) {
  var summaryBox = document.getElementById("admin-allocation-status-summary");
  if (!summaryBox) return;

  var matchBookings = appState.bookings.filter(function(b) { return String(b.matchId) === String(match.id); });
  var totalBooked = 0;
  matchBookings.forEach(function(b) { totalBooked += ((b.adults || 0) + (b.juniors || 0)); });

  var totalCap = 0;
  (match.buses || []).forEach(function(b) { totalCap += (b.capacity || 53); });

  summaryBox.innerHTML = 
    "<div class='flex-between'><strong>Match: Sunderland vs " + match.opponent + "</strong><span style='color:var(--green); font-weight:800; font-size:10px;'>🟢 Auto-Scheduled T-24h</span></div>" +
    "<div style='background:#1e293b; padding:8px; border-radius:6px; margin-top:6px; font-size:10px; line-height:1.6;'>" +
      "• Total Bookings Registered: <strong>" + totalBooked + " Seats</strong> (Total Capacity: " + totalCap + ")<br>" +
      "• Safety Cushion: <strong>2 Seats Reserved for Committee</strong>" +
    "</div>";
}

window.adminRunAllocationBackup = function() {
  alert("⚡ Early cutoff override executed and logged to master ledger.");
};

// --- OFFLINE DOOR CHECK-IN QUEUE ---
window._offlineBoardingQueue = JSON.parse(localStorage.getItem("safc_boarding_queue") || "[]");

function updateManifestSyncIndicator() {
  var ind = document.getElementById("manifest-sync-indicator");
  if (!ind) return;
  var qLen = (window._offlineBoardingQueue || []).length;
  if (!navigator.onLine) {
    ind.style.color = "#f87171";
    ind.innerHTML = "⚠️ Offline Door Mode (" + qLen + " action" + (qLen === 1 ? "" : "s") + " queued)";
  } else if (qLen > 0) {
    ind.style.color = "var(--safc-gold)";
    ind.innerHTML = "⏳ Syncing " + qLen + " queued check-in" + (qLen === 1 ? "" : "s") + "...";
  } else {
    ind.style.color = "var(--green)";
    ind.innerHTML = "● Cloud Connected (Realtime Sync)";
  }
}

window.flushOfflineBoardingQueue = async function() {
  if (!navigator.onLine || !sbClient || !window._offlineBoardingQueue || window._offlineBoardingQueue.length === 0) {
    updateManifestSyncIndicator();
    return;
  }

  var queue = window._offlineBoardingQueue.slice();
  while (queue.length > 0) {
    var item = queue[0];
    try {
      var res = await sbClient.from("bus_bookings").update({ boarded: item.boarded }).eq("id", item.id);
      if (res.error) throw res.error;
      queue.shift();
      window._offlineBoardingQueue = queue;
      localStorage.setItem("safc_boarding_queue", JSON.stringify(queue));
      updateManifestSyncIndicator();
    } catch (err) {
      break;
    }
  }
  updateManifestSyncIndicator();
};

window.addEventListener("online", function() { updateManifestSyncIndicator(); window.flushOfflineBoardingQueue(); });
window.addEventListener("offline", function() { updateManifestSyncIndicator(); });

function populateManifestStopFilter(match) {
  var stopSelect = document.getElementById("manifest-stop-filter");
  if (!stopSelect) return;
  var currentVal = stopSelect.value || "ALL";

  var stops = [];
  if (match && match.buses) {
    match.buses.forEach(function(b) {
      (b.stops || DEFAULT_STOPS).forEach(function(s) {
        if (s.name && stops.indexOf(s.name.trim()) === -1) stops.push(s.name.trim());
      });
    });
  }

  stopSelect.innerHTML = "<option value='ALL'>All Pickup Stops</option>";
  stops.forEach(function(stName) {
    var opt = document.createElement("option");
    opt.value = stName;
    opt.textContent = stName;
    if (stName === currentVal) opt.selected = true;
    stopSelect.appendChild(opt);
  });
}

function renderAdminManifestForMatch(match) {
  if (!match) {
    var matchSelect = document.getElementById("admin-bus-match-select");
    var mId = matchSelect ? matchSelect.value : appState.selectedHomeMatchId;
    match = appState.homeMatches.find(function(m) { return String(m.id) === String(mId); }) || appState.homeMatches[0];
  }
  if (!match) return;

  populateManifestStopFilter(match);
  window.filterAdminManifest(match);
}

window.filterAdminManifest = function(match) {
  if (!match) {
    var matchSelect = document.getElementById("admin-bus-match-select");
    var mId = matchSelect ? matchSelect.value : appState.selectedHomeMatchId;
    match = appState.homeMatches.find(function(m) { return String(m.id) === String(mId); }) || appState.homeMatches[0];
  }
  if (!match) return;

  var container = document.getElementById("admin-manifest-summary");
  if (!container) return;

  updateManifestSyncIndicator();

  var searchInput = document.getElementById("manifest-search-input");
  var stopFilter = document.getElementById("manifest-stop-filter");
  var statusFilter = document.getElementById("manifest-status-filter");

  var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  var selectedStop = stopFilter ? stopFilter.value : "ALL";
  var selectedStatus = statusFilter ? statusFilter.value : "UNBOARDED";

  var matchBookings = appState.bookings.filter(function(b) { return String(b.matchId) === String(match.id); });
  var totalPassengers = 0;
  var boardedCount = 0;

  matchBookings.forEach(function(b) {
    var count = (b.adults || 0) + (b.juniors || 0);
    totalPassengers += count;
    if (b.boarded) boardedCount += count;
  });

  var totalCap = 0;
  (match.buses || []).forEach(function(b) { totalCap += (b.capacity || 53); });
  var unboardedCount = totalPassengers - boardedCount;

  var headerHtml = 
    "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:6px 10px; border-radius:6px; font-size:11px; margin-bottom:8px; border:1px solid #334155;'>" +
      "<span>Total: <strong>" + totalPassengers + " / " + totalCap + "</strong></span>" +
      "<span style='color:var(--safc-gold); font-weight:800;'>✓ " + boardedCount + " Boarded</span>" +
      "<span style='color:" + (unboardedCount > 0 ? "#f87171" : "var(--green)") + "; font-weight:700;'>⏳ " + unboardedCount + " Awaiting</span>" +
    "</div>";

  var filtered = matchBookings.filter(function(b) {
    if (query && b.name.toLowerCase().indexOf(query) === -1) return false;
    if (selectedStop !== "ALL") {
      var cleanStop = b.stop ? b.stop.split("(")[0].trim().toLowerCase() : "";
      if (cleanStop !== selectedStop.toLowerCase()) return false;
    }
    if (selectedStatus === "UNBOARDED" && b.boarded) return false;
    if (selectedStatus === "BOARDED" && !b.boarded) return false;
    return true;
  });

  var listHtml = "";
  if (filtered.length === 0) {
    listHtml = "<div class='text-xs text-muted' style='text-align:center; padding:12px; background:#0f172a; border-radius:6px;'>No passengers match active filter.</div>";
  } else {
    filtered.forEach(function(b) {
      var seats = (b.adults || 0) + (b.juniors || 0);
      var resolvedStop = getDynamicStopDisplay(match.id, b.busId, b.stop);
      listHtml += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:" + (b.boarded ? "#064e3b22" : "#1e293b") + "; border:1px solid " + (b.boarded ? "#10b98155" : "#334155") + "; padding:7px 10px; border-radius:6px; margin-bottom:5px; font-size:11px;'>" +
          "<div>" +
            "<strong style='color:#fff; font-size:12px;'>" + b.name + "</strong> <span style='color:var(--safc-gold); font-size:10px;'>(" + seats + " seat" + (seats > 1 ? "s" : "") + ")</span><br>" +
            "<span style='color:#94a3b8; font-size:10px;'>🚏 " + resolvedStop + " • Coach #" + (b.busId || 1) + "</span>" +
          "</div>" +
          "<button class='btn btn-sm " + (b.boarded ? "btn-outline" : "btn-gold") + "' style='padding:5px 10px; font-size:10px; min-width:80px; font-weight:800; border-color:" + (b.boarded ? "var(--green)" : "var(--safc-gold)") + "; color:" + (b.boarded ? "var(--green)" : "#000") + ";' onclick='window.toggleBoardedById(" + b.id + ")'>" +
            (b.boarded ? "✓ Boarded" : "Check In ➔") +
          "</button>" +
        "</div>";
    });
  }

  container.innerHTML = headerHtml + listHtml;
};

window.toggleBoardedById = function(bookingId) {
  var booking = appState.bookings.find(function(b) { return b.id === bookingId; });
  if (!booking) return;

  booking.boarded = !booking.boarded;
  saveState();

  var matchSelect = document.getElementById("admin-bus-match-select");
  var mId = matchSelect ? matchSelect.value : appState.selectedHomeMatchId;
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(mId); }) || appState.homeMatches[0];
  window.filterAdminManifest(match);
  if (typeof renderHUDView === "function") renderHUDView();

  if (!navigator.onLine || !sbClient) {
    window._offlineBoardingQueue.push({ id: booking.id, boarded: booking.boarded, timestamp: Date.now() });
    localStorage.setItem("safc_boarding_queue", JSON.stringify(window._offlineBoardingQueue));
    updateManifestSyncIndicator();
  } else {
    sbClient.from("bus_bookings").update({ boarded: booking.boarded }).eq("id", booking.id).then(function() {
      updateManifestSyncIndicator();
    });
  }
};

window.exportManifestCSV = function() {
  var matchSelect = document.getElementById("admin-bus-match-select");
  var mId = matchSelect ? matchSelect.value : appState.selectedHomeMatchId;
  var match = appState.homeMatches.find(function(m) { return String(m.id) === String(mId); }) || appState.homeMatches[0];
  var matchBookings = appState.bookings.filter(function(b) { return String(b.matchId) === String(match.id); });

  var csv = "Match,Passenger Name,Bus Assigned,Pickup Stop,Adults,Juniors,Total Paid,Boarded\n";
  matchBookings.forEach(function(b) {
    csv += '"Sunderland vs ' + match.opponent + '","' + b.name + '","Bus ' + (b.busId || 1) + '","' + b.stop + '",' + b.adults + ',' + b.juniors + ',£' + b.total.toFixed(2) + ',"' + (b.boarded ? "YES" : "NO") + '"\n';
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = "Coxhoe_Coach_Manifest_" + match.opponent + ".csv";
  a.click();
};

// --- PANE 2: MEMBERSHIP SUBS ROSTER ---
window.renderAdminSubs = function() {
  var container = document.getElementById("admin-subs-roster");
  if (!container || !appState || !appState.users) return;

  var total = appState.users.length;
  var active = appState.users.filter(function(u) { return u.membershipStatus === "active"; }).length;
  var overdue = total - active;

  var html = 
    "<div class='treasury-grid mb-2'>" +
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px;'>Active: <strong style='color:var(--green);'>" + active + "</strong></div>" +
      "<div style='background:#1e293b; padding:8px; border-radius:6px; font-size:11px;'>Overdue: <strong style='color:#ef4444;'>" + overdue + "</strong></div>" +
    "</div>" +
    "<button class='btn btn-outline btn-sm' style='width:100%; margin-bottom:10px;' onclick='window.exportDuesCSV()'>📥 Export Membership Subs CSV</button>" +
    "<div style='max-height:280px; overflow-y:auto;'>";

  appState.users.forEach(function(u, idx) {
    var isPaid = u.membershipStatus === "active";
    html += 
      "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:8px 10px; border-radius:6px; margin-bottom:6px; font-size:11px; border-left:3px solid " + (isPaid ? "var(--green)" : "#ef4444") + ";'>" +
        "<div><strong>" + u.name + "</strong> (" + (u.membershipTier || u.category) + ")<br><span style='color:" + (isPaid ? "var(--green)" : "#ef4444") + "; font-weight:700;'>" + (isPaid ? "✓ Active (" + (u.membershipSeason || "2026/27") + ")" : "🔴 Lapsed / Overdue") + "</span></div>" +
        "<div><button class='btn btn-sm " + (isPaid ? "btn-outline" : "btn-gold") + "' style='padding:2px 8px; font-size:10px;' onclick='window.adminToggleMemberDues(" + idx + ", " + (!isPaid) + ")'>" + (isPaid ? "Revoke" : "Activate ✓") + "</button></div>" +
      "</div>";
  });

  html += "</div>";
  container.innerHTML = html;
};

window.renderAdminSubsRoster = window.renderAdminSubs;

window.adminToggleMemberDues = function(idx, setPaid) {
  var user = appState.users[idx];
  if (!user) return;
  user.membershipStatus = setPaid ? "active" : "lapsed";
  if (setPaid) {
    user.membershipSeason = appState.duesConfig.activeSeason;
    user.validUntil = "2027-07-31";
  }
  saveState();
  window.renderAdminSubs();
  renderHUDView();
};

window.adminSubmitAGMDues = function() {
  var sInput = document.getElementById("agm-season-input");
  var dInput = document.getElementById("agm-due-date-input");
  var aInput = document.getElementById("agm-adult-fee");
  var jInput = document.getElementById("agm-junior-fee");
  var srInput = document.getElementById("agm-senior-fee");

  appState.duesConfig.activeSeason = sInput ? sInput.value.trim() : "2026/27";
  appState.duesConfig.dueDate = dInput ? dInput.value : "2026-08-31";
  appState.duesConfig.adultFee = aInput ? parseFloat(aInput.value) || 10.00 : 10.00;
  appState.duesConfig.juniorFee = jInput ? parseFloat(jInput.value) || 5.00 : 5.00;
  appState.duesConfig.seniorFee = srInput ? parseFloat(srInput.value) || 5.00 : 5.00;

  saveState();
  window.renderAdminSubs();
  alert("🏛️ AGM Dues Ratified and Published for " + appState.duesConfig.activeSeason + "!");
};

window.exportDuesCSV = function() {
  var csv = "Member Name,Member Number,Category,Tier,Status,Season,Valid Until\n";
  appState.users.forEach(function(u) {
    csv += '"' + u.name + '","' + u.memberNo + '","' + u.category + '","' + (u.membershipTier || "Adult") + '","' + u.membershipStatus.toUpperCase() + '","' + (u.membershipSeason || "2026/27") + '","' + (u.validUntil || "2027-07-31") + '"\n';
  });
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = "Membership_Subs_Roster.csv";
  a.click();
};

// --- PANE 3: FRIENDS & FAMILY APPROVALS ---
window.renderAdminApprovals = function() {
  var container = document.getElementById("admin-approvals-queue");
  if (!container || !appState) return;

  var pending = appState.pendingLinkRequests.filter(function(r) { return r.status === "pending_admin"; });

  var html = "<div class='admin-card'><strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:8px;'>Pending Junior Requests</strong>";
  if (pending.length === 0) {
    html += "<p class='text-xs text-muted'>✓ No pending link requests.</p>";
  } else {
    pending.forEach(function(req) {
      html += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:8px; border-radius:6px; margin-bottom:6px; font-size:11px;'>" +
          "<div><strong>" + req.requester + "</strong> ➔ <strong>" + req.targetName + "</strong> (" + req.relation + ")</div>" +
          "<div style='display:flex; gap:4px;'>" +
            "<button class='btn btn-gold btn-sm' style='padding:2px 8px; font-size:10px;' onclick='window.adminApproveLink(" + req.id + ")'>Approve</button>" +
            "<button class='btn btn-outline btn-sm' style='padding:2px 8px; font-size:10px; color:#ef4444;' onclick='window.adminRejectLink(" + req.id + ")'>Decline</button>" +
          "</div>" +
        "</div>";
    });
  }
  html += "</div>";

  html += 
    "<div class='admin-card'><strong style='font-size:12px; color:var(--safc-gold); display:block; margin-bottom:8px;'>Active Network Links</strong><div style='max-height:200px; overflow-y:auto;'>";
  appState.friendsAndFamily.forEach(function(link) {
    html += 
      "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:10px;'>" +
        "<div><strong>" + link.owner + "</strong> ➔ <strong>" + link.targetName + "</strong> (" + link.relation + ")</div>" +
        "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444;' onclick='window.adminRevokeLink(" + link.id + ")'>Revoke</button>" +
      "</div>";
  });
  html += "</div></div>";
  container.innerHTML = html;
};

window.adminApproveLink = function(reqId) {
  var req = appState.pendingLinkRequests.find(function(r) { return r.id === reqId; });
  if (!req) return;

  appState.friendsAndFamily.push({ id: Date.now(), owner: req.requester, targetName: req.targetName, relation: req.relation, type: req.type, status: "approved" });
  appState.friendsAndFamily.push({ id: Date.now() + 1, owner: req.targetName, targetName: req.requester, relation: req.relation === "Child" ? "Parent" : "Friend", type: "Adult", status: "approved" });
  appState.pendingLinkRequests = appState.pendingLinkRequests.filter(function(r) { return r.id !== reqId; });

  saveState();
  window.renderAdminApprovals();
  updateAdminDrawerBadge();
  alert("✓ Link approved for " + req.targetName + ".");
};

window.adminRejectLink = function(reqId) {
  appState.pendingLinkRequests = appState.pendingLinkRequests.filter(function(r) { return r.id !== reqId; });
  saveState();
  window.renderAdminApprovals();
  updateAdminDrawerBadge();
};

window.adminRevokeLink = function(linkId) {
  var link = appState.friendsAndFamily.find(function(l) { return l.id === linkId; });
  if (!link) return;

  if (confirm("Revoke relationship between " + link.owner + " and " + link.targetName + "?")) {
    appState.friendsAndFamily = appState.friendsAndFamily.filter(function(f) {
      return !(f.owner === link.owner && f.targetName === link.targetName) && !(f.owner === link.targetName && f.targetName === link.owner);
    });
    saveState();
    window.renderAdminApprovals();
  }
};

// --- PANE 4: TREASURY & FINANCIAL LEDGER ---
window.renderAdminTreasury = function() {
  var statsContainer = document.getElementById("admin-treasury-stats");
  var ledgerContainer = document.getElementById("admin-financial-ledger");
  var catFilter = document.getElementById("treasury-filter-category") ? document.getElementById("treasury-filter-category").value : "all";

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
    var filtered = appState.masterAuditTrail.filter(function(t) {
      if (catFilter !== "all") {
        if (catFilter === "subs" && t.category !== "SUBS_DUES") return false;
        if (catFilter === "bus" && t.category !== "BUS_BOOKING" && t.category !== "BUS_REFUND") return false;
        if (catFilter === "card" && t.category.indexOf("CARD") === -1) return false;
      }
      return true;
    });

    var html = "<div style='max-height:240px; overflow-y:auto;'>";
    filtered.slice(0, 30).forEach(function(t) {
      html += 
        "<div style='background:#1e293b; border-bottom:1px solid #334155; padding:6px 8px; border-radius:4px; margin-bottom:4px; font-size:10px;'>" +
          "<div style='display:flex; justify-content:space-between;'><strong>" + t.txnId + " • " + t.category + "</strong><span style='color:var(--safc-gold);'>" + t.timestamp.substring(0, 16) + "</span></div>" +
          "<div style='color:#cbd5e1;'>" + t.desc + " (" + t.actor + ")</div>" +
        "</div>";
    });
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
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = "Master_Treasury_Ledger.csv";
  a.click();
};

// --- PANE 5: AWAY MATCH TICKET ALLOCATIONS ---
window.renderAdminAwayFixture = function() {
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

  var fixture = appState.awayFixtures.find(function(f) { return f.id === sel.value; }) || appState.awayFixtures[0];
  var regs = appState.awayRegistrations.filter(function(r) { return r.fixtureId === fixture.id; });
  var allocatedCount = 0;
  regs.forEach(function(r) { if (r.allocated) allocatedCount += (r.party ? r.party.length : 1); });

  var html = 
    "<div class='admin-card'>" +
      "<div class='flex-between'><strong>" + fixture.opponent + " (Away)</strong><span class='badge-gold'>" + fixture.date + "</span></div>" +
      "<div style='display:flex; gap:6px; align-items:center; margin-top:8px;'>" +
        "<label class='text-xs text-muted' style='flex:1;'>Branch Quota:</label>" +
        "<input type='number' id='admin-away-quota-input' class='form-input' style='flex:1; padding:4px;' value='" + fixture.allocation + "' />" +
        "<button class='btn btn-outline btn-sm' style='padding:4px 10px; font-size:10px;' onclick='window.confirmAwayQuota(\"" + fixture.id + "\")'>Confirm</button>" +
      "</div>" +
      "<div class='text-xs mt-2' style='color:var(--safc-gold);'>Allocated so far: <strong>" + allocatedCount + " / " + fixture.allocation + " Tickets</strong></div>" +
    "</div>" +
    "<div class='admin-card'><strong style='font-size:11px; display:block; margin-bottom:8px;'>Member Expressions of Interest:</strong>";

  if (regs.length === 0) {
    html += "<p class='text-xs text-muted'>No expressions of interest registered yet.</p>";
  } else {
    regs.forEach(function(r) {
      html += 
        "<div style='display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:6px 8px; border-radius:6px; margin-bottom:6px; font-size:10px; border-left:3px solid " + (r.allocated ? "var(--green)" : "var(--safc-gold)") + ";'>" +
          "<div><strong>" + r.memberName + "</strong><br><span style='color:#cbd5e1; font-size:9px;'>Party: " + (r.party ? r.party.join(", ") : "Lead Only") + "</span></div>" +
          "<button class='btn btn-sm " + (r.allocated ? "btn-outline" : "btn-gold") + "' style='padding:2px 8px; font-size:9px;' onclick='window.toggleAwayAllocation(\"" + r.fixtureId + "\", \"" + r.memberName + "\")'>" + (r.allocated ? "✓ Allocated" : "Allocate ➔") + "</button>" +
        "</div>";
    });
  }

  html += "</div>";
  container.innerHTML = html;
};

window.confirmAwayQuota = function(fixtureId) {
  var input = document.getElementById("admin-away-quota-input");
  var val = input ? parseInt(input.value) : 20;
  var fix = appState.awayFixtures.find(function(f) { return f.id === fixtureId; });
  if (fix) {
    fix.allocation = val || 20;
    saveState();
    window.renderAdminAwayFixture();
    renderMemberAwayView();
  }
};

window.toggleAwayAllocation = function(fixtureId, memberName) {
  var reg = appState.awayRegistrations.find(function(r) { return r.fixtureId === fixtureId && r.memberName === memberName; });
  if (reg) {
    reg.allocated = !reg.allocated;
    saveState();
    window.renderAdminAwayFixture();
    renderMemberAwayView();
    renderHUDView();
  }
};

// --- PANE 6: BRANCH NEWS & BROADCASTS ---
window.renderAdminNews = function() {
  var manageList = document.getElementById("admin-news-manage-list");
  if (!manageList) return;

  var html = "";
  appState.announcements.forEach(function(post) {
    html += 
      "<div style='background:#1e293b; padding:8px 10px; border-radius:6px; margin-bottom:6px; font-size:11px; border-left:3px solid " + (post.isUrgent ? "#ef4444" : "var(--safc-gold)") + ";'>" +
        "<div class='flex-between'><strong>" + post.title + "</strong><span style='font-size:9px; color:" + (post.archived ? "#94a3b8" : "var(--green)") + ";'>" + (post.archived ? "ARCHIVED" : "ACTIVE") + "</span></div>" +
        "<div style='color:#cbd5e1; font-size:10px; margin:4px 0;'>" + post.content + "</div>" +
        "<div style='display:flex; justify-content:space-between; align-items:center; margin-top:6px; font-size:9px; color:var(--text-muted);'>" +
          "<span>" + post.date + "</span>" +
          "<div style='display:flex; gap:4px;'>" +
            "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px;' onclick='window.toggleArchiveAnnouncement(" + post.id + ")'>" + (post.archived ? "Unarchive" : "Archive") + "</button>" +
            "<button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444;' onclick='window.deleteAnnouncement(" + post.id + ")'>Delete</button>" +
          "</div>" +
        "</div>" +
      "</div>";
  });
  manageList.innerHTML = html;
};

window.adminPostAnnouncement = function() {
  var titleInput = document.getElementById("admin-news-title");
  var bodyInput = document.getElementById("admin-news-body");
  if (!titleInput || !bodyInput || !titleInput.value.trim() || !bodyInput.value.trim()) {
    alert("Please enter headline and details.");
    return;
  }

  var newPost = {
    id: Date.now(),
    title: titleInput.value.trim(),
    content: bodyInput.value.trim(),
    date: new Date().toISOString().substring(0, 10),
    isUrgent: false,
    reactions: 0,
    archived: false,
    readBy: []
  };

  appState.announcements.unshift(newPost);
  titleInput.value = "";
  bodyInput.value = "";

  saveState();
  renderHUDView();
  window.renderAdminNews();
  alert("✓ Announcement broadcasted.");
};

window.toggleArchiveAnnouncement = function(postId) {
  var post = appState.announcements.find(function(a) { return a.id === postId; });
  if (post) {
    post.archived = !post.archived;
    saveState();
    renderHUDView();
    window.renderAdminNews();
  }
};

window.deleteAnnouncement = function(postId) {
  if (confirm("Delete this announcement?")) {
    appState.announcements = appState.announcements.filter(function(a) { return a.id !== postId; });
    saveState();
    renderHUDView();
    window.renderAdminNews();
  }
};

// --- PANE 7: 40-TEAM MATCHDAY FOOTBALL CARD ---
window._selectedFootballTeamIds = [];

window.toggleFootballTeamSelection = function(teamId) {
  var meta = appState.activeCardMeta || {};
  if (meta.status === "completed") return;

  var idx = window._selectedFootballTeamIds.indexOf(teamId);
  if (idx !== -1) window._selectedFootballTeamIds.splice(idx, 1);
  else window._selectedFootballTeamIds.push(teamId);
  window.renderFootballGrid();
};

window.renderFootballGrid = function() {
  var grid = document.getElementById("football-grid");
  var summary = document.getElementById("card-sold-summary");
  var actionTeamName = document.getElementById("football-selected-team-name");
  var claimBtn = document.getElementById("btn-claim-football-team");
  if (!grid || !appState || !appState.footballCard) return;

  var user = getCurrentUserRecord();
  var userName = user ? user.name : "Gary Miller";
  var meta = appState.activeCardMeta || { status: "active", title: "40-Team Scratch Card #1" };
  var isCompleted = (meta.status === "completed");

  var soldCount = appState.footballCard.filter(function(sq) { return !!sq.claimedBy; }).length;
  if (summary) {
    summary.className = isCompleted ? "badge-red" : "badge-gold";
    summary.textContent = isCompleted ? "🏆 DRAWN & COMPLETED" : (soldCount + " / 40 Claimed");
  }

  var existingWinnerBanner = document.getElementById("football-member-winner-banner");
  if (existingWinnerBanner) existingWinnerBanner.remove();

  if (isCompleted && meta.winnerTeam && meta.winnerMember) {
    var winnerBanner = document.createElement("div");
    winnerBanner.id = "football-member-winner-banner";
    winnerBanner.style.cssText = "background: linear-gradient(135deg, #78350f, #f59e0b); border: 2px solid var(--safc-gold); border-radius: 8px; padding: 10px; margin-bottom: 10px; color: #fff; text-align: center;";
    winnerBanner.innerHTML = 
      "<div style='font-size:10px; font-weight:800; color:#fde68a;'>🏆 OFFICIAL CARD RESULT</div>" +
      "<div style='font-size:15px; font-weight:900;'>Winning Team: " + meta.winnerTeam + "</div>" +
      "<div style='font-size:11px;'>" + meta.winnerMember + " won £" + (meta.winnerPrize || 0).toFixed(2) + "!</div>";
    grid.parentNode.insertBefore(winnerBanner, grid);
  }

  grid.innerHTML = "";
  appState.footballCard.forEach(function(sq) {
    var sqBtn = document.createElement("button");
    sqBtn.type = "button";
    var isClaimed = !!sq.claimedBy;
    var isMine = isClaimed && (sq.claimedBy === userName);
    var isSelected = (window._selectedFootballTeamIds.indexOf(sq.id) !== -1);
    var isWinnerSquare = isCompleted && (sq.team === meta.winnerTeam);

    sqBtn.style.cssText = "display:flex; flex-direction:column; align-items:center; justify-content:center; padding:6px 2px; min-height:48px; border-radius:6px; font-size:10px; border:1px solid #334155; text-align:center;";

    if (isWinnerSquare) {
      sqBtn.style.background = "linear-gradient(135deg, #facc15, #eab308)";
      sqBtn.style.color = "#000";
      sqBtn.innerHTML = "<strong>👑 " + sq.team + "</strong><span style='font-size:8px; font-weight:900;'>WINNER</span>";
    } else if (isMine) {
      sqBtn.style.background = "#065f46";
      sqBtn.style.borderColor = "#10b981";
      sqBtn.style.color = "#34d399";
      sqBtn.innerHTML = "<strong>" + sq.team + "</strong><span style='font-size:8px;'>✓ YOU</span>";
    } else if (isClaimed) {
      sqBtn.style.background = "#1e293b";
      sqBtn.style.color = "#64748b";
      sqBtn.disabled = true;
      sqBtn.innerHTML = "<span>" + sq.team + "</span><span style='font-size:7px;'>" + sq.claimedBy.split(" ")[0] + "</span>";
    } else if (isSelected) {
      sqBtn.style.background = "var(--safc-gold)";
      sqBtn.style.color = "#000";
      sqBtn.innerHTML = "<strong>" + sq.team + "</strong><span style='font-size:8px;'>✓ SELECTED</span>";
      sqBtn.onclick = function() { window.toggleFootballTeamSelection(sq.id); };
    } else {
      sqBtn.style.background = "#0f172a";
      sqBtn.style.color = "#fff";
      sqBtn.innerHTML = "<strong>" + sq.team + "</strong><span style='font-size:8px; color:#94a3b8;'>£2.00</span>";
      if (!isCompleted) sqBtn.onclick = function() { window.toggleFootballTeamSelection(sq.id); };
      else sqBtn.disabled = true;
    }
    grid.appendChild(sqBtn);
  });

  if (isCompleted) {
    if (actionTeamName) actionTeamName.innerHTML = "<span style='color:var(--safc-gold);'>Card Drawn! Winner: " + meta.winnerMember + "</span>";
    if (claimBtn) { claimBtn.textContent = "Card Completed 🏆"; claimBtn.disabled = true; }
  } else {
    var selCount = window._selectedFootballTeamIds.length;
    if (selCount > 0) {
      var totalCost = selCount * 2.00;
      if (actionTeamName) actionTeamName.innerHTML = "Selected (" + selCount + ") Teams • Total: <strong style='color:var(--safc-gold);'>£" + totalCost.toFixed(2) + "</strong>";
      if (claimBtn) { claimBtn.textContent = "Claim " + selCount + " Team" + (selCount > 1 ? "s" : "") + " (£" + totalCost.toFixed(2) + ")"; claimBtn.disabled = false; }
    } else {
      if (actionTeamName) actionTeamName.innerHTML = "Select available team(s)<div style='font-size:10px; color:#94a3b8;'>£2.00 per square</div>";
      if (claimBtn) { claimBtn.textContent = "Claim Teams"; claimBtn.disabled = true; }
    }
  }
};

window.confirmFootballTeamPurchase = function() {
  var selCount = window._selectedFootballTeamIds.length;
  if (selCount === 0) return;

  var user = getCurrentUserRecord();
  var totalCost = selCount * 2.00;
  if (user.balance < totalCost) {
    alert("Insufficient funds! You have £" + user.balance.toFixed(2) + " but need £" + totalCost.toFixed(2) + ".");
    return;
  }

  user.balance -= totalCost;
  var claimedNames = [];

  window._selectedFootballTeamIds.forEach(function(teamId) {
    var sq = appState.footballCard.find(function(x) { return x.id === teamId; });
    if (sq && !sq.claimedBy) {
      sq.claimedBy = user.name;
      claimedNames.push(sq.team);
    }
  });

  logForensicTransaction(user.name, "Member", "Branch Lottery", "CARD", "Football Card: " + claimedNames.join(", "), totalCost, 0, totalCost);
  saveState();

  window._selectedFootballTeamIds = [];
  window.updateBalanceDisplay();
  window.renderFootballGrid();
  renderHUDView();
  alert("⚽ Teams Claimed:\n" + claimedNames.join(", "));
};

window.renderAdminFootballCardManager = function() {
  var pane = document.getElementById("admin-pane-footballcard");
  if (!pane) return;

  var stats = { sold: appState.footballCard.filter(function(sq) { return !!sq.claimedBy; }).length, total: 40 };
  var meta = appState.activeCardMeta || { status: "active", title: "Card #1", pricePerTeam: 2.00 };
  var isActive = (meta.status === "active");

  var actualPot = stats.sold * (meta.pricePerTeam || 2.00);
  var winnerCalculatedPrize = actualPot * 0.50;
  var branchCalculatedProfit = actualPot * 0.50;
  var pct = Math.round((stats.sold / 40) * 100);

  pane.innerHTML = 
    "<h4>⚽ Football Card Fundraiser Suite</h4>" +
    "<p class='text-xs text-muted mb-2'>Manage matchday scratch card, track sales, and reveal winner with 50/50 prize split.</p>" +

    "<div class='admin-card' style='background:#0f172a; border:1px solid #334155; border-radius:8px; padding:12px; margin-bottom:12px;'>" +
      "<div style='display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;'>" +
        "<strong style='color:#fff; font-size:13px;'>" + meta.title + "</strong>" +
        "<span style='padding:2px 8px; border-radius:999px; font-size:10px; font-weight:700; background:" + (isActive ? "#065f46; color:#34d399;" : "#334155; color:#94a3b8;") + "'>" + (isActive ? "🟢 ACTIVE" : "⚪ COMPLETED") + "</span>" +
      "</div>" +

      "<div style='background:#1e293b; padding:10px; border-radius:6px; margin-bottom:10px;'>" +
        "<div style='display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;'>" +
          "<span>Claimed: <strong style='color:var(--safc-gold);'>" + stats.sold + " / 40</strong></span>" +
          "<span style='color:var(--green); font-weight:700;'>Pot: £" + actualPot.toFixed(2) + "</span>" +
        "</div>" +
        "<div style='height:6px; background:#0f172a; border-radius:3px; overflow:hidden; margin-bottom:4px;'><div style='width:" + pct + "%; height:100%; background:var(--safc-red);'></div></div>" +
        "<div style='display:flex; justify-content:space-between; font-size:9px; color:#94a3b8;'>" +
          "<span>Winner (50%): <strong style='color:var(--safc-gold);'>£" + (isActive ? winnerCalculatedPrize.toFixed(2) : (meta.winnerPrize || 0).toFixed(2)) + "</strong></span>" +
          "<span>Branch (50%): <strong style='color:var(--green);'>£" + (isActive ? branchCalculatedProfit.toFixed(2) : (meta.branchProfit || 0).toFixed(2)) + "</strong></span>" +
        "</div>" +
      "</div>" +

      "<div style='display:flex; gap:6px; margin-bottom:10px;'>" +
        (isActive ? "<button class='btn btn-gold btn-sm' style='flex:1; font-size:11px;' onclick='window.adminDrawFootballCardWinner()'>🏆 Scratch & Reveal Winner (£" + winnerCalculatedPrize.toFixed(2) + ")</button>" : "<button class='btn btn-outline btn-sm' style='flex:1; font-size:11px;' disabled>✓ Winner Paid: " + meta.winnerMember + "</button>") +
      "</div>" +

      "<div style='border-top:1px solid #334155; padding-top:10px;'>" +
        "<strong style='font-size:11px; color:var(--safc-gold); display:block; margin-bottom:6px;'>🚀 Launch New Scratch Card</strong>" +
        (isActive ? "<p class='text-xs text-muted mb-2'>Draw the active card before launching a new card.</p>" : "") +
        "<button class='btn btn-red btn-sm' style='width:100%;' " + (isActive ? "disabled" : "") + " onclick='window.adminLaunchNewFootballCard()'>" + (isActive ? "🔒 Card In Progress" : "🚀 Launch Next 40-Team Card") + "</button>" +
      "</div>" +
    "</div>";
};

window.renderAdminFootballCard = window.renderAdminFootballCardManager;

window.adminDrawFootballCardWinner = function() {
  var meta = appState.activeCardMeta || {};
  if (meta.status === "completed") return;

  var claimed = appState.footballCard.filter(function(x) { return !!x.claimedBy; });
  if (claimed.length === 0) { alert("No teams claimed on this card yet."); return; }

  var totalCollected = claimed.length * (meta.pricePerTeam || 2.00);
  var winnerPrize = totalCollected * 0.50;
  var branchShare = totalCollected * 0.50;

  if (!confirm("Confirm scratching the card?\nWinner receives £" + winnerPrize.toFixed(2) + " (50% of sold pot).")) return;

  var winningSquare = claimed[Math.floor(Math.random() * claimed.length)];
  var winnerName = winningSquare.claimedBy;
  var winningTeam = winningSquare.team;

  var winnerRecord = appState.users.find(function(m) { return m.name === winnerName; });
  if (winnerRecord) winnerRecord.balance += winnerPrize;

  logForensicTransaction("Branch", "Admin", winnerName, "CARD_WINNER_PAYOUT", "Scratch Card Winner: " + winningTeam + " (50/50 Split)", 0, winnerPrize, branchShare);

  meta.status = "completed";
  meta.winnerTeam = winningTeam;
  meta.winnerMember = winnerName;
  meta.winnerPrize = winnerPrize;
  meta.branchProfit = branchShare;

  saveState();
  window.updateBalanceDisplay();
  window.renderFootballGrid();
  renderHUDView();
  window.renderAdminFootballCardManager();
  alert("🏆 WINNER DRAWN: " + winningTeam + "!\n" + winnerName + " won £" + winnerPrize.toFixed(2) + "!");
};

window.adminLaunchNewFootballCard = function() {
  var meta = appState.activeCardMeta || {};
  if (meta.status === "active") return;

  appState.footballCard = DEFAULT_40_TEAMS.map(function(teamName, idx) {
    return { id: idx + 1, team: teamName, price: 2.00, claimedBy: null };
  });

  appState.activeCardMeta = {
    cardId: (meta.cardId || 1) + 1,
    title: "Matchday Scratch Card #" + ((meta.cardId || 1) + 1),
    status: "active",
    pricePerTeam: 2.00,
    winnerPrize: 40.00,
    branchPrize: 40.00,
    winnerTeam: null,
    winnerMember: null
  };

  saveState();
  window.renderFootballGrid();
  renderHUDView();
  window.renderAdminFootballCardManager();
  alert("🚀 New 40-Team Scratch Card Live!");
};

// --- PANE 8: SAFEGUARDING & DISCIPLINARY ---
window.renderAdminDisciplinary = function() {
  var juniorLog = document.getElementById("admin-disciplinary-junior-log");
  var boardContainer = document.getElementById("admin-disciplinary-board");

  if (juniorLog) {
    var children = appState.users.filter(function(u) { return u.category === "Child"; });
    var htmlJ = "";
    children.forEach(function(ch) {
      var comp = checkChildCompliance(ch);
      htmlJ += 
        "<div style='background:#1e293b; padding:6px 8px; border-radius:4px; margin-bottom:4px; font-size:10px; display:flex; justify-content:space-between; align-items:center;'>" +
          "<div><strong>" + ch.name + "</strong> (" + ch.memberNo + ")<br><span style='color:" + (comp.compliant ? "var(--green)" : "#ef4444") + "; font-weight:700;'>" + (comp.compliant ? "✓ Verified Linked" : "🔴 Account Locked") + "</span></div>" +
        "</div>";
    });
    juniorLog.innerHTML = htmlJ || "<p class='text-xs text-muted'>No junior accounts.</p>";
  }

  if (boardContainer) {
    boardContainer.innerHTML = "<div class='text-xs text-muted'>✓ All members in good disciplinary standing. Profanity engine active.</div>";
  }
};

// --- HOME MATCHDAY HUD ---
window.renderHUDView = function() {
  var user = getCurrentUserRecord();
  if (!user) return;

  var nameElem = document.getElementById("hud-member-name");
  var noElem = document.getElementById("hud-member-no");
  var balElem = document.getElementById("hud-wallet-balance");
  var badgeElem = document.getElementById("hud-subs-badge");

  if (nameElem) nameElem.textContent = user.nickname ? user.name + " (" + user.nickname + ")" : user.name;
  if (noElem) noElem.textContent = "Member #" + (user.memberNo || "COX-084");
  if (balElem) balElem.textContent = "£" + user.balance.toFixed(2);

  if (badgeElem) {
    var isActive = (user.membershipStatus === "active");
    badgeElem.textContent = isActive ? "● 2026/27 Active" : "⚠️ Subs Due";
    badgeElem.className = isActive ? "badge-gold" : "badge-red";
  }

  // Fundraiser Pulse Bar
  var soldCount = (appState.footballCard || []).filter(function(sq) { return !!sq.claimedBy; }).length;
  var soldCountElem = document.getElementById("hud-pulse-card-sold");
  var barElem = document.getElementById("hud-pulse-card-bar");
  if (soldCountElem) soldCountElem.textContent = soldCount + " / 40 Claimed";
  if (barElem) barElem.style.width = Math.min(100, Math.round((soldCount / 40) * 100)) + "%";

  // Contextual Travel Card
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];
  var bookedBus = (appState.bookings && Array.isArray(appState.bookings) && activeMatch)
    ? appState.bookings.find(function(b) { return String(b.matchId) === String(activeMatch.id) && b.name.indexOf(user.name) !== -1; })
    : null;

  var statusCard = document.getElementById("hud-travel-card-status");
  if (statusCard) {
    if (bookedBus) {
      statusCard.innerHTML = 
        "<div style='display:flex; justify-content:space-between; align-items:center;'>" +
          "<div><strong style='color:var(--green);'>✓ Coach Seat Confirmed</strong><div style='font-size:10px; color:#94a3b8;'>Pickup: " + bookedBus.stop + " • Bus #" + (bookedBus.busId || 1) + "</div></div>" +
          "<button class='btn btn-outline btn-sm' style='font-size:10px; padding:2px 8px;' onclick=\"switchTab('view-travel')\">View Pass</button>" +
        "</div>";
    } else {
      statusCard.innerHTML = 
        "<div style='display:flex; justify-content:space-between; align-items:center;'>" +
          "<div><strong>Official Branch Coach Travel</strong><div style='font-size:10px; color:#94a3b8;'>Fleet provisioned • £12 Adult / £8 Junior</div></div>" +
          "<button class='btn btn-red btn-sm' style='font-size:10px; padding:3px 8px;' onclick=\"switchTab('view-travel')\">Book Seat</button>" +
        "</div>";
    }
  }

  // Match Kickoff Countdown & Weather Fetch
  startKickoffCountdown("2026-11-21T15:00:00", "15:00");
  fetchLiveMatchWeather("Stadium of Light", { lat: 54.9146, lon: -1.3882 }, "2026-11-21T15:00:00");

  // Announcements Feed
  var newsContainer = document.getElementById("hud-news-feed");
  if (newsContainer) {
    newsContainer.innerHTML = "";
    appState.announcements.forEach(function(item) {
      if (item.archived) return;
      var itemCard = document.createElement("div");
      itemCard.className = "card";
      itemCard.style.cssText = "margin-bottom:6px; padding:10px; background:#0f172a; border-left:3px solid " + (item.isUrgent ? "#ef4444" : "var(--safc-gold)") + ";";
      itemCard.innerHTML = 
        "<div style='display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;'><strong style='font-size:12px; color:#fff;'>" + item.title + "</strong><span style='font-size:9px; color:var(--text-muted);'>" + item.date + "</span></div>" +
        "<div style='font-size:11px; color:#cbd5e1; line-height:1.4;'>" + item.content + "</div>";
      newsContainer.appendChild(itemCard);
    });
  }
};

// --- MEMBER TRAVEL & MULTI-BOOKING ---
var currentBookingParty = [];

function getDynamicStopDisplay(matchId, busId, rawStop) {
  if (!rawStop) return "Pickup TBA";
  var cleanName = rawStop.split("(")[0].trim().toLowerCase();
  var match = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(matchId); });
  if (match && match.buses) {
    var bus = match.buses.find(function(b) { return (b.busId || 1) === (busId || 1); }) || match.buses[0];
    if (bus && bus.stops) {
      var foundStop = bus.stops.find(function(s) { return s.name.trim().toLowerCase() === cleanName; });
      if (foundStop) return foundStop.name + " (" + foundStop.time + ")";
    }
  }
  return rawStop;
}

function initBookingParty() {
  var user = getCurrentUserRecord();
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];

  var leadAlreadyBooked = (appState.bookings || []).some(function(b) {
    return String(b.matchId) === String(activeMatch.id) && b.name.indexOf(user.name) !== -1;
  });

  currentBookingParty = [{
    id: "lead-" + user.name, name: user.name, type: user.category || "Adult",
    isLead: true, alreadyBooked: leadAlreadyBooked, checked: !leadAlreadyBooked
  }];

  var myFriends = (appState.friendsAndFamily || []).filter(function(f) { return f.owner === user.name && f.status === "approved"; });
  myFriends.forEach(function(f) {
    var friendBooked = (appState.bookings || []).some(function(b) {
      return String(b.matchId) === String(activeMatch.id) && b.name.indexOf(f.targetName) !== -1;
    });
    currentBookingParty.push({
      id: "fnf-" + f.targetName, name: f.targetName, type: f.type || "Adult",
      relation: f.relation, isLinked: true, alreadyBooked: friendBooked, checked: false
    });
  });
}

function renderBusBookingView() {
  var fixSelect = document.getElementById("member-home-fixture-select");
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];

  if (fixSelect && appState.homeMatches && appState.homeMatches.length > 0) {
    var curVal = activeMatch ? activeMatch.id : appState.homeMatches[0].id;
    fixSelect.innerHTML = "";
    appState.homeMatches.forEach(function(m) {
      var opt = document.createElement("option");
      opt.value = m.id;
      var tag = (m.bookingStatus === "open") ? "🟢 Open" : "⚪ Draft";
      opt.textContent = m.opponent + " (H) • " + m.date + " [" + tag + "]";
      if (String(m.id) === String(curVal)) opt.selected = true;
      fixSelect.appendChild(opt);
    });
  }

  var draftNotice = document.getElementById("travel-draft-notice");
  var activeControls = document.getElementById("travel-active-booking-controls");
  var titleElem = document.getElementById("travel-coach-title");

  if (titleElem && activeMatch) titleElem.textContent = "Sunderland vs " + activeMatch.opponent;

  if (activeMatch && activeMatch.bookingStatus === "open") {
    if (draftNotice) draftNotice.style.display = "none";
    if (activeControls) activeControls.style.display = "block";
  } else {
    if (draftNotice) draftNotice.style.display = "block";
    if (activeControls) activeControls.style.display = "none";
    return;
  }

  var buses = (activeMatch && activeMatch.buses) ? activeMatch.buses : [];
  var busSelectorGroup = document.getElementById("booking-bus-selector-group");
  var busSelectElem = document.getElementById("booking-bus-select");

  if (busSelectorGroup && busSelectElem) {
    if (buses.length > 1) {
      busSelectorGroup.style.display = "block";
      busSelectElem.innerHTML = "";
      buses.forEach(function(b) {
        var opt = document.createElement("option");
        opt.value = b.busId;
        opt.textContent = b.title + " (" + (b.capacity || 53) + " Seats)";
        if (b.busId === appState.selectedBookingBusId) opt.selected = true;
        busSelectElem.appendChild(opt);
      });
    } else {
      busSelectorGroup.style.display = "none";
      appState.selectedBookingBusId = 1;
    }
  }

  initBookingParty();
  window.updateBookingCoachUI();
}

window.handleMemberFixtureSelect = function(matchId) {
  appState.selectedHomeMatchId = matchId;
  saveState();
  renderBusBookingView();
};

window.updateBookingCoachUI = function() {
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];
  if (!activeMatch) return;
  var buses = activeMatch.buses || [];

  var selectedBus = buses.find(function(b) { return b.busId === appState.selectedBookingBusId; }) || buses[0] || {
    busId: 1, title: "Bus 1", subtitle: "Official Branch Travel", adultFare: 12.00, juniorFare: 8.00, capacity: 53, stops: DEFAULT_STOPS
  };

  var stopSelect = document.getElementById("booking-stop");
  if (stopSelect) {
    var prevVal = stopSelect.value;
    stopSelect.innerHTML = "";
    (selectedBus.stops || DEFAULT_STOPS).forEach(function(s) {
      var opt = document.createElement("option");
      opt.value = s.name;
      opt.textContent = s.name + " (" + s.time + ")";
      if (prevVal === s.name) opt.selected = true;
      stopSelect.appendChild(opt);
    });
  }

  renderActiveBookingsSummary(activeMatch);
  renderPartyPassengersList();
  window.updatePartyFareCalculation();
};

function renderActiveBookingsSummary(activeMatch) {
  var container = document.getElementById("my-active-bookings-summary");
  if (!container) return;

  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var myBookings = (appState.bookings || []).filter(function(b) {
    return String(b.matchId) === String(activeMatch.id) && b.name.indexOf(cur) !== -1;
  });

  if (myBookings.length === 0) {
    container.innerHTML = "";
    return;
  }

  var html = "<div style='font-size:11px; font-weight:800; color:var(--green); margin-bottom:6px;'>✓ YOUR CONFIRMED SEATS:</div>";
  myBookings.forEach(function(b) {
    var seats = (b.adults || 0) + (b.juniors || 0);
    html += 
      "<div style='background:#064e3b; border:1px solid #10b981; padding:8px 10px; border-radius:6px; margin-bottom:6px; font-size:11px; color:#fff;'>" +
        "<div style='display:flex; justify-content:space-between; align-items:center;'><strong>" + b.name + " (" + seats + " Seat" + (seats > 1 ? "s" : "") + ")</strong><span style='color:var(--safc-gold);'>Bus #" + (b.busId || 1) + "</span></div>" +
        "<div style='margin-top:2px; font-size:10px;'>🚏 Pickup: <strong>" + b.stop + "</strong></div>" +
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
    row.className = "party-member-row" + (p.isLead ? " lead" : "");
    row.innerHTML = 
      "<div style='display:flex; align-items:center; gap:8px;'>" +
        "<input type='checkbox' " + (p.checked ? "checked" : "") + " " + (p.alreadyBooked ? "disabled" : "") + " onchange='window.togglePartyPassenger(" + idx + ", this.checked)' />" +
        "<div><strong>" + p.name + "</strong> <span style='font-size:9px; color:var(--safc-gold);'>(" + p.type + ")</span>" + (p.alreadyBooked ? "<span style='display:block; font-size:9px; color:var(--green); font-weight:700;'>✓ Seat Already Confirmed</span>" : "") + "</div>" +
      "</div>";
    listContainer.appendChild(row);
  });
}

window.togglePartyPassenger = function(idx, isChecked) {
  if (currentBookingParty[idx]) {
    currentBookingParty[idx].checked = isChecked;
    window.updatePartyFareCalculation();
  }
};

window.updatePartyStopSelection = function() {
  window.updatePartyFareCalculation();
};

window.updatePartyFareCalculation = function() {
  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];
  var buses = (activeMatch && activeMatch.buses) ? activeMatch.buses : [];
  var selectedBus = buses.find(function(b) { return b.busId === appState.selectedBookingBusId; }) || buses[0] || { adultFare: 12.00, juniorFare: 8.00 };

  var adultCount = 0;
  var juniorCount = 0;

  currentBookingParty.forEach(function(p) {
    if (p.checked && !p.alreadyBooked) {
      if (p.type === "Junior" || p.type === "Child") juniorCount++;
      else adultCount++;
    }
  });

  var totalFare = (adultCount * selectedBus.adultFare) + (juniorCount * selectedBus.juniorFare);
  var fareText = document.getElementById("party-total-fare-text");
  var bookBtn = document.getElementById("btn-book-seat");

  if (fareText) fareText.textContent = "£" + totalFare.toFixed(2);
  if (bookBtn) {
    var totalSelected = adultCount + juniorCount;
    bookBtn.disabled = (totalSelected === 0);
    bookBtn.textContent = totalSelected > 0 ? "Book " + totalSelected + " Seat" + (totalSelected > 1 ? "s" : "") + " (£" + totalFare.toFixed(2) + ")" : "Select At Least 1 Passenger";
  }
};

window.openBookingModal = function() {
  if (!verifyMembershipAccess("book coach seats")) return;

  var activeMatch = (appState.homeMatches || []).find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0];
  var buses = activeMatch.buses || [];
  var selectedBus = buses.find(function(b) { return b.busId === appState.selectedBookingBusId; }) || buses[0];

  var selectedPassengers = currentBookingParty.filter(function(p) { return p.checked && !p.alreadyBooked; });
  if (selectedPassengers.length === 0) return;

  var adultCount = 0;
  var juniorCount = 0;
  var passengerNames = [];

  selectedPassengers.forEach(function(p) {
    passengerNames.push(p.name);
    if (p.type === "Junior" || p.type === "Child") juniorCount++;
    else adultCount++;
  });

  var stop = document.getElementById("booking-stop").value;
  var total = (adultCount * selectedBus.adultFare) + (juniorCount * selectedBus.juniorFare);

  var user = getCurrentUserRecord();
  if (user.balance < total) {
    alert("Insufficient funds! You have £" + user.balance.toFixed(2) + " but need £" + total.toFixed(2) + ".");
    return;
  }

  user.balance -= total;
  var newBooking = {
    id: Date.now(), matchId: activeMatch.id, busId: selectedBus.busId || 1,
    name: passengerNames.join(", "), stop: stop, adults: adultCount, juniors: juniorCount, total: total, boarded: false
  };

  appState.bookings.push(newBooking);
  logForensicTransaction(user.name, "Member", "Branch", "BUS_BOOKING", "Coach vs " + activeMatch.opponent + ": " + passengerNames.join(", "), total, 0, total);
  saveState();
  window.refreshAllViews();
  alert("✓ Booking confirmed! " + selectedPassengers.length + " seat(s) reserved.");
};

window.cancelMyBooking = function(bookingId) {
  var bIdx = (appState.bookings || []).findIndex(function(b) { return b.id === bookingId; });
  if (bIdx === -1) return;
  var booking = appState.bookings[bIdx];

  var user = getCurrentUserRecord();
  user.balance += booking.total;
  logForensicTransaction("Branch", "System", user.name, "BUS_REFUND", "Refund: Coach booking #" + booking.id, 0, booking.total, -booking.total);

  appState.bookings.splice(bIdx, 1);
  saveState();
  window.refreshAllViews();
  alert("✓ Booking cancelled. £" + booking.total.toFixed(2) + " refunded to wallet.");
};

// --- AWAY FIXTURE EXPRESSIONS OF INTEREST ---
function renderMemberAwayView() {
  var sel = document.getElementById("member-away-game-select");
  var card = document.getElementById("member-away-status-card");
  if (!sel || !card) return;

  var currentVal = sel.value;
  sel.innerHTML = "";
  (appState.awayFixtures || []).forEach(function(f) {
    var opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.opponent + " (A) • " + f.date;
    if (currentVal === f.id) opt.selected = true;
    sel.appendChild(opt);
  });
  if (!sel.value && appState.awayFixtures.length > 0) sel.value = appState.awayFixtures[0].id;

  var fixture = appState.awayFixtures.find(function(f) { return f.id === sel.value; }) || appState.awayFixtures[0];
  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var myReg = (appState.awayRegistrations || []).find(function(r) { return r.fixtureId === fixture.id && r.memberName === cur; });

  var html = "<div class='flex-between'><strong>" + fixture.opponent + " (Away)</strong><span class='badge-gold'>" + fixture.date + "</span></div>";

  if (myReg) {
    html += 
      "<div style='background:#1e293b; padding:8px 10px; border-radius:6px; margin:10px 0; font-size:11px;'>" +
        "Status: " + (myReg.allocated ? "<strong style='color:var(--green);'>✓ TICKET ALLOCATED</strong>" : "<strong style='color:var(--safc-gold);'>⏳ Interest Registered</strong>") +
      "</div>" +
      "<button class='btn btn-outline btn-sm' style='width:100%; color:#ef4444; border-color:#ef4444;' onclick='window.withdrawAwayInterest(\"" + fixture.id + "\")'>Withdraw Interest</button>";
  } else {
    html += "<button class='btn btn-red btn-sm mt-2' style='width:100%;' onclick='window.registerAwayInterest(\"" + fixture.id + "\")'>Register Expression of Interest</button>";
  }

  card.innerHTML = html;
}

window.registerAwayInterest = function(fixtureId) {
  if (!verifyMembershipAccess("apply for away tickets")) return;
  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  appState.awayRegistrations.push({ fixtureId: fixtureId, memberName: cur, party: [cur + " (Adult)"], allocated: false });
  saveState();
  renderMemberAwayView();
};

window.withdrawAwayInterest = function(fixtureId) {
  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  appState.awayRegistrations = appState.awayRegistrations.filter(function(r) { return !(r.fixtureId === fixtureId && r.memberName === cur); });
  saveState();
  renderMemberAwayView();
};

// --- MEMBER PROFILE & PASS ---
function renderProfilePassView() {
  var user = getCurrentUserRecord();
  var cardNameElem = document.getElementById("card-name");
  var cardNoElem = document.getElementById("card-no");
  var avatarImg = document.getElementById("profile-avatar-preview");

  if (cardNameElem) cardNameElem.textContent = user.nickname ? user.name + ' ("' + user.nickname + '")' : user.name;
  if (cardNoElem) cardNoElem.textContent = "Member #" + user.memberNo + " • " + (user.category || "Adult");

  if (avatarImg && user.photoUrl) avatarImg.src = user.photoUrl;

  var nickInput = document.getElementById("profile-edit-nickname");
  var phoneInput = document.getElementById("profile-edit-phone");
  var emNameInput = document.getElementById("profile-edit-emergency-name");
  var emPhoneInput = document.getElementById("profile-edit-emergency-phone");

  if (nickInput) nickInput.value = user.nickname || "";
  if (phoneInput) phoneInput.value = user.phone || "";
  if (emNameInput) emNameInput.value = user.emergencyName || "";
  if (emPhoneInput) emPhoneInput.value = user.emergencyPhone || "";
}

window.handleProfilePhotoUpload = function(event) {
  var file = event.target.files && event.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    var user = getCurrentUserRecord();
    user.photoUrl = e.target.result;
    saveState();
    renderProfilePassView();
  };
  reader.readAsDataURL(file);
};

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
  alert("✓ Profile details saved.");
};

function renderFriendsFamilyChecklist() {
  var container = document.getElementById("fnf-manager-list");
  if (!container) return;
  container.innerHTML = "";

  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var myFriends = (appState.friendsAndFamily || []).filter(function(f) { return f.owner === cur; });

  myFriends.forEach(function(f) {
    var row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#0f172a; padding:6px 8px; border-radius:6px; margin-bottom:4px; font-size:11px;";
    row.innerHTML = "<div><strong>" + f.targetName + "</strong> (" + f.relation + ")</div><button class='btn btn-outline btn-sm' style='padding:1px 6px; font-size:9px; color:#ef4444;' onclick='window.unlinkFriendFamily(" + f.id + ")'>Unlink</button>";
    container.appendChild(row);
  });
}

window.unlinkFriendFamily = function(linkId) {
  appState.friendsAndFamily = appState.friendsAndFamily.filter(function(f) { return f.id !== linkId; });
  saveState();
  renderFriendsFamilyChecklist();
};

window.requestMemberLink = function() {
  var searchInput = document.getElementById("fnf-search-input");
  var relSelect = document.getElementById("fnf-relation-select");
  var targetName = searchInput ? searchInput.value.trim() : "";
  var relation = relSelect ? relSelect.value : "Friend";
  if (!targetName) return;

  var cur = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  if (relation === "Child") {
    appState.pendingLinkRequests.push({ id: Date.now(), requester: cur, targetName: targetName, relation: relation, type: "Child", status: "pending_admin" });
    alert("🛡️ Link request submitted for Committee Safeguarding Approval.");
  } else {
    appState.friendsAndFamily.push({ id: Date.now(), owner: cur, targetName: targetName, relation: relation, type: "Adult", status: "approved" });
    alert("✓ Linked with " + targetName + ".");
  }

  if (searchInput) searchInput.value = "";
  saveState();
  renderFriendsFamilyChecklist();
};

// --- WALLET STATEMENT ---
function renderWalletStatement() {
  var container = document.getElementById("wallet-statement-list");
  if (!container) return;
  container.innerHTML = "";

  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var myTxns = (appState.masterAuditTrail || []).filter(function(t) {
    return t.actor === current || t.target === current;
  });

  if (myTxns.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px; text-align:center; padding:10px;'>No transactions on record.</div>";
    return;
  }

  myTxns.slice(0, 20).forEach(function(item) {
    var isCredit = (item.target === current && item.credit > 0);
    var row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding:8px 0; font-size:12px;";
    row.innerHTML = 
      "<div><strong>" + item.desc + "</strong><br><span style='font-size:10px; color:#94a3b8;'>" + item.timestamp.substring(0, 16) + "</span></div>" +
      "<div style='font-weight:700; color:" + (isCredit ? "var(--green)" : "#ef4444") + ";'>" + (isCredit ? "+£" : "-£") + (isCredit ? item.credit : item.debit).toFixed(2) + "</div>";
    container.appendChild(row);
  });
}

window.exportMyStatementCSV = function() {
  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var myTxns = (appState.masterAuditTrail || []).filter(function(t) { return t.actor === current || t.target === current; });

  var csv = "Txn ID,Timestamp,Category,Description,Debit,Credit,Balance After\n";
  myTxns.forEach(function(t) {
    csv += '"' + t.txnId + '","' + t.timestamp + '","' + t.category + '","' + t.desc.replace(/"/g, '""') + '","£' + t.debit.toFixed(2) + '","£' + t.credit.toFixed(2) + '","£' + t.balanceAfter.toFixed(2) + '"\n';
  });

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = current.replace(/\s+/g, "_") + "_Statement.csv";
  a.click();
};

// --- COMMS & CHAT HUB ---
window.switchCommsSubTab = function(subId) {
  var pBus = document.getElementById("comms-sub-bus");
  var pDm = document.getElementById("comms-sub-dm");
  var pDesk = document.getElementById("comms-sub-desk");

  if (pBus) pBus.style.display = (subId === "bus") ? "block" : "none";
  if (pDm) pDm.style.display = (subId === "dm") ? "block" : "none";
  if (pDesk) pDesk.style.display = (subId === "desk") ? "block" : "none";

  var bBus = document.getElementById("btn-sub-bus");
  var bDm = document.getElementById("btn-sub-dm");
  var bDesk = document.getElementById("btn-sub-desk");

  if (bBus) bBus.className = (subId === "bus") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
  if (bDm) bDm.className = (subId === "dm") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
  if (bDesk) bDesk.className = (subId === "desk") ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm";
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

  var activeMatch = (appState.homeMatches && appState.homeMatches.length > 0)
    ? (appState.homeMatches.find(function(m) { return String(m.id) === String(appState.selectedHomeMatchId); }) || appState.homeMatches[0])
    : { id: "H-01", opponent: "Coventry City" };

  var titleElem = document.getElementById("bus-chat-match-title");
  if (titleElem) titleElem.textContent = activeMatch.opponent + " (H) Bus Chat";

  var adminActions = document.getElementById("bus-chat-admin-actions");
  if (adminActions) adminActions.style.display = (appState.currentUser && appState.currentUser.role === "admin") ? "block" : "none";

  var currentMatchMsgs = (appState.matchdayChat || []).filter(function(msg) {
    return !msg.matchId || String(msg.matchId) === String(activeMatch.id);
  });

  if (currentMatchMsgs.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px; text-align:center; padding:20px 0;'>🚌 Chat live for passengers. Auto-expires 24h post-match.</div>";
  } else {
    currentMatchMsgs.forEach(function(msg) {
      var isMe = msg.sender === (appState.currentUser ? appState.currentUser.name : "");
      var bubble = document.createElement("div");
      bubble.style.cssText = "margin-bottom:8px; display:flex; flex-direction:column; align-items:" + (isMe ? "flex-end" : "flex-start") + ";";
      bubble.innerHTML = 
        "<div style='font-size:9px; color:#94a3b8; margin-bottom:2px;'>" + msg.sender + " • " + msg.time + "</div>" +
        "<div style='background:" + (isMe ? "var(--safc-red)" : "#1e293b") + "; color:#fff; padding:6px 10px; border-radius:10px; font-size:12px; max-width:80%;'>" + msg.text + "</div>";
      container.appendChild(bubble);
    });
    container.scrollTop = container.scrollHeight;
  }
}

window.sendMatchdayBusMessage = function() {
  var input = document.getElementById("bus-chat-input");
  var text = input ? input.value.trim() : "";
  if (!text) return;
  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";

  var activeMatch = (appState.homeMatches || [])[0] || { id: "H-01" };
  var now = new Date();

  var newMsg = { id: Date.now(), matchId: activeMatch.id, timestamp: now.getTime(), sender: current, time: now.toTimeString().substring(0, 5), text: text };
  appState.matchdayChat.push(newMsg);
  input.value = "";

  saveState();
  renderMatchdayBusChat();
  updateCommsBadge();
};

window.adminPurgeMatchdayChat = function() {
  if (!confirm("Clear bus chat for this match?")) return;
  var activeMatch = (appState.homeMatches || [])[0] || { id: "H-01" };
  appState.matchdayChat = appState.matchdayChat.filter(function(m) { return m.matchId && String(m.matchId) !== String(activeMatch.id); });
  saveState();
  renderMatchdayBusChat();
  updateCommsBadge();
};

// --- 1-TO-1 DIRECT MESSAGES (ADULT ONLY) ---
window._activeDMRecipient = null;

function renderDirectMessagesView() {
  var container = document.getElementById("dm-threads-container");
  if (!container) return;

  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  var curRecord = getCurrentUserRecord();

  if (curRecord && curRecord.category === "Child") {
    container.innerHTML = "<div style='color:#ef4444; background:#1e0508; border:1px solid #7f1d1d; padding:12px; border-radius:8px; font-size:12px;'>🛡️ Direct messaging is disabled for accounts under 18 under branch safeguarding rules.</div>";
    return;
  }

  var eligibleUsers = (appState.users || []).filter(function(u) { return u.name !== current && u.category !== "Child"; });
  if (!window._activeDMRecipient && eligibleUsers.length > 0) window._activeDMRecipient = eligibleUsers[0].name;

  var optionsHtml = eligibleUsers.map(function(u) {
    return "<option value='" + u.name + "' " + (u.name === window._activeDMRecipient ? "selected" : "") + ">" + u.name + "</option>";
  }).join("");

  var conversation = (appState.directMessages || []).filter(function(m) {
    return (m.from === current && m.to === window._activeDMRecipient) || (m.from === window._activeDMRecipient && m.to === current);
  });

  var messagesHtml = "";
  if (conversation.length === 0) {
    messagesHtml = "<div style='color:#94a3b8; font-size:11px; text-align:center; padding:20px 0;'>💬 No private messages yet.</div>";
  } else {
    conversation.forEach(function(m) {
      var isMe = (m.from === current);
      messagesHtml += 
        "<div style='margin-bottom:8px; display:flex; flex-direction:column; align-items:" + (isMe ? "flex-end" : "flex-start") + ";'>" +
          "<div style='font-size:9px; color:#94a3b8; margin-bottom:2px;'>" + m.from + " • " + m.time + "</div>" +
          "<div style='background:" + (isMe ? "var(--safc-red)" : "#1e293b") + "; color:#fff; padding:6px 10px; border-radius:10px; font-size:12px; max-width:80%;'>" + m.text + "</div>" +
        "</div>";
    });
  }

  container.innerHTML = 
    "<div style='margin-bottom:8px;'><label class='form-label' style='font-size:9px;'>Recipient (Adult Member)</label><select class='form-select' onchange='window._activeDMRecipient=this.value; renderDirectMessagesView();'>" + optionsHtml + "</select></div>" +
    "<div id='active-dm-feed' style='background:#0f172a; padding:10px; border-radius:8px; height:160px; overflow-y:auto; margin-bottom:8px; border:1px solid #334155;'>" + messagesHtml + "</div>" +
    "<div style='display:flex; gap:6px;'><input type='text' id='dm-message-input' class='form-input' placeholder='Type private message...' style='font-size:11px;' /><button class='btn btn-red btn-sm' onclick='window.sendDirectMessage()'>Send</button></div>";
}

window.sendDirectMessage = function() {
  var input = document.getElementById("dm-message-input");
  var text = input ? input.value.trim() : "";
  if (!text || !window._activeDMRecipient) return;

  var current = appState.currentUser ? appState.currentUser.name : "Gary Miller";
  if (!appState.directMessages) appState.directMessages = [];

  appState.directMessages.push({
    id: "dm-" + Date.now(), from: current, to: window._activeDMRecipient, text: text,
    time: new Date().toTimeString().substring(0, 5), timestamp: Date.now()
  });

  saveState();
  input.value = "";
  renderDirectMessagesView();
};

// --- HELPDESK & COMMITTEE MAILBOX ---
function renderCommitteeDeskView() {
  var container = document.getElementById("helpdesk-threads-list");
  if (!container) return;
  container.innerHTML = "";

  var current = appState.currentUser.name;
  var isAdmin = appState.currentUser.role === "admin";
  var myTickets = appState.helpdeskTickets.filter(function(t) { return isAdmin ? true : t.member.indexOf(current) !== -1; });

  if (myTickets.length === 0) {
    container.innerHTML = "<div style='color:#94a3b8; font-size:11px;'>No tickets in mailbox.</div>";
    return;
  }

  myTickets.forEach(function(t) {
    var card = document.createElement("div");
    card.style.cssText = "background:#0f172a; border:1px solid #334155; padding:10px; border-radius:8px; margin-bottom:8px; font-size:11px;";
    card.innerHTML = 
      "<div style='display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;'><strong>#" + t.id + " • " + t.topic + " (" + t.member + ")</strong><span style='color:var(--green); font-weight:700;'>Open</span></div>" +
      "<button class='btn btn-outline btn-sm' style='width:100%;' onclick='window.openMailboxThreadModal(\"" + t.id + "\")'>📬 Open Mailbox Thread</button>";
    container.appendChild(card);
  });
}

window.openMailboxThreadModal = function(ticketId) {
  var ticket = appState.helpdeskTickets.find(function(t) { return t.id === ticketId; });
  if (!ticket) return;

  var current = appState.currentUser.name;
  var isAdmin = appState.currentUser.role === "admin";

  var modal = document.getElementById("modal-ticket-thread");
  var title = document.getElementById("mailbox-thread-title");
  var body = document.getElementById("mailbox-thread-body");

  title.innerHTML = "Mailbox: #" + ticket.id + " • " + ticket.topic;

  var html = "<div style='font-size:11px; font-weight:800; color:var(--safc-gold); margin-bottom:6px;'>Conversation:</div>";
  html += "<div style='background:#0f172a; padding:8px; border-radius:8px; margin-bottom:12px; max-height:160px; overflow-y:auto;'>";
  ticket.messages.forEach(function(m) {
    html += "<div style='margin-bottom:6px; background:#1e293b; padding:6px 8px; border-radius:6px; font-size:11px;'><strong>" + m.sender + "</strong> (" + m.time + "): " + m.text + "</div>";
  });
  html += "</div>";

  if (isAdmin) {
    html += "<div style='font-size:11px; font-weight:800; color:var(--safc-gold); margin-bottom:6px;'>🔒 Internal Notes:</div>";
    html += "<div style='background:#1e1b4b; padding:8px; border-radius:8px; margin-bottom:12px;'>";
    (ticket.internalNotes || []).forEach(function(n) {
      html += "<div style='margin-bottom:4px; font-size:10px; color:#f8fafc;'><strong>" + n.author + ":</strong> " + n.text + "</div>";
    });
    html += "</div>";
  }

  html += 
    "<div style='display:flex; gap:4px;'><input type='text' id='public-reply-input' class='form-input' placeholder='Type response...' style='font-size:11px;' /><button class='btn btn-red btn-sm' onclick='window.submitPublicReply(\"" + ticket.id + "\")'>Send</button></div>";

  body.innerHTML = html;
  modal.style.display = "flex";
};

window.closeMailboxThreadModal = function() {
  document.getElementById("modal-ticket-thread").style.display = "none";
};

window.submitPublicReply = function(ticketId) {
  var input = document.getElementById("public-reply-input");
  var text = input ? input.value.trim() : "";
  if (!text) return;

  var ticket = appState.helpdeskTickets.find(function(t) { return t.id === ticketId; });
  if (ticket) {
    ticket.messages.push({ id: "m-" + Date.now(), sender: appState.currentUser.name, time: new Date().toTimeString().substring(0, 5), text: text });
    saveState();
    window.openMailboxThreadModal(ticketId);
    updateCommsBadge();
  }
};

window.submitMemberHelpdeskTicket = function() {
  var topic = document.getElementById("helpdesk-topic").value;
  var text = document.getElementById("helpdesk-query").value.trim();
  if (!text) return;

  var newId = "TICK-" + Math.floor(100 + Math.random() * 900);
  appState.helpdeskTickets.unshift({
    id: newId, member: appState.currentUser.name, topic: topic, status: "open",
    messages: [{ id: "m-" + Date.now(), sender: appState.currentUser.name, time: new Date().toTimeString().substring(0, 5), text: text }],
    internalNotes: []
  });

  document.getElementById("helpdesk-query").value = "";
  saveState();
  renderCommitteeDeskView();
  updateCommsBadge();
  alert("Ticket #" + newId + " submitted.");
};

// ========================================================
// SECTION 5: MATCHDAY WEATHER & KICKOFF COUNTDOWN
// ========================================================

(function seedMasterFixtures() {
  if (typeof appState === "undefined" || !appState) return;
  if (!appState.masterFixtures || appState.masterFixtures.length === 0) {
    appState.masterFixtures = [
      {
        id: "fix-101", opponent: "Coventry City", type: "HOME", competition: "Championship",
        venue: "Stadium of Light", dateTime: "2026-11-21T15:00:00", dateDisplay: "Sat 21 Nov • 15:00",
        kickoffTime: "15:00", coordinates: { lat: 54.9146, lon: -1.3882 }
      },
      {
        id: "fix-102", opponent: "Millwall", type: "AWAY", competition: "Championship",
        venue: "The Den, London", dateTime: "2026-11-28T15:00:00", dateDisplay: "Sat 28 Nov • 15:00",
        kickoffTime: "15:00", coordinates: { lat: 51.4859, lon: -0.0507 }
      }
    ];
  }
})();

window._hudCountdownTimer = null;
function startKickoffCountdown(targetIsoDate, kickoffTimeDisplay) {
  if (window._hudCountdownTimer) clearInterval(window._hudCountdownTimer);
  var targetTime = new Date(targetIsoDate).getTime();

  function updateTimer() {
    var timerElem = document.getElementById("hud-countdown-text");
    var stopElem = document.getElementById("hud-countdown-stop");
    if (!timerElem) return;

    var diff = targetTime - new Date().getTime();
    if (isNaN(diff) || diff <= 0) {
      timerElem.textContent = "MATCH IN PROGRESS / FT";
      timerElem.style.color = "var(--safc-gold)";
      if (stopElem) stopElem.textContent = "Kickoff Passed";
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    var str = (days > 0 ? days + "d " : "") + (hours < 10 ? "0" : "") + hours + "h " + (minutes < 10 ? "0" : "") + minutes + "m " + (seconds < 10 ? "0" : "") + seconds + "s";
    timerElem.textContent = str;
    timerElem.style.color = "#ffffff";
    if (stopElem) stopElem.textContent = "Kickoff @ " + (kickoffTimeDisplay || "15:00");
  }

  updateTimer();
  window._hudCountdownTimer = setInterval(updateTimer, 1000);
}

window._weatherCache = window._weatherCache || {};
function getWmoWeatherIcon(wmoCode) {
  if (wmoCode === 0) return "☀️";
  if (wmoCode === 1 || wmoCode === 2) return "🌤️";
  if (wmoCode === 3) return "☁️";
  if (wmoCode >= 45 && wmoCode <= 48) return "🌫️";
  if (wmoCode >= 51 && wmoCode <= 67) return "🌧️";
  if (wmoCode >= 71 && wmoCode <= 77) return "🌨️";
  if (wmoCode >= 80 && wmoCode <= 82) return "🌦️";
  if (wmoCode >= 95 && wmoCode <= 99) return "⛈️";
  return "🌤️";
}

function getCompassDirection(deg) {
  var sectors = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return sectors[Math.round(deg / 22.5) % 16] || "NW";
}

function fetchLiveMatchWeather(venueName, coords, targetDateTime) {
  var lat = (coords && coords.lat) ? coords.lat : 54.9146;
  var lon = (coords && coords.lon) ? coords.lon : -1.3882;
  var cacheKey = lat.toFixed(3) + "_" + lon.toFixed(3);

  var now = Date.now();
  if (window._weatherCache[cacheKey] && (now - window._weatherCache[cacheKey].timestamp < 600000)) {
    applyWeatherToDOM(venueName, window._weatherCache[cacheKey].data);
    return;
  }

  var url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + 
            "&current=temperature_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m" + 
            "&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m" + 
            "&wind_speed_unit=mph&timezone=Europe%2FLondon";

  fetch(url)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data) return;
      var weatherResult = null;

      if (data.hourly && data.hourly.time && targetDateTime) {
        var matchHourPrefix = targetDateTime.substring(0, 13);
        var idx = data.hourly.time.findIndex(function(t) { return t.indexOf(matchHourPrefix) === 0; });
        if (idx !== -1) {
          weatherResult = {
            temp: Math.round(data.hourly.temperature_2m[idx]) + "°C",
            wind: Math.round(data.hourly.wind_speed_10m[idx]) + "mph " + getCompassDirection(data.hourly.wind_direction_10m[idx]),
            rain: (data.hourly.precipitation_probability[idx] || 0) + "% Rain",
            icon: getWmoWeatherIcon(data.hourly.weather_code[idx])
          };
        }
      }

      if (!weatherResult && data.current) {
        weatherResult = {
          temp: Math.round(data.current.temperature_2m) + "°C",
          wind: Math.round(data.current.wind_speed_10m) + "mph " + getCompassDirection(data.current.wind_direction_10m),
          rain: (data.current.precipitation > 0 ? "Rain Active" : "0% Rain"),
          icon: getWmoWeatherIcon(data.current.weather_code)
        };
      }

      if (weatherResult) {
        window._weatherCache[cacheKey] = { timestamp: now, data: weatherResult };
        applyWeatherToDOM(venueName, weatherResult);
      }
    })
    .catch(function(err) {});
}

function applyWeatherToDOM(venueName, weather) {
  var iconElem = document.getElementById("hud-weather-icon");
  var sumElem = document.getElementById("hud-weather-summary");
  var rainElem = document.getElementById("hud-weather-rain");

  if (iconElem) iconElem.textContent = weather.icon;
  if (sumElem) sumElem.textContent = venueName + ": " + weather.temp + ", Wind " + weather.wind;
  if (rainElem) rainElem.textContent = weather.rain;
}

// ========================================================
// SECTION 6: 10-KIT THEME ENGINE & DISPLAY PREFERENCES
// ========================================================

var SAFC_KIT_THEMES = {
  "1990-vaux-home": { name: "1990 Vaux Home", c1: "#dc2626", c2: "#ffffff", c3: "#f59e0b" },
  "1990-vaux-away": { name: "1990 Vaux Away", c1: "#2563eb", c2: "#ffffff", c3: "#dc2626" },
  "1986-patrick-away": { name: "1986 Patrick Away", c1: "#eab308", c2: "#0f172a", c3: "#ffffff" },
  "1992-fa-cup-away": { name: "1992 FA Cup Final Away", c1: "#0d9488", c2: "#be123c", c3: "#ffffff" },
  "1994-avec-gk": { name: "1994 Avec Goalkeeper", c1: "#a3e635", c2: "#1d4ed8", c3: "#38bdf8" },
  "1998-lambtons-away": { name: "1998 Lambton's Away", c1: "#1e3a8a", c2: "#d97706", c3: "#ffffff" },
  "2000-reg-vardy": { name: "2000 Reg Vardy Home", c1: "#b91c1c", c2: "#94a3b8", c3: "#ffffff" },
  "2023-stealth-third": { name: "2023 Stealth Third", c1: "#18181b", c2: "#84cc16", c3: "#a3e635" },
  "2024-mining-heritage": { name: "2024 Mining Heritage", c1: "#0f172a", c2: "#06b6d4", c3: "#eab308" },
  "2026-hummel-elvis": { name: "2026 Hummel Elvis Away", c1: "#ec4899", c2: "#18181b", c3: "#fb7185" }
};

window.applyTheme = function(themeKey) {
  var theme = SAFC_KIT_THEMES[themeKey] || SAFC_KIT_THEMES["1990-vaux-home"];
  var root = document.documentElement;

  root.style.setProperty("--safc-red", theme.c1);
  root.style.setProperty("--safc-gold", theme.c3);
  root.style.setProperty("--safc-accent", theme.c2);

  var s1 = document.getElementById("swatch-c1");
  var s2 = document.getElementById("swatch-c2");
  var s3 = document.getElementById("swatch-c3");
  var badgeLabel = document.getElementById("theme-badge-label");

  if (s1) s1.style.background = theme.c1;
  if (s2) s2.style.background = theme.c2;
  if (s3) s3.style.background = theme.c3;
  if (badgeLabel) badgeLabel.textContent = theme.name;

  try { localStorage.setItem("safc_active_theme", themeKey); } catch (e) {}
};

window.handleThemeSelectChange = function(themeKey) {
  window.applyTheme(themeKey);
};

window.toggleHighContrastMode = function(isEnabled) {
  var styleTag = document.getElementById("outdoor-contrast-style");
  if (isEnabled) {
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "outdoor-contrast-style";
      styleTag.textContent = ".card { border: 2px solid #ffffff !important; background: #000000 !important; } body { background: #000000 !important; color: #ffffff !important; }";
      document.head.appendChild(styleTag);
    }
  } else if (styleTag) {
    styleTag.remove();
  }
  try { localStorage.setItem("safc_high_contrast", isEnabled ? "1" : "0"); } catch (e) {}
};

window.saveDisplayPreferences = function() {
  var showNick = document.getElementById("pref-public-nickname");
  var alerts = document.getElementById("pref-notifications");
  try {
    localStorage.setItem("safc_display_prefs", JSON.stringify({
      showNickname: showNick ? showNick.checked : true,
      notifications: alerts ? alerts.checked : true
    }));
  } catch (e) {}
};

(function restorePreferences() {
  try {
    var savedTheme = localStorage.getItem("safc_active_theme") || "1990-vaux-home";
    var sel = document.getElementById("theme-kit-select");
    if (sel) sel.value = savedTheme;
    window.applyTheme(savedTheme);

    var savedContrast = localStorage.getItem("safc_high_contrast") === "1";
    var cb = document.getElementById("pref-high-contrast");
    if (cb) { cb.checked = savedContrast; window.toggleHighContrastMode(savedContrast); }
  } catch (e) {}
})();

// --- BOOTSTRAP ON LOAD ---
window.onload = function() {
  window.refreshAllViews();
  initSupabaseCloudSync();
};